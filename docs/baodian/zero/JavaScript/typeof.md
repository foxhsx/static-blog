---
title: typeof null 等于什么？为什么？用什么方法可以拿到比较准确的类型判断？
date: 2021-04-08
tags:
 - JavaScript
 - 面试
categories:
 - front
---

## 来看看今天的链式问题：
1. typeof null 等于什么？
2. 为什么？
3. 用什么方法可以拿到比较准确的类型判断？
4. 自己实现一个 typeof 方法怎么实现？
5. instanceof 与 typeof 的区别？

今天我们来带着问题一个个解决。

### typeof null 等于什么？

这个问题我们可以在控制台打印一下即可得到：

```js
typeof null; // 'object'
```

可以看到，得到了一个值为 `object` 的字符串。

### 为什么会得到 object 的字符串？

在 JavaScript 最初的实现中，JavaScript 的值是由一个表示类型的标签和实际数据值表示的。对象的类型标签是0.由于 null 代表的是空指针（大多数平台下值为 0x00），因此，null 的类型标签是0，`typeof null` 也因此返回 `'object'`。

### 用什么方法可以拿到比较准确的类型判断？

有人问，可不可以用 instanceof 来判断呢？

答案是不行的。

首先我们得知道 instanceof 是干嘛的？——它是用来检测构造函数的 `prototype` 属性是否出现在某个实例对象的原型链上。

```js
function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
}
const auto = new Car('Honda', 'Accord', 1998);

console.log(auto instanceof Car);
// expected output: true

console.log(auto instanceof Object);
// expected output: true

```

那么从语法上来讲，我们只能说判断 null 在哪个实例对象的原型链上（这句话比较扯淡，因为没有这种场景）。所以使用 instanceof 是解决不了我们的问题的。

我们可以使用 Object 里的 toString 方法来得到一个比较准确的类型判断，具体代码实现如下：

```js
function toRawType(value) {
  return Object.prototype.toString.call(value).slice(8, -1)
}

toRawType(null) // 'Null'
toRawType(1)    // 'Number'
toRawType('1')  // 'String'
toRawType({})   // 'Object'
toRawType([])   // 'Array'
toRawType(true) // 'Boolean'
```

每个实例都有一个 `[[Class]]` 属性，这个属性中就指定了上述字符串中的 type（构造函数中）。`[[Class]]` 不能直接被访问，但是通常可以间接通过在这个值上借用默认的 `Object.prototype.toString.call(...)` 方法调用来展示。

## 自己实现 typeof 如何实现？

其实这个问题的解决方法已经在上个问题中实现了。我们可以在上一个的基础上将值都转为小写即可。

```js
function typeOf(value) {
  return Object.prototype.toString.call(value).slice(8, -1).toLocaleLowerCase()
}
```

## instanceof 与 typeof 的区别是什么？

其实实际上来说 instanceof 更倾向于判断引用数据类型，就跟它的定义一样：用来检测构造函数的 `prototype` 属性是否出现在某个实例对象的原型链上。也可以理解为当前对象是不是某个类的实例。`instanceof` 操作符在检测过程中也会将继承关系考虑在内，所以 `instanceof` 可以在继承关系中用来判断一个实例是否属于它的父类型。

而 typeof 则是直接返回一个字符串，表示当前值的数据类型，对于引用数据来说，不会判断是否是某个类或者数组，它只会返回 object。