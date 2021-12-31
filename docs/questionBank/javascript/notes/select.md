---
title: JavaScript其他基础题综合
date: 2020-12-9
tags:
 - 题库
categories:
 - front
---

1. 下面代码运行的结果是？

```javascript
console.log(!false);
console.log(!456);
console.log(!0);
```

答案：true  false  true

2. 下面代码在控制台的运行结果是？

```javascript
var a = 10, b = 20;
a+=12;
b%=3;
console.log(a+b);
console.log(a>b);
```

答案：24 true

3. 代码的运行结果是？

```javascript
var num = 0;
for(var i=0;i<10;i++) {
    if (i==3) {
        continue;
    }
    num++;
}
console.log(num);
```

答案：9	[解析](../../../frontend/javascript/notes/processControl/loop.html#continue)

