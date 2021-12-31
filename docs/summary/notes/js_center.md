---
title: JavaScript 两大核心底层
date: 2021-06-06
tags:
 - JavaScript
categories:
 - front
---

主要知识点：

- JavaScript 的执行机制
- V8 引擎内存问题
- 如何优化内存

## 一、异步

我们先从一道面试题入手：

```js
setTimeout(() => {
    console.log(1);
})
new Promise((resolve, reject) => {
    console.log(2);
    resolve();
}).then(() => {
    console.log(3);
})
console.log(4);

// 2431
```

首先答案肯定是2431，那么为什么是2431呢？

在这里 `setTimeout` 和 `then` 里的代码都是属于异步的，会被挂起到队列里，而 `Promise` 里的回调和最外层的 `console` 是同步的，会优先执行，所以在这里我们看到的答案就是 24，那么为什么3又在1的前面呢？

这里又涉及到了宏任务和微任务的概念。