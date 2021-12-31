---
title: Vscode 上面使用不了 yarn
date: 2021-07-27
tags:
 - 工具
categories:
 - front
describe: 明明在全局安装了 yarn，但是在 vscode 中使用不了
---

今天发生了一件奇怪的事情，那就是在全局已经安装了 yarn，而在 cmd 里也可以正常执行 yarn 命令，但是到 Vscode 中时，就不能正常使用。百思不得其解。查询之下发现，是因为 Vscode 中集成的终端是 powershell，而我们想要正常使用 yarn 命令，必须得设置一下 powershell 的执行权限。

怎么做呢？

首先打开开始菜单，直接输入 powershell，然后右击，选择管理员权限运行。

之后就简单了，在命令行中输入：

```shell
set-ExecutionPolicy RemoteSigned
```

回车之后，直接在弹出的选项中选择 y 即可。然后重启 vscode ，就可以正常使用 yarn 了。
