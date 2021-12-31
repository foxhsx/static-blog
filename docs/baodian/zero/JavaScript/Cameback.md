---
title: 编写一个转换驼峰形式的函数
date: 2020-12-5
tags:
 - JavaScript
 - 面试
categories:
 - front
---

编写一个转换驼峰形式的函数。

::: tip

思路：首先分割字符串得到数组，然后排出数组的第一项，剩余的每个值，将把它的第一个字母都转为大写，最后将数组中的值都拼接起来。

**解析**

1. 分割字符串，得到数组
2. 遍历数组
3. 除第一个值之外的其他值，都将把第一个字母转为大写
4. 最后将转换完的值拼接起来

:::

```javascript
var styleName = 'border-left-color';
function camelback(str) {
    // 通过 - 这个分隔符将 str 拆分成数组,并且声明一个变量，来存储转换后的值，默认是数组的第一项
    var arr = str.split('-'), newStr = arr[0]
    // 从第二个单词开始转换，这里的 i 开始应该是1
    for (var i=1,len = arr.length; i < len;i++) {
        // 将每个单词的首字母转换成大写
        var upperWord = arr[i].charAt(0).toUpperCase();  // 返回一个转换后的字符串，并没有改变该项的值
        // 将每一项除首字母之外的值拿出来，并与转换好的大写字母做拼接
        var surplusWord = arr[i].slice(1);
        newStr += (upperWord+surplusWord);
    }
    return newStr;
}

var camelFormat = camelback(styleName);
```

