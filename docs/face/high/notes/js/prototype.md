---
title: 原型和原型链
date: 2021-09-05
tags:
 - JavaScript
 - 面试
categories:
 - front
describe: 回顾复习一下原型和原型链
---

原型和原型链这在面试中都是老生常谈的话题了，那么今天我们再来唠叨唠叨。

### 解决什么问题？

在介绍它们之前，我们先要搞清楚，原型和原型链解决了什么问题？

我们知道早期的 JavaScript 是没有类这个概念的，我们要生成一个对象，通常是定义一个构造函数，然后 new 这个构造函数去生成对象的。而这个构造函数就成为了一个实例对象的原型对象。

```javascript
function Cat(name, weight) {
	this.name = name;
  this.weight = weight
}

// new 一个新对象
var cat = new Cat('kongfu', 18);
```

但是光是这样是不够的，我们可以用这个构造函数生成很多的实例出来，但是这些实例其实是有**一些共性**的，那此时我们需要在最初始的构造函数上想办法去将这些共性绑在上面，让每一个生成的实例都可以享有这些特性。

所以呢，这个时候我们还需要有一个对象专门来存储上述所描述的共有属性。

我们把这个对象称为【**原型对象**】**。**

这里我们就有了一个比较浅显的理解，原型对象解决了为构造函数的实例提供共有属性的问题。那么仅仅是如此吗？我们提供共有属性又是为了解决什么问题呢？其实再思考一下，共有属性是对某一特定事物或类的抽象，那么我们将这些抽象的概念收集到一起就可以以此为基础，拓展出具有相同特性，同时也具有不同特性的各式各样的实体出来。

因此，我们也可以这样理解：原型其实是某些事物抽象概念的集合体，我们使用原型可以在一定程度上减少冗余操作，也能以此为基础拓展建立在共有特性之上的不同实体。

### 原型是什么？

在《JavaScript 高级程序设计》第四版中是这样描述**原型**的：

每个函数都会创建一个 prototype 属性，这个属性是一个对象，包含应该由特定引用类型的实例共享的属性和方法。实际上，这个对象就是通过调用构造函数创建的对象的原型。

来，咱们列一下：

- **每个函数都有一个 prototype 的属性**
- **指向原型对象**

- **原型对象中存储所有实例对象共享的属性和方法**
- **不需要共享的属性和方法放在构造函数中**

那有了原型对象之后，我们通过 new 关键字来创建实例对象。这个时候创建出来的实例，会自动挂载构造函数原型对象上的属性值。

![img](https://cdn.nlark.com/yuque/0/2021/png/21547449/1626793319444-4cb7cfbb-4cdb-44da-ac69-c4a7e5eed190.png)

> 注意：在原型对象 prototype 里，有一个 `constructor` 属性，这个属性会又指回到构造函数本身去。

而在 JavaScript 所有对象中，都会有一个内置属性叫 `__proto__` ，这个属性是系统自动生成的，只要创建一个对象，它就会跟随这个对象一起出来。它其实指向的就是原型对象。

跟着上面所列，我们再补两条：

- **原型对象中有一个** `constructor` **属性，指向构造函数本身**
- **每个实例都有一个** `__proto__` **属性，这个属性指向原型对象**



**有一个特殊的点，所有的 JavaScript 对象都是继承自** `Obejct` **的对象。而** `Obejct` **对象的** `__proto__` **最终指向了 null。**

IE 不支持这种访问原型对象的方式。且如果操作不慎会改变这个对象的继承原型链。

### 原型链是什么？

知道原型之后，理解原型链其实也很简单：

每个对象都有 `__proto__` 属性指向原型对象，那每个原型对象也有对应的 `__proto__` 属性再指向原型对象的原型对象，这样一层层往上，直到顶端，也就是我们说的 null 的地方，就构成了一条完整的原型链。（听起来很像俄罗斯套娃）。

看一个简单的例子：

```javascript
function Animals(name, type) {
	this.name = name;
  this.type = type;
}

Animals.prototype.eat = function (food) {
	console.log(this.name + ' eat ' + food);
}

const cat = new Animals('fafa', 'cat');

/**
	cat
  Animals {
  	name: 'fafa',
    type: 'cat',
    __proto__: {
    	eat: f (food),
      constructor: f Animals(name, type),
      __proto__: {
      	constructor: f Object(),
        hasOwnProperty: f hasOwnProperty(),
        isPrototypeOf: f isPrototypeOf(),
        ...
      }
    }
  }
*/
```

可以看到当我们打印 cat 的时候，打印出来的是 Animals 构造函数，它里面有一个 `__proto__` 对象，里面的 constructor 属性指向构造函数本身，而这个对象里也有一个 `__proto__` 对象，它的 constructor 就指向了 Object 构造函数，最终到顶端指向 null。

当然，原型链也有自己的一些特点：

- 查找某个属性的时候，采用**就近原则**，什么意思呢？就是说我们在调用某个值的时候，会优先查找距离自己最近的，当然首先肯定是查找自己的，如果自己没有，就会沿着原型链向上查找直到找到或者找不到为止。
- 对于链上的每个原型对象，都包含一个指针，指向父级的 prototype。

OK，到这里就大概了解到了原型和原型链是什么？那我们平常都会在哪些场景中去使用它们呢？

首先是原型，这个其实咱们在之前也就说了，它里面存储了一些抽象的属性和方法，那么使用的场景也显而易见，就是实例对象调用这些公共方法和属性的时候，会用到原型对象。再深层次就是到原型继承这块会用到了。

那么原型链呢？

其实我们说到原型链，第一个想到的场景就应该是**继承**。为什么呢？

1. 原型链类似俄罗斯套娃，一层一层往上递归查找需要的某一项属性和方法；
2. 每一层的原型对象，都是最终实例对象的抽象集合；
   1. 基于不同的抽象集合，可以实现代码的复用和组合；
   2. 基于这种抽象的集合复用和组合，最终可以生成各式各样的构造函数和对应的实例对象；

3. 以此，避免了冗余代码的产生，从而也减少了内存的占用

### 小补充

#### _ *proto_* 和 prototype 的区别

- `__proto__` :  是实例对象指向原型对象的指针，隐式原型，是每个对象都会有的一个属性。  
- `prototype` :  是构造函数的原型对象，显式原型，只有函数才有。