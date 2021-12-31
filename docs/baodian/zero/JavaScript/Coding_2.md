---
title: 编程题汇总（二）
date: 2021-02-25
tags:
 - JavaScript
 - 面试
categories:
 - front
---

## 1、请输出代码结果

```js
Promise.resolve(5)
```

::: tip 参考答案

我们可以将我们想要的任何类型的值传递给 Promise.resolve，该方法本身返回带有已解析值的 Promise。如果传递常规函数，它将是具有常规值的已解决 promise。

上述情况，我们传了一个数字5，因此返回了一个 resolved 状态的promise，resolve 的值为5.

:::



## 2、下面代码输出什么？

```js
const shape = {
	radius: 10,
	diamaeter() {
		return this.radius * 2;
	},
	perimeter: () => 2 * Math.PI * this.radius
}
```

::: tip 参考答案

20  NaN

这里考察的是普通函数和箭头函数内部 this 的指向问题，那对于箭头函数，this 关键字指向是它所在上下文（**定义时**的位置）的环境，与普通函数不同！这意味着我们调用 perimeter 函数时，它指向的不是 shape 对象，而是其定义时的 window 对象。此时它是没有 radius 属性的，返回的是 undefined。

:::

## 3、输出下面代码运行结果

```js
async function* range(start, end) {
	for(let i = start; i <= end; i++) {
		yield Promise.resolve(i);
	}
}

(async () => {
	const gen = range(1,3);
	for await (const item of gen) {
		console.log(item)
	}
})();
```

::: tip 参考答案

1 2 3

我们给函数 range 传递：Promise{1}, Promise{2}, Promise{3}，Generator 函数 range 返回一个全是 async object promise 数组。我们将 async object 赋值给变量 gen，之后我们使用 for wait ... of 进行循环遍历。我们将返回的 Promise 实例赋值给 item：第一个返回 Promise{1}，第二个返回 Promise{2}，之后是 Promise{3}。因为我们正 awaitting item 的值，resolved 状态的 promise，promise 数组的 resolved 值依次为：1,2,3

:::

## 4、输出下面代码运行结果
```js
class Counter {
	constructor() {
		this.count = 0;
	}

	increment() {
		this.count++;
	}
}

const counterOne = new Counter();
counterOne.increment();
counterOne.increment();

const counterTwo = counterOne;
counterTwo.increment();

console.log(counterOne.count);
```

::: tip 参考答案
3

counterOne 是类 Counter 的一个实例。类 Counter 包含一个 count 属性在它的构造函数里，还有一个 increment 方法。首先我们通过 counterOne.increment() 调用两次，现在 counterOne.count 的值为2。然后我们在创建一个新的变量 counterTwo，将 counterOne 的地址赋值给它。现在 counterOne 和 counterTwo 都指向同一个内存地址，我们可以理解为这两个变量共用一个数据，所以当 counterTwo.increment() 调用之后，count 的值会变成3，而此时 counterOne 中的 count 也为3。
:::

## 5、请输出下面代码运行结果
```js
console.log('❤️' === '❤️');
```

::: tip 参考答案
true

在内部，表情符号是 unicode。heat 表情符号的 unicode 是 "U + 2764 U + FE0F"。对于相同的表情符号，它们总是相同的，因此我们将两个相等的字符串相互比较，返回的是 true。
:::

## 7、请输出下面代码运行结果
```js
const one = (false || {} || null)
const two = (null || false || '')
const three = ([] || 0 || true)

console.log(one, two, three)
```

::: tip 参考答案
{} "" []
:::

## 8、请输出下面代码运行结果
```js
function getAge() {
	'use strict';
	age = 21;
	console.log(age);
}

getAge()
```

::: tip 参考答案
ReferenceError

在严格模式下，如果不实现声明变量，会抛出 ReferenceError 的错误。
:::

## 9、请输出下面代码运行结果
```js
let count = 0;
console.log(count++);
console.log(++count);
console.log(count);
```

::: tip 参考答案
0 2 2

**后缀**一元操作符++：返回的是当前没有计算的值，故而第一个打印是 0；**前缀**一元操作符++：返回的是计算过后的值，故而第二个打印的是++1=2；
:::

## 10、请输出下面代码运行结果
```js
for (var i = 0; i < 3; i++) {
	setTimeout(() => console.log(i), 1)
}

for (let i = 0; i < 3; i++) {
	setTimeout(() => console.log(i), 1)
}
```

::: tip 参考答案
3 3 3 AND 0 1 2

由于 JavaScript 中的事件执行机制，setTimeout 函数真正被执行的时候，循环已经走完了。第一个循环中 i 是用 var 来声明的，它会被提升至全局上下文顶端，是一个全局变量。当执行 setTimeout 时，此时的 i 已经 ++ 了三次，故而这里会打印三次 3。而第二个循环中使用 let 声明 i，用 let 声明的变量是具有块级作用域的，所以每次迭代都会创建一个新值，并且每个值都会存在于循环内的块级作用域。所以这里就打印出了 0 1 2。
:::