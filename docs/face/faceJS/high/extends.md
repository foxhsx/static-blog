---
title: 继承
date: 2021-10-25
tags:
 - JavaScript
 - 面试
categories:
 - front
describe: ES5的继承和ES6的继承
---

### 什么是继承

对于继承这个概念来说大家都不陌生，在现实中有儿子继承父业，孙子继承了爷爷的财产等等。那么在编程中，我们熟知的继承其实主要来自于面向对象编程。而很多的面向对象语言都支持两种继承：接口继承和实现继承。前者是只继承方法签名，后者继承实际的方法。

继承的主要作用是将一些抽象的模块抽离出来，作为一个父类使用，这样便于实际编程中代码的可复用性和可维护性，也从一定程度上减少代码冗余，使得代码更加的简洁整齐。

在 JavaScript 中接口继承是不可能实现的，因为函数没有签名。所以实现继承成了 JavaScript 唯一支持的继承方式，而这主要是通过**原型链**来实现的。

### ES5 的继承

在 ES5 中主要是把**原型链**作为 JavaScript 的继承方式。基本思想就是通过原型继承多个引用类型的属性和方法。

这里我们来回顾一下构造函数、原型和实例的关系：

> 首先每个构造函数都有一个原型对象，而原型呢又有一个属性指向构造函数，而实例呢又有一个内部指针指向了原型。

![img](https://img-blog.csdnimg.cn/33ba9b2ac9624720a4e79549aa6a6baa.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAbGVhcm5pbmdfSA==,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)

试想一下，假如**原型是另一个类型的实例**呢？是不是就会有：

> 原型本身有一个内部指针指向另一个原型，相应地另一个原型也有一个指针指向另一个构造函数。这样重复下去直到 null，就形成了在实例和原型之间的一条原型链。

![img](https://img-blog.csdnimg.cn/2106acd12b2f4c0790c77d4aef34382f.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAbGVhcm5pbmdfSA==,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)

那说了这么多我们来简单的使用原型链来实现一个继承看看。

```js
function Man() {
	this.size = '强壮';
  this.sex = '男人';
}

Human.prototype.run = function() {
	console.log(`${this.name}是个${this.size}的${this.sex}，他喜欢${this.hobby}`)
}

function Child(name, hobby) {
  this.name = name;
	this.hobby = hobby
}

Child.prototype = new Man();
const man = new Child('成海', '挣钱');
man.hobby;  // 挣钱
man.run();  // 成海是个强壮的男人，他喜欢挣钱
```

我们在这里定义了两个类型：`Man` 和 `Child`。其中 `Man` 类型定义了两个属性和方法，而 `Child` 的类型只定义了两个属性。而这两个类型的主要区别就是  `Child` 的原型被 `Man` 的实例所覆盖，从而实现了对 `Man` 类型的继承。这意味着 `Man` 的实例可以访问到的所有属性和方法也会存在于 `Child.prototype`。最后创建 `Child` 的实例，并查看它自身的属性和继承来的 `run` 方法。

下图展示了子类实例和两个构造函数及其对应原型之间的关系。

![img](https://img-blog.csdnimg.cn/0716089daf1f4be98e657d6b50a8bd2d.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAbGVhcm5pbmdfSA==,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)

那在上述例子中实现继承的关键点就是，使用 `Man` 的实例覆盖了 `Child` 的原有默认原型对象。

在这里，`run` 方法还在 `Man.prototype`对象上，而 `size` 和 `sex` 属性则是在 `Child.prototype` 上。这是因为 `run` 方法是一个挂载到原型对象上的方法，而 `size` 和 `sex` 则是属于实例属性。我们在这里用 `Man` 的实例覆盖了 `Child.prototype` 的原有默认值，因此 `size`和`sex` 才会存储在它上面。

还需要注意的是，由于被覆盖了原有的原型对象，导致 `Child.prototype` 中的 `constructor` 属性也指向了 `Man` ，所以最终 `Child` 的实例 `man` 中的 `constructor` 也指向了 `Man`。

原型链的出现，也扩展了原型上的搜索机制。当我们在一个实例上查找某个属性时，如果没有，则会一层层向上查找，直到原型链的末端（最终会到 `Null` 上）。

![img](https://img-blog.csdnimg.cn/39fee82df5ed47fab9e84d6d374f9442.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAbGVhcm5pbmdfSA==,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)

但是原型链虽然实现了继承，但是它也有一个重要的问题——原型中包含引用值。原型中包含的引用值会在所有实例间共享，这也是属性会定义在构造函数中，而非挂载到原型上的原因。在使用原型实现继承的时候，原型实际上变成了另一个类型的实例。这就让原先的实例属性变成了原型属性。

![img](https://img-blog.csdnimg.cn/d3efdf5579ab46b8a46ee1bcd947bbb0.jpg?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAbGVhcm5pbmdfSA==,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)

还有一个问题就是：子类无法在实例化的时候给父类的构造函数传参。原因也很明显，会影响到所有的对象实例，因为原型链基本不会被单独使用。

那么有没有更优的方法呢？以下是《JavaScript 高级程序第四版》中提到的 5 种方法。

#### 1. 盗用构造函数

为了解决原型包含引用值导致的继承问题，**盗用构造函数**出现了。它的基本思路为：**在子类构造函数中调用父类的构造函数**。

因为函数就是在特定上下文中执行代码的简单对象，所以可以使用 `apply()` 和 `call()` 方法以新创建的对象为上下文执行构造函数。

```js
function Man() {
	this.like = ['code']
}

function Child() {
  // 继承 Man
	Man.apply(this)
}

let man1 = new Child();
man1.like.push('read');
man1.like;  // ['code', 'read']

let man2 = new Child();
man2.like; // ['code']
```

根据上述代码块可以看到，我们在子类 `Child` 中调用了父类 `Man` 的构造函数。这就会让每个实例都会有自己的 `like` 属性，而不是共享。而这里我们也可以在子类构造函数中向父类构造函数传递参数。

```js
function Man(name) {
	this.name = name
}

function Child() {
  // 继承 Man
	Man.call(this, 'cecil')
  
  this.age = 28
}

const man = new Child();
man.name;  // 'cecil'
man.age;   // 28
```

那使用盗用构造函数就可以了吗？答案是否定的。原因有两个：

1. 必须要在构造函数中定义方法，因此函数不能重用
2. 子类也不能访问父类原型上定义的方法

所以基于上述问题，盗用构造函数基本也不能单独使用。

#### 2. 组合继承

组合继承的思路就是：**使用原型链继承原型上的属性和方法，而通过盗用构造函数继承实例属性。**

这样既可以把方法定义在原型上以实现重用，又可以让每个实例都有自己的属性。

```js
function Man(name) {
	this.like = ['code']
  
  this.name = name;
}

Man.prototype.code = function() {
  console.log('hello world'+ this.name)
}

function Child(name, age) {
  // 继承 Man
	Man.call(this, name)
  
  this.age = age
}

Child.prototype = new Man();
let man1 = new Child('cecil', 28);
man1.like.push('read');
man1.like;  // ['code', 'read']
man1.code(); // 'hello world cecil'

let man2 = new Child('lee', 27);
man2.like; // ['code']
man2.code();  // 'hello world lee'
```

上述例子中，两个实例既可以拥有自己的属性，又可以共享方法。这也是在 JavaScript 中使用最多的继承模式。

#### 3. 原型式继承

这种方法的思路是：**不自定义类型，通过函数传参的方式，返回一个构造函数的实例**。

```js
function object(obj) {
	function F() {}
  F.prototype = obj;
  return new F()
}
```

本质上 `object()` 是对传入的对象执行了一次浅拷贝。它的使用场景：你有一个对象，想在它的基础上再创建一个新对象，而这个新对象的属性值可以在创建之后进行修改。

其实这个方法，我们使用 `Object.create()` API 也可以达到同样的效果，前提条件是只有一个参数。那在此基础上，我们可以手写一下 `Object.create()`：

```js
Object.create = function object(obj, arg) {
	function F() {}
  // 还有一些健壮性检查，懒得写了
  if (arg) {
  	obj = Object.assign(obj, arg);
  }
  F.prototype = obj;
  return new F()
}
```

当然这不是正儿八经人家 API 的源码，这里只是简单的实现了一下而已。

#### 4. 寄生式继承

思路：**创建一个实现继承的函数，以某种方式增加对象，然后返回这个对象**。

```js
function parasitic(original) {
 let clone = object(original); // 创建一个新对象
  clone.getProperty = function (key) {
  	console.log(this[key])
  }
  return clone;
}

const cloneObj = parasitic({name: 'cecil', age: 28})
cloneObj.getProperty('name');  // cecil
```

那这种继承方式的场景是：**主要关注对象，而不在乎类型和构造函数**。

注意：通过寄生式继承给对象添加函数会导致函数难以重用，与构造函数模式类似。

#### 5. 寄生式组合继承

前面提到了**组合继承**的方式，其实这个方法存在的效率问题，大家也应该清楚，父类构造函数最终会被调用两次：

1. 创建子类原型时调用
2. 子类构造函数中调用

那解决这个问题的方法也很简单，我们在原来**组合继承**的思路上修改一下：不通过调用父类构造函数给子类原型赋值，而是取得父类原型上的一个副本。实际上就是通过寄生式继承来继承父类原型，然后将返回的新对象赋值给子类原型。

```js
function inheritPrototype(child, parent) {
	let prototype = object(parent.prototype);  // 父类原型副本
  prototype.constructor = child;             // constructor 指向子类
  child.prototype = prototype
}

function Man(name) {
	this.like = ['code']
  this.name = name;
}

Man.prototype.code = function() {
  console.log('hello world'+ this.name)
}

function Child(name, age) {
  // 继承 Man
	Man.call(this, name)
  this.age = age
}

inheritPrototype(Child, Man);

let man1 = new Child('cecil', 28);
man1.like.push('read');
man1.like;  // ['code', 'read']
man1.code(); // 'hello world cecil'

let man2 = new Child('lee', 27);
man2.like; // ['code']
man2.code();  // 'hello world lee'
```

这里就只调用了一次父类函数，避免了重复调用的问题，提高了效率。寄生式组合继承可以算是引用类型继承的最佳模式。

### ES6 的继承

ES6 中我们说主要的关注点其实是在**类**上面。原生支持了类继承机制。虽然类继承使用的是新语法，但是其背后依旧使用的是**原型链。**

ES6 类支持单继承。使用 **extends** 关键字，就可以继承任何拥有 `[[Construct]]` 和原型的对象。

```js
class Parent {}

class Child extends Parent {}

// 也可以继承构造函数
function Person() {}

class Man extends Person {}
```

需要注意的是，我们在**类构造函数中**要使用 `super` 关键字调用父类构造函数，且**不要在 super 之前引用 this，否则会抛出 ReferenceError**

```js
class Parent {
	constructor() {
  	this.superText = 'super'
  }
}

class Child extends Parent {
  construtor() {
    super()
    console.log(this instanceof Parent);  // true
    console.log(this);  // { Child { superText: 'super' } }
  }
}
```

使用 `super` 关键字时，还有几个点需要大家注意：

1. 只能在**派生类构造函数**和**静态方法**中使用
2. 不能单独进行引用

1. 调用 `super()` 会调用父类构造函数，并将返回的实例赋值给 this
2. `super` 的行为如同调用构造函数，如果需要给父类构造函数传参，则需要手动传入

1. 如果没有定义类构造函数，在实例化派生类时会调用 `super()` ，而且会传入所有派生类的参数
2. 不能在 `super()` 之前引用 this

1. 如果在派生类中显式定义了构造函数，则要么必须在其中调用 `super`，要么必须在其中返回一个对象

### 原型和继承的关系

如何确定原型和实例的关系，有两个方法：

1. `instanceof()`。即如果一个实例的原型链中出现过相应的构造函数，那么 `instanceof` 就会返回 `true`。

```js
man instanceof Object;  // true
man instanceof Man;     // true
man instanceof Child;   // true
```

1. `isPrototypeOf()`。构造函数的每个原型都可以调用这个方法，只要实例的原型链中包含这个原型，就会返回 `true`。

```js
Object.prototype.isPrototypeOf(man);  // true
Man.prototype.isPrototypeOf(man);     // true
Child.prototype.isPrototypeOf(man);   // true
```