---
title: String基础题
date: 2020-12-5
tags:
 - 题库
categories:
 - front
---

1. 下面的代码运行结果是

```javascript
var str = 'hello monkey,hello tiger';
alert(str.indexOf('o'))
```

答案：4	[解析](../../../frontend/javascript/notes/builtInObjects/String.html#三、indexof)

2. 代码中运行的结果是？

```javascript
var str = '不积跬步无以至千里';
var strNew = str.substr(-4,8);
console.log(strNew);
```

答案：'以至千里'	[解析](../../../frontend/javascript/notes/builtInObjects/String.html#七、substr)

3. 下面代码的运行结果是？

```javascript
var str = 'tom/how/are/you/doing/today';
var arr = str.split('/');
console.log(arr);
```

答案：['tom', 'how', 'are', 'you', 'doing', 'today']	[解析](../../../frontend/javascript/notes/builtInObjects/String.html#八、split)

4. 判断下面代码执行的结果

```javascript
var str = 'abc123';
var num = parseInt(str);

if (num == NaN) {
    alert('NaN');
} else if (num == 123) {
    alert('123');
} else if (typeof num == 'number') {
    alert('num')
} else {
    alert('str')
}
```

答案：alert('num')    [解析](../../../frontend/javascript/notes/syntax/JavaScript-数据类型.html)