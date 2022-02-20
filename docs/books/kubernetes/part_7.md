---
title: 7.为什么我们需要 Pod?
date: 2022-2-5
tags:
  - k8s
describe: 需要 Pod 的意义是什么
---

首先，在之前的文章中我们已经知道了 Pod 是 K8S 项目中最小的 API 对象。用更专业的说法是，Pod 是 K8S 中最小的原子调度单位。

### <strong style="color: orange">为什么我们会需要 Pod?</strong>

我们根据之前的文章内容，可以总结出三句话：

- Namespace 做隔离
- Cgroups 做限制
- rootfs 做文件系统

而我们也一直在强调容器的本质其实就是进程，容器镜像就是 `.exe` 的安装包，那 K8S 我们就可以将其看成是一个操作系统！

我们登录到一台 Linux 机器里，执行如下命令：

```shell
$ pstree -g
```

这条命令的作用，是展示当前系统中正在运行的进程的树状结构。返回的结果如下：

```shell
systemd(1)─┬─ModemManager(590)─┬─{ModemManager}(590)
           │                   └─{ModemManager}(590)
           ├─NetworkManager(756)─┬─{NetworkManager}(756)
           │                     └─{NetworkManager}(756)
           ├─VGAuthService(599)
           ├─abrt-dbus(606)─┬─{abrt-dbus}(606)
           │                └─{abrt-dbus}(606)
           ├─abrt-watch-log(597)
           ├─abrt-watch-log(683)
           ├─abrtd(595)
           ├─accounts-daemon(598)─┬─{accounts-daemon}(598)
           │                      └─{accounts-daemon}(598)
           ├─alsactl(587)
           ├─at-spi-bus-laun(8278)─┬─dbus-daemon(8278)───{dbus-daemon}(8278)
           │                       ├─{at-spi-bus-laun}(8278)
           │                       ├─{at-spi-bus-laun}(8278)
           │                       └─{at-spi-bus-laun}(8278)
           ├─at-spi2-registr(8278)─┬─{at-spi2-registr}(8278)
           │                       └─{at-spi2-registr}(8278)
           ├─atd(1110)
           ├─auditd(561)─┬─audispd(563)─┬─sedispatch(563)
           │             │              └─{audispd}(563)
           │             └─{auditd}(561)
           ├─avahi-daemon(591)───avahi-daemon(591)
           ├─boltd(6519)─┬─{boltd}(6519)
           │             └─{boltd}(6519)
           ├─chronyd(695)
...
```

可以看到，在一个真正的操作系统中，进程是以进程组的方式，有原则的组织在一起。在这个进程的树状图中，每一个进程后面括号里的数字，就是它的进程组 ID（PGID）。

进程组中的进程相互协作，共同完成一个程序的职责。对于操作系统来说，这样的进程组更方便管理。

而 K8S 项目所做的，其实就是将进程组的概念映射到了容器技术中，并使其成为了这个云计算操作系统中的一等公民。

我们来举个例子，说明一下**组**的重要性。

假如现在我们有一个 rsyslogd。已知它由三个进程组成：

- imklog
- imuxsock
- rsyslogd 自己的 main 函数主进程

这三个进程一定要运行在同一个机器上，否则，它们之间基于 socket 的通信和文件交换，都会出现问题。

现在，我们要把 rsyslogd 这个应用给容器化，由于受限于容器的单进程模型，这三个模块必须被分别制作成三个不同的容器。而在这三个容器运行的时候，它们设置的内存配额都是 1GB。

> ⚠️注意：容器的单进程模型，并不是指容器里只能运行一个进程，而是指容器没有管理多个进程的能力。这是因为容器里 PID = 1 的进程就是应用本身，其他的进程都是这个 PID = 1 进程的子进程。可是，用户编写的应用，并不能像正常操作系统里的 init 进程或者 systemd 那样拥有进程管理的功能。

假设我们的 K8S 集群上有两个节点：`node-1` 上有 3GB 可以使用，`node-2` 上有 2.5GB 可以使用。

这时，如果我们使用 Docker Swarm 运行这个 rsyslogd 程序。为了能够让这三个容器都运行在同一台机器上，我们就必须在另外两个容器上设置一个 `affinity = main` （与 `main` 容器有亲密性）的约束，即：它们俩必须和 `main` 容器运行在同一台机器上。

然后依次执行：

- `docker run main` 
- `docker run imklog` 
- `docker run imuxsock` 

创建这三个容器。

这样，这三个容器都会进入到 Swarm 的待调度队列中去。然后，main 容器和 imklog 容器都先后出队并被调度到了 `node-2` 上（这种场景是完全有可能的）。

可是，当 imuxsock 容器出队列被调度时，Swarm 就有点懵了：`node-2` 上的可用资源只有 0.5GB 了，并不足以运行 imuxsock 容器；可是又由于 `affinity = main` 的约束，imuxsock 容器只能运行在 `node-2` 上，因为 main 就在 `node-2` 上。

这就是一个典型的成组调度没有被妥善处理的例子。

在 K8S 中，这样的问题由于 Pod 的缘故就很好处理了。因为 Pod 是 K8S 中的原子调度单位。这就意味着 K8S 的调度器，是同意按照 Pod 而非容器的资源需求进行计算的。

> 可以这么理解，我们将 K8S 中的细粒度划分集中到了 Pod 上面，而非容器上面，这样一来，更加方便统筹管理。如果以容器为最小单位，那么调度的复杂度会比 Pod 翻上几番。

所以，像 imklog、imuxsock 和 main 函数主进程这样的三个容器，正是一个典型的由三个容器组成的 Pod。K8S 项目在调度时，自然就会去选择可用内存等于 3GB 的 `node-1` 节点进行绑定，而根本不会考虑 `node-2` 。

像这样容器间的紧密协作，我们可以称为**超亲密关系**。这些具有超亲密关系容器的典型特征包括但不限于：互相之间会发生直接的文件交换、使用 localhost 或者 Socket 文件进行本地通信、会发生非常频繁的远程调用、需要共享某些 Linux Namespace（比如，一个容器要加入另一个容器的 NetWork Namespace）等等。

> 这也说明了一件事情，并不是所有有关系的容器都属性一个 Pod。

而这不过是 Pod 的其中一个特点，它在 K8S 中更为重要的点是：**容器设计模式**。

要理解这一层含义，我们需要先了解一下 <strong style="color: orange">Pod 的实现原理</strong>。

首先，我们要知道 Pod **只是一个逻辑概念**。

也就是说，K8S 真正处理的，还是宿主机操作系统上 Linux 容器的 Namespace 和 Cgroups，而并不存在一个所谓的 Pod 的边界或者隔离环境。

那 Pod 到底是怎么被创建出来的呢？——**其实它就是一组共享了某些资源的容器**。

> 具体来说：Pod 里的所有容器，共享的是同一个 Network Namespace，并且可以声明共享同一个 Volume。

这么来看的话，一个有 A、B 两个容器的 Pod，不就是等同于一个容器（A）共享另外一个容器（B）的网络和 Volume 的玩儿法吗？

这也可以通过 `docker run --net --volumes-from` 这样的命令就能实现，如下:

```shell
$ docker run --net=B --volumes-from=b --name=A image-A ...
```

但是，我们这样做的话，容器B 就必须比容器A先启动，这样一个 Pod 里的多个容器就不是对等关系，而是**拓扑关系**了。

所以在 K8S 中，Pod 的实现需要使用一个中间容器，这个容器叫做 `infra` 容器。在这个 Pod 中，Infra 容器永远都是第一个被创建的容器，而其他用户定义的容器，则通过 join Network Namespace 的方式，与 infra 容器关联到一起。

![](./imgs/infra.webp)

如上图所示，这个 Pod 中有两个用户容器 A 和 B，还有一个 infra 容器。

在 K8S 项目中，infra 容器一定要占用极少的资源，所以它使用的是一个非常特殊的镜像，叫做：`k8s.gcr.io/pause`。这个镜像是一个用会变语言编写的、永远处于暂停状态的容器，解压后的大小也才只有 100-200kb 左右。

而在 Infra 容器 Hold 住 Network Namespace 之后，用户容器就可以加入到 Infra 容器的 Network Namespace 当中了。所以，如果我们查看这些容器在宿主机上的 Namespace 文件，它们指向的值一定是完全一样的。

这就意味着，对于 Pod 里的容器A 和 容器 B 来说：

- 它们可以直接使用 localhost 进行通信
- 它们看到的网络设备跟 Infra 容器里看到的完全一样
- 一个 Pod 只有一个 IP 地址，也就是这个 Pod 的 Network Namespace 对应的 IP 地址；
- 当然，其他的所有网络资源，都是一个 Pod 的一份子，并且被该 Pod 中的所有容器共享；
- Pod 的生命周期只跟 Infra 容器一致，而跟容器 A 和 B 无关

而对于同一个 Pod 里面的所有用户容器来说，它们的进出流量，也可以认为都是通过 Infra 容器完成的。这一点很重要，因为将来如果我们要为 K8S 开发一个网络插件时，应该重点考虑的是如何配置这个 Pod 的 Network Namespace。

而这也意味着，如果我们的网络插件需要在容器里安装某些包或者配置才能完成的话，是不可取的：因为在 Infra 容器镜像的 rootfs 里几乎什么都没有，没有我们随意发挥的空间。当然这也同时意味着我们的网络插件完全不必关心用户容器的启动与否，而只需要关注如何配置 Pod，也就是 Infra 容器的 Network Namespace 即可。

有了这个设计之后，共享 Volume 就简单多了：K8S 项目只要把所有 Volume 的定义都设计在 Pod 层级即可。

这样一个 Volume 对应的宿主机目录对于 Pod 来说就只有一个，Pod 里的容器只要声明挂载这个 Volume，就一定可以共享这个 Volume 对应的宿主机目录。比如下面这个例子：

```yaml
apiVersion: v1
kind: Pod
metadata:
	name: two-containers
spec:
	restartPolicy: Never
	volumes:
	- name: shared-data
		hostPath:
			path: /data
	containers:
	- name: nginx-container
		image: nginx
		volumeMounts:
		- name: shared-data
			mountPath: /usr/share/nginx/html
	- name: debian-container
		image: debian
		volumeMounts:
		- name: shared-data
			mountPath: /pod-data
		command: ['/bin/sh']
		args: ['-c', 'echo Hello from the debian container > /pod-data/index.html']
```

在这里例子中，`debian-container` 和 `nginx-container` 都声明挂载了 `shared-data` 这个 Volume。而 `shared-data` 其实就是 hostPath 类型。所以，它对应在宿主机上的目录就是 `/data` 。而这个目录其实就是被同时绑定挂载到了上述两个容器中。

这就是为什么，`nginx-container`  可以从它的 `/usr/share/nginx/html` 目录中，读取到 `Debian-container` 生成的 `index.html` 文件的原因。

Pod 这种超亲密关系容器的设计思想，实际上就是希望，当用户想在一个容器里跑多个功能并不相关的应用时，应该优先考虑它们是不是更应该被描述成一个 Pod 里的多个容器。

为了能够掌握这种思考方式，我们应该尽量尝试使用它来描述一些用单个容器难以解决的问题。

第一个最经典的例子是：WAR 包和 Web 服务器。

我们现在有一个 Java Web 应用的 WAR 包，它需要被放在 Tomcat 的 webapps 目录下运行起来。

现在假如我们只能用 Docker 来做这件事情的时候，要如何处理这个组合关系呢？

- 一种方法是，把 WAR 包直接放在 Tomcat 镜像的 webapps 目录下，做成一个新的镜像运行起来。可是，这个时候，如果我们要更新 WAR 包的内容，或者要升级 Tomcat 的镜像，就要重新制作一个新的发布镜像，非常麻烦。
- 另一种方法是，我们压根儿不管 WAR 包，永远只发布一个 Tomcat 容器。不过这个容器的 webapps 目录，就必须声明一个 hostPath 类型的 Volume，从而把宿主机上的 WAR 包挂载进 Tomcat 容器当中运行起来。不过，这样我们就得解决一个问题，即怎么让每一台宿主机，都预先准备好这个存储有 WAR 包的目录呢？这样来看的话，我们只能独立维护一套分布式存储系统了。

实际上，有了 Pod 之后，这样的问题就很容器解决了。我们可以把 WAR 包和 Tomcat 分别做成镜像，然后把它们作为一个 Pod 里的两个容器组合在一起。这个时候 Pod 的配置文件如下：

```yaml
apiVersion: v1
kind: Pod
metadata:
	name: javaweb-2
spec:
	initContainers:
	- image: geektime/sample:v2
		name: war
		command: ['cp', '/sample.war', '/app']
		volumeMounts:
		- mountPath: /app
			name: app-volume
	containers:
	- image: geektime/tomcat:7.0
	 	name: tomcat
	 	command: ['sh', '-c', '/root/apache-tomcat-7.0.42-v2/bin/start.sh']
	 	volumeMounts:
	 	- mountPath: /root/apache-tomcat-7.0.41-v2/webapps
	 		name: app-volume
	 	ports:
	 	- containerPort: 8080
	 		hostPort: 8001
	volumes:
	- name: app-volume
		emptyDir: {}
```

在这个 Pod 中，我们定义了两个容器，第一个容器使用的镜像是 `geektime/sample:v2` ，这个镜像里只有一个 WAR 包（`sample.war` )放在根目录下。而第二个容器则使用的是一个标准的 Tomcat 镜像。

不过，你可能已经注意到，WAR 包容器的类型不再是一个普通容器，而是一个 Init Container 类型的容器。

在 Pod 中，所有的 Init Container 定义的容器，都会比 `spec.containers` 定义的用户容器先启动。并且，Init Container 容器会按照顺序逐一启动，而直到它们都启动并且退出了，用户容器才会启动。

所以，这个 Init Contaienr 类型的 WAR 包容器启动后，我们执行了一句 `cp /sample.war /app`，把应用的 WAR 包拷贝到 `/app` 目录下，然后退出。

而后这个 `/app` 目录，就挂载了一个名叫 `app-volume` 的 Volume。

而 Tomcat 容器，同样声明了挂载 app-volume 到自己的 webapps 目录下。所以，等 Tomcat 容器启动时，它的 webapps 目录下就一定会存在 `sample.war` 文件：这个文件正是 WAR 包容器启动时拷贝到这个 volume 里面的，而这个 volume 是被这两个容器共享的。

像这样组合的操作，解决了 WAR 包与 Tomcat 容器之间耦合关系的问题。这正是容器设计模式里最常用的一种模式，它的名字叫做：sidecar。

顾名思义，sidecar 指的就是我们可以在一个 Pod 中，启动一个辅助容器，来完成一些独立于主进程之外的工作。

> 比如，在我们的这个应用 Pod 中，Tomcat 容器是我们要使用的主容器，而 WAR 包容器的存在，只是为了给它提供一个 WAR 包而已。所以，我们用 Init Container 的方式优先运行 WAR 包容器，扮演了一个 sidecar 的角色。

### 总结

Pod 是 K8S 中与其他单容器项目相比最大的不同，也是一个容器技术初学者需要面对的第一个与常规认知不同的知识点。

对于容器来说，一个容器永远只能管理一个进程。更确切地说，一个容器，就是一个进程。这是容器技术的本性，不可能被修改。

这也是 Swarm 项目无法成长起来的重要原因之一：一旦到了生产环境，Swarm 这种单容器的工作方式，就难以描述真实世界里复杂的应用架构了。

所以，我们可以这么理解 Pod 的本质：

> Pod，实际上是在扮演传统基础设施里“虚拟机”的角色；而容器，则是这个虚拟机里运行的用户程序。

所以，当我们需要把一个运行在虚拟机里的应用迁移到 Docker 容器中时，一定要仔细分析到底有哪些进程运行在这个虚拟机里。

