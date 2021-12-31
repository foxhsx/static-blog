---
title: webpack中 loader 和 plugin 的区别
date: 2021-02-09
tags:
 - Webpack
 - 面试
categories:
 - front
---

## 什么是loader

loader 是文件加载器，能够加载资源文件，并对这些文件进行一些处理，诸如编译、压缩等，最终一起打包到指定的文件中。

1. 处理一个文件可以使用多个 loader，loader 的执行顺序和配置中的顺序是相反的，即最后一个loader最先执行，第一个loader最后执行
2. 第一个执行的 loader 接收源文件内容作为参数，其他loader接收前一个执行的 loader 的返回值作为参数，最后执行的 loader 会返回此模块的 JavaScript 源码

## 什么是 plugin

在 webpack 运行的生命周期中会广播很多事件，plugin 可以监听这些事件，在合适的时机通过 webpack 提供的 API 改变输出结果。

## loader 和 plugin 的区别

对于loader，它是一个转换器，将 A 文件进行编译形成 B 文件，这里操作的是文件。比如将 A.scss 转换为 A.css ，单纯的文件转换过程。

plugin 是一个扩展器，它丰富了 webpack 本身，针对是 loader 结束后，webpack 打包的整个过程，它并不直接操作文件，而是基于事件机制工作，会监听 webpack 打包过程中的某些节点，执行广泛的任务。