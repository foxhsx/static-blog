---
title: indexOf 和 findIndex 的区别
date: 2021-04-08
tags:
 - JavaScript
 - 面试
categories:
 - front
---

## 链式问题
1. indexOf
2. findIndex
3. 相同点
4. 不同点
5. 为什么？
6. 手写 indexOf 和 findIndex

## indexOf

首先 indexOf 方法在**数组**中可以找到一个给定元素的第一个索引，并返回。如果不存在，就返回 -1。

而在**String**中则是返回调用其字符串对象中第一次出现的指定值的索引，从 fromIndex 处进行搜索。如果没有找到，则返回 -1。

语法上不管是数组还是 String 都是：

```js
[arr[, string]].indexOf(searchElement[, fromIndex])
```

第一个参数 searchElement 很好理解，就是我们要查找的元素，第二个参数 fromIndex 表示我们开始查找的位置，这个参数一般很少用，在一些特殊的场景下会用到。

> 如果没有提供确切的查找元素，searchElement 会被强制设置为 undefined，这种情况下一般会返回 -1，除非 arr 或者 string 里也有 undefined 的字符串。

数组中 indexOf 底层实现上其实是使用的三等（===）进行判断 searchElement 与调用者包含的元素之间的关系。

在 String 中 indexOf 查找的字符串如果是个空字符串的话，会产生奇怪的效果。如果 `fromIndex` 值为空，或者 `fromIndex` 值小于被查找的字符串的长度，返回值和以下的 `fromIndex` 值一样：

```js
'hello world'.indexOf('')  // 0
'hello world'.indexOf('', 0)  // 0
'hello world'.indexOf('', 3)  // 3
'hello world'.indexOf('', 8)  // 8
```

而 `fromIndex` 值大于等于字符串长度，会直接返回字符串长度：

```js
'hello world'.indexOf('', 11)  // 11
'hello world'.indexOf('', 12)  // 11
'hello world'.indexOf('', 13)  // 11
```

需要注意的是，indexOf 方法是区分大小写的。

当我们检测是否存在某字符串时，0 并不会被当成 true，而 -1 也不会被当成 false。所以当检测某个字符串是否存在于另一个字符串中时，可以使用以下方法：

```js
'Blue Whale'.indexOf('Blue') !== -1    // true
'Blue Whale'.indexOf('Bloe') !== -1    // false
~('Blue Whale'.indexOf('Bloe'))        // 0, 这是一种错误用法
```

## findIndex

`findIndex` 方法返回数组中满足提供的测试函数的第一个元素的索引。如果没有找到则返回 -1。

语法：

```js
arr.findIndex(callback[, thisArg])
```

里面的回调函数在调用时，会自动传入三个参数：`element、index、array`。
- element：当前元素
- index：当前元素的索引
- array：调用 findIndex 的数组
- thisArg：执行 callback 时作为 this 对象的值

findIndex 在执行的时候，会对数组中的每一项都执行一次回调函数。直到找到一个 callback 函数返回为 true 的项，找到之后立即返回对应项的索引。

findIndex 是不会修改所调用的数组。

## 相同点

这两个方法都是针对查找数组中的某一项，然后返回对应项的索引。

## 不同点

findIndex 传入的是个回调函数，里面可以做更多的逻辑处理和判断，而 indexOf 只是判断数组是否包含某个值。

## 为什么会有两个功能相似的 API？

在 indexOf 的基础上，为了有更多的可延展性和操作，又有了 findIndex 的实现。

## 手写 indexOf

### Array.indexOf

```js
if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function(searchElement, fromIndex) {
    var k; // 定义返回值变量
    if (this == null) {
      throw new TypeError('"this" is null or not defined');
    }

    var O = Object(this);  // 将调用者转为对象

    var len = O.length >>> 0;  // Let len be ToUint32(lenValue).

    if (len === 0) {
      return -1;
    }

    // 隐式转换 fromIndex 为数字
    var n = +fromIndex || 0;

    // 考虑到无穷的情况，要做判断，避免这种情况发生
    if (Math.abs(n) === Infinity) {
      n = 0;
    }

    // 如果传进来的起始位置大于数组的长度，则直接返回 -1
    if (n > len) {
      return -1;
    }

    // 计算 k 值
    // 如果 n 大于等于 0 就使用 n 来跟 0 做对比，返回 n
    // 如果 n 小于0，则使用数组长度减去 n 的绝对值，这里其实相当于从最后往前数
    // 如果计算出来的 k 小于0，则返回 0
    k = Math.max(n >= 0 ? n : len - Math.abs(n), 0)

    while(k < len) {
      if (k in O && O[k] === searchElement) {
        return k;
      }
      k++;
    }
    return -1;
  }
}
```

### String.indexOf

```js
if (!String.prototype.indexOf) {
  String.prototype.indexOf = function(searchValue, fromIndex) {
    var k; // 定义返回值变量
    if (this == null) {
      throw new TypeError('"this" is null or not defined');
    }

    var O = Object(this);  // 将调用者转为对象

    var len = O.length >>> 0;  // Let len be ToUint32(lenValue).
    var searchValueLen = searchValue.length >>> 0;

    if (len === 0) {
      return -1;
    }

    

    // 隐式转换 fromIndex 为数字
    var n = +fromIndex || 0;

    // 考虑到无穷的情况，要做判断，避免这种情况发生
    if (Math.abs(n) === Infinity) {
      n = 0;
    }

    // 如果是个空字符串，则返回传入的 fromIndex
    if (searchValueLen === 0) {
      // 如果传入的起始位置就大于调用字符串的长度，则返回字符串的长度
      return n < len ? n : len
    }

    // 如果传进来的起始位置大于字符串的长度，则直接返回 -1
    if (n > len) {
      return -1;
    }

    k = Math.max(n >= 0 ? n : len - Math.abs(n), 0)

    while(k < len) {
      if (k in O && O[k] === searchValue[0]) {
        var compareValue = this.substring(k, searchValueLen+k);
        if (compareValue === searchValue) {
          return k
        }
      }
      k++;
    }
    return -1;
  }
}
```

## 手写 findIndex

```js
if (!Array.prototype.findIndex) {
  Object.defineProperty(Array.prototype, 'findIndex', {
    value: function(predicate) {
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      var o = Object(this);

      var len = o.length >>> 0;

      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      }

      var thisArg = arguments[1];

      var k = 0;

      while(k < len) {
        var kValue = o[k];
        if (predicate.call(thisArg, kValue, k, o)) {
          return k;
        }
        k++;
      }
      return -1;
    }
  })
}
```