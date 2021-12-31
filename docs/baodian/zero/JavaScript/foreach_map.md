---
title: foreach和map的区别
date: 2021-03-25
tags:
 - JavaScript
 - 面试
categories:
 - front
---

## forEach
`forEach` 方法对数组的每个元素执行一次回调。

语法：

```js
arr.forEach(callback(currentValue[, index[, array]]), thsArg)
```

forEach 的第一个参数 callback 就是传入的回调，用来操作数组中的每个元素，而第二个参数一般没有怎么用，这个参数主要是在执行回调的时候，改变 this 的指向。返回值是 undefined。

我们在实际项目中经常会遇到的就是 callback 里的前两个参数，一个是 `currentValue`，也就是数组中正在处理的当前元素。另一个是 `index`，数组中正在处理的当前元素的索引。而第三个元素是数组本身，这个参数基本没有怎么用过。

它是按升序为数组中含有有效值的每一项执行一次 callback 函数，那些已被删除或者未初始化的值将被跳过。

以下是 forEach() 的一些特性：
1. forEach() 遍历的范围在第一次调用 callback 前就会被确定。
2. 那么之后添加到数组中的项是不会被 callback 访问到的。
3. 如果已经存在的值被改变，那么传递给 callback 的值是 forEach() 遍历到他们那一刻的值。
4. 已删除的项是不会被访问到的。
5. 如果已访问的项在迭代中被删除了（例如使用 shift()），之后的元素将被跳过。
6. 除了抛出异常外，forEach() 是没有办法中止或者跳出循环的。

来看几个例子：
1. 不对未初始化的项进行任何操作
```js
const arraySparse = [1,3,,7];
let numCallbackRuns = 0;

arraySparse.forEach(function(element){
  console.log(element);
  numCallbackRuns++;
});

console.log("numCallbackRuns: ", numCallbackRuns);

// 1
// 3
// 7
// numCallbackRuns: 3
```

2. 使用 thisArg 参数时要注意，回调函数应是普通函数，如果是回调函数，thisArg 参数就会被忽略，因为箭头函数在词法上就绑定了 this 值。
3. 扁平化数组
```js
/**
 * Flattens passed array in one dimensional array
 *
 * @params {array} arr
 * @returns {array}
 */
function flatten(arr) {
  const result = [];

  arr.forEach((i) => {
    if (Array.isArray(i))
      result.push(...flatten(i));
    else
      result.push(i);
  })

  return result;
}

// Usage
const problem = [1, 2, 3, [4, 5, [6, 7], 8, 9]];

flatten(problem); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

在兼容性上，是基本都兼容了此方法，我们可以看看源码层面怎么实现一个 forEach 方法：

```js
if (!Array.prototype.forEach) {
  Array.prototype.forEach = function(callback, thisArg) {
    // 首先定义两个变量，用来存储 this 和 索引
    var T, k;

    // 代码健壮性判断
    if (this == null) {
      throw new TypeError('this is null or not defined');
    }

    // 将 this 转为一个 Object 对象，并赋值给 O 变量
    var O = Object(this);

    // 获取 O 的 length 属性，并将其二进制表示向右移 0 位
    var len = O.length >>> 0;

    // 如果 callback 的类型不是一个函数，则抛出警告
    if (typeof callback !== 'function') {
      throw new TypeError(callback + 'is not a function');
    }

    // 如果参数的长度大于一，那么给变量 T 赋值给 thisArg，如果 thisArg 没有传，那 T 为 undefined
    if (arguments.length > 1) {
      T = thisArg;
    }

    // 将索引值初始化为 0;
    k = 0;

    // 当索引值小于 len 的长度时，循环
    while(k < len) {
      // 定义变量存储对应数组的项
      var kValue;

      // 如果索引值在 O 里，则给 kValue 赋值，并传递给 callback
      if (k in O) {
        kValue = O[k];

        // 改变 this 指向，并传递进去 kValue, k(索引)，数组本身 O
        callback.call(T, kValue, k, O)
      }

      // 递增 k
      k++;
    }
    // return undefined
  }
}
```

## map
map() 方法创建一个新数组，其结果是该数组中的每个元素调用回调后的返回值。

语法上基本与 forEach 一致：

```js
var newArr = arr.map(callback(currentValue[, index[, array]])[, thisArg])
```

因为 map 会生成一个新数组，所以如果不打算使用返回的新数组而却使用 map 方法，这是与设计初衷相违背的。这个时候我们可以使用 `forEach` 或者 `for-of` 来代替。

以下两种情况不适合使用 map:
1. 不使用返回的新数组；
2. 没有从回调中返回值；

当回调函数中返回 undefined 或者没有返回任何内容时，新数组是一个包含 undefined 的数组。

其他部分大致和 forEach 相同。

从实现上来讲，也是在 forEach 实现的基础上增加了几行代码而已：

```js
if (!Array.prototype.map) {
  Array.prototype.map = function(callback, thisArg) {
    // 首先定义三个变量，用来存储 this, 新数组, 索引
    var T, A, k;

    // 代码健壮性判断
    if (this == null) {
      throw new TypeError('this is null or not defined');
    }

    // 将 this 转为一个 Object 对象，并赋值给 O 变量
    var O = Object(this);

    // 获取 O 的 length 属性，并将其二进制表示向右移 0 位
    var len = O.length >>> 0;

    // 如果 callback 的类型不是一个函数，则抛出警告
    if (typeof callback !== 'function') {
      throw new TypeError(callback + 'is not a function');
    }

    // 如果参数的长度大于一，那么给变量 T 赋值给 thisArg，如果 thisArg 没有传，那 T 为 undefined
    if (arguments.length > 1) {
      T = thisArg;
    }

    // 创建一个新数组，方便后续 return 出去
    A = new Array(len);

    // 将索引值初始化为 0;
    k = 0;

    // 当索引值小于 len 的长度时，循环
    while(k < len) {
      // 定义变量存储对应数组的项，以及每一次回调调用后的返回值
      var kValue, mappedValue;

      // 如果索引值在 O 里，则给 kValue 赋值，并传递给 callback
      if (k in O) {
        // 这里不直接使用 O[k] 的目的就是——不改变原数组
        kValue = O[k];

        // 改变 this 指向，并传递进去 kValue, k(索引)，数组本身 O
        mappedValue = callback.call(T, kValue, k, O);

        // 再给 A 赋值
        A[k] = mappedValue;
      }
      // 每次循环后递增 k
      k++;
    }
    // 最后将新数组 return 出去
    return A;
  }
}
```

## 总结
**共同点**
1. forEach() 和 map() 都不能中止或跳出循环。
2. 按数组元素的顺序调用。
3. callback 函数只在有效值上会被调用。
4. 语法上基本相同（传入参数）
5. 都不修改调用它的原数组本身（callback 里面可能会改变原数组）

**不同点**
1. forEach() 没有返回值，而 map() 返回一个新数组。