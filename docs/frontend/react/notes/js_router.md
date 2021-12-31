---
title: 原生js实现前端路由
date: 2021-02-09
tags:
 - JavaScript
categories:
 - front
---

首先我们先通过 hash 的方式来实现前端路由：

```html
<ul>
    <li><a href="#home">首页</a></li>
    <li><a href="#user">用户中心</a></li>
    <li><a href="login">登录</a></li>
</ul>
<div id="view">
    <!-- 根据 hash 的变化填充不同的内容 -->
</div>
```

我们之前说过 `#` 后面的内容服务端是不监控的，那这时前端就可以做监控，监控其 hash 变化从而渲染对应的组件。

```js
// 获取 view
let view = null
// 当初始的 HTML 文档被完全加载和解析完成之后，DOMContentLoaded 事件被触发，无需等待样式表、图像和子框架的完全加载。
window.addEventLisenter('DOMContentLoaded', onLoad)

// 监听 hash 变化，当URL的片段标识符更改时，将触发hashchange事件 (跟在＃符号后面的URL部分，包括＃符号)
window.addEventLisenter('hashchange', onHashChange)

function onLoad() {
    view = document.getElementById('view')
    onHashChange()
}

// 监听 hash 变化
function onHashChange() {
    switch(location.hash) {
        case '#home':
            view.innerHTML = '首页'
            break
        case '#user':
            view.innerHTML = '用户中心'
            break
        case '#login':
            view.innerHTML = '登录'
            break
        
    }
}
```

我们通过监听 `DOMContentLoaded` 事件来判断初始的 HTML 文档被完全加载和解析完成，而不比等待样式表、图像和子框架的完全加载。