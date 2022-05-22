---
title: 8.深入解析 Pod 对象之基本概念
date: 2022-2-20
tags:
  - k8s
describe: 学习 Pod 中的基本概念
---

### 复习

上一节中说过，Pod 才是 K8S 中最小的编排单位。将这个设计落实到 API 对象上，容器就成了 Pod 属性里的一个普通的字段。那么一个很自然的问题就来了：到底哪些属性属于 Pod 对象，而哪些属性属于容器 Container 呢？

而要彻底理解这个问题，我们就一定要牢记我们在上一篇文章中学习到的一个结论：<strong style="color: orange">Pod 扮演的是传统部署环境中的虚拟机角色。</strong>这样的设计，是为了使用户从传统环境更加平滑的向 K8S 环境迁移。

这样可能不太直白，假如我们能把 Pod 看成传统环境中的机器、把容器看作是运行在这个机器里的用户程序，那么很多关于 Pod 对象的设计就很容易理解了。

比如，凡是调度、网络、存储，以及安全相关的属性，基本都是 Pod 级别的。

这些属性的共同特征是，它们描述的是机器整体，而不是里面的程序。比如：

- 配置机器的网卡——即 Pod 的网络定义
- 配置磁盘—— Pod 的存储定义
- 配置防火墙—— Pod 的安全定义
- 机器在哪个服务器上运行——Pod 的调度

### 重要字段和用法

#### NodeSelector

是一个供用户将 Pod 与 Node 进行绑定的字段，用法如下：

```yaml
apiVersion: v1
kind: Pod
...
spec:
  nodeSelector:
    disktype: ssd
```

这样一个配置，意味着这个 Pod 永远只能运行在携带了 `disktype: ssd` 标签（Label）的节点上；否则，它将调度失败。

#### NodeName

一旦 Pod 的这个字段被赋值，Kubernetes 项目就会被认为这个 Pod 已经经过了调度，调度的结构就是赋值的节点名字。所以，这个字段一般由调度器负责设置，但用户也可以设置它来“骗过”调度器，当然这个做法一般是在测试或者调试的时候才会用到。

#### HostAliases

定义了 Pod 的 hosts 文件（比如 `/etc/hosts` ）里的内容，用法如下：

```yaml
apiVersion: v1
kind: Pod
...
spec:
  hostAliases:
  - ip: "10.1.2.3"
    hostnames:
    - "foo.remote"
    - "bar.remote"
...
```

在这个 Pod 的 YAML 文件中，我们设置了一组 IP 和 hostname 的数据。这样，这个 Pod 启动以后，`/etc/hosts` 文件的内容将如下所示：

```shell
cat /etc/hosts
# Kubernetes-managed hosts file
127.0.0.1. localhost
...
10.244.135.10 hostaliases-pod
10.1.2.3 foo.remote
10.1.2.3 bar.remote
```

