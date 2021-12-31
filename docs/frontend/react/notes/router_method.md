---
title: Route 渲染内容的三种方式
date: 2021-03-03
tags:
 - JavaScript
 - React
categories:
 - front
---
- children: func
- render: func
- component: component
- 404 页面

## 渲染优先级
Route 渲染优先级：children > component > render。

三者都能接收到同样的[route props]，包括 match，location and history，但是当不匹配的时候，children 的 match 为 null。

这种方式互斥，你只能用一样。
```js
// ./App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import HomePage from './pages/HomePage'
import UserPage from './pages/UserPage'
import LoginPage from './pages/LoginPage'

function App() {
  return (
    <div className="App">
      <Router>
        <Link to="/">首页</Link>
        <Link to="/user">用户中心</Link>
        <Link to="/login">登录</Link>

        <Route path="/" exact children={children} component={HomePage} render={render} />
        <Route path="/user" component={UserPage} />
        <Route path="/login" component={LoginPage} />
      </Router>
    </div>
  )
}

function children(props) {
  console.log('children props', props)
  return (<div>children</div>)
}

function render(props) {
  console.log('render props', props)
  return (<div>render</div>)
}

export default App;
```

那 children 的适用场景就是不管 locaiton 是否匹配都需要渲染展示一些内容，这个时候就可以是适用 children。

## 注意
当你用 component 时，Route 会用你指定的组件和 React.createElement 创建一个新的 [React.element]。这意味着当你提供的是一个内联函数的时候，每次 render 都会创建一个新的组件，这会导致不再更新已经现有的组件，而是直接卸载然后再去挂载一个新的组件。因此，**当使用内联函数的内联渲染时，请使用 render 或者是 children**。
```js
return (
  <RouterContext.Provider value={props}>
    {
      props.match
        ? children
          ? typeof chilren === "function"
            ? _DEV_
              ? evalChildrenDev(children, props, this.props.path)
              : children(props)
            : children
          : component
            ? React.createElement(component, props)
            : render
              ? render(props)
              : null
        : typeof chilren === "function"
          ? _DEV_
            ? evalChildrenDev(children, props, this.props.path)
            : children(props)
          : null
    }
  </RouterContext.Provider>
)
```

我们来举一个例子：
```js
// ./App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import HomePage from './pages/HomePage'
import UserPage from './pages/UserPage'
import LoginPage from './pages/LoginPage'

function App() {
  const [count, setCount] = useState(0)
  return (
    <div className="App">
      <button onClick={() => {
        setCount(count+1)
      }}>add: {count}</button>
      <Router>
        <Link to="/">首页</Link>
        <Link to="/user">用户中心</Link>
        <Link to="/login">登录</Link>

        <Route path="/" exact component={() => {return <HomePage />}} />
        <Route path="/user" component={UserPage} />
        <Route path="/login" component={LoginPage} />
      </Router>
    </div>
  )
}

function children(props) {
  console.log('children props', props)
  return (<div>children</div>)
}

function render(props) {
  console.log('render props', props)
  return (<div>render</div>)
}

export default App;

// ./HomePage.js
import React, { Component } from 'react';

export default class HomePage extends Component {
  componentDidMount() {
    console.log('HomePage componentDidMount')
  }
  componentWillUnmout() {
    console.log('HomePage componentWillUnmout')
  }
  render() {
    console.log('HomePage Props', this.props);
    return (
      <div>
        <h3>HomePage</h3>
      </div>
    )
  }
}
```

可以在页面中看到，当我们点击按钮的时候，HomePage 组件在页面中频繁的卸载和渲染，这对于性能来说是很不好的。

那如果我们使用 component 的组件形式，可以看到组件不会被重新挂载，会被重复使用。只有离开这个页面的时候，页面才会被销毁。
```js
<Route path="/" exact component={HomePage} />
```

## 404页面
设定一个没有 Path 的路由在路由列表**最后面**，表示一定匹配

```js
// ./_404Page,js
import React, { Component } from 'react';

export default class _404Page extends Component {
  render() {
    return (
      <div>
        <h3>_404Page</h3>
      </div>
    )
  }
}

// ./App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import HomePage from './pages/HomePage'
import UserPage from './pages/UserPage'
import LoginPage from './pages/LoginPage'
import _404Page from './pages/_404Page'

function App() {
  const [count, setCount] = useState(0)
  return (
    <div className="App">
      <button onClick={() => {
        setCount(count+1)
      }}>add: {count}</button>
      <Router>
        <Link to="/">首页</Link>
        <Link to="/user">用户中心</Link>
        <Link to="/login">登录</Link>

        <Route path="/" exact component={() => {return <HomePage />}} />
        <Route path="/user" component={UserPage} />
        <Route path="/login" component={LoginPage} />
        
        // 放在最后面
        <Route component={_404Page} />
      </Router>
    </div>
  )
}

function children(props) {
  console.log('children props', props)
  return (<div>children</div>)
}

function render(props) {
  console.log('render props', props)
  return (<div>render</div>)
}

export default App;
```

那这个时候就有问题了，每个页面都会匹配到 404，这肯定不是我们想要的结果，理想的结果是当匹配到一个页面的时候，就不渲染 404 了，怎么办呢？这个时候 Switch 组件闪亮登场：
```js
<Switch>
  <Route path="/" exact component={HomePage} />
  <Route path="/user" component={UserPage} />
  <Route path="/login" component={LoginPage} />
  
  // 放在最后面
  <Route component={_404Page} />
</Switch>
```
Switch 组件就是说它会从上往下进行匹配，找到一个匹配的路由之后呢，就不再去进行匹配了，如果都没匹配，就只有到最后的 404 了。

