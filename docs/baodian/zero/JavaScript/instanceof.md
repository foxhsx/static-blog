---
title: instanceof 的实现
date: 2021-04-12
tags:
 - JavaScript
 - 面试
categories:
 - front
---

## 来看看今天的链式问题：
1. 作用是啥？
2. 原理是啥？
3. 怎么实现？
4. 源码实现

## instanceof 解决什么问题

我们在使用 instanceof 的时候，需要知道，它是用来判断某实例是否是特定的类型。什么意思呢？
1. 首先，我们在使用 `typeof` 的时候，只能判断基础数据类型，当判断引用数据类型的时候呢，无论什么类型的变量，都会返回 `Object`。
2. 所以这里引入了 `instanceof` 来判断引用数据类型。
3. `instanceof` 运算符可以用于检测构造函数的 `prototype` 属性是否出现在某个实例对象的原型链上。

来看看语法：

```js
// object 某个实例对象
// constructor 某个构造函数
object instanceof constructor
```

那我们就可以理解为：instanceof 运算符用来检测 `constructor.prototype` 是否存在于参数 `obejct` 的原型链上。

```js
// 定义构造函数
function C(){}
function D(){}

var o = new C();

o instanceof C; // true
o instanceof D; // false
o instanceof Object; // true
```

## 实现原理是什么？

instanceof 的内部实现机制是：通过判断**参数对象**的原型链上是否能找到**构造函数**的 `prototype`，来确定 `instanceof` 的返回值。

我们可以使用 `Object.getPrototypeOf(obj)` 来判断是否等于构造函数的 `prototype`；也可以使用 `Object.prototype.isPrototypeOf(obj)` 返回值来判断，比如上述例子：

```js
o instanceof C; // true  
// Object.getPrototypeOf(o) === C.prototype

o instanceof Object; // true
// Object.prototype.isPrototypeOf(o) 返回 true
```

当然我们也可以使用其他方法来实现：

```js
function instance_of(obj, cons) {
  var consPrototype = cons.prototype;

  var objProrotype = obj.__proto__;

  while(true) {
    if (objProrotype === null) {
      return false;
    }

    if (consPrototype === objProrotype) {
      return true
    }

    // 原型链向上查找
    objProrotype = objProrotype.__proto__;
  }
}
```

## 怎么实现？

那根据上述所讲，我们自己去实现一个 `instanceof` 方法，有三种方式：
1. `Object.getPrototypeOf(obj)`——返回指定对象的原型（内部 `[[Prototype]]` 属性的值）
2. `Object.prototype.isPrototypeOf(obj)`——测试一个对象是否存在于另一个对象的原型上
3. `obj.__proto__`——使用非标准的 `__proto__` 的伪属性

## 源码实现
1. 使用 `Object.getPrototypeOf(obj)`
   ```js
   function instance_of(o, c) {
     let op = Object.getPrototypeOf(o);
     const cp = c.prototype;

    while(true) {
      if (!op) {
        return false
      } 

      if (op === cp) {
        return true
      }

      op = Object.getPrototypeOf(op);
    }
   }
   ```
2. `Object.prototype.isPrototypeOf(obj)`
   ```js
   function instance_of(o, c) {
     return c.prototype.isPrototypeOf(o);
   }
   ```
3. `obj.__proto__`
   ```js
   function instance_of(o, c) {
     let op = o.__proto__;
     const cp = c.prototype;

     while(true) {
       if (op === null) {
         return false
       }

       if (op === cp) {
         return true
       }

       op = op.__proto__;
     }
   }
   ```