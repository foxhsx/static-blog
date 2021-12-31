---
title: JavaScript之函数
date: 2020-12-8
tags:
 - JavaScript
categories:
 - front
---

[[toc]]

## **函数作用**

通过函数可以封装任意多条语句，而且可以在任何地方、任何时候调用执行。

## **函数定义**

函数使用<span style="color:red">fucntion</span>声明，后跟一组参数以及函数体，语法如下：

```javascript
// [arg0,arg1,...argn] 中括号里的参数表示是可选的，不是必须的
function functionName([arg0,arg1,...argn]) {
    statements
}
```

说明：

1. functionName 是要定义的函数名，属于标识符
2. [] 中的 arg0,arg1,...argn 为函数的参数
3. [] 说明里面的内容不是必须的，它不是语法

```javascript
// 无参数
function myFun() {
    alert('我是一个函数')
}

// 有参数
funcrion add(num1, num2) {
    var sum = num1+num2;
    console.log(num1+'和'+num2+'的和是'+sum);
}
```

## **函数的调用**

语法：

```javascript
函数名([arg1,arg2,...argn])

// 上面的 myFun 函数调用
myFun();
add(3,5);
```

函数定义完以后一定要调用。

## **函数的返回值**

任何函数通过<span style="color:red">return</span>语句，后面跟着返回的值来实现返回值。

```javascript
funcrion add(num1, num2) {
    var sum = num1+num2;
    return sum;
}

var computeSum = add(3,5);
console.log(computeSum);  // 8
```

说明：

1. 函数会在执行完<span style="color:red">return</span>语句之后停止并立即退出。
2. return 语句也可以不带任何返回值，一般用于需要提前停止函数执行而又不需要返回值的情况下。

## **参数**

ECMAScript 中的参数在内部用一个数组来表示，在函数体内通过 arguments 对象来访问这个数组参数。

说明：

1. arguments 对象只是与数组类似，并不是Array的实例
2. [] 语法访问它的每一个元素
3. length 属性确定传递参数的个数

```javascript
function inner() {
    // arguments
    console.log(arguments.length); // 2
    console.log(arguments[0]); // 10
}
inner(10,5);

function add(num1,num2) {
    // 如果是严格模式下，则不变，否则就会被修改掉
    arguments[0] = 99;
    console.log(num1);  // 99
}
add(55,88);
```

## **随堂练习**

1. 封装一个函数，用来求任意一组数的平均值

```javascript
function getAvg() {
    var sum = 0, len = arguments.length, i;
    for (i=0;i<len;i++) {
        sum+=arguments[i];
    }
    return sum/len;
}
var sum1 = getAvg(10,22,56,5,70);
console.log(sum1);  // 32.6
```

2. 下面这段代码运行结果是？

```javascript
function fun1(num1, num2) {
    return num1 + num2;
    alert('hello')
}
console.log(fun1(3,4))
```

答案：7

3. 下面代码运行的结果是

```javascript
function funName() {
    return arguments.length + '和' + arguments[1]
}
console.log(funName(1,2,3,4,5))
```

答案：5和2