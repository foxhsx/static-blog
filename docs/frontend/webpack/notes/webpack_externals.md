---
title: webpack之externals
date: 2021-01-27
tags:
 - JavaScript
 - Webpack
categories:
 - front
---

externals 是干什么的？——它的作用是防止在打包过程中把一些包打到 bundle 产物中。

说白了就是在打包的时候过滤掉某些依赖，而使用 CDN 等方式引入，从而减少打包后的产物体积。

下面我们来看看怎么配置它：
```js
// ./webpack.config.js
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  mode: 'production',
  externals: {
    // 忽略库名 -- npm 包名
    jquery: 'jQuery'
  }
}
```

上述配置中的 `externals` 表示**拒绝将jQuery被打包进来**。那么这时候我们要在 HTML 模板中加入一个 jQuery 的 CDN 链接即可。