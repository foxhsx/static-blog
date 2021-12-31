---
title: PWA
date: 2021-01-26
tags:
 - JavaScript
 - 前端工程化
categories:
 - front
---
可能好多人没有听过这个概念，什么是**PWA**？

PWA 全称是 Progressive Web App，即**渐进式WEB应用**（离线可访问）。
::: tip
1. 可以添加至主屏幕，点击主屏幕图标可以实现启动动画以及隐藏地址栏。
2. 实现离线缓存功能，即使用户没有网络，依然可使用一些离线功能——**ServiceWorker**。
3. 实现了消息推送
:::

那 PWA 技术主要是通过 `workbox` 这个库来实现的。所以我们需要在 webpack 中来安装这个库。
```shell
npm i workbox-webpack-plugin -D
```

安装好之后，我们在 webpack 的配置文件中引入并使用这个插件。
```js
// ./webpack.config.js
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

module.exports = {
  ...
  plugins: [
    new WorkboxWebpackPlugin.GenerateSW({
      /*
        帮助 serviceworker 快速启动
        删除旧的 serviceworker
      */
      clientsClaim: true,
      skipWaiting: true
    })
  ]
}
```

上面两个配置的作用，如注释里所说：
1. 帮助 serviceworker 快速启动
2. 删除旧的 serviceworker
   
最终会生成一个 serviceworker 的配置文件。然后通过这个配置文件来注册 serviceworker。

那么怎么注册呢？我们在入口文件 index.js 中去写：
```js
/*
  由于 serviceworker 会有兼容性问题，所以在写之前，还需要判断一下浏览器是否支持 serviceworker
*/
 
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(() => {
        console.log('sw 注册成功~')
      })
      .catch(() => {
        console.log('sw 注册失败~')
      })
  })
}
```

那其中 `service-worker.js` 这个文件呢，会通过构建后自动生成，所以我们就可以在代码里直接使用。

::: tip
有一点需要注意的是，我们在 `package.json` 中去写 `eslintConfig` 配置项的时候，需要加上一个配置项，否则 eslint 就会报错：
```json
"eslintConfig": {
  "extends": "airbnb-base",
  "env": {
    "browser": true
  }
}
```
:::

那加这个 `broswer` 配置的原因是，eslint 是不支持浏览器的全局变量的，而我们要使用 `window` 和 `navigator` 这两个全局变量，就得首先配置好这个选项，否则 eslint 检验就会跑出异常。

那么还有一点需要注意的是，sw 代码必须运行在服务器上：
1. nodejs
2. npm i serve -g  ==> serve -s build  启动服务器，将 build 目录下所有资源作为静态资源暴露出去。

然后启动服务，打开浏览器和控制台，点击 `Application` ，找到左侧的 `ServiceWorker` 查看注册的 serviceworker 资源。同时呢，找到 `Cache Storage` 可以看到注册成功之后缓存的一些数据。

要验证 serviceworker 是否生效，我们将网络改为 offline，再重新刷新一次。如果页面还是可以正常访问，说明注册成功；反之失败。