---
title: let、const 和 var
date: 2021-10-24
tags:
 - JavaScript
 - 面试
categories:
 - front
describe: 定义变量的三个关键字，用法解析
---

首先我们知道 `var\let\const` 都是声明变量用的，但是它们三个除了这个共同点之外，其他部分都各不相同，下面我们来看下。

### var	

`var`关键词，是用来**声明一个变量的，**并可选地将其初始化为一个值。

```js
var num = 1;
var str = 'hello world';
var fn = () => {};

// 也可以声明多个变量，中间用逗号隔开
var a = 1, b = 2, c = 3;
```

特点：

1. 它的作用域是它当前的执行上下文，本身是根据声明位置决定是全局变量还是局部变量。作用域限制在其声明位置的上下文中。
2. 变量提升：无论发生在何处，都在执行任何代码之前进行处理。所以在代码中的任意位置声明变量总是等效于在代码开头声明。
   1. 建议始终在**作用域**顶部声明变量（全局代码的顶部或者函数代码的顶部）
   2. 变量提升不会影响值的初始化，当代码执行到赋值语句时，会将值分配给变量

来看一个例子：

```js
function varFor() {
	for (var i =0; i < 10; i++) {
  	console.log(i);  // 0,1,2,3,4,5,6,7,8,9
    setTimeout(() => {
    	console.log(i);  // 10个10
    }, 100)
  }
}
```

我们知道 `for` 循环语句部分是一个父级作用域，而循环体内部是一个子作用域，当在循环体内打印 `i` 时，是可以正常打印出循环的每个值的；但是在定时器中，由于事件循环机制的缘故，会导致定时器中的代码要等循环结束后才会执行，而这个时候 `i` 的值就成了10，所以最后打印出了10个10。那要怎样才能正确在定时器中打印出值呢？我们来看看 `let`。

### let

`let`关键词也是用来声明变量的，但与 `var` 不同的是，它声明一个**块级作用域**的本地变量。

那么这里对**块级作用域**有没有一个规则呢？我们来看一个例子：

```js
function varDemo() {
	var x = 1;
  {
  	var x = 2;  // 注意：这里是同样的变量，会覆盖最初始的变量
    console.log(x); // 2
  }
  console.log(x); // 2
}

function letDemo() {
	let x = 1;
  {
  	let x = 2; // 不同于外层的变量
    console.log(x);  //  2
  }
  console.log(x); // 1
}
```

可以看到 `var` 声明的变量，它的作用域将应用到整个函数，包括块里的变量也会被覆盖掉。而 `let` 则是只会在其声明的块或者子块当中。

还有一点就是，`let` 哪怕声明到 JavaScript 文件的最顶部，也不会和 `var` 一样，在全局对象 `window` 里新建一个属性，它就是一个全局变量，和全局对象属性是不同的。

```js
var x = 'hello';
let y = 'world';
console.log(window.x);  // 'hello'
console.log(window.y);  // undefined
```

这个时候我们再回头看之前的那个定时器的例子，可以看到已经能正确打印出值了，这就是因为**块级作用域**的关系。

```js
function varFor() {
	for (let i =0; i < 10; i++) {
  	console.log(i);  // 0,1,2,3,4,5,6,7,8,9
    setTimeout(() => {
    	console.log(i);  // 0,1,2,3,4,5,6,7,8,9
    }, 100)
  }
}
```

`let` 还可以在一些场景中模拟私有变量，比如在构造函数中：

```js
var Demo;
{
	let privateScope = new WeakMap();
  let counter = 0;
  
  Demo = function() {
    this.someProperty = 'foo';

    privateScope.set(this, {
      hidden: ++counter,
    });
  }
  
  Demo.prototype.showPublic = function() {
    return this.someProperty;
  };

  Demo.prototype.showPrivate = function() {
    return privateScope.get(this).hidden;
  };
}

console.log(typeof privateScope);
// "undefined"

var demo = new Demo()

console.log(demo);
// Demo {someProperty: "foo"}

demo.showPublic();
// "foo"

demo.showPrivate();
// 1
```

这里我们还需要提到一个概念：**暂存死区（暂时性死区）。**

与 `var` 不同的是，`var` 是有变量提升的概念的，而 `let` 没有，通过 `let` 声明的变量直到它们的定义被执行时才初始化，也就是说，在 `let` 声明的变量之前去访问它们会导致 `ReferenceError` 。我们可以理解为从作用域顶部到变量初始化这个区域为“暂时性死区”，是访问不到该变量的。

有个例子，我们来看一下：

```js
function test(){
   var foo = 33;
   if (foo) {
      let foo = (foo + 55);
   }
}
test();
```

这里的迷惑行为在第四行，可能有很多同学会直接给出 88 的答案，但其实不然，因为在这里 `if` 块中使用了 `let` 声明了一个专属用 `if` 块中的 `foo` 变量，所以后面这个 `foo+55` 中的 `foo` 是不会继承到外层的 `foo` 变量的，而当代码被执行到这一句时，因为还没有到达它的初始化，所以会抛出 `ReferenceError` 的错误。

有一种情况要避免，就是在外层使用 `let` 进行变量声明，又在子块中使用 var 声明，且变量名一样，这会导致抛出 `SyntaxError` ，这是因为 `var` 这里有变量提升，会导致隐式地重新声明变量。而在一个块中重复声明变量，是不被允许的。

### const

`const` 关键词也是用来声明变量的，但是这个变量有点特殊，在声明之后就是不可更改的，也就是说 `const` 是用来声明常量的。

它与 `let` 语句定义的变量是非常类似的，唯一的不同就是上面说到的常量。而既然说到了被声明之后就不可再进行修改，那我们在使用 `const` 进行变量声明时，就**必须要在声明的同时进行赋值**。

如果是用 const 定义了一个引用数据类型的值，那我们也是可以钻下空子的，虽然我们无法直接更改变量本身，但是可以更改变量里的属性。

```js
const obj = { a: 1 };

obj = { b: 2 };  // invalid assignment to const 'obj'
obj.a = 2;
```

在定义常量时，会有个通俗的约定，那就是常量声明全部用大写字母（虽然也可以用小写）。

### 异同点

相同点：

1. 三者都是用来声明变量的
2. `let` 和 `const` 都有暂时性死区和块级作用域的概念，且不能重复声明

不同点：

1. `var` 有变量提升的概念，其他两者没有
2. `var` 会挂载到全局对象上去，其他两者没有
3. `const` 声明后的变量不可更改，是常量
4.  `let` 和 `const` 都有暂时性死区和块级作用域的概念，且不能重复声明