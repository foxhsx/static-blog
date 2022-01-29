---
title: 深拷贝
date: 2021-03-23
tags:
 - JavaScript
 - 面试
categories:
 - front
---

### 概念

深拷贝不仅将源对象的各个属性逐个复制过去，还深层递归各属性所包含的对象。**深拷贝是开辟新的栈**，目标对象和源对象的地址不同，两者互不影响。

| -- | 和原数据是否指向同一对象 | 第一层数据为基本数据类型 | 原数据包含子对象 |
|-|-|-|-|
| 赋值 | 是 | 改变会使原数据一同改变 | 改变会使原数据一同改变 |
| 浅拷贝 | 否 | 改变不会使原数据一同改变 | 改变会使原数据一同改变 |
| 深拷贝 | 否 | 改变不会使原数据一同改变 | 改变不会使原数据一同改变 |

### 实现

::: tip 场景
在实现深拷贝还需要考虑几个因素：
- 传入的对象是使用对象字面量的形式创建还是使用构造函数创建
- 构造函数创建的对象，要如何处理原型链上的属性
- 循环引用导致的一些问题，如：`Maximum call stack size exceeded`——超出最大调用**堆栈大小**
:::

1. JSON.parse(JSON.stringify())
   - JSON 中的 stringify 会把一个 JavaScript 对象序列化为一个 JSON 字符串，而 parse 又会把 JSON 字符串反序列化为一个 JavaScript 对象，通过这两个方法的结合，我们可以实现一个简单的深拷贝。

   ```js
    function jsonClone(obj) {
      return JSON.parse(JSON.stringify(obj));
    }
   ```
  - 弊端：虽然用法简单，但是也存在一些坑：
    1. 因为在序列化 JavaScript 对象时，所有的函数和原型成员(constructor)会被有意忽略掉。也就是说这个方法传递的对象里的属性值只能是 `Number、Array、String、Boolean、扁平对象`，即能被 JSON 直接表示的数据结构。
    2. 无法解决 `循环引用` 的问题。
      ```js
      const a = { val: 2 };
      a.target = a;

      // 拷贝 a 会出现系统栈溢出，因为出现了 无限递归 的情况。
      ``` 
    3. 无法拷贝一些 `特殊对象`，如：`RegExp、Date、Set、Map` 等。
    4. 会忽略 `undefined/symbol`
2. 递归实现
   ```js
    function deepClone(obj) {
      // 数据类型为 引用数据类型
      if (typeof obj === 'object') {
        // 初始化返回结果
        let result = Array.isArray(obj) ? [] : {};
        for (let key in obj) {
          // 避免相互引用出现死循环爆栈的情况
          if (obj === obj[key]) {
            continue;
          }
          if (obj.hasOwnProperty(key)) {
            // 递归调用
            result[key] = deepClone(obj[key]) 
          }
        }
        return result;
      } else {
        // 基本数据类型，直接返回
        return obj
      }
    }
   ```

  - 缺陷：跟上一个一样，无法拷贝一些 `特殊对象`，如：`RegExp、Date、Set、Map` 等。
  - 对于循环引用的情况，直接跳出循环

3. 使用 `Object.create()` 的方法
   ```js
   function deepClone(obj) {
     // 数据类型为引用数据类型
     if (typeof obj === 'object') {
       // 初始化返回结果
       let result = Array.isArray(obj) ? [] : {};
       for (let key in obj) {
         if (obj.hasOwnProperty(key)) {
           // 调用 Object.create
           result[key] = typeof obj[key] === 'object' ? Object.create(obj[key]) : obj[key]
         }
       }
       return result;
     } else {
       // 基本数据类型
       return obj
     }
   }
   ```