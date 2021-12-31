---
title: 懒加载与预加载
date: 2021-01-25
tags:
 - JavaScript
categories:
 - front
---
[[toc]]

懒加载和预加载是我们在工程中经常使用到的两项优化。

使用懒加载，我们可以理解为延迟加载，只有触发某些条件后才会去加载，而没有触发这些条件时不加载资源。

使用预加载，相对于正常加载而言，正常加载可以认为是并行加载的（也就是同时加载多个文件）；而预加载指的是等其他资源加载完毕，也就是浏览器空闲了，再进行加载。这样既可以提前进行加载，又不会堵塞别的资源加载。缺点就是兼容性比较差，只能在PC端的高版本浏览器中使用，而在移动端还有IE中会有兼容性问题。

## 懒加载
那么怎么使用懒加载呢？我们先来看一个例子：
```js
// 假如页面中有一个按钮，当点击按钮时，加载某个方法

// 一般情况，项目打开后 add.js 就被加载
import { add } from './add'

document.getElementById('btn').onclick = function () {
  console.log(add(1,2,3))
}

// 懒加载，那它在项目中使用的前提条件也是需要代码分割，在代码分割之后，再对这个分割出来的模块进行懒加载
document.getElementById('btn').onclick = function () {
  import('./add').then(( { add } ) => {
    console.log(add(1,2,3))
  })
}
```

## 预加载
预加载其实也是在懒加载中实现的：
```js
document.getElementById('btn').onclick = function () {
  import(/* webpackPrefetch: true */, './add').then(( { add } ) => {
    console.log(add(1,2,3))
  })
}
```

这样打包之后呢，可以看到打包后的 js 被用上了 prefetch，也就是预加载。那么当我们启动浏览器后，打开控制台的 network 可以发现，被预加载的 js 已经被加载好了。
