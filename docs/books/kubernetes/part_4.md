---
title: 4. 一键部署 K8S 利器：kubeadm
date: 2022-01-21
tags:
  - k8s
describe: 怎么部署 K8S
---

K8S 在前期的时候，作为一个 Golang 的项目，虽然相比其他的产品已经免去了很多的麻烦。但是部署起来还是很麻烦，在 17 年的时候，社区终于发起了一个独立的部署工具——`kubeadm`。

这个项目的目的，就是要让用户能够通过这样两条指令完成一个 K8S 集群的部署：

```shell
# 创建一个 master 节点
$ kubeadm init

# 将一个 Node 节点加入到当前集群中
$ kubeadm join <Master 节点的 IP 和端口>
```

而对于 K8S 项目的部署来说，它的每一个组件都是一个需要被执行的、单独的二进制文件。所以我们是不是可以使用容器部署的方式来部署 K8S 呢？

事实上，在 K8S 早期的部署脚本中，确实有一个脚本就是用 Docker 部署 K8S 项目的，这个脚本相比与 SaltStack 等的部署方式，确实也简单了不少。但是它有一个重大的缺陷！

如何容器化 kubelet ？

Kubelet 是 K8S 项目中用来操作 Docker 等容器运行时的核心组件。但是，除了跟容器进行时打交道外，kubelet 在配置容器网络、管理容器数据卷时，都需要直接操作宿主机。

而如果现在 kubelet 本身就运行在一个容器里，那么直接操作宿主机就会变得很麻烦。对于网络配置来说还好，kubelet 容器可以通过不开启 Network Namespace （即 Docker 的 host network 模式）的方式，直接共享宿主机的网络栈。可是，要让 kubelet 隔着容器的 Mount Namespace 和文件系统，操作宿主机的文件系统，就有点困难了。

在 kubeadm 上选择了一种妥协的方案：

> 把 kubelet 直接运行在了宿主机上，然后使用容器部署其他的 K8S 组件。

所以，我们在使用 kubeadm 的第一步，就是在机器上手动安装 kubeadm、kubelet 和 kubectl 这三个二进制文件。

```shell
# 使用以下命令一键安装
$ apt-get install kubeadm
```

接下来，我们就可以使用 `kubeadm init` 部署 Master 节点了。

#### kubeadm init 的工作流程

当我们执行 `kubeadm init` 的指令时，`kubeadm` 首先要做的，是一系列的检查工作，以确定这台机器可以用来部署 K8S。这一步检查，我们称为 `Preflight Checks` ，它包括了很多方面，比如：

- Linux 内核的版本是否是在 3.10 以上？
- Linux Cgroups 模块是否可用？
- 机器的 hostname 是否标准？
- Docker 是否已经安装？
- ......

在通过前置检查以后，kubeadm 还要做的，就是生成 K8S 对外提供服务所需的各种证书和对应的目录。

> K8S 对外提供服务时，除非专门开启不安全模式，否则都是需要通过 HTTPS 才能访问 `kube-apiserver`。这就需要 K8S 集群配置好证书文件。

Kubeadm 为 K8S 项目生成的证书文件都放在 Master 节点的 `/etc/kubernetes/pki` 目录下。在这个目录下，最主要的证书文件就是 `ca.crt` 和对应的私钥 `ca.key` 。

而用户使用 kubectl 获取容器日志等 streaming 操作时，需要通过 `kube-apiserver-kubelet` 发起请求，这个连接也必须是安全的。kubeadm 为这一步生成的是 `apiserver-kubelet-client.crt` 文件，对应的私钥是 `apiserver-kubelet-client.key` 。

除了上述之外，还有用到一些其他的证书，这里我们不一一列举了。需要指出的是，我们可以选择不生成这些证书，而是拷贝现有的证书到如下证书的目录里去：

`/etc/kubernetes/pki/ca.{crt, key}`

这时，kubeadm 就会跳过证书生成的步骤，把它完全交给用户处理。

证书生成后，kubeadm 接下来会为其他组件生成访问 kube-apiserver 所需的配置文件。这些文件的路径是：`/etc/kubernetes/xxx.conf`：

```shell
$ ls /etc/kubernetes/
admin.conf controller-manager.conf kubelet.conf scheduler.conf
```

这些文件里面记录的是，当前这个 Master 节点的服务器地址、监听端口、证书目录等信息。这样，对应的客户端就可以直接加载相应的文件，使用里面的信息与 kube-apiserver 建立安全连接。

接下来，kubeadm 会为 Master 组件生成 Pod 配置文件。K8S 有三个 Master 组件 `kube-apiserver` 、`kube-controller-manager` 、`kube-scheduler` ，而它们都会被使用 Pod 的方式部署起来。

> 但是这个时候 K8S 集群尚不存在，难道 kubeadm 会直接执行 docker run来启动这些容器吗？

当然不是。在 K8S 中，有一种特殊的容器启动方法叫做 `Static Pod` 。它允许我们把要部署的 Pod 的 YAML 文件放在一个指定的目录里。这样，当这台机器上的 kubelet 启动时，它会自动检查这个目录，加载所有的 Pod YAML 文件，然后在这台机器上启动它们。

> 从这一点也可以看出，kubelet 在 K8S 项目中的地方非常高，在设计上它完全是一个独立的组件，而其他 Master 组件，则更像是辅助性的系统容器。

在 kubeadm 中，Master 组件的 YAML 文件会被生成在 `/etc/kubernetes/manifests` 路径下。比如，kube-apiserver.yaml:

```YAML
apiVersion: v1
kind: Pod
metadata:
	annotations:
		scheduler.alpha.kubernetes.io/critical-pod: ""
	creationTimestamp: null
	labels:
	component: kube-apiserver
	tier: control-plane
	name: kube-apiserver
	namespace: kube-system
spec:
	containers:
	- command:
	- kube-apiserver
	...
	image: k8s.gcr.io/kube-apiserver-amd64:v1.11.1
```

在这里，我们先只需要注意这样几个信息：

1. 这个 Pod 里只定义了一个容器，它使用的镜像是 `k8s.gcr.io/kube-apiserver-amd64:v1.11.1` 。这是 K8S 官方维护的一个组件镜像
2. 这个容器的启动命令（commands）是 `kube-apiserver --authorization-mode=Node,RBAC...` ，这样一句非常长的命令。其实，它就是容器里 kube-apiserver 这个二进制文件再加上指定的配置参数而已。
3. 如果我们需要修改已有集群里的 kube-apiserver 的配置，需要修改这个 YAML 文件。
4. 这些组件的参数也可以在部署时指定。

在这一步完成以后，kubeadm 还会生成一个 etcd 的 Pod YAML 文件，用来通过同样的 Static Pod 的方式启动 Etcd。

而一旦这些 YAML 文件出现被 kubelet 监视的 `/etc/kubernetes/manifests` 目录下，kubelet 就会自动创建这些 YAML 文件中定义的 Pod，即 Master 组件的容器。

Master 容器启动以后，kubeadm 会通过检查 `localhost:6443/healthz` 这个 Master 组件的健康检查 URL，等待 Master 组件完全运行起来。

然后，kubeadm 就会为集群生成一个 bootstrap token。在后面，只要持有这个 token，任何一个安装了 kubelet 和 kubeadm 的节点，都可以通过 kubeadm join 加入到这个集群当中。

这个 token 的值和使用方法会在 `kubeadm init` 结束后被打印出来。

在 token 生成以后，kubeadm 会将在 ca.crt 等 Master 节点的重要信息，通过 ConfigMap 的方式保存在 Etcd 当中，供后续部署 Node 节点使用。这个 ConfigMap 的名字是 `cluster-info` 。

Kubeadm init 的最后一步就是安装默认插件。K8S 默认 `kube-proxy` 和 DNS 这两个插件是必须安装的。它们分别用来提供整个集群的服务发现和 DNS 功能。其实，这两个插件也只是两个容器镜像而异，所以 kubeadm 只要用 K8S 客户端创建两个 Pod 就可以了。

#### kubeadm join 的工作流程

这个流程相对就很简单了，kubeadm init 生成 bootstrap token 之后，我们就可以在任意一台安装了 kubelet 和 kubeadm 的机器上执行 kubeadm join 了。

> 思考：为什么指定 `kubeadm join` 的时候需要这样一个 token 呢？

1. 想要任何一台机器成为 K8S 集群中的一个节点，就必须在集群的 `kube-apiserver` 上注册。
2. 要想跟 apiserver 打交道，这台机器就必须要获取到相应的证书文件（CA 文件）
3. 为了能够一键安装，我们不能让用户去 Master 节点上手动拷贝这些文件
4. 即 kubeadm 至少需要发起一次“不安全模式”的访问到 `kube-apiserver` ，从而拿到保存在 ConfigMap 中的 cluster-info（里面报错了 APIServer 的授权信息）。
5. bootstrap token 扮演的就是这个过程中的安全验证的角色

只要有了 cluster-info 里的 `kube-apiserver` 的地址、端口、证书，kubelet 就可以以“安全模式”连接到 apiserver 上，这样一个新的节点就部署完成了。

### 配置 kubeadm 的部署参数

如何定制我们的集群组件参数呢？

比如，我们要指定 `kube-apiserver` 的启动参数，该怎么办？

以下这条命令可以很好的帮助到我们：

```shell
$ kubeadm init --config kubeadm.yaml
```

那我们的这个 YAML 文件的内容如下：

```YAML
apiVersion: kubeadm.k8s.io/v1alpha2
kind: MasterConfiguration
kubernetesVersion: v1.11.0
api:
	advertiseAddress: 192.168.0.102
	bindPort: 6443
	...
etcd:
	local:
	dataDir: /var/lib/etcd
	image: ""
imageRepository: k8s.gcr.io
kubeProxy:
	config:
	bindAddress: 0.0.0.0
	...
kubeletConfiguration:
	baseConfig:
	address: 0.0.0.0
	...
networking:
	dnsDomain: cluster.local
	podSubnet: ""
	serviceSubnet: 10.96.0.0/12
nodeRegistration:
	criSocket: /var/run/dockershim.sock
```

通过制定这样一个部署参数配置文件，我们就可以很方便地在这个文件里填写各种自定义的部署参数信息。

比如，我们现在要指定一个 `kube-apiserver` 的参数，那么只需要在这个文件里加上这样一段信息：

```YAML
...
apiServerExtraArgs:
	advertis-address: 192.168.0.103
	anonymous-auth: false
	enable-admission-plugins: AlwaysPullImages,DefaultStorageClass
	audit-log-path: /home/johndoe/audit.log
```

然后，kubeadm 就会使用上面这些信息替换 `/etc/kubernetes/manifests/kube-apiserver.yaml` 里的 command 字段里的参数了。



