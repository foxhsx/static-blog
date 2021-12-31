---
title: JavaScript之循环语句
date: 2020-12-7
tags:
 - JavaScript
categories:
 - front
---

常用的循环语句是有：`for`、`for-in`、`while`、`do...while`

[[toc]]

## **for**

语法：

```javascript
for(语句1；语句2；语句3) {
    被执行的代码块；
}
```

::: tip

- 语句1：在循环（代码块）开始前执行
- 语句2：定义运行循环（代码块）的条件
- 语句3：在循环已被执行之后执行

:::

```javascript
// 循环的初始值  // 循环条件  // 变量的变化
for(var i=0;i<100;i++) {
    document.write(i+'<br/>');
}

// 输出 99 97  95 ... 3 1
for(var m=99;m>=1;m-=2) {
    document.write(m+'<br/>');
}
console.log(m);   // -1
```

## **嵌套**

当循环与循环发生嵌套时遵循下列规则：

1. 外层为假时内层不执行；
2. 先执行外层再执行内层，直至内层的条件为假时再返回外层去执行。

```javascript
for(var i=0;i<=3;i++) {
    document.write(i+'<br/>');
    document.write('<hr/>');
    for(var j=1;j<=5;j++) {
        document.write(j+'<br/>');
    }
}
```

## **while**

语法：

```javascript
while(条件) {
    需要执行的代码;
}
```

例：

```javascript
var i = 1;
while(i<=100) {  // 一定要有满足的条件，否则会写成死循环
    document.write(i+'<br/>');
    i+=1;
}
```

## **do...while**

语法：

```javascript
do {
    需要执行的代码;
}while(条件)
```

说明：这种语法的循环至少要被执行一次。

例：

```javascript
var j = 1;
do {
    if (j%2 ==0) {
        console.log(j);
    }
    j++;
}while(j<=10);
```

## **for与while的区别**

| for   | 适合已知循环次数的循环体 |
| ----- | ------------------------ |
| while | 适合未知循环次数的循环体 |

## **break**

立即退出循环

```javascript
var num = 0;
for (var i=1;i<10;i++) {
    // 如果i是5的倍数，退出
    if (i%5==0) {
        break;
    }
    num++;
    console.log(i);  // 1 2 3 4
    console.log(num);  // 循环次数  4
}
for (var s=0,j=1;j<=10;j++) {
    if (j%5==0) {
        break;
    }
    s+=j;
}
console.log(s);   // 10
```



## **continue**

结束本次循环，继续开始下一次

```javascript
var num = 0;
for (var i=1;i<10;i++) {
    // 如果i是5的倍数，退出
    if (i%5==0) {
        continue;
    }
    num++;
    console.log(i);  // 1 2 3 4 6 7 8 9
    console.log(num);  // 循环次数  8
}
for (var s=0,j=1;j<=10;j++) {
    if (j%5==0) {
        continue;
    }
    s+=j;
}
console.log(s);   // 40
```

打印所有0-50之间除了20和30之外的5的倍数

```javascript
for (var n=0;n<=50;n+=5) {
    if (n==20 || n == 30) {
        continue;
    }
    console.log(n);
}
```

## **总结**

| 循环类型       | 语法                                                        | 使用场景                           |
| -------------- | ----------------------------------------------------------- | ---------------------------------- |
| for            | for(语句1；语句2；语句3) {<br />被执行的代码块<br />}       | 循环次数是固定的                   |
| while          | while(条件){<br />需要执行的代码;<br />变量变化语句;<br />} | 循环次数不是固定的                 |
| do...while循环 | do{<br />需要执行的代码;<br />}while(条件)                  | 不管条件符合不符合，先执行一次代码 |



## **随堂练习**

1. 代码的运行结果是？

```javascript
var i=1;
while(i<=10) {
    document.write(i);
}
```

答案：页面一直输出1，因为条件不符合，陷入死循环。

2. 代码的运行结果是？

```javascript
for(var i=0;i<=10;i++) {
    if (i==3) {
        break;
    }
    console.log(i)
}
```

答案：0 1 2

