---
title: React 中 state 到底怎么用?
date: 2021-06-22 00:36:00
tags:
 - React
categories:
 - front
---

首先我们来说一下 React 组件中的 Model 数据。

在 React 中类组件可以生命两种形式的 Model 数据：

1. class 属性数据：可以一次性绑定到模板，数据再变都不会再次修改视图模板

   ```js
   class MyCo2 {
       count =  3
   }
   ```

2. 组件状态数据：可以绑定到模板，未来 Model 变则 View 变；

   使用步骤：

   1. 创建状态数据——只能在构造方法中
   2. 绑定状态数据——`this.state.xxx`
   3. 修改状态数据——`this.setState`

```jsx
class MyComponent extends React.Component {
    constructor(props) {
        super(props)
        // 1. 创建状态数据
        this.state = {
            count: 0
        }
    }
    add = () => {
        // 修改状态数据
        this.setState((state) => {
            
        })
    }
    render() {
        // 绑定状态数据
        return <
        	<div>{ this.state.count }</div>
        	<button onClick={ this.add }>+</button>
        >
    }
}
```

::: tip 注意

需要注意的是，这里不能直接使用 `this.state.count = xxx` 去修改值，这样修改并不会引起视图的重新渲染。

:::

这里我们会用到一个新的 API 叫 `setState`，它会：

1. 修改虚拟 DOM 树，然后引起视图的重新渲染。

2. **setState不会清空已有的状态数据，只会把新修改的数据合并到已有数据中。**

3. 是异步操作，不会立即执行——底层会把连续的多次 setState 合并为一次操作，以减少虚拟DOM和真实DOM的操作和修改；

4. 而我们要监听修改后的值，可以在 setState 后面再加一个参数，这个参数是一个回调函数，表示所有的状态数据已经修改完毕；

   ```js
   this.setState({}, () => {
       // 所有的状态数据已经修改完毕
       console.log(this.state)
   })
   ```

5. 还有一种写法如下：

   ```js
   this.setState({
       count: this.state.count++
   })
   ```

   但是官方不推荐这样使用，因为有多个 setState 的时候，有可能会同时触发。比如：

   ```js
   this.setState({
       count: this.state.count++
   })
   this.setState({
       count: this.state.count++
   })
   this.setState({
       count: this.state.count++
   })
   ```

   上述情况在代码中会被合并起来，本来预期的结果可能是三次加加，但是实际却是会被合并为一次，最后还是只执行一次加加。

   所以**不推荐使用 this.state.xxx 这种写法，而是使用临时变量的方式来代替**。

接下来我们来看一个案例，实现一个表格的删除操作：

- 函数组件

  ```js
  import React, { useState } from 'react';
  
  function genTr(list, setTable) {
    if (!Array.isArray(list)) {
      throw new Error('list must be a Array!')
    }
    if (list.length === 0) {
      return (
        <tr>
          <td><p>暂无数据</p></td>
        </tr>
      )
    }
    return list.map((item, index) => {
      return (
        <tr key={item.eid}>
          <td>{ item.eid }</td>
          <td>{ item.ename }</td>
          <td>{ item.sex === 1 ? <span>男111</span> : <span>女</span> }</td>
          <td onClick={ () => {
            const arr = [].concat(list)
            arr.splice(index, 1)
            setTable(arr)
          }}>删除</td>
        </tr>
      )
    })
  }
  
  function MyO4 () {
    const [tableList, setTable] = useState([
      { eid: 101, ename: 'Tom', sex: 1 },
      { eid: 102, ename: 'Mary', sex: 1 },
      { eid: 103, ename: 'Jerry', sex: 1 },
    ])
  
    return(
      <div>
        <table>
          <thead>
            <tr>
              <th>编号</th>
              <th>姓名</th>
              <th>性别</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {
              genTr(tableList, setTable)
            }
          </tbody>
        </table>
      </div>
    )
  }
  
  export default MyO4;
  ```

  这里面我们使用 React Hooks 来实现。

- 类组件

  ```js
  import React, { Component } from 'react';
  
  export default class MyO5 extends Component {
    constructor(props) {
      super(props)
      this.state = {
        tableList: [
          { eid: 101, ename: 'Tom', sex: 1 },
          { eid: 102, ename: 'Mary', sex: 1 },
          { eid: 103, ename: 'Jerry', sex: 1 },
        ]
      }
    }
  
    setList = (index) => {
      const arr = [].concat(this.state.tableList)
      arr.splice(index, 1)
      this.setState({
        tableList: arr
      })
    }
  
    genTr = (list) => {
      if (!Array.isArray(list)) {
        throw new Error('list must be a Array!')
      }
      if (list.length === 0) {
        return (
          <tr>
            <td><p>暂无数据</p></td>
          </tr>
        )
      }
      return list.map((item, index) => {
        return (
          <tr key={item.eid}>
            <td>{ item.eid }</td>
            <td>{ item.ename }</td>
            <td>{ item.sex === 1 ? <span>男111</span> : <span>女</span> }</td>
            <td onClick={ () => { this.setList(index) }}>删除</td>
          </tr>
        )
      })
    }
  
    render() {
      return (
        <div>
          <p>05</p>
          <table>
            <thead>
              <tr>
                <th>编号</th>
                <th>姓名</th>
                <th>性别</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {
                this.genTr(this.state.tableList)
              }
            </tbody>
          </table>
        </div>
      )
    }
  }
  ```

我们在编写代码的时候，除了要实现我们要实现的功能模块之外，还得要注意一点就是，要注意代码本身的可读性和可维护性，要注意代码质量。