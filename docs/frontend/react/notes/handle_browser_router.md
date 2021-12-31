---
title: 手写 BrowserRouter、Route 和 Link
date: 2021-03-05
tags:
  - JavaScript
  - React
categories:
  - front
---

我们来手动实现一下 BrowserRouter、Router、Route 和 Link。

首先我们在项目 src 目录中新建一个文件夹 `react-router-dom-nut`。

## 基础框架

- BrowserRouter
- Route
- Link
- Router
- RouterContext

在里面创建一个 BrowserRouter.js，它的本质实际上就是渲染子组件，所以我们这里只需要 return 掉 props 中的 chilren 即可。：

```js
import React, { Component } from "react";

export default class BrowserRouter extends Component {
  render() {
    return this.props.children;
  }
}
```

接下来就是 Link.js，直接返回一个 a 标签，然后将传进来的属性赋值即可。

```js
import React from 'react'

export default function Link (/* props 解构 */{ to, children, ...restProps }) {
  render () {
    return (<a href={ to } {...restProps} >{ children }</a>)
  }
}
```

再然后是 Route.js，这个组件实际就是做了 props 的传递：

```js
import React, { Component } from "react";

export default class Route extends Component {
  render() {
    const { path, component } = this.props;
    const match = window.location.pathname === path; // 是否匹配
    return match ? React.createElement(component) : null;
  }
}
```

最后创建 index.js 进行导入导出：

```js
import Link from "./Link";
import Route from "./Route";
import BrowserRouter from "./BrowserRouter";

export { Link, Route, BrowserRouter };
```

Router.js 的主要作用其实是用作一个抽象类来使用的，因为之前说过除了 BrowserRouter 还有 HashRouter 等，本质上都是基于 Router 的，都是将逻辑抽象到 Router 中去，只是在往里面传入不同的 history 参数而已。

```js
// ./Router.js
import React, { Component } from "react";

export default class Router extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return this.props.children;
  }
}
```

此时有一个问题是，我们如何将 Router 中的数据传递到 Link 和 Route 等组件中去？由于不知道嵌套层级，所以也不能冒然使用 props 去传递。但是有一点是我们可以确定的，那就是 Link 和 Route 都是 Router 的子组件，既然如此，我们可以考虑使用数据的跨层级传递来实现——RouterContext.js。

```js
// RouterContext.js
import React from "react";

// 使用 context 对象做数据跨层级传递
export const RouterContext = React.createContext();
```

这里我们有三个步骤：
1. 创建 context 对象 --> RouterContext
2. 使用 context 对象的 provider 传递 value  --->  在 Router 中使用
3. 子组件使用 value，有三种方式调用：Consumer、useContext、contextType  --> Route 和 Link

这样的话，我们在 Router 中将 value 传递下去，而 value 中是需要传递的值，通过 RouterContext.Provider 来接收传进来的 props，并将 history 传递下去。location 也是如此，我们这里将 location 传递下去主要是为了在监听路由变化之后，更新对应组件内容。

```js
// ./Router.js
import React, { Component } from "react";
import { RouterContext } from "./RouterContext";

export default class Router extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: props.history.location, // 初始值是 props 中 history 的 location
    };

    // 监听路由变化--自带 listen 监听方法
    this.unlisten = props.history.listen((location) => {
      this.setState({ location });
    });
  }

  // 我们在使用监听的同时，也需要在组件销毁时将监听也取消掉
  componentWillUnmount() {
    if (this.unlisten) {
      this.unlisten();
    }
  }

  render() {
    return (
      <RouterContext.Provider
        value={{
          history: this.props.history,
          location: this.state.location,
        }}
      >
        {this.props.children}
      </RouterContext.Provider>
    );
  }
}
```

那接下来，就可以在对应的子组件中去使用了，比如我们在 Link.js 中去使用：

```js
// ./Link
import React from 'react'
import { RouterContext } from './RouterContext'

export default function Link (/* props 解构 */{ to, children, ...restProps }) {
  // 调用 useContext()
  const context = React.useContext(RouterContext)
  const handleClick = e => {
    e.preventDefault();
    context.history.push(to)
  }

  render () {
    return (<a href={ to } {...restProps} onClick={handleClick}>{ children }</a>)
  }
}
```

当然，我们不光是要关注 Link，还需要关注 Route，当 location 发生变化时，我们需要实时去改变对应的组件，那这就需要接收到从 RouterContext.Provider 传递下来的 location 了。

此时为了更切合实际 router 的功能，Route.js 中的 match 校验也需要更改，这个简陋的 match 已经不能满足我们的需求了。

偷个懒将源码中的 matchPath.js 复制过来，然后直接调用。

在子组件 Route.js 中引入 matchPath 用于完成 match 检验，使用 RouterContext.Consumer 使用传递进来的 context。

我们去 context 中解构出来 location 对象，将 location.pathname 传到 matchPath 方法中去，并将 props 传入到 matchPath 当中，从而取得最终的 match 值。

match 值呢表示是否匹配路由。

当匹配的时候，再去判断组件是哪一类型的。

1. children: 如果是 chilren 类型，那我们再判断一下 children 是否是一个函数，如果是一个函数，我们将 props 作为传输传递进去，否则就直接渲染 children 本身；
2. component：如果是 component 类型，我们直接调用 React.createElement 方法来渲染组件，将 component 和 props 作为参数传递进去；
3. render：如果是 render 函数，那我们直接将 props 传递进去即可，否则返回 null;
4. 如果不匹配，先判断一下 children 是否是函数，若是则调用这个函数，并将 props 传递进去，如果不是则返回 null。

```js
// ./Route
import React, { Component } from "react";
import { RouterContext } from "./RouterContext";
import { matchPath } from "./matchPath";

export default class Route extends Component {
  render() {
    return (
      <RouterContext.Consumer>
        {(context) => {
          const { location } = context;
          const { path, component, children, render } = this.props;
          const match = matchPath(location.pathname, this.props); // 是否匹配
          const props = { ...context, location, match };
          /**
           * 匹配时：children >  component > render > null
           * 不匹配时：children && typeof children === 'function' > null
           */
          return match
            ? children
              ? typeof children === "function"
                ? children(props)
                : children
              : component
              ? React.createElement(component, props)
              : render
              ? render(props)
              : null
            : typeof children === "function"
            ? children(props)
            : null;
        }}
      </RouterContext.Consumer>
    );
  }
}
```

创建完之后，BrowserRouter 中使用 Router，将 history 和 props 中的 children 传递进去：
```js
import React, { Component } from "react";
import { createBrowserHistory } from "history";
import Router from "./Router";

export default class BrowserRouter extends Component {
  constructor(props) {
    super(props);
    this.history = createBrowserHistory();
  }
  render() {
    return <Router history={this.history} chilren={this.props.children} />;
  }
}
```

那现在基本的功能我们已经可以实现了，但是还有一个 404 页面没有实现，我们来实现一下 404 页面：

1. 首先就是 404 页面是没有传 path 值的，这样的话在 Route.js 中是没有 path 的；
2. 使用其父级 context 里面的 match，那父级就应该传递一个 match 下去。
3. 父级 Router.js 传递一个默认的 match：

   ```js
   // ./Router.js
   class Router extends React.Component {
     // 设置默认的 match 
       static computeRootMatch(pathname) {
           return { path: "/", url: "/", params: {}, isExact: pathname === "/" }
       }
       ...
       render() {
           return (
           	<RouterContext.Provider
               	value={
               	  {
               		history: this.props.history,
               		location: this.state.location,
               		match: Router.computeRootMatch(this.state.location.pathname)
                     }
                 }
               >
               	{ this.props.children }
               </RouterContext.Provider>
           )
       }
   }
   ```

4. 然后再到 Route.js 中去，改一下 match 那块的表达式——有 path 时，执行 matchPath，没有 path 时，则使用传递下来的 match：

   ```js
   const match = path
     ? matchPath(location.pathname, this.props)
     : context.match;
   ```

   因为现在并没有做独占路由，所以最终 404 页面就会始终显示在页面中。

最后我们来实现一下 switch 独占路由（毕竟 404 还一直在页面中顽强的展示）：

```js
// ./react-router-dom-nut/Switch.js
import React, { Component } from "react";

export default class Switch extends Component {
  render() {
    return (
      <RouterContext.Consumer>
        {(context) => {
          const location = this.props.location || context.location;
          let match; // 是否匹配
          let element; // 匹配到元素

          React.Children.forEach(this.props.children, (child) => {
            if (match == null && React.isValidElement(child)) {
              element = child;
              const { path } = child.props;
              match = path
                ? matchPath(location.pathname, child.props)
                : context.match;
            }
          });
          return match
            ? React.cloneElement(element, { computedMatch: match })
            : null;
        }}
      </RouterContext.Consumer>
    );
  }
}
```

做完这些之后，我们再回到 Route 中，取出 props 中的 computedMatch 属性：

```js
const { path, children, component, render, computedMatch } = this.props;

// 如果有 computedMatch 就使用 computedMatch，没有的话，按正常逻辑
const match = computedMatch
  ? computedMatch
  : path
  ? matchPath(location.pathname, this.props)
  : context.match;
```

做完这些之后，就完成了手动实现了 react-router 的效果了。