---
title: react-router简介及环境配置
date: 2021-02-22
tags:
 - JavaScript
 - React
categories:
 - front
---

我们要使用 React 和 react-router 首先就得安装这两个库：
```shell
npm i react react-router
```

然后使用 CRA 快速创建项目
```shell
npx create-react-app router-nut
cd router-nut
yarn start
```

因为项目中要使用 less，所以还需要在配置一下 less：
```shell
yarn add @craco/craco craco-less @babel/plugin-proposal-decorators
```

然后在根目录下添加配置文件 craco.config.js （类似于 vue.config.js）:
```js
const CracoLessPlugin = require('craco-less')

module.exports = {
  babel: {
    // 用来支持装饰器
    plugins: [['@babel/plugin-proposal-decorators', { legacy: true }]]
  },
  plugins: [
    {
      plugin: CracoLessPlugin
    }
  ]
}
```

最后修改一下 package.json
```json
"scripts": {
  "start": "craco start",
  "build": "craco build",
  "test": "craco test"
}
```

## react-router简介
react-router 包含三个库，react-router、react-router-dom 和 react-router-native。react-router 提供最基本的路由功能，实际使用的时候我们不会直接安装 react-router，而是根据应用运行的环境选择安装 react-router-dom （在浏览器中使用）或 react-router-native （在 rn 中使用）。react-router-dom 和 react-router-native 都依赖于 react-router，所以在安装时，react-router 会自动安装，创建 web 应用。

## 安装 react-router
```shell
yarn add react-router-dom
```

## BrowserRouter 和 HashRouter 对比
1. HashRouter 最简单，不需要服务器端渲染，靠浏览器的#来区分 path 就可以，BrowserRouter 需要到服务器端对不同的 URL 返回不同的 HTML。
2. BrowserRouter 使用 HTML5 history API (pushState, replaceState 和 popstate 事件)，让页面的UI同步与URL。
3. HashRouter 不支持 location.key 和 location.state，动态路由跳转需要通过 ? 传递参数。
4. Hash history 不需要服务器任何配置就可以运行，如果你刚刚入门，就可以使用这个。但是我们不推荐在实际线上使用，因为每一个 web 应用都应该使用 browser history。

## MemoryRouter
把 URL 的历史记录保存在内存中的 `<Router>` （不读取、不写入地址栏）。在测试和非浏览器环境中很有用，如 React Native。

接下来我们在项目中的 App.js 中引入 BrowserRouter :
```js
// ./App.js
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
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

        <Route path="/" exact component={HomePage}>
        <Route path="/user" component={UserPage}>
        <Route path="/login" component={LoginPage}>
      </Router>
    </div>
  )
}

export default App
```

其实 Link 的本质就是 a 标签。那如果在根路由上不加 exact，那每个页面都会有 HomePage 的内容，这是因为 path 后面做的是正则校验，而根路由校验不是很准确，所以加上 exact 进行精确匹配。那需要注意的是**最外层一定要包一层 Router**。这是因为在 link 跳转和 route 匹配时，都需要用到 history，而 history 是存在 Router 里面的。