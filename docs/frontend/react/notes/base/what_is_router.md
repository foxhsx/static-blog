---
title: React Router 介绍
date: 2021-08-08
tags:
 - React
 - JavaScript
describe: 学习一下 React Router
---
## React-router 4 是什么

- 全新的版本，和之前版本不兼容，浏览器和 RN 均支持
- React 开发单页应用必备，践行路由即组件的概念
- 核心概念：动态路由、Route、Link、Switch

### 安装

```shell
npm install react-router-dom --save
```

入门组件：

- BrowserRouter，包裹整个应用
- Route 路由对应渲染的组件，可嵌套
- LInk 跳转专用

其他组件：

- url 参数，Route 组件参数可用冒号标识参数
- Redirect 组件跳转
- Switch 只渲染命中的第一个子 Route 组件

##### url 参数

```javascript
class Text extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    console.log(this.props);
    /**
    	history: {...},
    	location: {...},
    	match: {...},
    	staticContext: undefined
    */
    return (
      <h2>测试组件{ this.props.match.params.location }</h2>
    )
  }
}

<Route path="/:location" component={Text}></Route>
```

