---
title: Vuejs 中常用的工具函数
date: 2021-05-06
tags:
 - Vue
 - JavaScript
categories:
 - front
---

1. isUndef

::: tip 作用

判断参数是否是 undefined 或者是 null

:::

```js
function isUndef (v) {
    return v === undefined || v === null
}
```

2. isDef

::: tip 作用

判断参数已定义且不为空

:::

```js
function isDef (v) {
    return v !== undefined && v !== null
}
```

3. isTrue

::: tip 作用

判断参数是否为 true

:::

```js
function isTrue(v) {
    return v === true
}
```

4. isFalse

::: tip 作用

判断参数是否为 false

:::

```js
function isFalse (v) {
    return v === false
}
```

5. isPrimitive

::: tip 作用

判断参数是否是原始类型的值

:::

```js
function isPrimitive(v) {
    return (
        typeof v === 'string' || 
        typeof v === 'number' || 
        typeof v === 'symbol' || 
        typeof v === 'boolean'
    )
}
```

6. isObject

::: tip 作用

是否是对象类型

:::

```js
function isObject (obj) {
    return obj !== null && typeof obj === 'object'
}
```

7. toRawType

::: tip 作用

准确获取基本数据类型和引用数据类型

:::

```js
function toRawType (v) {
    return _toString.call(v).slice(8, -1)
}
```

8. isPlainObject

::: tip 作用

判断是否是普通对象

:::

```js
function isPlainObject (obj) {
    return _toString.call(obj) === '[object Object]'
}
```

9. isRegExp

::: tip 作用

判断是否是正则表达式

:::

```js
function isRegExp (v) {
    return _toString.call(v) === '[object RegExp]'
}
```

10. isValidArrayIndex

::: tip 作用

检查参数是否是有效的数组索引

:::

```js
function isValidArrayIndex (val) {
    const n = parseFloat(String(val));
    return n >= 0 && Math.floor(n) === n && isFinite(n);
}
```

11. isPromise

::: tip 作用

判断是否是 Promise 对象

:::

```js
function isPromise (v) {
    return (
        isDef(v) && 
        typeof v.then === 'function' &&
        typeof v.catch === 'function'
    )
}
```

12. toString

::: tip 作用

将参数转为字符串

:::

```js
function toString(val) {
    return val == null
        ? ''
        :  Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
        ? JSON.stringify(val, null, 2)
        : String(val)
}
```

13. toNumber

::: tip 作用

将参数转为数字，如果转换失败，则返回原始字符串

:::

```js
function toNumber(v) {
    var n = parseFloat(v);
    return isNaN(n) ? v : n
}
```

14. makeMap

::: tip 作用

创建一个 Map 数据，并返回一个函数，以检查某个键是否在这个 Map 中

:::

```js
function makeMap (
	str,
     expectsLowerCase
) {
	var map = Object.create(null);
    var list = str.split(',');
    for (var i = 0; i < list.length; i++) {
        map[list[i]] = true;
    }
    return expectsLowerCase
        ? function (val) { return map[val.toLowerCase()]; }
        : function (val) { return map[val]; }
}
```

Vue 源码里以此为基础又新建了两个检查属性和内置标记的方法：

```js
/**
 * Check if a tag is a built-in tag.
*/
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
*/
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');
```

15. remove

::: tip 作用

从一个数组中删除某一项

:::

```js
function remove (arr, item) {
    if (arr.length) {
        var index = arr.indexOf(item);
        if (index > -1) {
            return arr.splice(index, 1)
        }
    }
}
```

16. hasOwn

::: tip 作用

检查对象是否具有某属性

:::

```js
function hasOwn (obj, key) {
    return hasOwnProperty.call(obj, key)
}
```

17. toArray

::: tip 作用

将类数组转为数组

:::

```js
function toArray (list, start) {
    start = start || 0;
    var i = list.length - start;
    var ret = new Array(i);
    while (i--) {
        ret[i] = list[i + start];
    }
    return ret
}
```

18. _toString

::: tip 作用

获取值的原始类型字符串

:::

```js
const _toString = Object.prototype.toString;
```

19. hasOwnProperty

::: tip 作用

检查对象是否具有某属性

:::

```js
const hasOwnProperty = Object.prototype.hasOwnProperty;
```

20. extend

::: tip 作用

将属性合并到目标对象中去

:::

```js
function extend (to, _from) {
    for (var key in _from) {
        to[key] = _from[key];
    }
    return to
}
```

21. toObject

::: tip 作用

将一个对象数组合并为单个对象

:::

```js
function toObject (arr) {
    var res = {};
    for (var i = 0; i < arr.length; i++) {
        if (arr[i]) {
            extend(res, arr[i])
        }
    }
    return res
}
```

这里只是挑选了一些会常用的工具函数，还有其他的方法可以移步到 Vue 源码查看。