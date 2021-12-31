---
title: JavaScript之if_else
date: 2020-12-6
tags:
 - JavaScript
categories:
 - front
---

语法一：

```javascript
if (condition) {
    stattement1;
}
```

例：

```javascript
var age = 15;
if (age < 18) {
    alert('您还未成年')
}
```

语法二：

```javascript
if (condition) {
    stattement1;
} else {
    stattement2;
}
```

例：

```javascript
var age = prompt('请输入您的年龄');
if (age < 18) {
    alert('您还未成年')
} else {
    alert('您已成年')
}
```

语法三：

```javascript
if (condition) {
    stattement1;
} else-if(condition1) {
    stattement2;
} else {
    stattement3;
}
```

例：

```javascript
var age = prompt('请输入您的年龄');
if (age < 18) {
    alert('您还未成年')
} else-if(age >=18 && age <= 59) {
    alert('您已成年')
} else {
    alert('您已超出年龄限制')
}
```

**练习：**编写一段代码，用来判断输入的密码是否符合条件：

1. 密码长度是6位
2. 密码必须是纯数字

```javascript
var password = prompt('请设置您的密码');
// 判断密码的长度
if (password.length != 6) {
    alert('请输入6位的数字密码');
} else {
    // 如果密码是数字
    if(isNaN(password)) {
        alert('密码必须要是数字');
    } else {
        alert('密码设置正确');
    }
}
```

## **随堂练习**

1. 下面代码的运行结果是？

```javascript
var str = 'HELLO123';
var num = parseInt(str);
if (num == NaN) {
    alert('NaN')
} else if (num == 123) {
    alert(123)
} else if (typeof num == 'number') {
    alert('number');
} else {
    alert('str')
}
```

答案：alert('number') 

::: tip

1. parseInt()方法初始值不是数字时，返回值为NaN
2. NaN不等于NaN，所以第一项排出
3. 由此只有 `num=='number'` 为真，所以最后执行 `alert('number')`

:::

2. 页面上输出99 97 95 93 91 89 87 85 ... 1

```javascript
for (var i=99;i>=1;i-=2) {
    console.log(i);
}
```



