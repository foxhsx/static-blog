---
title: useState 的使用
date: 2021-06-16
tags:
 - React
 - 面试
categories:
 - front
---

## 声明 State 变量

在 class 中，我们通过在构造函数中设置 this.state 为 { count: 0 } 来初始化 count state 为 0：

```jsx
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>
      </div>
    );
  }
}
```

可以看到，这段代码设置 state 的初始值为 0，当用户点击按钮后，我们通过调用 `this.setState()` 来改变了 `count` 的值。和它等价的 Hooks 写法如下：

```js
import React, { useState } from 'react';

function Example() {
  // 声明一个叫 "count" 的 state 变量  const [count, setCount] = useState(0);
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

使用 Hooks 写法之后，代码量更少，且更加清晰。

