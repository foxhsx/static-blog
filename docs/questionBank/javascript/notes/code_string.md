---
title: String编程题
date: 2020-12-5
tags:
 - 题库
categories:
 - front
---

1. 封装一个函数，用来对邮箱进行解析，解析出邮箱的用户名和邮箱的域名。

::: tip

第一种——使用 split

思路：

1. 首先邮箱中 @ 符号前面的是用户名，而后面的是域名
2. 然后使用 split 方法就可将用户名和域名分解开

第二种——使用 indexOf和slice

思路:

1. 首先获取邮箱中 @ 对应的下标
2. 再使用 slice 获取开始到@下标前面的值，这个就是用户名
3. 再从@下标的后一项开始到最后，就是域名

:::

```javascript
// split
function getEmailInfo(email) {
    var arr = email.split('@')
    return {
        name: arr[0],
        url: arr[1]
    }
}

var emailInfo = getEmailInfo('worldhsx@163.com');

// indexOf 和 slice
function indexOfGetEmailInfo(email) {
    var index = email.indexOf('@')
    return {
        name: email.slice(0,index),
        url: email.slice(index+1)
    }
}

var emailInfoIndex = indexOfGetEmailInfo('worldhsx@163.com');
```

2. 将字符串‘Never deter till tomorrow that which you can do today’中的'tomorrow'转换为大写。

::: tip

思路：

1. 首先获取字符位置
2. 截取到 tomorrow 这个单词——三种方式
3. 然后使用 toUpperCase() 的方法将其转成大写
4. 最后再将这个大写的单词替换进去或者循环拼接

:::

```javascript
var str = 'Never deter till tomorrow that which you can do today';
// 先获取位置
var index = str.indexOf('tomorrow');
// 再截取字符--tomorrow单词长度为8
var needWord = str.slice(index, index+8);  // slice
// var needWord = str.substring(index, index+8);  // subtring
// var needWord = str.substr(index, 8);  // substr
// 转大写
var upWord = needWord.toUpperCase();
str.replace('tomorrow', upWord);
```

