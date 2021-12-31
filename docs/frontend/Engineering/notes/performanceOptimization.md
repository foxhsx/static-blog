---
title: 性能优化介绍
date: 2021-01-21
tags:
 - JavaScript
 - Webpack
 - 前端工程化
categories:
 - front
---

首先webpack的性能优化，我们可以概括归纳为两种：

- 开发环境性能优化
- 生产环境性能优化

## 开发环境性能优化

- 优化打包构建速度
  - [HMR](../../webpack/notes/hot_update.html)
- 优化代码调试
  - [source-map](../../webpack/notes/webpack_sourceMap.html)

## 生产环境新能优化

- 优化打包构建速度
  - [oneOf](../../webpack/notes/webpack_loader.html#oneof.html)
  - [babel缓存](./Cache.html#babel-loader)
  - [多进程打包](../../webpack/notes/webpack_thread.html)
  - [externals](../../webpack/notes/webpack_externals.html)
  - [Dll](../../webpack/notes/webpack_dll.html)
- 优化代码运行的性能
  - [cache](./Cache.html#cache-loader)
  - [Tree Shaking](../../webpack/notes/treeShakingAndSideEffects.html)
  - [Code Split](../../webpack/notes/webpack_CodeSplitting)
  - [懒加载/预加载](./lazyLoading.html)
  - [pwa](./PWA.html)

