---
title: 5.搭建一个完整的 K8S 集群
date: 2022-01-27
tags:
  - k8s
describe: 动起小手来练习
---

> 注意：这里说的“完整”，指的是这个集群具备 K8S 项目在 Github 上已经发布的所有功能，并能够模拟生产环境的所有使用需求。但这并不代表这个集群是生产级别可用的：类似于高可用、授权、多租户、灾难备份等生产级别集群的功能暂时不在讨论范围内。

### 准备工作

首先，准备机器。最直接的办法，是到公有云上申请几个虚拟机。当然，如果条件允许的话，拿几台本地的物理服务器来组集群是最好不过了。这些机器只要满足如下几个条件即可：

1. 满足安装 Docker 项目所需要的要求，比如 64 位的 Linux 操作系统、3.10 及以上的内核版本；
2. X86 或者 ARM 架构均可
3. 机器之间网络互通，这是将来容器之间网络互通的前提；
4. 有外网访问权限，因为需要拉取镜像
5. 能够访问到 `gcr.io`、`quay.io` 这两个 docker registry，因为有小部分镜像需要在这里拉取；
6. 单机可用资源建议 2 核 CPU、8 GB 内存或以上，再小的话问题也不大，但是能调度的 Pod 数量就比较有限了；
7. 30 GB 或以上的可用磁盘空间，这主要是给 Docker 镜像和日志文件用的。

### 安装 kubeadm 和 Docker

1. 添加 kubeadm 的源
2. 然后直接用 `apt-get`  安装即可
3. `apt-key` 可以直接使用 `apt-get` 进行安装

```shell
$ curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key add -
$ cat <<EOF > /etc/apt/sources.list.d/kubernetes.list
deb http://apt.kubernetes.io/ kubernetes-xenial main
EOF
$ apt-get update
$ apt-get install -y docker.io kubeadm
```

在上述安装 kubeadm 的过程中，kubeadm 和 kubelet、kubectl、kubernetes-cni 这几个二进制文件都会被自动安装好。

> 上述命令是属于 Debian 系列，即 `Debian` 、`Ubuntu` 等，在这些系统上要使用 `apt-get` 和 `apt-key` 等命令。
>
> 而如果使用的是 RedHat 系列的话，就是 `RedHat` 、`CentOS` 、`Fedora` 等，在这些系统上要使用 `yum` 等命令。

- 接下来是在 CentOS 7 上的安装流程（没有科学上网的话，使用阿里云下载）

```shell
# 配置源
$ cat <<EOF > /etc/yum.repos.d/kubernetes.repo
[kubernetes]
name=Kubernetes
baseurl=https://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64
enabled=1
gpgcheck=1
repo_gpgcheck=1
gpgkey=https://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg https://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg
EOF

# 安装
$ yum install -y kubelet kubeadm kubectl

# 配置 docker 下载源
yum-config-manager \
    --add-repo \
    https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
    
# 安装 docker 
yum install docker-ce docker-ce-cli containerd.io
```

- 验证 Docker 是否安装成功：`docker version` 
- 验证 Kubectl 是否安装成功：`kubectl version`
- 验证 kubelet 是否安装成功：`kubelet --version`
- 验证 kubeadm 是否安装成功：`kubeadm version`

我们还需要将 SELinux 设置为 `permissive` 模式（相当于将其禁用），这是允许容器访问主机文件系统所必需的，而这些操作是为了让例如 Pod 网络能够正常工作。

```shell
$ sudo setenforce 0
$ sudo sed -i 's/^SELINUX=enforcing$/SELINUX=permissive/' /etc/selinux/config
```

### 部署 Kubernetes 的 Master 节点

接下来我们通过一份配置文件来执行 `kubeadm init` 命令，这是因为一些更加高级的功能只能通过配置文件来设定。这份配置文件是通过 `--config`  选项参数来指定的，它必须包含 `ClusterConfiguration` 结构，并可能包含更多的由 `---\n` 分隔的结构。

我们可以使用 `kubeadm config print` 来打印出默认的配置。

在这里我们复制下面的 YAML 文件内容来给 kubeadm 使用：

```YAML
apiVersion: kubeadm.k8s.io/v1alpha1
kind: MasterConfiguration
controllerManagerExtraArgs:
	horizontal-pod-autoscaler-use-rest-clients: "true"
	horizontal-pod-autoscaler-sync-period: "10s"
	node-monitor-grace-period: "10s"
apiServerExtraArgs:
	runtime-config: "api/all=true"
kubernetesVersion: "v1.23.3"
```

在这个文件中给 `kube-controller-manager` 设置了：

```YAML
horizontal-pod-autoscaler-use-rest-clients: "true"
```

这意味着，将来部署的 `kube-controller-manager` 能够使用自定义资源（Custom Metrics）进行自动水平扩展。

其中，`v1.23.3` 就是 kubeadm 帮我们部署的 kubernetes 的版本号。

然后，我们只需要执行一句命令：

```shell
$ kubeadm init --config kubeadm.yaml
```

这样，就可以完成 kubernetes master 的部署了，这个过程需要几分钟的时间。部署完成后，kubeadm 会生成一行指令：

```shell
```

