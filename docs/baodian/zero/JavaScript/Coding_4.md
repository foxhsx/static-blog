---
title: 编程题汇总（四）
date: 2021-03-11
tags:
 - JavaScript
 - 面试
categories:
 - front
---
## 1、输出下面代码结果

```js
function checkAge(data) {
    if (data === { age: 18 }) {
        console.log('You are an adult!')
    } else if (data == { age: 18 }) {
        console.log('You are still an adult.')
    } else {
        console.log('Hmm.. You don`t have an age I guess')
    }
}

checkAge({ age: 18 })
```

::: tip 参考答案

Hmm.. You don`t have an age I guess



在比较相等性上，原始类型通过它们的**值**进行比较，而对象通过它们的**引用**进行比较。JavaScript 检查**对象是否具有对内存中相同位置的引用**。

我们作为参数传递的对象和我们用于检查相等性的对象在内存中位于不同位置，所以它们的引用是不同的。

:::

## 2、输出下面代码结果

```js
const value = { number: 10 }

const multiply = (x = {...value}) => {
    console.log(x.number *= 2)
}

multiply();
multiply();
multiply(value);
multiply(value);
```

::: tip 参考答案

20 20 20 40



首先我们将 value 解构并传到一个新对象中，此时 x 的默认值为 `{ number: 10 }`。默认参数在调用时才会进行计算，每次调用函数时，都会创建一个**新的对象**。我们前两次调用 multiply 函数且不传参，那么每一次 x 的默认值都是 `{ number: 10 }`，因此前两个打印出来该数字的乘积都是 20.

后面两次传参时，都传递了一个参数——value。现在实际上是将 value.number * 2，此时直接修改了 value.number 的值，并打印出计算得到的 20。紧接着再次计算得到 40。

:::

## 3、输出下面代码结果

```js
class Dog {
    constructor(name) {
        this.name = name;
    }
}

Dog.prototype.bark = functon() {
    console.log(`Woof I am ${this.name}`)
}

const pet = new Dog('Mara')

pet.bark()

delete Dog.prototype.bark;

pet bark();
```

::: tip 参考答案

Woof I am Mara  TypeError



我们在删除掉对象的属性后，再次访问这个对象属性，就会抛出 TypeError 异常。

:::

## 4、输出下面代码结果

```js
function compareMembers(person1, person2 = person) {
    if (person1 !== person2) {
        console.log('Not the same!')
    } else {
        console.log('They are the same!')
    }
}

const person = { name: 'Lydia' }

compareMembers(person)
```

::: tip 参考答案

They are the same!



还是检查的对象之间的相等性问题，我们说过检查对象的相等性是比较它们的引用。

我们将 person2 的默认值设置为 person 对象，并将 person 对象作为形参 person1 的值传递。这就意味着其实 person1 和 person2 都引用内存中的同一个位置，因此它们是相等的。

:::

## 5、JavaScript 中所有内容都是？

::: tip 参考答案

基本数据类型和引用数据类型，也可以说是基本类型和对象。

:::

## 6、输出下面代码结果

```js
function greeting () {
    throw 'Hello world!';
}

function sayHi() {
    try {
        const data = greeting()
        console.log('It worked!', data)
    } catch(e) {
        console.log('Oh no an error:', e)
    }
}
```

::: tip 参考答案

Oh no an error: Hello world!



通过 throw 语句，我们可以创建自定义错误。而通过它，我们可以抛出异常。异常可以是一个字符串，一个数字，一个布尔类型或者是一个对象。在本例中，我们的异常是一个字符串，它会被 catch 捕获到，并打印出来。

:::

## 7、输出下面代码结果

```js
fetch('https://www.website.com/api/user/1')
  .then(res => res.json())
  .then(res => console.log(res))
```

::: tip 参考答案

前一个 .then() 中回调方法返回的结果



第二个 .then 中 res 的值等于前一个 .then 中的回调函数返回的值。你可以像这样继续链式调用 .then，将值传递给下一个处理程序。

:::

## 8、输出下面代码结果

```js
function sum(a, b) {
    return a + b;
}

sum(1, '2')
```

::: tip 参考答案

12



JavaScript 是一种动态类型的语言：我们没有指定某些变量的类型。在你不知道的情况下，值可以自动转换为另一种类型，称为隐式类型转换。强制从一种类型转换为另一种类型。

在本例中，1在与字符串2相加时，被强制转换成了字符串1，所以最后的结果为字符串12。

:::

## 9、输出下面代码结果

```js
const shape = {
    radius: 10,
    diameter() {
        return this.radius * 2;
    },
    perimeter: () => 2 * Math.PI * this.radius
}

shape.diameter();
shape.perimeter();
```

::: tip 参考答案

20 NaN



这里就考察的是箭头函数和普通函数里面 this 的指向问题，diameter 是普通函数，this 指向对象 shape，所以调用 diameter 函数时得到 20；而 perimeter 是箭头函数，此时的 this 指向是它在定义时的所在上下文中，也就是全局对象 window 中，没有 radius 属性，返回 undefined，计算得出的值为 NaN。

:::

## 10、输出下面代码结果

```js
const { name: myName } = { name: 'Lydia' }
console.log(name);
```

::: tip 参考答案

ReferenceError



我们这里实际上是将右侧对象中 name 的值解构出来，将其值 Lydia 分配给名为 myName 的变量。而后面我们又打印的是 name，这个是属性名，而不是变量，当打印一个未定义的变量时，就会引发 ReferenceError 错误。

:::