---
title: Object.assign
date: 2021-04-06
tags:
 - JavaScript
 - 面试
categories:
 - front
---

我们之前在说浅拷贝的时候，提到过可以使用 Object.assign 来实现一个一层深拷贝。今天我们来详细说一下这个 API。

### 目的
用于将所有可枚举属性的值从一个或多个源对象分配到目标对象。最后返回目标对象。

### 语法及参数
```js
Object.assign(target, ...sources)
```

> **target**：目标对象
> **sources**：源对象
> **返回值**：目标对象

如果目标对象中的属性具有相同的键，则属性将被源对象中的属性覆盖。后面的源对象的属性将类似地覆盖前面的源对象的属性。

Object.assign 方法只会拷贝源对象自身的可枚举的属性到目标对象。该方法使用源对象的 `[[Get]]` 和目标对象的 `[[Set]]`，所以它会调用相关的 getter 和 setter。

### 源码实现

```js
if (typeof Object.assign !== 'function') {
  Object.defineProperty(Object, 'assign', {
    value: function (target, varArgs) {
      'use strict';
      if (target === null || target === undefined) {
        throw new TypeError('Cannot convert undefined or null to object');
      }

      // 会把目标转为对象
      var to = Object(target);

      for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index];

        if (nextSource !== null && nextSource !== undefined) {
          for (var nextKey in nextSource) {
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
      return to;
    },
    writable: true,
    configurable: true
  })
}
```

通过以上代码片段可以看出：
1. 首先，目标对象不能是 null 或者是 undefined；
2. 其次，源对象的值传进来之后的处理规则会有不同，如果这些参数无法转为对象，就会跳过。这也意味着如果首参不是 `undefined` 和 `null` 就不会报错。
3. 原始类型会被包装，但是这里只有字符串的包装对象才可能有自身可枚举属性，其他值都不会产生效果。
   ```js
    Object(true) // {[[PrimitiveValue]]: true}
    Object(10)  //  {[[PrimitiveValue]]: 10}
    Object('abc') // {0: "a", 1: "b", 2: "c", length: 3, [[PrimitiveValue]]: "abc"}
   ```
4. 在数组的处理上，会把数组视为对象，下面代码里，目标数组被视为属性名为 `0,1,2` 的对象，因此源数组的 0 号属性 4 会覆盖目标数组的 0号属性0.
   ```js
   Object.assign([1,2,3], [4,5]);
   // [4,5,3]
   ```

