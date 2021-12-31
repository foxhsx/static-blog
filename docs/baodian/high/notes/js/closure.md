---
title: 浅谈闭包
date: 2021-03-31
tags:
 - JavaScript
 - 面试
categories:
 - front
---

首先我们来看看今天要解决的问题：
1. 什么是闭包？
2. 闭包解决了什么问题？
3. 闭包带来的副作用是什么？
4. 闭包的应用场景都有哪些？

## 什么是闭包？

> MDN 上给出的闭包定义是：一个函数和其周围状态的引用捆绑在一起（或者说函数被引用包围），这样的组合就是**闭包**。也就是说，**闭包让你可以在一个内层函数中访问到其外层函数的作用域**。在 JavaScript 中，每当创建一个函数，闭包就会在函数创建的同时被创建出来。

来看个例子：

```js
function parent() {
  var name = 'closure';     // name 是在 parent 函数里创建的处于函数作用域内的一个局部变量
  function closure() {      // closure 是一个内部函数，它就是闭包
    alert(name);            // 使用了 父函数 parent 里创建的变量 name
  };

  closure();
}

parent();
```

可以看到 parent 函数中有一个局部变量 name 和 closure 的函数。closure 仅能在 parent 函数体内使用，没有自己的局部变量，但是它可以访问外部函数的变量。

这里类似面向对象编程。在面向对象编程中，对象允许我们将某些数据（对象的属性）与一个或多个方法相关联。而闭包则是将函数与其所操作的某些数据或者说是词法环境（作用域）关联起来。词法作用域根据源代码中变量声明的位置来确定该变量在何处可用。嵌套函数可访问声明于它们外部作用域的变量。

所以简单点讲，闭包可以理解为能够访问另一个函数作用域变量的函数，本质上来讲，闭包就是函数，只不过声明在其他函数内部而已。

闭包 = 函数 + 词法环境。

## 闭包解决了什么问题？

在 JavaScript 中，没有私有变量这一定义。所以在实际场景中，我们会经常遇到一些变量污染的问题，而这里我们正好可以利用闭包来模拟私有变量，这样的话不仅仅可以避免变量污染导致的错误，还有利于限制对代码的访问，提供了管理全局命名空间的强大能力，避免非核心的方法弄乱了代码的公共接口部分。

```js
function self() {
  const name = 'cecil';
  return function () {
    return name;
  }
}

console.log(name); // ''
console.log(self()()); // 'cecil'
```

可以看到直接访问 name 变量是访问不到的，因为此时我们并没有定义，得到一个空字符串。只有调用闭包函数，才能读取到 name 变量。

当然闭包不仅仅只是做模拟私有变量这一点，在高阶函数中我们会常常看到闭包的身影：

```js
function makeAdder(x) {
  return function (y) {
    return x + y;
  }
}

var add5 = makeAdder(5);
var add10 = makeAdder(10);

console.log(add5(2));  // 7
console.log(add10(2)); // 12
```

上述代码是一个简单的工厂函数，在这里 add5 和 add10 都是闭包。共享相同的函数定义，但是保存了不同的词法环境，从而计算得到不同的值。（可以理解为，闭包可以创建一个独立的环境，每个闭包里面的环境都是独立的，互不干扰）

使用闭包给我们提供了许多与面向对象编程相关的好处，特别是数据隐藏和封装。

## 闭包的副作用

闭包的副作用也是显而易见的，那就是内存泄漏。每次外部函数执行的时候，外部函数的引用地址不同，**都会重新创建一个新的地址**。但凡是当前活动对象中有被内部子集引用的数据，那么这个时候，这个数据不删除，保留一根指针给内部活动对象。

闭包内存泄漏为： key = value，key 被删除了 value 常驻内存中; 局部变量闭包升级版（中间引用的变量）最终成为了自由变量。

所以说如果不是特定的需求需要用到闭包，平时是不推荐使用闭包的，毕竟它在处理速度和内存消耗方面对脚本性能会有负面影响，如果使用不到，就会有内存泄漏的风险。

例如，我们在创建新的对象和类时，方法通常应该关联到对象的原型，而不是定义到对象的构造器中，因为这样在每次调用构造器时，方法都会被重新赋值一次。

```js
function MyObject(name, message) {
  this.name = name.toString();
  this.message = message.toString();
  this.getName = function() {
    return this.name;
  };

  this.getMessage = function() {
    return this.message;
  };
}

const obj1 = new MyObject();
const obj2 = new MyObject();
const obj3 = new MyObject();
```

如上代码，如果 new 三次 MyObject 构造函数，里面的方法就会被重新赋值三次，这很不友好，因为方法是抽象的，并不需要每次都复制，我们可以这样修改：

```js
function MyObject(name, message) {
  this.name = name.toString();
  this.message = message.toString();
}

MyObject.prototype.getName = function() {
  return this.name;
};

MyObject.prototype.getMessage = function() {
  return this.message;
};
```

这样就避免了每次调用都重复赋值的尴尬。

## 应用场景

实际项目中，闭包的应用场景有很多，下面是经常会遇到的一些场景：
1. 定时器传参
2. 回调函数
3. IIFE
4. 函数防抖节流
5. 柯里化
6. 模块化

## 小结

1. 闭包是说函数与其周围的引用捆绑在一起的组合。也就是说一个内层函数可以访问其外层函数的作用域（比如定义的变量和参数）；
2. 模拟私有变量，避免使用全局变量，防止全局变量污染；
3. 局部变量会常驻内存中，在内存中维护这个变量；
4. 会造成内存泄露（内存被长期占用，而不被释放）；
5. 闭包找到的是同一地址中父级函数里对应变量的最终值；
6. 高阶函数中使用（除了接收函数为参数外，还能把函数作为结果返回），每次调用都会返回一个新的函数；
7. 闭包函数可以理解为携带状态的函数；
8. this 指向的是 window；
