---
title: JavaScript内置对象——Math对象
date: 2020-12-5
tags:
 - JavaScript
categories:
 - front
---

[[toc]]

## **min()**

语法：

```javascript
Math.min(num1,num2,...,numN)
```

功能：求一组数中的最小值。

返回值：Number。

注意：如果这组数中出现一个非数字，则返回 NaN。

```javascript
var min = Math.min(5,55,89,-11,-85,99)
console.log(min); // -85
```

## **max()**

语法：

```javascript
Math.max(num1,num2,...,numN)
```

功能：求一组数中的最大值。

返回值：Number。

注意：如果这组数中出现一个非数字，则返回 NaN。

```javascript
var max = Math.max(5,55,89,-11,-85,99)
console.log(max); // 99
```

## **ceil()**

语法：

```javascript
Math.ceil(num1)
```

功能：**向上取整**，即返回大于num的最小整数。

返回值：Number。

```javascript
var num = Math.ceil(189.99);
console.log(num);  // 190
```

## **floor()**

语法：

```javascript
Math.floor(num1)
```

功能：**向下取整**，返回num的整数部分。

返回值：Number。

```javascript
var num = Math.floor(189.99);
console.log(num);  // 189
```

## **round()**

语法：

```javascript
Math.round(num)
```

功能：将数值四舍五入为最接近的整数。

返回值：Number。

```javascript
var num = Math.round(189.99);
var num1 = Math.round(189.09);
console.log(num);  // 190
console.log(num1);  // 189
```

## **abs()**

语法：

```javascript
Math.abs(num)
```

功能：返回num的绝对值。

返回值：Number。

```javascript
var num = Math.abs(-55);
console.log(num);  // 55
```

## **random()**

语法：

```javascript
Math.random()
```

功能：返回大于等于0小于1的一个随机数。

返回值：Number。

::: tip

求n到m之间的随机整数的公式：

**解析**：

1. 首先生成n-m的随机整数的总个数是m-n+1。
2. 规律：再用这个总数去乘以 random，但是random的最小值有可能为0，所以这里我们应该再加上n，此时得到的数为这个区间范围内的最小值。
3. 再向下取整，就得到这个区间范围的随机整数了。

random = Math.floor(Math.random()*(m-n+1)+n)

:::

```javascript
var random = Math.random();
console.log(random);

function getRandom(n,m) {
    var choise = m - n + 1;  // 随机整数的个数
    return Math.floor(Math.random()*choise+n)
}
var random1 = getRandom(2,6);
console.log(random1);
```

