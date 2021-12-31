---
title: Object.keys
date: 2021-03-30
tags:
 - JavaScript
 - 面试
categories:
 - front
---

我们在项目中经常会用到 Object 对象，也时常会对 Object 的 key 值进行操作，为了能一次性获取到对应 Object 的 key 值，JavaScript 为我们提供了 `Object.keys` API。

`Object.keys()` 方法会返回一个由一个给定对象的自身枚举属性组成的数组，数组中属性名的排列顺序和正常循环遍历该对象时返回的顺序一致。

语法：

```js
Object.keys(obj)
```

这里的参数 obj 就是要返回其枚举自身属性的对象。返回一个包含其对象所有可枚举属性的字符串数组。

如果想要获取一个对象的所有属性，甚至包括不可枚举的，可以使用 `Object.getOwnPropertyNames`。

对于不兼容的情况，我们可以使用 MDN 中提供的写法：

```js
if (!Object.keys) {
  Object.keys = (function () {
    var hasOwnProperty = Object.prototype.hasOwnProperty,
        //  propertyIsEnumerable 检测是否是可枚举属性
        hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
        // 不可枚举属性数组
        dontEnums = [
          'toString',
          'toLocaleString',
          'valueOf',
          'hasOwnProperty',
          'isPrototypeOf',
          'propertyIsEnumerable',
          'constructor'
        ],
        dontEnumsLength = dontEnums.length;

    return function (obj) {
      if (typeof obj !== 'object' && typeof obj !== 'function' || obj === null) throw new TypeError('Object.keys called on non-object');

      var result = [];

      for (var prop in obj) {
        // in 中的 prop 会带有从原型链上继承到的属性
        // hasOwnProperty 会忽略掉那些从原型链上继承到的属性
        if (hasOwnProperty.call(obj, prop)) result.push(prop);
      }

      if (hasDontEnumBug) {
        for (var i = 0;i < dontEnumsLength; i++) {
          if (hasOwnProperty.call(obj, dontEnums[i])) result.push(dontEnums[i]);
        }
      }

      return result;
    }
  })()
};
```

::: tip 延伸
**什么是可枚举属性？**

- 可枚举属性是指那些内部 “可枚举” 标志设置为 `true` 的属性，对于通过直接的赋值和属性初始化的属性，该标识值默认为 true，而对于使用 `Object.defineProperty` 等定义的属性，该标识值默认为 false。
- JavaScript 中引用类型的原型属性是不可枚举的，如 Object, Array, Number 等。
- 可枚举属性可以通过 `for...in` 进行循环遍历（属性名是 Symbol 类型除外）。也可以使用 `Object.keys` 返回一个可枚举属性的数组。

**作用**

将一些属性开发出来，方便开发者访问和使用。
:::