---
title: 数组去重的十种方法
date: 2021-10-05
tags:
  - JavaScript
  - 面试
categories:
  - front
describe: 数组去重的十种方法及解题思路
---

数组的去重方法，其实无论实在实际项目还是在面试中都会有用到的，下面我们来列举一下常见的几个：

1. 使用 for 循环和 includes
2. 使用 Set 和 Array.from()
3. 使用 for 循环和 indexOf
4. for 循环嵌套 for 循环，结合 splice
5. 使用 sort 和 reduce 方法
6. 使用 filter 和 indexOf
7. 使用 forEach 循环和 Map
8. 使用 reduce 和 includes
9. 使用扩展运算符和 set
10. 如果是数组对象的数据格式，可以使用 forEach 和 includes 的方法

#### 1. 使用 for 循环和 includes

```js
function unique(arr) {
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (!newArr.includes(arr[i])) {
      newArr.push(arr[i]);
    }
  }
  return newArr;
}
```

#### 2. 使用 Set 和 Array.from()

```js
function unique(arr) {
  return Array.from(new Set(arr));
}
```

#### 3. 使用 for 循环和 indexOf

```js
function unique(arr) {
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (newArr.indexOf(arr[i]) === -1) {
      newArr.push(arr[i]);
    }
  }
  return newArr;
}
```

#### 4. for 循环嵌套 for 循环，结合 splice

```js
function unique(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] == arr[j]) {
        arr.splice(j, 1);
        j--;
      }
    }
  }
  return arr;
}
```

#### 5. 使用 sort 和 reduce 方法

```js
function unique(arr) {
  let newArr = [arr[0]];
  arr.sort().reduce((prev, next) => {
    if (prev !== next) {
      newArr.push(next);
    }
    return next;
  });
  return newArr;
}
```

#### 6.使用 filter 和 indexOf

```js
function unique(arr) {
  return arr.filter((item, index, arr) => {
    return arr.indexOf(item, 0) === index;
  });
}
```

#### 7.使用 forEach 循环和 Map

```js
function unique(arr) {
  let map = new Map();
  let array = [];
  arr.forEach((item) => {
    if (!map.has(item)) {
      map.set(item, true);
      array.push(item);
    }
  });
  return array;
}
```

#### 8.使用 reduce 和 includes

```js
function unique(arr) {
  return arr.reduce((newArr, next) => {
    if (!newArr.includes(next)) {
      newArr.push(next);
    }
    return newArr;
  }, []);
}
```

#### 9.使用扩展运算符和 set

```js
function unique(arr) {
  return [...new Set(arr)];
}
```

#### 10.如果是数组对象的数据格式，可以使用 forEach 和 includes 的方法

```js
function uniqueArrayObj(arr, key) {
  let newArr = [arr[0]];
  arr.forEach((item) => {
    newArr.filter((newitem) => {
      if (item[key] !== newitem[key]) {
        newArr.push(item);
      }
    });
  });
  return newArr;
}
```

当然，还有一些其他方法，但是这里就不多做赘述了。其实这些方法总结一下，它们的去重思想都大同小异，比如说：

1、3、5、6、7、8、10 的解题思路都是新生成一个数组，然后判断新数组是否包含当前值，若没有包含，则把这个值 push 进去，反之则不用 push，最后把新数组返回去。那按照这个思路，我们可以调用的 API 方法就有很多了（如上）。

那剩下的 2、4、9 这三个相对来说是借助了 ES6 里的一些新特性来做的，更加的方便快捷。
