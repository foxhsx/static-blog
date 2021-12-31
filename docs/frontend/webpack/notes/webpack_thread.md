---
title: webpack之多进程打包
date: 2021-01-26
tags:
 - JavaScript
 - Webpack
categories:
 - front
---
首先，让我们带着问题来进行学习：
1. 什么是多进程打包？
2. 为什么要进行多进程打包？
3. 多进程打包如何使用？
4. 多进程打包的适用场景
5. 多进程打包的优缺点

## 什么是多进程打包
我们知道 JavaScript 引擎的主线程是单线程的，当某个任务消耗时间较长时就会卡顿，那么这个时候我们就可以使用多进程来优化打包速度，多进程可以同一时间干多件事，效率更高。

## 为什么要进行多进程打包？
当我们的项目体积很大时，打包构建速度就会显得缓慢，那这时候其实很大一部分原因在 `JS` 的编译上，比如需要将 ES6+ 转成 ES5 等。那我们需要提升打包构建速度的话，就可以考虑将比较耗时的这一时段进行多进程多实例构建，资源并行解析。

## 多进程打包如何使用？
首先我们先安装 `thread-loader`：
```shell
npm i thread-loader -D
```
然后，在 webpack 中去使用这个 loader，具体用法就是——哪个loader需要用，就放到对应的 loader 里去，比如我们一般会给 babel-loader 使用：
```js
module: {
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: [
        // 开启多进程打包
        'thread-loader',
        {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              {
                useBuiltIns: 'usage',
                corejs: { version: 3 },
                targets: {
                  chrome: '60'
                }
              }
            ]
          }
        }
      ]
    }
  ]
}
```

那么开启多进程打包，也是需要启动时间的，进程启动大概为600ms，而进程通信也有开销。所以开启时也要视具体项目而定。

## 多进程打包的适用场景
只有工作消耗时间比较长，才需要多进程打包。

## 多进程打包的优缺点