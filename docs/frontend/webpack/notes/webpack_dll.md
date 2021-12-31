---
title: webpack之dll
date: 2021-01-27
tags:
 - JavaScript
 - Webpack
categories:
 - front
---

dll 是干什么的？

dll 叫做动态链接库，它类似于 externals。会指示 webpack 哪些库是不参与打包的。那么不同的是，dll 会单独的对某些库进行打包，将多个库打包成一个 chunk。

那么它的意义是什么呢？
::: tip
正常情况下，node_modules 里的包会被打包成一个 chunk。那么为了减少这个 chunk 文件的体积，我们使用 dll 将一些第三方库给拆开来，打包成不同的文件或者说是 chunk。从而更有利于性能优化。
:::

具体用法：
```js
// ./webpack.dll.js
/*
  使用 dll 技术，对某些库（第三方库：jquery、react、vue...）进行单独打包
*/
const { resolve } = requrie('path')
const webpack = require('webpack')

module.exports = {
  entry: {
    // 最终打包生成的 name 就是 jquery
    jquery: ['jquery']
  },
  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'dll'),
    library: '[name]_[hash]',  // 打包的库里面向外暴露出去的内容叫什么名字
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]_[hash]',  // 映射库的暴露的内容名称
      path: resolve(__dirname, 'dll/manifest.json')  // 输出文件路径
    })
  ],
  mode: 'production'
}

// ./webapck.config.js
const { resolve } = requrie('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new webpack.DllReferencePlugin({
      // 拿到对应的映射关系文件，并对其进行解析
      manifest: resolve(__dirname, 'dll/manifest.json')
    }),
    new AddAssetHtmlWebpackPlugin({
      // 将 jquery 这个包引进来，并输出到 html 页面中
      filepath: resolve(__dirname, 'dll/jquery.js')
    })
  ],
  mode: 'production'
}
```

那么在 `webpack.dll.js` 中，`entry` 和 `output` 这两个配置是专门用来打包 jQuery 的，并且向外暴露出 jQuery 加 hash 值的名称。而下面的 DllPlugin 这个插件的作用就是生成一个 manifest.json 这个文件，它提供和 jQuery 的映射关系，通过这个映射关系可以知道 jQuery 这个库不用参与打包，并且知道向外暴露的内容是 `[name]_[hash]` 这个名称。

接下来我们运行 webpack 对第三方库——jQuery进行单独打包：
```shell
webpack --config webpack.dll.js
```

而在 `webpack.config.js` 中，`DllReferencePlugin` 这项配置会告诉 webpack 哪些库不参与打包，同时使用时的名称也需要改变。所以这里我们还需要使用到 `add-asset-html-webpack-plugin` 插件，它的作用就是**将某个文件打包输出去，并在 html 中自动引入该资源**。

::: tip

**DllReferencePlugin**：忽略打包 jQuery；

**AddAssetHtmlWebpackPlugin**：将之前 dll 打包的 jQuery 引进来，并动态输出到 html 页面中。

:::

