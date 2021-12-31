---
title: JavaScript内置对象——Date对象
date: 2020-12-5
tags:
 - JavaScript
categories:
 - front
---

[[toc]]

## **创建日期对象**

语法:

```javascript
new Date()
```

功能：创建一个日期时间对象。

返回值：不传参的情况下，返回当前的日期时间对象。

说明：

如果想根据特定的日期和时间创建日期对象，必须传入表示该日期的毫秒数或者是一组用逗号隔开的表示年月日时分秒的参数。

```javascript
var weeks = ['日','一','二','三','四','五','六']
var today = new Date(),
    year = today.getFullYear(),
    month = today.getMonth()+1,
    date = today.getDate(),
    week = today.getDay(),
    hours = today.getHours(),
    minutes = today.getMinutes(),
    seconds = today.getSeconds(),
    time = year + '年' + month + '月' + date+'日'+hours+'时'+minutes+'分'+seconds+'秒';
var week = weeks[week];
```

## **获取日期**

**获取年月日时分秒及星期的方法**

1. getFullYear()：返回四位数的年份
2. getMonth()：返回日期中的月份，返回值为0-11，一般我们要在返回值的基础上加1
3. getDate()：返回月份中的日期
4. getDay()：返回星期，返回值为0-6
5. getHours()：返回小时
6. getMinutes()：返回分钟
7. getSeconds()：返回秒
8. getTime()：返回表示日期毫秒数——**表示从1970年的1月1日00:00:00开始到现在的毫秒数**

## **设置日期**

**设置年月日时分秒及星期的方法**

1. setFullYear(year)：设置四位数的年份
2. setMonth(mon)：设置月份，从0开始，0表示1月
3. setDate()：设置日期
4. setDay()：设置星期，从0开始，0表示星期日
5. setHours()：设置小时
6. setMinutes()：设置分钟
7. setSeconds()：设置秒
8. setTime()：以毫秒数设置日期，会改变整个日期

那么我们也可以直接在创建日期对象的时候传入参数，来达到设置日期的效果，而且更加简单直接。

注意：传入参数时，年月日为必填，时分秒可选。

```javascript
new Date(year, month, day, hours, minutes, seconds);
```

## **getMonth()对比setMonth()**

|        | getMonth()                           | setMonth()                                                   |
| ------ | ------------------------------------ | ------------------------------------------------------------ |
| 定义   | 返回表示月份的数字                   | 用于设置月份                                                 |
| 用法   | date.getMonth()                      | date.setMonth(month, day)                                    |
| 参数   | 无                                   | Month：必需。是一个表示月份的数值，这个数值是0（一月）~11（十二月）之间<br />-1为去年的最后一个月<br />12为明年的第一个月<br />13为明年的第二个月 |
|        |                                      | day：可选。表示月份的某一天的数值，这个数值是1-31之间<br />如果当月有31天，32为下个月的第一天<br />如果当月有30天，32为下个月的第二天 |
| 返回值 | 0（一月）~11（十二月）之间的一个整数 | 调整过的日期的毫秒数                                         |

```javascript
// setMonth——只有一个参数month
var today = new Date();
console.log(today.setMonth(2));  // 1583461859931
console.log(today.getMonth());   // 2  实际是三月

// setMonth——参数month和day
today.setMonth(3,32);
console.log(today.getMonth());  // 4  因为后面32缘故，其实已经是5月了
console.log(today.getDay());    // 2
```

::: tip

**解析:**

1. 如果只设置1个月份参数：setMonth(3)，那么 getMonth() 的值就是3，实际月份是4月
2. 但除了传递月份外，还传递了天数，目前的月份为4月，而四月份的天数是30天，32明显超过了30，所以月份进1，天数为2
3. 所以就得到 getMonth()  为 4

:::