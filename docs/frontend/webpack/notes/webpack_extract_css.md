---
title: webpack之提取css
date: 2020-12-30
tags:
 - JavaScript
 - Webpack
categories:
 - front
---

[[toc]]

## 为什么要提取css出来？

## 如何提取？

首先下载插件来实现我们提取css文件的需求：

```shell
npm i mini-css-extract-plugin -D
```

这个插件能将项目JS中的css提取成单独的css文件。在webpack4之前我们是使用 extract-text-webpack-plugin 插件来进行 css 文件提取的，现在已经弃用，而是使用 mini-css-extract-plugin 来进行css提取.

但是有一点注意的是，在 webpack5 时，我们如果在打包的时候抛出异常：

```javascript
TypeError: The ‘compilation‘ argument must be an instance of Compilation
```

那首先考虑的是，html-webpack-plugin 和 webpack5 之间是否有版本兼容问题，在查阅一些资料和博客后发现将 html-webpack-plugin 的版本如果回退到 @5.0.0-alpha.9 后就可正常进行提取css文件（而正常npm i html-webpack-plugin 会安装最新版本 @5.0.0-beta.1）。

