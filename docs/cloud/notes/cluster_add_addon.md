---
title: 手动给集群安装插件
date: 2022-01-10
tags:
 - 云原生
describe: 学习了一下怎么给集群安装插件
---

我们以「阿里云容器服务-k8s」版为例，手动安装 `alicloud-nas-controller` 插件：

1. 在集群详情页面中找到对应的集群 `kubeconfig` 并复制下来
2. 将复制到的内容粘贴到本地的 `$home/.kube/config` 文件中
3. 在本地使用 `kubectl` 测试是否能够连接到集群，比如查看当前集群的 node ：`kubectl get node` 
4. 如果可以正常连接，我们来到[帮助文档](https://help.aliyun.com/document_detail/86785.html)中，找到文档里提供的这部分 YAML，并复制下来。
5. 在本地创建一个 YAML 文件，把刚刚复制到的内容粘贴进去，并命名
6. 打开终端，执行 `kubectl apply -f [文件名].yaml` 来给集群安装此组件
7. 验证

```shell
kubectl get pod -nkube-system | grep alicloud-nas-controller

# 安装成功
alicloud-nas-controller-xxxx-xxx   1/1    Running    0   24m
```

