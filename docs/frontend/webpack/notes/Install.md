---
title: Webpack安装
date: 2020-12-16
tags:
 - JavaScript
 - Webpack
categories:
 - front
---

[[toc]]

## **安装**

第一，先创建一个目录，比如 webpack_demo，然后在目录下 npm init，初始化项目。

第二，我们安装到本地。

```shell
npm install webpack webpack-cli -D
```

这里 -D 会将 webpack 和 webpack-cli 安装到我们的开发依赖。等价与 --save-dev。

第三，创建一些基础目录(src,  build, index.js )

第四，开始写一些配置

::: tip

进行全局安装 webpack 和 webpack-cli。

```shell
npm install webpack webpack-cli -g
```

**运行指令**：

- 开发环境：`npx webpack ./src/index.js --output-filename=built.js -o ./build --mode=development`，webpack 会以./src/index.js 为入口文件开始打包，打包后输出到 ./build/built.js ；整体打包环境为开发环境。这里的 npx 是当本地安装 webpack ，而全局没有安装时使用，如果全局安装，则只使用 webpack即可。
- 生产环境：`npx webpack ./src/index.js --output-filename=built.js -o ./build --mode=production`，webpack 会以./src/index.js 为入口文件开始打包，打包后输出到 ./build/built.js ；整体打包环境为生产环境。



1. webpack 本身能处理 js 和 json 资源，不能处理 css 和 img 等其他资源。

2. 生产环境和开发环境将 ES6 模块化编译成浏览器能识别的其他模块
3. 生产环境比开发环境多了压缩 js 代码。

:::

