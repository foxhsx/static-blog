---
title: React 中的双向数据绑定
date: 2021-06-27
tags:
 - React
categories:
 - front
---

今天来学习一下在 React 中的双向数据绑定。

先来看一组对比：

| Vue.js 中的双向数据绑定 | Angular 中的双向数据绑定 | React 中的双向数据绑定 |
| ----------------------- | ------------------------ | ---------------------- |
| v-model                 | [(ngModel)]              | 受控组件               |

> **注意：**双向数据绑定只能用于**表单元素**，如 input、textarea、select。

首先，我们说双向数据绑定，那在方向上肯定是互通的：

**Model => View(value)**:

```js
constructor() {
    this.state = { value: '' }
}

<input value={ this.state.value } />
```

这样的输入输出在页面中只会呈现状态数据，但是并不会修改数据，这种组件，我们称之为受控组件。也就是说这个组件里的状态和元素已经被控制起来了，是修改不了了的。

**View(value) => Model**:

```js
import React, { Component } from 'react';

export default class MyO6 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 'dangdang'
    }
  }

  setValue = (e) => {
    const value = e.target.value
    this.setState({
      value
    })
  }

  render() {
    return (
      <input value={ this.state.value } onChange={ this.setValue } />
    )
  }
}
```

使用事件监听的方式来达到双向数据绑定的效果；