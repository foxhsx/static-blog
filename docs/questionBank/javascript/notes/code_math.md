---
title: Math编程题
date: 2020-12-5
tags:
 - 题库
categories:
 - front
---

1. 随机生成10个0-100之间的整数，放入数组中，对这个数组进行降序排序，并获取到这个数组的最大值和最小值。

::: tip

**思路：**

1. 先定义一个空数组用来存储生成的随机数
2. 写一个生成随机整数的方法
3. 循环调用该方法10次，并将生成的随机数放入数组中
4. 使用数组的 sort方法，传入一个降序的回调函数
5. 使用 Math.max和Math.min方法，传入参数时进行解构

:::

```javascript
// 先定义一个空数组用来存储生成的随机数
var arr = [];
// 写一个生成随机整数的方法
function getRandom(n,m) {
    var choise = m - n + 1;  // 随机整数的个数
    return Math.floor(Math.random()*choise+n)
}

// 循环10次，在循环中调用该方法，生成随机整数，并 push 到数组中
for (var i=0;i<10;i++) {
    var num = getRandom(0,100);
    arr.push(num);
}
// 使用数组的 sort 方法对数组进行降序排序，传入一个回调
arr.sort(function (a, b) {
    return b - a
})
var max = Math.max(...arr);  // Math.max.apply(null, arr)
var min = Math.min(...arr);
console.log(arr);
console.log(max);
console.log(min);
```

