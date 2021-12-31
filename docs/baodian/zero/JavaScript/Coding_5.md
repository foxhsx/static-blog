---
title: 编程题汇总（五）
date: 2021-03-14
tags:
 - JavaScript
 - 面试
categories:
 - front
---

## 1、输出下面代码结果

```js
class Chameleon {
    static colorChange(newColor) {
        this.newColor = newColor;
    }
    
    constructor({ newColor = 'green' } = {}) {
        this.newColor = newColor;
    }
}

const freddie = new Chameleon({ newColor: 'purple' });
freddie.colorChange('orange');
```

::: tip 参考答案

TypeError



colorChange 方法是静态的。静态方法仅在创建它们的构造函数中存在，并不能传递给任何子级。由于 freddie 是一个子级对象，函数不会传递，所以在 freddie 实例上不会存在 colorChange 方法：抛出 TypeError。

:::

## 2、输出下面代码结果

```js
const info = {
    [Symbol('a')]: 'b'
}

console.log(info)
console.log(Object.keys(info))
```

::: tip 参考答案

{ Symbol('a'): 'b' }  []



Symbol 类型是不可枚举的。Object.keys 方法返回对象上的所有可枚举的键属性。Symbol 类型是不可见的，并返回一个空数组。

:::

## 3、输出下面代码结果

```js
const set = new Set([1,1,2,3,4]);
console.log(set)
```

::: tip 参考答案

{1,2,3,4}



我们经常用 Set 方法去重，其返回值是一个去重之后的对象。

:::

## 4、输出下面代码结果

```js
class Bird {
    constructor() {
        console.log("I`m a bird.🐦")
    }
}

class Flamingo extends Bird {
    constructor() {
        console.log("I`m pink.🌸")
        super();
    }
}

const pet  = new Flamingo()
```

::: tip 参考答案

I\`m pink.🌸    I\`m a bird.🐦

我们创建了类 Flamingo 的实例 pet。而 Flamingo 类继承父类 Bird，当我们实例化 Flamingo 类的时候，先调用 Flamingo 类中的构造函数 contructor，打印 I\`m pink.🌸。然后再调用 super，而 super 又调用父类的构造函数，所以输出 I\`m a bird.🐦

:::

## 5、输出下面代码结果

```js
for (let i = 1; i < 5; i++) {
    if (i === 3) continue;
    console.log(i)
}
```

::: tip 参考答案

1 2 4

如果某个条件返回 true，则 continue 语句跳过迭代。

:::

## 6、输出下面代码结果

```js
function nums(a, b) {
    if
    (a > b)
    console.log('a is bigger')
    else
    console.log('b is bigger')
    return
    a + b
}
```

::: tip 参考答案

a is bigger, undefined     b is bigger, undefined

在JavaScript中，我们不必显示地编写分号，但是JavaScript引擎仍然在语句之后自动添加分号；这称为**自动分号插入**。例如一个语句可以是变量，或者是像 throw、return、break 这样的关键字。

因为我们在 return 后面又起了一行，故而当代码执行到 return 时，其实已经不再往下执行了。返回了一个 undefined（寂寞）。**注意：在 if/else 语句之后没有自动插入**!

:::

## 7、输出下面代码结果

```js
const myPromise = Promise.resolve('Woah some coll data')

(async () => {
    try {
        console.log(await myPromise)
    } catch {
        throw new Error('Oops didn`t work');
    } finally {
        console.log('Oh finally!')
    }
})()
```

::: tip 参考答案

Woah some coll data Oh finally!

在 try 地区，我们打印 myPromise 变量的 await 值：Woah some cool data。因为 try 地区没有错误抛出，所以 catch 部分并不会执行。而 finally 部分的代码**总是执行**，故而 Oh finally 被输出。

:::

## 8、输出下面代码结果

```js
const myPromise = () => Promise.resolve('I have resolved!')

function firstFunction() {
    myPromise().then(res => console.log(res))
    console.log('second')
}

async function secondFunction() {
    console.log(await myPromise())
    console.log('second')
}

firstFunction()
secondFunction()
```

::: tip 参考答案

second, I have resolved! and I have resolved!, second

在 promise 中，通过 .then 和 async/await 两种方式都能获取到值，但是它们的工作方式是不同的。

在 promise 里面，如果想要调用某个方法，但是由于它可能需要一段时间，因此暂时将它放在一边。只有当某个值被 resolved/rejected 的时候，并且执行栈为空时才可以使用这个值。

第一个函数中，运行到 myPromise 时，promise 进入到微任务队列，其他后面的代码还是照常运行，因此先打印了 second，而后第一个函数方法到此执行完毕，执行栈中宏任务队列被清空，此时开始执行微任务队列中的任务，I have resolved 被打印。

而第二个函数中，我们使用了 async/awiat 关键字，在执行到 awiat 时会暂停后面代码的执行，直到异步函数的值被解析才开始后面代码的执行，故而这里会先打印 I have a resolved，再打印 second。

:::

## 9、输出下面代码结果

```js
const obj = { 1: 'a', 2: 'b', 3: 'c' };
const set = new Set([1,2,3,4,5]);

obj.hasOwnProperty('1');
obj.hasOwnProperty(1);
set.has('1');
set.has(1);
```

::: tip 参考答案 
true true false true

所有对象键（不包括 Symbols）都会被存储为字符串，即使你没有给定字符串类型的键。这就是为什么 obj.hasOwnProperty('1') 也返回 true。但是需要注意的是，Set 对象并不适合，在 Set 中不会自动将键存储为字符串，所以 has('1') 返回 false。
:::

## 10、输出下面代码结果

```js
const name = 'Lydia';
age = 21;

console.log(delete name);
console.log(delete age);
```

::: tip 参考答案
false true

delete 操作符返回一个布尔值；true 表示删除成功，false 表示删除失败。需要注意的是**通过 var, let, const关键字声明的变量是无法使用 delete 操作符来删除的**。age 对象其实是挂载在全局对象 window 上的，所以这里使用 delete 是可以删除成功的。
:::