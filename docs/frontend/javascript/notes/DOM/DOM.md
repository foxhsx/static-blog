---
title: JavaScript之DOM基础
date: 2020-11-24
tags:
 - JavaScript
categories:
  - front
---

JavaScript 的组成

完整的 JavaScript 是由 ECMAScript（语法）、Browser Objects（DOM、BOM）（特性）组成。

### **一、DOM查找方法**

1. 功能：返回对拥有指定 ID 的第一个对象的引用

   语法：

   ```javascript
   document.getElementById('id')
   ```

   返回值：DOM对象

   说明：ID  为DOM元素上 ID 属性的值，在页面当中是唯一的，如果出现两个ID值一样的DOM元素，则会取第一个。

2. 返回一个对所有 tag 标签引用的集合

   语法：

   ```javascript
   document.getElementsByTagName('tag')
   ```

   返回值：数组

   说明：tag 为要获取的标签名称

3. 返回一个指定 name 属性值的所有子元素的集合，返回的是一个类数组对象

   语法：

   ```javascript
   document.getElementsByName()
   ```

4. 返回指定 class 名称的元素，也是一个类数组对象

   语法：

   ```javascript
   document.getElementsByClassName()
   ```

### **二、设置元素样式**

1. 功能：设置 ele 元素的CSS样式

   语法：

   ```javascript
   ele.style.styleName = styleValue
   ```

   说明：

   1. ele 为要设置样式的 DOM 对象
   2. styleName 为要设置的样式名称（不能使用“-”连字符形式，需要使用驼峰命名形式 font-size—fontSize）
   3. styleValue 为设置的样式值

   例子：

   ```javascript
   var box = document.getElementById('box')
   box.style.color = '#000'
   ```

### **三、innerHTML**

功能：返回 ele 元素开始和结束标签之间的 HTML

语法：

```javascript
ele.innerHTML  // 获取 ele 元素开始和结束标签之间的 HTML
ele.innerHTML = 'html'   // 设置 ele 元素开始和结束标签之间的 HTML 为 html
```

### **四、className**

功能：返回 ele 元素的class 属性

语法：

```javascript
ele.className    // 返回 ele 元素的 class 属性
ele.className = 'cls'   // 设置 ele 元素的 class 属性为 cls, 会置换掉原来的 className
```

### **五、获取属性**

功能：获取 ele 元素的 attribute 属性

语法：

```javascript
ele.getAttribute('attribute')

// 获取标签属性语法--除了 class 以外的一般属性都能取出来，要获取 class 需要通过 className 来得到，但是如果是自定义属性，就需要用到上述语法（包括 class 也可以得到其className值）
dom.id
```

说明：

1. ele 是要操作的 dom 对象
2. attribute 是要获取的 html 属性（id,  type,  class）

### **六、设置属性**

功能：在 ele 元素上设置属性

语法：

```javascript
ele.setAttribute('attribute', value)
```

说明：

1. ele 是要操作的 DOM 对象
2. attribute 为要设置的属性名称
3. value 为设置的 attribute 属性的值

<span style="color:red">注意：</span>setAttribute() 有兼容性问题

### **七、删除属性**

功能：删除 ele 上的 attribute 属性

语法：

```javascript
ele.removeAttribute('attribute')
```

说明：

1. ele 是要操作的dom对象
2. attribute 是要删除的属性名称