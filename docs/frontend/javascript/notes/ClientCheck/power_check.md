---
title: 能力检测
date: 2021-02-24
tags:
 - JavaScript
categories:
 - front
---

- 能力检测：
  - 概念
  - 安全能力检测
  - 基于能力检测进行浏览器分析
  - 局限

## 概念

能力检测（又称为特性检测）即在 JavaScript 运行时中使用一套简单的检测逻辑，测试浏览器是否支持某种特性。你不需要事先知道某个浏览器的信息，只需要关心这个能力或者说是特性是否存在。基本模式如下：

```js
if (object.propertyInQuestion) {
    // 使用 object.propertyInQuestion
}
```

比如 IE5 之前的版本中没有 `document.getElementById()` 方法，但是可以通过 `document.all()` 属性实现同样的功能。

```js
function getElement(id) {
    if (document.getElementById) {
        return document.getElementById(id);
    } else if (document.all) {
        return document.all[id];  // 注意是中括号
    } else {
        throw new Error("No way to retrieve element");
    }
}
```

那上面就是一段简单的能力检测代码，我们也可以认为是程序健壮性检测。它的作用就是检测是否存在 `document.getElementById`，如果不存在则去检测 `document.all` 是否存在，两者都不存在（基本不可能）抛出错误。

能力检测的关键是理解两个概念：

1. 应该先检测最常用的方法，这种方案可以优化代码执行，避免无谓的检测；
2. 必须检测切实需要的特性。某个能力存在时并不代表别的能力也存在。

关于第二点，我们来看个例子：

```js
function getWindowWidth() {
    if (document.all) {
        return document.doucmentElement.clientWidth;  // 错误的用法
    } else {
        // IE8 及更低版本不支持
        return window.innerWidth;
    }
}
```

上述代码的用法明显不正确，它的本意是想通过检测 `document.all` 来确认是否是 IE 浏览器，但是实际上也可能是早期的 Opera 浏览器，它既支持 `document.all` 也支持 `window.innerWidth`。

## 安全能力检测

能力检测最有效的场景是***检测能力是否存在的同时，检验其是否能够展现出预期的行为***。来看个例子：

```js
const obj = {
    sort: ''
}

if (obj.sort) {
    return obj.sort()  // 抛出异常
}
```

我们本来是想检测对象是否支持 sort 方法，但是这里的对象还有一个 sort 属性，那这时 if 判断中还是会返回 true，实际上 sort 在这里只是一个空字符串，而并非一个 function。

所以简单地测试一个属性存在并不代表这个对象就可以排序。更好的方式是检测某 sort 是否是一个 function，它是否可用。

```JS
function isSortable(object) {
    return typeof obejct.sort === 'function'
}
```

进行能力检测时应该尽量使用 typeof 操作符。