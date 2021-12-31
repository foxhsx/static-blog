---
title: 编程题汇总（七）
date: 2021-03-15
tags:
 - JavaScript
 - 面试
categories:
 - front
---
## 1、输出下面代码结果

```js
let a = 3;
let b = new Number(3);
let c = 3;

console.log(a == b);
console.log(b === c);
console.log(a === b);
```

::: tip 参考答案
true false false

new Number() 是一个内置的构造函数。虽然它看起来像一个数字，但是它并不是一个真正的数字：它是一个对象，有额外的功能。所以使用 ==，只检查了它是否具有相同的值。而 === 时，还需要检测是否是同一类型。
:::

## 2、输出下面代码结果

```js
const person = {
  name: 'Lydia',
  age: 21
};

for (const item in person) {
  console.log(item);
}
```

::: tip 参考答案
name age

在 for-in 循环中，我们可以通过对象的 key 来进行迭代，也就是这里的 name 和 age。在底层，对象的 Key 都是字符串（Symbol 除外）。在每次循环中，我们将 item 设定为当前遍历到的 key，所以这里会输出 name 和 age。
:::

## 3、输出下面代码结果

```js
const a = {};
const b = { key: 'b' };
const c = { key: 'c' };

a[b] = 123;
a[c] = 456;

console.log(a[b]);
```

::: tip 参考答案
456

对象键自动转换为字符串。我们试图将一个对象设置为对象 a 的键，其值为 123.

但是，当对象自动转换为字符串时，它变成了 `[Object object]`。所以在这里有 `a[Object object] = 123`。后面又做了一样的事情，`a[Object object]`被重新赋值为 456.
:::

## 4、输出下面代码结果

```js
function getPersonInfo(one, two, three) {
  console.log(one);
  console.log(two);
  console.log(three);
}

const person = 'Lydia';
const age = 21;

getPersonInfo`${person} is ${age} years old`;
```

::: tip 参考答案
["","is","years old"] Lydia 21

如果使用标记的模板字符串，则第一个参数的值始终是字符串值的数组。其余参数获取传递到模板字符串中的表达式的值。
:::

## 5、如何打印出 console.log 语句后面注释掉的值？

```js
function* startGame() {
  const answer = yield 'Do you love JavaScript?';
  if (answer !== 'Yes') {
    return `Oh wow... Guess we're gone here`;
  }
  return 'JavaScript loves you back 💗';
}

const game = startGame();
console.log();  // Do you love JavaScript?
console.log();  // JavaScript loves you back 💗
```

::: tip 参考答案
game.next().value,  game.next('Yes').value


generator 函数在遇到 yield 关键字时会暂停其执行。首先，我们需要让函数产生字符串 `Do you love JavaScript?`，这可以通过调用 `game.next().value` 来完成。

上述函数的第一行就有一个 yield 关键字，那么运行立即停止了，yield 表达式本身没有返回值，或者说总是返回 undefined，这意味着此时变量 answer 的值为 undefined。

next 方法可以带一个参数，该参数会被当作上一个 yield 表达式的返回值。当我们调用 `game.next('Yes').value`时，先前的 yield 的返回值将被替换为传递给 next() 函数的参数 Yes。此时 `JavaScript loves you back 💗`被打印。
:::

## 6、输出下面代码结果

```js
class Person {
  constructor(name) {
    this.name = name;
  }
}

const member = new Person('John');
console.log(typeof member)
```

::: tip 参考答案
object

类是构造函数的语法糖，如果用构造函数的方式来重写 Person 类则将是：

```js
function Person() {
  this.name = name
}
```
通过 new 来调用构造函数，将会生成构造函数 Person 的实例，对实例执行 typeof 关键字将返回 object。
:::

## 7、输出下面代码结果

```js
var status = '🤠';

setTimeout(() => {
  const status = '😎'

  const data = {
    status: '🥳',
    getStatus() {
      return this.status
    }
  }

  console.log(data.getStatus())
  console.log(data.getStatus.call(this))
}, 0)
```


::: tip 参考答案
🥳 and 🤠

this 关键字的指向取决于使用它的位置。在函数 getStatus 中，this 的指向是调用它的对象。所以第一个输出时，this 指向 data。而第二个输出改变了 this 的指向，将 this 指向了全局对象，此时的全局对象上有一个 status 属性，所以打印出来是 🤠.
:::

## 8、输出下面代码结果

```js
const firstPromise = new Promise((res, rej) => {
  setTimeout(res, 500, 'one')
})

const secondPromise = new Promise((res, rej) => {
  setTimeout(res, 100, 'two')
})

Promise.race([firstPromise, secondPromise]).then(res => console.log(res));
```

::: tip 参考答案
two

当我们向 Promise.race 方法中传入多个 Promise 时，会进行优先解析。在本例中，我们用 setTimeout 给 firstPromise 和 secondPromise 分别设置了 500 和 100ms 的定时器，所以 secondPromise 会优先被解析出字符串 two。

Promise.race(iterable) 方法返回一个 promise，一旦迭代器中的某个promise解决或拒绝，返回的 promise就会解决或拒绝。
:::

## 9、输出下面代码结果

```js
const add = x => y => z => {
  console.log(x, y, z);
  return x + y + z;
}

add(4)(5)(6);
```

::: tip 参考答案
4 5 6

我们可以这样理解这个函数：

```js
const add = (x) => {
  return (y) => {
    return (z) => {
      console.log(x, y, z);
      return x + y + z;
    }
  }
}
```

那第一个函数接收一个值为 4 的参数后，调用第二个函数，接收一个值为 5 的参数 y。然后再去调用第三个函数，接收到一个值为 6 的参数 z。当我们尝试在最后一个箭头函数中获取 x, y 和 z 的值，JS 引擎根据作用域链去找 x 和 y 的值。得到 4 5 6.
:::

## 10、输出下面代码结果

```js
const config = {
  languages: [],
  set language(lang) {
    return this.languages.push(lang)
  }
}

console.log(config.language)
```

::: tip 参考答案
undefined

方法 language 是一个 setter。Setter 并不保存一个实际值，它们的使命在于修改属性。当调用方法 setter 时，返回的是 undefined。
:::