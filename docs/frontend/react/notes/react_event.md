---
title: React 中绑定事件
date: 2021-06-21 22:40:00
tags:
 - React
categories:
 - front
---

React 元素的事件处理和 DOM 元素的很相似，但是也是有一点语法上的不同：

- React 事件的命名采用小驼峰（camelCase），而不是纯小写。
- 使用 JSX 语法时你需要传入一个函数作为事件处理函数，而不是一个字符串。

例如，传统的 HTML：

```html
<button onclick="activateLasers()">
  Activate Lasers
</button>
```

而在 React 中略微不同：

```html
<button onClick={activateLasers}>  Activate Lasers
</button>
```

而还有一个不同点是不能通过返回 false 这种方式阻止默认行为。我们需要显式的使用 preventDefault。例如，传统的 HTML 中阻止表单的默认提交行为可能是这样的：

```html
<form onsubmit="console.log('You clicked submit.'); return false">
  <button type="submit">Submit</button>
</form>
```

而在 React 中，可能是这样的：

```js
function Form() {
  function handleSubmit(e) {
    e.preventDefault();
    console.log('You clicked submit.');
  }

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Submit</button>
    </form>
  );
}
```

那么前端三大流行框架在事件绑定上有什么异同点呢？

| Vue         | angular      | react             |
| ----------- | ------------ | ----------------- |
| @click="fn" | (click)="fn" | onClick={this.fn} |

## 小结

React 中事件绑定需要注意：

1. 事件句柄名称必须用**小驼峰命名法**；
2. 事件处理函数不能用引号；
3. 事件处理方法前必须加 { };
4. 当前 class 内部的方法做事件处理方法，则必须加 this；
5. 事件处理方法名后不能加 ()

## 问题

### 描述

React 中事件处理方法里的 this 指向了 undefined，为什么？

```js
import React from "react";

export default class MyC02 extends React.Component {
  fn() {
    console.log(this);  // undefined
    console.log('按钮被点击了...');
  }
  render() {
    return (
      <div>
        <button onClick={this.fn}>事件绑定</button>
      </div>
    )
  }
}
```

那么其实这里说到底呢还是一个 this 的指向问题，首先在 onClick 后面跟的 this，我们可以知道它是指向的组件本身。而 fn 里的 this 呢，是属于一个模块的范畴，在 ES6 中 this 默认是指向 undefined 的。

而在 JSX 里的这种事件写法，也只是说对事件处理方法的一个赋值，赋值不是调用，而是什么呢？是对函数的引用赋值，此时的 this 指向不再指向当前组件对象了，而是指向当前 ES6 模块中的全局 this ——值为 undefined。

### 解决

其实这里有三种方法可以解决：

#### 使用匿名函数封装立即调用的函数

```js
render() {
    return (
    	<button onClick={() => {this.fn()}}>事件绑定</button>
    	<button onClick={function() {this.fn()}}>事件绑定</button>
    )
}
```

此时呢，相当于调用者是当前的 this 组件本身立即调用了 fn 函数，而不是把 fn 函数赋值给 onClick 事件，那么函数体内的 this 是指向调用者的，this 就会正常打印出来。

#### 直接使用箭头函数的方式

```js
fn = () => {
    console.log(this)
}
```

这是怎么回事呢？这是因为箭头函数自身的特性，箭头函数中的 this 对象，就是定义时所在的对象，而不是使用时所在的对象。所以我们在类组件中去定义箭头函数时，函数体内的 this 指向是明确的，它就是指向组件本身。

#### 使用 bind 来改变 this 指向

在类中的构造函数中去调用 bind 方法，改变函数的 this 指向。

```js
constructor() {
    super(); // 调用父类/超类对象，此时子类中相当于有一个父类的实例
    this.fn = this.fn.bind(this)
}

render() {
    return (
      <button onClick={this.fn}>事件绑定</button>
    );
  }
```

