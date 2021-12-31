---
title: Array基础题
date: 2020-12-9
tags:
 - 题库
categories:
 - front
---

1. 下面代码的运行结果是？

```javascript
var arr = [1,2,3,4,5,6];
var index = arr.indexOf(3,6);
console.log(index);
```

答案：-1	[解析](../../../frontend/javascript/notes/builtInObjects/Array.html#十二、indexof)

2. 下面代码运行结果是？

```javascript
var arr = ['good', 'good', 'study', 'day', 'day', 'up'];
console.log(arr.splice(2,1,'eat'));
console.log(arr);
```

答案： ['study']  ['good', 'good', 'eat', 'day', 'day', 'up']	[解析](../../../frontend/javascript/notes/builtInObjects/Array.html#十一、splice)

3. 下面代码运行的结果是？

```javascript
var arr = [12,4,3,-9,35,0];
arr.reverse();
console.log(arr);
```

答案： [0, 35, -9, 3, 4, 12]	[解析](../../../frontend/javascript/notes/builtInObjects/Array.html#七、数组的重排序方法)