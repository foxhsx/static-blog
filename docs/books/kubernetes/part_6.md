---
title: 6.第一个容器化应用
date: 2022-02-02
tags:
  - k8s
describe: 部署一个应用试试
---

今天的目标是，使用上次搭建的 K8S 集群发布第一个容器化应用。

在这之前，我们需要知道 K8S 里与开发者关系最密切的几个概念。

1. 制作容器镜像
2. 将镜像组织为它能够认识的方式，提交上去

<strong style="color: orange">什么才是 K8S 项目能认识的方式呢？</strong>

这就是使用 K8S 的必备技能：编写配置文件。

> 备注：这些配置文件可以是 YAML 或者 JSON 格式的。这里我们统一使用 YAML 文件来指代它们。

K8S 跟 Docker 等很多项目最大的不同在于，它不推荐我们使用命令行的方式直接运行容器（虽然也支持），而是希望我们用 YAML 文件的方式，即：把容器的定义、参数、配置，统统记录在一个 YAML 文件中，然后用一句指令把它运行起来：

```shell
$ kubectl create -f 配置文件
```

这么做的好处就是，我们会有一个文件能记录 K8S 到底运行了什么。来看个例子：

```YAML
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deploymenta
spec:
  selector:
    matchLabels:
      app: nginx
  replicas: 2
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
        - name: nginx
          image: nginx:1.7.9
          ports:
          - containerPort: 80
```

像这样的一个 YAML 文件，对应到 K8S 中，就是一个 API Object（API 对象）。K8S 在接收到这个对象后，会按照对象里的字段创建出这些对象所定义的容器或者其他类型的 API 资源。

可以看到，这个 YAML 文件中的 Kind 字段，指定来这个 API 对象的类型，是一个 Deployment。

所谓 Deployment，是一个定义多副本应用的对象（即多个副本 Pod)，此外，Deployment 还负责在 Pod 定义发生变化时，对每个副本进行滚动更新(Rolling Update)。

上面的文件中，我们看到 `spec.replicas` 的个数是 2，即给它定义的 Pod 副本个数是 2。

而 Pod 具体长啥样呢？

我们定义了一个 Pod 模版(spec.template)，这个模版描述了我们想要创建的 Pod 的细节：

- Pod 里只有一个容器
- 容器的镜像(spec.containers.image) 是 `nginx:1.7.9`
- 容器监听端口 (containerPort) 是 80

> 我们要牢记：Pod 就是 K8S 里的应用，而一个应用，可以由多个容器组成

在 K8S 中，像这样使用一种 API 对象（Deployment）管理另一种 API 对象 (Pod) 的方法，叫做**控制器模式**(controller pattern)。

而在这个 YAML 文件中每一个 API 对象都有一个叫做 Metadata 的字段，这个字段就是 API 对象的**标识**，即元数据。它是我们从 K8S 中找到这个对象的主要依据，其中最主要的字段就是我们的 Labels。

顾名思义，Labels 就是一组 key-values 格式的标签。而像 Deployment 这样的控制器对象，就可以通过这个 Labels ziduan 从 K8S 中过滤出它所关心的被控制对象。

比如，在上面这个 YAML 文件中，Deployment 会把所有正在运行的、携带 `app:nginx` 标签的 Pod 识别为被管理的对象，并确保这些 Pod 的总数严格等于两个。

而这个过滤规则的定义，是 Deployment 的 `spec.selector.matchLabels` 字段。我们一般称之为：Label Selector。

另外，在 Metadata 中，还有一个与 Labels 格式、层级完全相同的字段叫 Annotations，它专门用来携带 key-value 格式的内部信息。所谓内部信息，指的是对这些信息感兴趣的，是 K8S 组件本身，而不是用户。所以大多数的 Annotations，都是在 K8S 运行过程中，被自动加在这个 API 对象上的。

**一个 K8S 的 API 对象的定义，大多数可以分为 Metadata 和 Spec 两个部分。**

- 前者存放的是这个对象的元数据，对所有 API 对象来说，这一部分的字段和格式基本上是一样的；

- 而后者存放的，则是属于这个对象独有的定义，用来描述它所要表达的功能。

那我们现在就可以把这个 YAML 文件运行起来：

```shell
$ kubectl create -f nginx-deployment.yaml
```

然后，通过 `kubectl get` 命令检查这个 YAML 运行起来的状态是不是和我们的预期一致：

```shell
$ kubectl get pods -l app=nginx

NAME                               READY   STATUS    RESTARTS   AGE
nginx-deployment-f7ccf9478-89b7b   0/1     Running   0          13s
nginx-deployment-f7ccf9478-bt55n   0/1     Running   0          13s
```

这里我们加了一个 `-l` 的参数，即获取所有匹配 `app:nginx` 标签的 Pod。

> ⚠️注意：在命令行中，所有 `key-value` 格式的参数，都是用 `=` 而非 `:` 表示。

我们可以使用 `kubectl describe` 命令，查看一个 API 对象的细节，比如：

```shell
$ kubectl describe pod nginx-deployment-f7ccf9478-89b7b

Name:           nginx-deployment-f7ccf9478-89b7b
Namespace:      default
Priority:       0
Node:           <none>
Labels:         app=nginx
                pod-template-hash=f7ccf9478
Annotations:    <none>
Status:         Pending
IP:             
IPs:            <none>
Controlled By:  ReplicaSet/nginx-deployment-f7ccf9478
Containers:
  nginx:
    Image:        nginx:1.7.9
    Port:         80/TCP
    Host Port:    0/TCP
    Environment:  <none>
    Mounts:
      /var/run/secrets/kubernetes.io/serviceaccount from kube-api-access-d47st (ro)
Conditions:
  Type           Status
  PodScheduled   False 
Volumes:
  kube-api-access-d47st:
    Type:                    Projected (a volume that contains injected data from multiple sources)
    TokenExpirationSeconds:  3607
    ConfigMapName:           kube-root-ca.crt
    ConfigMapOptional:       <nil>
    DownwardAPI:             true
QoS Class:                   BestEffort
Node-Selectors:              <none>
Tolerations:                 node.kubernetes.io/not-ready:NoExecute op=Exists for 300s
                             node.kubernetes.io/unreachable:NoExecute op=Exists for 300s
Events:
  Type     Reason            Age                  From               Message
  ----     ------            ----                 ----               -------
  Warning  FailedScheduling  3m36s                default-scheduler  0/1 nodes are available: 1 node(s) had taint {node-role.kubernetes.io/master: }, that the pod didn't tolerate.
  Warning  FailedScheduling  85s (x1 over 2m25s)  default-scheduler  0/1 nodes are available: 1 node(s) had taint {node-role.kubernetes.io/master: }, that the pod didn't tolerate.
```

我们需要特别关注 **Events** 相关的信息。

在 K8S 执行的过程中，对 API 对象的所有重要操作，都会被记录在这个对象的 Events 里，并且显示在 `kubectl describe` 指令返回的结果中。

比如在这个 Pod 中，我们就可以看到因为污点的原因，其实这两个 Pod 都没跑起来。

所以，这个部分正是我们将来进行 Debug 的重要依据。如果有异常发生，我们一定要第一时间查看这些 Events，往往可以看到非常详细的错误信息。

<strong style="color: orange">如果我们要对这个 Nginx 服务进行升级的话，要怎么做呢？</strong>

很简单，我们只要修改这个 YAML 文件即可。

```YAML
...
spec:
	containers:
	- name: nginx
	image: nginx:1.8 # 这里从 1.7.9 修改为 1.8
	ports:
	- containerPort: 80
```

然后再执行 `kubectl replace` 指令来完成这个更新：

```shell
$ kubectl replace -f nginx-deployment.yaml
```

不过呢，我们推荐使用 `kubectl apply` 命令，来统一进行 K8S 对象的创建和更新操作：

```shell
$ kubectl apply -f nginx-deployment.yaml

# 修改 YAML 文件内容以后

$ kubectl apply -f nginx-deployment.yaml
```

这样的操作方法，是 K8S **声明式API** 所推荐的使用方法。也就是说，作为用户，我们不必去关心当前的操作是创建还是更新，我们只需要执行 `kubectl apply` 即可，而 K8S 则会根据 YAML 文件的内容变化，自动进行具体的处理。

它的好处显而易见，我们只需要围绕着可以版本话管理的 YAML 文件即可，而不必去大量的进行命令行操作。

所以说，如果通过容器镜像，我们能够保证应用本身在开发和部署环境里的一致性的话，那么现在，K8S 项目通过这些 YAML 文件，就保证了应用的部署参数在开发和部署环境中的一致性。

接下来，我们再在这个 Deployment 中尝试声明一个 Volume。

在 K8S 中，Volume 是属于 Pod 对象的一部分。所以，我们就需要修改这个 YAML 文件里的 `template.spec` 字段，如下所示：

```YAML
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  selector:
    matchLabels:
      app: nginx
  replicas: 2
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.8
        ports:
        - containerPort: 80
        volumeMounts:
        - mountPath: "/usr/share/nginx/html"
          name: nginx-vol
      volumes:
      - name: nginx-vol
        hostPath:
          path: /var/data
```

我们现在给这个 Pod 的模版部分添加了一个 volumes 字段，定义了这个 Pod 声明的所有 Volume。它的名字是 `nginx-vol` ，而类型是 `emptyDir`。

> emptyDir 其实就等同于我们之前说过的 Docker 的隐式 Volume 参数，即：不显式声明宿主机目录的 Volume。所以，K8S 也会在宿主机上创建一个临时目录，这个目录将来就会被绑定挂载到容器所声明的 Volume 目录上。

而 Pod 中的容器，使用的就是 volumeMounts 字段来声明自己要挂载哪个 volume，并通过 mountPath 字段来定义容器内的 Volume 目录，比如：`/usr/share/nginx/html`。

当然我们也可以定义显式的 Volume 定义，它叫做 hostPath。如下：

```YAML
...
volumes:
	- name: nginx-vol
	  hostPath:
	  	path: /var/data
```

这样，容器 Volume 挂载的宿主机目录，就变成了 `/var/data`。

那修改完之后，我们就可以使用 `kubectl apply` 的指令，更新这个 Deployment：

```shell
$ kubectl apply -f nginx-deployment.yaml
```

然后我们就可以使用 `kubectl get pods` 来查看两个 Pod 被逐一更新的过程。

最后，我们还可以使用 `kubectl exec` 指令，进入到这个 Pod 当中（即容器的 Namespace 中）查看这个 Volume 目录：

```shell
$ kubectl exec -it nginx-deployment-xxxx -- /bin/bash
```

此外，如果我们想要从 K8S 集群中删除这个 Nginx Deployment 的话，可以直接执行：

```shell
$ kubectl delete -f nginx-deployment.yaml
```

### 小结

在 K8S 中，我们经常会看到它通过一种 API 对象来管理另一种 API 对象，比如 Deployment 和 Pod 之间的关系；而由于Pod 是最小的对象，所以它往往都是被其他对象控制的。这种组合方式，正是 K8S 进行容器编排的重要模式。

像这样的 K8S API 对象，往往由 Metadata 和 Spec 两部分组成，其中 Metadata 里的 Labels 字段是 K8S 过滤对象的主要手段。

我们想要快速熟悉 K8S ，可以按照下面的流程进行练习：

1. 在本地通过 Docker 测试代码，制作镜像
2. 然后，选择合适的 K8S API 对象，编写对应的 YAML 文件（比如，Pod，Deployment）
3. 最后，在 K8S 上部署这个 YAML 文件。

最重要的是，在部署到 K8S 之后，接下来的所有操作，要么通过 kubectl 来执行，要么通过修改 YAML 文件来实现，就尽量不要再碰 Docker 的命令行了。
