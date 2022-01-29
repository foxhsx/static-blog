---
title: 闭包 JS基础 编程题 (字节) 
date: 2021-04-22
tags:
 - JavaScript
 - 面试
categories:
 - front
---

实现以下代码：

```js
var foo = function(...args) {} // 要求实现函数体
var f1 = foo(1,2,3); f1.getValue(); // 6 输出是参数的和
var f2 = foo(1)(2,3); f2.getValue(); // 6
var f3 = foo(1)(2)(3)(4); f3.getValue(); // 10
```

参考：
```js
function foo (..args) {
  const sum = (...args1) => foo(...[...args, ...args1])
  sum.getValue = () => args.reduce((p, n) => p+n, 0)
  return sum
}
```

解释一下：
1. 首先，这里是肯定要用闭包的，而且还要递归调用函数体本身
2. 调用 `foo()` 这里返回了函数 `sum`，但是我们并没有调用 `sum`，所以其实 `foo` 函数体内部只是执行了 `sum` 的定义和 `getValue` 方法
3. 当我们调用 `foo` 函数后，会返回当前函数体内 `args` 的和。
4. 当我们调用 `foo(1)(2,3)` 时，首先执行了 `foo` 函数，然后又返回了 `sum` 函数并调用，传入了 `2,3`，而 `sum` 本质上还是调用 `foo` 函数，最后得到两次调用所传参数的和。
5. 之后的调用原理同上。

