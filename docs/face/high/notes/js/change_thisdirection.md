---
title: call、apply 和 bind 区别
date: 2021-04-22
tags:
 - JavaScript
 - 面试
categories:
 - front
---

我们还是先介绍一下今天这三位 API。

## call

`call()` 方法使用一个指定的 `this` 值和单独给出的一个或者多个参数来调用一个函数。这里需要注意的是，`call()` 方法接受的是一个**参数列表**。

来看个例子：

```js
function Product(name, price) {
  this.name = name;
  this.price = price;
}

function Food(name, price) {
  Product.call(this, name, price);
  this.category = 'food';
}

console.log(new Food('cheese', 5).name);
// expected output: "cheese"

```

从语法上来讲，就是酱紫：

```js
function.call(thisArg, arg1, arg2, ...)
```

## apply

`apply()` 方法调用一个具有给定 `this` 值的函数，以及以一个数组（或类数组对象）的形式提供的参数。

例如：

```js
const numbers = [5, 6, 2, 3, 7];

const max = Math.max.apply(null, numbers);

console.log(max);
// expected output: 7

const min = Math.min.apply(null, numbers);

console.log(min);
// expected output: 2

```

语法上和 call 类似：

```js
func.apply(thisArg, [argsArray])
```

## bind

`bind()` 方法会创建一个新的函数，在 `bind()` 被调用时，这个新函数的 `this` 被指定为 `bind()` 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。

```js
const module = {
  x: 42,
  getX: function() {
    return this.x;
  }
};

const unboundGetX = module.getX;
console.log(unboundGetX()); // The function gets invoked at the global scope
// expected output: undefined

const boundGetX = unboundGetX.bind(module);
console.log(boundGetX());
// expected output: 42

```

`bind()` 函数会创建一个新的**绑定函数**（bound function, BF）。绑定函数是一个 `exotic function object` 怪异函数对象，它包装了原函数对象。调用**绑定函数**通常会导致执行**包装函数**。

## 相同点

这三个的作用都是一样的，都是改变 `this` 的指向。

## 不同点

**参数类型方面**

1. apply 的第二个参数开始是数组或者类数组对象；
2. call 的第二个参数是单独给出的一个或者多个参数，也就是说它是一个参数列表；
3. bind 的第二个参数是没有指定的，这些参数将作为新函数的参数，供调用时使用；

**执行调用方面**

1. bind 调用后返回的是一个原函数的拷贝，被预置入绑定函数的参数列表中的参数，并不会立即执行；
2. call 和 apply 调用有指定 `this` 值和参数的函数结果；