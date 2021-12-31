---
title: JavaScript内置对象——Array数组
date: 2020-11-28
tags:
 - JavaScript
categories:
 - front
---

数组主要是用来存储一组数据的。

:flags:**学习目标**

[[toc]]

### **一、创建数组**

创建数组的基本方式有两种：

1. 使用 Array 构造函数

   语法：`new Array()`

   ::: tip

   小括号()说明：

   1. 预先知道数组要保存的项目数量
   2. 向 Array 构造函数中传递数组应包含的项

   :::

   ```javascript
   // 创建一个保存颜色的数组
   var colors = new Array();
   var nums = new Array(1,3,6,9);
   console.log(colors);	// []
   console.log(nums);		// [1,3,6,9]
   ```

2. 使用数组字面量表示法 

   ```javascript
   var cols = ['red','yellow','green']
   console.log(cols);  // ['red','yellow','green']
   ```

### **二、数组元素的读写**

读取和设置值时，使用方括号[]并提供相应的索引。

> 索引是从0开始的正整数

```javascript
var info = [6, 'marry', true];
console.log(info[1]);  // 'marry'
console.log(info[5]);  // undefined  取不到就会返回 undefined

var colors = new Array(3);
colors[0] = '#f00';
colors[1] = '#0f0';
colors[2] = '#00f';
console.log(colors);  // ['#f00', '#0f0', '#00f']
```

### **三、数组长度**

语法：`array.length`

功能：获取数组 array 的长度

返回值：number

::: tip

说明：

1. 通过设置 length 可以从数组的末尾移除项或向数组中添加新项。
2. 把一个值放在超出当前数组大小的位置上时，会重新计算数组长度值，长度值等于最后一项索引加1.

:::

```javascript
var arr = ['a', 'b', 'c', 'd'];
console.log(arr.length);  // 4
arr.length = 3;
console.log(arr[3]);  // undefined

arr[99] = 'z';
console.log(arr.length);  // 100
```

### **四、数组的遍历**

要拿到当前数组的每一项，我们需要遍历这个数组，使用 for 循环。

```javascript
var arr = ['a', 'b', 'c', 'd'];
// 数组的遍历
for(var i=0;i<arr.length;i++) {
    console.log(i);   // 打印索引
    console.log(arr[i]);  // 打印数组里的每一项
}
```

### **五、数组的栈方法**

1. push()

   语法：`arrayObject.push(new1,new2,...,newn)`

   功能：把它的参数顺序添加到 arrayObject 的尾部

   返回值：把指定的值添加到数组后的新长度

   ```javascript
   var arr = ['a', 'b', 'c', 'd'];
   arr.push('e');
   console.log(arr);  // ['a', 'b', 'c', 'd', 'e']
   var len = arr.push('f')
   console.log(len);  // 6
   ```

2. unshift()

   语法：`arrayObject.unshift(new1,new2,...,newn)`

   功能：把它的参数顺序添加到 arrayObject 的开头

   返回值：把指定的值添加到数组后的新长度

   ```javascript
   var arr = ['a', 'b', 'c', 'd'];
   arr.unshift('e');
   console.log(arr);  // ['e', 'a', 'b', 'c', 'd']
   var len = arr.unshift('f')
   console.log(len);  // 6
   ```

3. pop()

   语法：`arrayObject.pop()`

   功能：删除数组的最后一个元素

   返回值：被删除的那个元素

   ```javascript
   var arr = ['a', 'b', 'c', 'd'];
   arr.pop();
   console.log(arr);  // [‘a', 'b', 'c']
   var len = arr.pop()
   console.log(len);  // 'c'
   ```

4. shift()

   语法：`arrayObject.shift()`

   功能：删除元素中的第一个元素

   返回值：被删除的那个元素

   ```javascript
   var arr = ['a', 'b', 'c', 'd'];
   arr.shift();
   console.log(arr);  // ['b', 'c', 'd']
   var len = arr.shift()
   console.log(len);  // 'b'
   ```

### **六、数组的转换方法**

语法：`arrayObejct.join(separator)`

功能：用于把数组中的所有元素放入一个字符串。

参数：转换后每个值中间的连接符，默认是逗号

返回值：字符串

```javascript
var arr = ['a', 'b', 'c', 'd'];
var str = arr.join();
console.log(str);    // 2,4,5  是个 string 类型

var colors = ['red', 'yellow', 'blue'];
var colorstr = colors.join('-');
console.log(colorstr); // red-yellow-blue
```

### **七、数组的重排序方法**

语法：`arrayObejct.reverse()`

功能：用于颠倒数组中元素的顺序——倒序。

返回值：数组

```javascript
var arr = ['a', 'b', 'c', 'd'];
arr.reverse();
console.log(arr);    // ['d','c','b','a']
```

### **八、数组的 sort() 排序方法**

语法：`arrayObejct.sort(sortby)`

功能：用于数组元素的排序。

返回值：数组

::: tip

1. 即使数组中的每一项都是数值，sort()方法比较的也是字符串，会将每一项都会 toString() ，然后再比较每一项的第一位，从而进行排序。
2. sort() 方法可以接收一个比较函数作为参数

:::

```javascript
var colors = ['red', 'yellow', 'blue'];
console.log(colors.sort());    // ['blue','red','yellow']  按照首字母的顺序排序

var arr = [9,23,15,88,12];
console.log(arr.sort()); 	// [12,15,23,88,9]  按照第一位去比较
// 加比较函数
arr.sort(function (a, b) {
    return a - b;
})
console.log(arr);   //  [9,12,15,23,88]
```

:grey_question:抛出疑问

在sort方法的比较函数中这样写是否能达到同样的效果？为什么？

```javascript
var arr = [9,23,15,88,12];
arr.sort(function (a, b) {
    return a>b;
})
console.log(arr);   //  ???
```

### **九、concat()**

语法：`array.concat(array1, array2, ..., arrayn)`

功能：用于连接两个或多个数组

返回值：数组

```javascript
var arr1 = ['a', 'b', 'c'],
    arr2 = ['d', 'e', 1, 3],
    arr3;
arr3 = arr1.concat(arr2);
console.log(arr3);  // ['a', 'b', 'c', 'd', 'e', 1, 3]
```

### **十、silce()**

语法：`array.slice(start, end)`

功能：从已有的数组中返回选定的元素

参数：

1. start（必须）规定从何处开始选取，如是负数，从数组尾部开始算起
   1. end（可选）规定从何处结束选取，是数组片段结束处的数组下标（注意这个下标是不截取的）

说明：

1. 如没指定 end，切分的数组包含从 start 到数组结束的所有元素。
2. 如 slice() 方法的参数中有一个负数，则用数组长度加上该数来确定相应的位置。

返回值：数组

```javascript
var colors = ['red', 'green', 'blue', 'yellow', 'orange'];
var newColors = colors.slice(1, 3);    // 与(-4, 3)等价
console.log(newColors);  // ['green', 'blue']
```

::: tip

完成以下代码段，实现b数组对a数组的拷贝，方法越多越好

```javascript
var a = [1,'yes', 3],
    b;
// 1. 数组遍历，push
b = new Array();
for(var i=0;i<a.length;i++) {
    b.push(a[i]);
}
// 2. concat()
b = [].concat(a);
// 3. slice()
b = a.slice(0)
```

:::

### **十一、splice()**

- splice() 方法删除数组项
- splice() 方法插入数组项
- splice() 方法替换数组项

**删除**

语法：`array.slice(index, count)`

功能：删除从 index 处开始的零个或多个元素

返回值：含有被删除的元素的数组

说明：

count 是要删除的项目数量，如果设置为0，则不会删除项目。

如果不设置，则删除从index开始的所有值。

```javascript
var arr = ['a', 'b', 'c', 'd', 'e', 'f'];
var delArr = arr.splice(2,2);
console.log(arr);   // ['a', 'b', 'e', 'f']
console.log(delArr);  // ['c', 'd']
```

**插入**

语法：`array.splice(index,0,item1,item2,...,itemn)`

功能：在指定位置插入值

参数：

- index：起始位置（在某一个值的后面插入值，取这个值的下标加1，如果取当前下标，会把值插到当前值的前面去）
- 0：要删除的项数
- item1...：要插入的项

返回值：空数组（返回的是删除的数组）

```javascript
var arr = [1,2,3,4,5,6,7,8];
var insertArr = arr.splice(3,0,9,10);
console.log(insertArr) // []
console.log(arr) // [1, 2, 3, 9, 10, 4, 5, 6, 7, 8]
```

**替换**

语法：`array.splice(index, count, item1,...,itemn)`

功能：在指定位置插入值，且同时删除任意数量的项

参数：

- index：起始位置
- count：要删除的项数
- item1...itemx: 要插入的项

返回值：从原始数组中删除的项（如果没有删除任何项，则返回空数组）

```javascript
var arr = [1,2,3,4,5,6,7,8];
var replaceArr = arr.splice(1,2,9,10);
console.log(replaceArr) // [2,3]
console.log(arr) // [1, 9, 10, 4, 5, 6, 7, 8]
```

### **十二、indexOf()**

语法：`array.indexOf(searchvalue, startIndex)`

功能：从数组的开头（位置0）开始向后查找。

参数：

- searchvalue：必需，要查找的项；
- startIndex：可选，起点位置的索引(如果没有设置，只会返回从0开始出现的第一个位置)

返回值：number，查找的项在数组中的位置，没有找到的情况下返回 -1.

```javascript
var numbers = [1,6,7,3,9,2];
var pos = numbers.indexOf(7);
var nopos = numbers.indexOf(99);
console.log(pos);  // 2
console.log(nopos);  // -1
```

### **十三、lastIndexOf()**

语法：`array.lastindexOf(searchvalue, startIndex)`

功能：从数组的末尾开始向前查找。

参数：

- searchvalue：必需，要查找的项；
- startIndex：可选，起点位置的索引(如果没有设置，只会返回从末尾开始出现的第一个位置)

返回值：number，查找的项在数组中的位置，没有找到的情况下返回 -1.

```javascript
var numbers = [1,6,7,3,9,2];
var pos = numbers.lastIndexOf(7);
var nopos = numbers.lastIndexOf(99);
console.log(pos);  // 5
console.log(nopos);  // -1
```

::: tip

1. 在比较第一个参数与数组中的每一项时，会使用**全等操作符**，即要求查找的项**必须严格相等**。
2. 数组的位置方法是ECMAScript5为数组实例新增的，所以支持的浏览器只有：`IE9+、Firefox2+、Safari3+、Opera9.5和Chrome`

:::

手写一个 indexOf 的功能：

```javascript
function indexOf(arr, value) {
    // 检测 value 在 arr 中出现的位置
    for (var i=0;i<arr.length;i++) {
        if (arr[i] === value) {
            return i;
        }
    }
    // 如果找不到这个 value 返回 -1
    return -1;
}
```

