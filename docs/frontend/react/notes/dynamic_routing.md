---
title: React-动态路由与嵌套路由
date: 2021-03-04
tags:
 - JavaScript
 - React
categories:
 - front
---

## 动态路由

啥是动态路由？

这个问题看似很白痴，但是它就是这么简单——动态路由就是路由是动态的。它后面可以拼接动态参数，可以是 123，也可以是 abc。

那么动态路由需要怎么做呢？

```js
<Link to="/user/123">用户中心</Link>

<Route path="/user" component={ UserPage } />

function UserPage() {
  return <div>user page</div>
}
```
现在这个路由是写死的，如果还有 id 是 1234 或者 abcd 的，那页面会被导航到 404Page 去。这显然是不行的，咋办？在线等，挺急的。

```js
<Route path="/user/:id" component={ UserPage } />
```

如上，我们在匹配的时候添加一个参数，比如 id，然后我们用 id 来接收传进来的值即可。

配置好之后，不管是1234还是 abcd 就都可以匹配到对应的页面了。

当然了，我们也可以获取到当前页面的 id，怎么获取呢？

```js
function UserPage(props) {
  console.log('我是id', props.match.params.id)
  const { id } = props.match.params
  return <div>UserId：{ id } </div>
}
```

## 嵌套路由

Route 组件嵌套在其他页面组件中就产生了嵌套关系。

比如：
```js
// ./ Prouduct.js
import React, { Component } from 'react';
import { BrowserRouter as Route, Link } from 'react-router-dom'

export default class Product extends Component{
  constructor(props) {
    super(props)
  }
  render() {
    const { match } = this.props
    const { url } = match
    const { id } = match.params
    return (
      <div>
        Product: { id }
        <Link to={ `${url}/detail` }>详情</Link>
        <Route path={ `${url}/detail` } component={Detail} />
      </div>
    )
  }
}

function Detail(props) {
  return <div>Detail</div>
}
```


