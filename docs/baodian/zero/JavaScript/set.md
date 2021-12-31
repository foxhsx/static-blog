---
title: Set 是什么？怎么用for循环遍历
date: 2021-04-11
tags:
 - JavaScript
 - 面试
categories:
 - front
---

问题点：
- 什么是 set？
- 怎么使用？
- 怎么使用 for 循环遍历？

## 那么什么是 Set ？

引用 MDN 里的概念：Set 对象是值的集合，你可以按照插入的顺序迭代它的元素。Set 的元素只会**出现一次**，即 Set 中的元素是唯一的。

在 Set 中，`NaN` 和 `undefined` 都可以被存储，而且 `NaN` 之间被视为相同的值（尽管 NaN !== NaN）。

## 怎么使用呢？

我们先来看几个 Set 相关的概念和属性：

### Constructor

`Set()`：创建一个新的 Set 对象。

```js
const set1 = new Set([1, 2, 3, 4, 5]);

// [object Set] Set(5) {1,2,3,4,5} => 展开以后 { 0:1, 1:2, 2:3, 3:4, 4:5 }
```

### 实例属性

`Set.prototype.size`：拿上一个例子来说，生成的 set1 实例里其实还有一个 size 属性，用来展示 Set 对象中元素的个数。

```js
const set1 = new Set([1, 2, 3, 4, 5]);

console.log(set1.size);  // 5
```

### 实例方法

**add(value)**

在 Set 对象尾部添加一个元素。返回该 Set 对象。需要注意的是，不能添加重复的值。

```js
var mySet = new Set();

mySet.add(1);
mySet.add(5).add("some text"); // 可以链式调用

console.log(mySet);
// Set [1, 5, "some text"]
```

**clear()**

顾名思义，会清空 Set 对象里的所有数据。返回值是个 undefined。

```js
var mySet = new Set();
mySet.add(1);
mySet.add("foo");

mySet.size;       // 2
mySet.has("foo"); // true

mySet.clear();

mySet.size;       // 0
mySet.has("bar")  // false
```

**delete(value)**

删除 Set 对象中指定的元素。如果删除成功则返回 true，否则返回 false。

```js
var mySet = new Set();
mySet.add("foo");

mySet.delete("bar"); // 返回 false，不包含 "bar" 这个元素
mySet.delete("foo"); // 返回 true，删除成功

mySet.has("foo");    // 返回 false，"foo" 已经成功删除
```

**forEach(callbackFn[, thisArg])**

Set 的方法会根据集合中元素的插入顺序，依次执行提供的回调函数。在这个回调函数中会接收三个参数：`currentValue`，`currentKey` 和 `set`。
- currentValue：当前正在被操作的元素。
- currentKey：由于集合没有索引，所以 currentKey 也表示这个正在被操作的元素。
- set：调用该方法的 Set 对象。

该方法的返回值是 undefined。

**has(value)**

验证 Set 对象中是否包含某个值，如果包含则返回 true，反之返回 false。

```js
var mySet = new Set();
mySet.add('foo');

mySet.has('foo');  // 返回 true
mySet.has('bar');  // 返回 false

var set1 = new Set();
var obj1 = {'key1': 1};
set1.add(obj1);

set1.has(obj1);        // 返回 true
set1.has({'key1': 1}); // 会返回 false，因为其是另一个对象的引用
set1.add({'key1': 1}); // 现在 set1 中有2条（不同引用的）对象了
```

当然还有几个方法，这里并没有写，如果感兴趣可以看[Set](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set)。

## 怎么使用 for 循环遍历？

因为 Set 对象是值的集合，所以我们可以按照插入的顺序迭代它的元素。

```js
let mySet = new Set();

mySet.add(1);
mySet.add(5);
mySet.add(5);
mySet.add('some text');
mySet.add({ a: 1, b: 2 });

// 迭代 Set

for (let item of mySet) {
  console.log(item);
}

// 1
// 5
// some text
// { "a": 1, "b": 2 }
```

也可以用 Array.from() 方法将 Set 对象转为 Array：

```js
let setArr = Array.from(mySet);  // [1, 5, "some text", {"a": 1, "b": 2},]
```

我们在去重时就可以使用到 Arry.from() 和 Set 来快速完成去重的操作。