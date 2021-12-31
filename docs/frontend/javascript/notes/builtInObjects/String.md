---
title: JavaScript内置对象——String字符串
date: 2020-12-2
tags:
 - JavaScript
categories:
 - front
---

:flags:**学习目标：**

[[toc]]

## **一、charAt()**

语法：

```javascript
string.charAt(index)
```

功能：返回 string 中 index 位置的字符。

说明：

ECMAScript5中可使用“方括号加字符索引”来访问字符串中特定的字符，但是IE7及更早的浏览器会返回 undefined.

```javascript
var str = 'hello world';
console.log(str[1]);  // e
console.log(str.charAt(0));  // h
console.log(str.charAt(15));  // ''  取不到返回一个空字符串
```

## **二、charCodeAt()**

语法：

```javascript
string.charCodeAt(index)
```

功能：返回 string 中 index 位置字符的字符编码。

```javascript
var str = 'hello world';
console.log(str.charCodeAt(4));  // o 的字符编码为 111
```

## **三、indexOf()**

语法：

```javascript
string.indexOf('o')
```

功能：从一个字符串中搜索给定的子字符串，返回子字符串的位置。只检测第一次出现的位置。

返回值：数值。

说明：如果没有找到该子字符串，则返回 -1.

```javascript
var str = 'hello world';
console.log(str.indexOf('r'));  // 8
console.log(str.indexOf('x'));  // -1
console.log(str.indexOf('ll'));  // 2 检测一个子串  第一个 l 出现的位置
```

## **四、lastIndexOf()**

语法：

```javascript
string.lastIndexOf('o')
```

功能：从一个字符串中搜索给定的子字符串，返回子字符串的位置。只检测第一次出现的位置且是从右向左检测。但是下标还是要从左开始。

返回值：数值。

说明：如果没有找到该子字符串，则返回 -1.

```javascript
var str = 'hello world';
console.log(str.lastIndexOf('r'));  // 8
console.log(str.lastIndexOf('x'));  // -1
console.log(str.lastIndexOf('ll'));  // 2 检测一个子串  第一个 l 出现的位置
```

## **五、slice()**

语法：

```javascript
string.slice(start, end)
```

功能：

- 截取子字符串

参数说明：

1. start: 必需，指定子字符串的开始位置
2. end: 可选，表示子字符串到哪里结束，end 本身不在截取范围之内，省略时截取至字符串的末尾。
3. 当参数为负数时，会将传入的负值与字符串的长度相加。

```javascript
var str = 'hello world';
console.log(str.slice(7,10));  // orl
console.log(str.slice(7));  // orld
// 字符串长度为11,11加-3，等于8，所以相当于从8位开始截取
console.log(str.slice(-3));  // rld
// 字符串长度为11,11加-7，等于3，11加-2，等于9，所以相当于从4位开始截取到第九位
console.log(str.slice(-7， -2));  // o wor
```

## **六、substring()**

说明：语法及功能同 slice() 完全一样

```javascript
var str = 'hello world';
console.log(str.substring(1,4));  // ell
console.log(str.substring(-7,5));  // hello
console.log(str.substring(-7,-5));  // ''
console.log(str.substring(2,-5));  // hel
```

::: tip

区别：

1. 当参数为负数时，自动将参数转换为0
2.  substring() 会将较小的数作为开始位置，将较大的数作为结束位置。

:::

## **七、substr()**

语法：

```javascript
string.substr(start,len)
```

功能：截取字符串。

参数说明：

1. start：必需，指定子字符串的开始位置。
2. len：可选，表示截取的字符总数，省略时截取至字符串的末尾。
3. 当 start 为负数时，会将传入的负值与字符串的长度相加。
4. 当 len 为负数时，返回空字符串。

```javascript
var str = 'hello world';
console.log(str.substr(6,3));  // wor
console.log(str.substr(-5,4));  // worl
console.log(str.substr(3,-5));  // ''
```

## **八、split()**

语法：

```javascript
string.split(separator)
```

功能：把一个字符串分割成字符串数组。

返回值：Array。

说明：

- separator：必需，分隔符

```javascript
var str = 'welcome-to-xian';
// 使用 split 将 str 转换为数组
var arr = str.split('-');
console.log(arr);  // ['welcome', 'to', 'xian']
```

## **九、replace()**

语法：

```javascript
string.replace(regexp/subtr, replacement)
```

功能：在字符串中用一些字符替换另一些字符，或替换一个与正则表达式匹配的字符串。

返回值： String。

参数：

- regexp：必需。规定子字符串或要替换的模式的 RegExp 对象。
- replacement：必需。一个字符串值。

```javascript
var tel = '010-62971268,400-100-9098,010-86789889';
var newTel = tel.replace(',', '')
console.log(newTel);  // 010-62971268400-100-9098,010-86789889
console.log(tel);     // 010-62971268,400-100-9098,010-86789889
```

::: tip

1. 不会改变原字符串的值，而是返回一个处理过的新字符串
2. 只会替换第一个匹配到的字符

:::

## **十、toUpperCase()和toLowerCase()**

语法：

```javascript
string.toUpperCase()
```

功能：把字符串转换为大写。

说明：并没有改变原字符串

```javascript
var str = 'hello world';
console.log(str.toUpperCase());  // HELLO WORLD
```



语法：

```javascript
string.toLowerCase()
```

功能：把字符串转换为小写。

说明：并没有改变原字符串

```javascript
var str = 'HELLO WORLD';
console.log(str.toLowerCase());  // hello world
```

## **附加、字符串面试题**

[编写 js 函数，用于获得输入参数的后缀名，如输入 abc.txt，返回 .txt。](../../../../baodian/zero/JavaScript/notes/String.html)

[编写一个转换驼峰形式的函数](../../../../baodian/zero/JavaScript/notes/cameback.html)