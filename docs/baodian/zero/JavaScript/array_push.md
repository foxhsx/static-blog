---
title: 手写数组的 push 方法
date: 2021-06-19
tags:
 - JavaScript
 - 面试
categories:
 - front
---

## 析题

首先，手写数组的 push 方法，那我们第一步想到的应该是数组本身的 push 方法，有什么作用？

::: tip push

`push`方法将一个或者多个元素添加到数组的末尾，**并返回该数组的新长度**。

```js
const animals = ['pigs', 'goats', 'sheep'];

const count = animals.push('cows');
console.log(count);
// expected output: 4
console.log(animals);
// expected output: Array ["pigs", "goats", "sheep", "cows"]
```

:::

所以由概念我们可以知道，如果需要实现一个数组的 push 方法，那就要实现以下几点：

1. 数组实例方法；
2. 将一个或者多个元素添加到数组的末尾；
3. 返回该数组的最新的长度；

## 解题

首先，我们现在 Array 的原型上重新或者说新定义一个属性——newPush;

```js
Array.prototype.newPush = null;
```

其次，实现将一个或者多个元素添加到数组的末尾的方法：

```js
function push() {
    // 首先做代码健壮性检查，如果 length 不存在，就创建一个 length 属性，如果值不是一个数值，就将其置为0
    if (!this.length) {
        this.length = 0
    }
    if (isNaN(Number(this.length))) {
        this.length = 0
    }
    for (let i = 0; i < arguments.length; i++) {
        this[this.length] = arguments[i]
    }
}
```

这里我们会用到 `arguments` 这个类数组，那它是做什么的呢？

::: tip arguments

事实上，在使用 function 关键字定义（非箭头函数）函数时，可以在函数内部访问 arguments 对象，从中取得传进来的每个参数值。**它是一个类数组对象，主要的作用就是包含函数的参数**。

因为 arguments 对象的值会自动同步到对应的命名参数，所以修改 arguments[1] 也相对应会修改第二个形参的值。但是需要**注意**的是**这并不意味着它们都访问同一个内存地址，它们在内存中还是分开的，只不过会保持同步而已**。

但是这种同步是单向的，修改命名参数的值，并不会影响 arguments 对象中相应的值。（毕竟终归内存地址是不同的）

还有一点就是如果只传了一个参数，然后把 arguments[1] 设置为某个值，那么这个值并不会反映到第二个命名参数。这是因为 arguments 对象的长度是根据传入的参数个数，而非定义函数时给出的命名参数个数确定的。

**箭头函数中，是没有 arguments 的**。

它还具有一个 callee 属性，是一个指向 arguments 对象所在函数的指针。

```js
function add () { console.log(arguments) };
add(2);

// Arguments { 0: 2, callee: function add(), length: 1, Symbol(Symbol.iterator): function values) }
```

:::

再次，实现返回该数组的最新的长度：

```js
function push() {
    if (!this.length) {
        this.length = 0
    }
    if (isNaN(Number(this.length))) {
        this.length = 0
    }
    for (let i = 0; i < arguments.length; i++) {
        this[this.length] = arguments[i]
    }
    return this.length;
}
```

最后，将方法赋值给 newPush 这个新属性上：

```js
Array.prototype.newPush = push;
```

完成。