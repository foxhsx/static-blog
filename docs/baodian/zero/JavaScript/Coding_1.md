---
title: 编程题汇总（一）
date: 2021-02-22
tags:
 - JavaScript
 - 面试
categories:
 - front
---
## 1、输出下面代码结果
```js
function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

const lydia = new Person('Lydia', 'Hallie');
const sarah = Person('Sarah', 'Smith');

console.log(lydia);
console.log(sarah);
```

::: tip 参考答案
`Person { firstName: 'Lydia', lastName: 'lastName' } and undefined`

lydia 是使用 new 关键字创建的，它指向创建时的新的空对象，所以此时对于 lydia 来说，打印出来的值就是这个对象的值。

而对于 sarah 来说，直接调用了 Person 函数，所以此时函数体内的 this 指向全局对象 window。也就是说 this.firstName 和 this.lastName 其实就是 window.firstName 和 window.lastName，而 sarah 本身的返回值是 undefined。
:::

## 2、输出下面代码结果
```js
// counter.js
let counter = 10;
export default counter;

// index.js
import myCounter from './counter';
myCounter += 1;
console.log(myCounter);
```

::: tip 参考答案
Error

**引入的模块是*只读的*：你不能修改引入的模块**。只有导出他们的模块才能修改其中的值。当我们给 myCounter 增加一个值的时候，会抛出一个异常：myCounter 是只读的，不能被修改、
:::

## 3、输出下面代码结果
```js
let num = 10;
const increaseNumber = () => num++;
const increasePassedNumber = (number) => number++;

const num1 = increaseNumber();
const num2 = increasePassedNumber(num1);

console.log(num1);
console.log(num2);
```

::: tip 参考答案
10 10

一元操作符 `++` 先返回操作值，再返回累加的操作值。num1 调用 increaseNumber 方法，而 increaseNumber 方法返回的是 num 的值，也就是10，然后再进行累加。所以 increaseNumber 的值其实还是10，那么同理 increasePassedNumber 的值也就是10。
:::

## 4、输出下面代码结果
```js
const myFunc = ({ x, y, z }) => {
  console.log(x, y, z);
}

myFunc(1,2,3);
```
::: tip 参考答案
undefined, undefined, undefined

myFunc 希望接收一个包含 x, y 和 z 属性的对象作为它的参数。因为此时仅仅传入了三个单独的数值 (1,2,3)，而不是一个含有期望参数的对象。所以打印出的结果是 x, y 和 z 的默认值——undefined。
:::

## 5、输出下面代码结果
```js
let num = 1;
const list = [📜, ☕, 😍, 😘];

console.log(list[num += 1]);
```

::: tip 参考答案
😍

通过 += 操作符，我们对值 num 进行加 1 操作。num 有初始值 1，因此 1 + 1 的执行结果为2。数组 list 的第二项为 😍，所以输出结果也是 😍。
:::

## 6、输出下面代码结果
```js
console.log(3 + 4 + '5');
```
::: tip 参考答案
"75"

当所有运算符的*优先级*相同时，计算表达式需要确定运算符的结合顺序，即从右到左还是从左到右。那在上述代码块中，只有一类运算符 +，对于加法来说，运算的顺序就是从左到右了。
那 3 + 4 首先计算得到7，然后加字符串 5，这里JavaScript会将7将其隐式转换为字符串，从而会将 7 和 5 拼接成字符串75。
:::

## 7、输出下面代码结果
```js
const person = { name: 'Lydia' };

Object.defineProperty(person, 'age', { value: 21 })
console.log(person);
console.log(Obejct.keys(person));
```

::: tip 参考答案
{ name: 'Lydia', age: 21 }  ['name']

通过 defineProperty 方法，我们可以给对象添加一个新属性，或者修改已经存在的属性。而我们使用此方法添加属性之后，默认此属性是*不可枚举的*。而 Objetc.keys 方法仅返回对象中*可枚举*的属性。用 defineProperty 添加的属性可以通过 writable, configurable 和 enumerable 属性来改变这一行为。
:::

## 8、请输出下面代码结果
```js
let newList = [1, 2, 3].push(4)

console.log(newList.push(5))
```

::: tip 参考答案
Error

.push 方法返回的数组的长度，而不是数组本身！通过 newList 设置为 [1, 2, 3].push(4)，实际上 newList 等于数组的长度：4。然后，尝试在 newList 上使用  .push 方法，但是现在 newList 其实是数值 4，而不是数组，所以此时会抛出 TypeError。
:::

## 9、请输出下面代码结果
```js
function sum(num1, num2 = num1) {
  console.log(num1 + num2)
}

sum(10)
```

::: tip 参考答案
20

这里我们可以将默认参数的值设置为函数的另一个参数，只要另一个参数定义在其之前即可。如果 sum 函数只接收一个参数 10，那么 num1 为 10，num2 等于 num1，也是10，所以就有 num1 + num2 等于20。
:::

## 10、下面函数是纯函数么？
```js
function sum(a, b) {
  return a + b;
}
```

::: tip 参考答案
纯函数是一种若输入参数相同，则永远会得到相同输出的函数。

sum 函数总是返回相同的结果。如果我们传入1和2，它将总是返回3而且没有副作用。如果是5和10，则会返回15，依次推类，这是纯函数的定义。
:::

