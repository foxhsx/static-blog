---
title: 函数定义的方法都有哪些？
date: 2021-04-16
tags:
 - JavaScript
 - 面试
categories:
 - front
---

链式问题：
- 定义函数有几种方式？
- 各有什么优缺点？
- 各自适应的场景

## 定义函数有几种方式？

首先，我们已知的定义函数的方法有三种，分别是：
- 函数声明
- 函数表达式
- 箭头函数

声明式，就是通过关键字 function 来定义，后面紧跟一个函数名的方式：

```js
function handleFn(num) {
  return num++;
}
```

函数表达式就是使用表达式的方式来定义函数，这样的函数可以是匿名的，也可以是具名的。提供了函数名的函数表达式，可以用于函数内部代指其本身，或者在调试器堆栈跟踪中识别该函数：

```js
const myFunc = function () {}

const nameFunc = function name(n) {
  return n < 2 ? 1 : n * name(n-1)
}
```

最后一个是箭头函数，箭头函数是 ES6 出来的新的 API，比函数表达式更简洁，并且没有自己的 `this`、`arguments`、`super` 或者 `new.target`。箭头函数表达式更适用于那些本来需要匿名函数的地方，并且它不能用作构造函数。

```js
const materials = [
  'Hydrogen',
  'Helium',
  'Lithium',
  'Beryllium'
];

console.log(materials.map(material => material.length));
// expected output: Array [8, 6, 7, 9]

```

## 各自有什么优缺点

**首先我们来说函数声明**。

通过函数声明定义的函数，会通过声明提升，将函数名的变量标识符提升至作用域最上层，这样即使我们在函数声明前调用函数，也是可以正常执行函数的。

```js
foo();  // 1

function foo() {
  console.log(1);
}
```

**其次再说下函数表达式**。

虽然函数声明会提升，但是函数表达式不会。比如我们将上述的代码块改一下：

```js
foo();  // TypeError: foo is not a function

const foo = function () {
  console.log(1);
}
```

哪怕具名的函数表达式也无法被提升。

```js
foo();//TypeError: foo is not a function

var foo = function bar(){
  console.log(1);
};
```

而且不能在外部访问这个函数表达式的名称，只能在函数体内部使用：

```js
var bar;

var foo = function bar(){
  console.log(1);
};

bar();//TypeError: bar is not a function
```

**箭头函数的优点和缺点也显而易见**。

this 执行是箭头函数常常碰到的问题之一。在常规函数中，`this` （也就是我们说的执行上下文）指向是动态的。什么意思呢？其实就是说 `this` 的值取决于函数本身如何被调用。JavaScript 里调用常规函数的方式通常有四种：

第一种是最简单粗暴的直接调用，`this` 指向全局对象 `window`（严格模式下是 `undefined`）：

```js
function handleFn() {
  console.log(this);
}

// 直接调用
handleFn();  // this => window
```

第二种是作为对象方法调用，这个时候 `this` 指向的是所属对象：

```js
const obj = {
  callThis () {
    console.log(this);
  }
}

// 对方方法调用
obj.callThis() // this => obj
```

第三种是动态改变执行上下文的方法调用，即通过 `.call` 和 `.apply`，`this` 指向第一个参数代表的上下文：

```js
function handleFn() {
  console.log(this);
}

const obj = { value: 'A' };

handleFn.call(obj); // this => { value: 'A' }
handleFn.apply(obj); // this => { value: 'A' }
```

第四种就是构造函数，`this` 指向通过 `new` 关键字创建的实例：

```js
function HandleFn() {
  console.log(this);
}

new HandleFn(); // this => HandleFn 的实例
```

以上是常规函数中 this 的指向，而在箭头函数中就不一样了。在箭头函数中的 this 指向是由词法决定的，它没有定义自己的执行上下文，啥意思呢？简单点说就是箭头函数里的 this 永远等于外层函数的 this。我们来看个例子：

```js
const obj = {
  callThis () {
    console.log(this);
    const callback = () => {
      console.log(this)
    }
    callback()
  }
}

obj.callThis() // this => obj  // this => obj
```

这个里面 callback 是函数体内的一个函数，而它使用了箭头函数来定义，所以当调用 callback 的时候，打印出来的 this，还是当前函数体外的 this。

箭头函数有两个方面的作用：更简短的函数并且不绑定 `this`。这就使箭头函数的使用更倾向于纯函数。

而因为没有 `this` 这个特性，也导致了 `call、apply、bind` 调用时，只能传递参数（不能绑定 this），第一个参数会被忽略。

```js
var adder = {
  base: 1,

  add: function (a) {
    var f = v => v + this.base;
    return f(a);
  },

  addThruCall: function (a) {
    var f = v => v + this.base;
    var b = {
      base: 2
    }

    return f.call(b, a);
  }
}

console.log(adder.add(1));  // 2
console.log(adder.addThruCall(1));  // 2
```

总之，箭头函数虽然更加简短，但是没有 `this、arguments、prototype`，而且不能使用 new，想改变 this 指向也不行，`yield` 关键字通常也不能在箭头函数中使用（除非是嵌套在允许使用的函数内）。因此，箭头函数也不能用作函数生成器。

## 各自适应的场景

- 箭头函数
  
  我们说引入箭头函数有两个方面的作用：更简短的函数并且不绑定 `this`，所以它更适合于无复杂逻辑或者说无副作用的纯函数场景下，比如 map、filter、forEach 的回调函数中。因为没有 this、arguments等，所以不适合定义对象的方法，比如说对象字面量方法、构造器方法等。也更适用于那些本来需要匿名函数的地方。
- 普通函数
  
  普通函数的应用场景，基本能覆盖整个应用程序。

  

