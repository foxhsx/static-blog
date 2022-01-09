---
title: 编写js函数，用于获取输入参数的后缀名
date: 2020-12-4
tags:
 - JavaScript
 - 面试
categories:
 - front
---

编写js函数，用于获取输入参数的后缀名，如输入 abc.txt，返回 .txt。

::: tip

思路：先获取位置，再进行截取

**解析**

1. 首先，我们需要声明一个获取后缀名的函数——getFileFormat
2. 其次需要传一个参数进去，这个参数就是文件名
3. 要获取这个参数中倒数第一个点的位置——因为扩展名都是出现在最后的
4. 然后使用 string 的截取方法将其截取出来

:::

```javascript
// 获取扩展名
var url = 'index.txt';
function getFileFormat(url) {
    // 获取 . 在 url 中出现的位置
    var pos = url.lastIndexOf('.');
    return url.substr(pos);
    // return url.substring(pos);
    // return url.slice(pos);
}

var formatName = getFileFormat(url);
```

