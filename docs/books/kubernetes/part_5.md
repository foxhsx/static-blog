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

```shell
$ curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-ket add -
$ cat <<EOF > /etc/apt/sources.list.d/kubernetes.list
deb http://apt.kubernetes.io/ kubernetes-xenial main
EOF
$ apt-get update
$ apt-get install -y docker.io kubeadm
```

在上述安装 kubeadm 的过程中，kubeadm 和 kubelet、kubectl、kubernetes-cni 这几个二进制文件都会被自动安装好。

### 部署 Kubernetes 的 Master 节点

