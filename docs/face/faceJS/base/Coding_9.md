---
title: 编程题汇总（九）
date: 2021-03-22
tags:
 - JavaScript
 - 面试
categories:
 - front
---

## 1、输出下面代码结果

```js
function handle1() {
  return 'Here is pizza!'
}

const handle2 = () => `Here's handle2`

console.log(handle1.prototype);
console.log(handle2.prototype);
```

::: tip 参考答案
{ constructor: ... } undefined

这里其实考察的还是常规函数和箭头函数有无原型的区别。

首先，常规函数，是有一个 `prototype` 属性的，它是一个带有 `constructor` 属性的对象（原型对象）。然后箭头函数是没有 `prototype` 属性的。如果尝试去获取箭头函数的 `prototype` 属性时会返回 undefined。
:::