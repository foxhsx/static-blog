---
title: webpack之css压缩
date: 2021-01-09
tags:
 - JavaScript
 - Webpack
categories:
 - front
---

css 压缩，是前端打包中比不可少的部分，因为压缩过后的代码，体积会较之前小很多。

那么对于 css 压缩，也是一件很简单的事情，只需要引入一个插件即可。

```shell
npm i optimize-css-assets-webpack-plugin -D
```

安装完成之后，只需要在配置文件中引入即可：

```js
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    ...
    plugins: [
        new OptimizeCssAssetsWebpackPlugin()
    ]
    ...
}
```

这里呢，我们不需要再去配置其他东西，因为 OptimizeCssAssetsWebpackPlugin 这个插件的默认配置已经足够我们去使用了。

再次执行 webpack 命令可以看到，打包后的 css 被压缩成了一行，而大小也成了 825 bytes；而在未使用压缩之前的大小为 976 bytes。

不过这里有个额外的小点，官方文档中，这个插件并不是配置在 plugins 数组中的，而是添加到了 optimization 对象中的 minimizer 属性中。

```js
// ./webpack.config.js
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
module.exports = {
  mode: 'none',
  entry: {
    main: './src/index.js'
  },
  output: {
    filename: '[name].bundle.js'
  },
  optimization: {
    minimizer: [
      new OptimizeCssAssetsWebpackPlugin()
    ]
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin()
  ]
}
```

原因是如果我们配置到了 plugins 属性中，那么这个插件在任何情况下都会工作。而配置到 optimization 中的 minimizer 中，就只会在 minimize 特性开启时才工作。

所以 webpack 建议像这种压缩插件，应该配置到 minimizer 中，便于 minimize 选项统一控制。

但是这个也有个缺点，我们设置了 minimizer，Webpack 认为我们需要使用自定义压缩器插件，它会将内部的 JS 压缩器给覆盖掉，我们必须再手动把 JS 压缩添加回来。

内置 JS 压缩器插件叫做 `terser-webpack-plugin`：

```shell
npm i terser-webpack-plugin -D
```

安装过后，手动配置到配置文件中：

```js
// ./webpack.config.js
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
module.exports = {
  mode: 'none',
  entry: {
    main: './src/index.js'
  },
  output: {
    filename: '[name].bundle.js'
  },
  optimization: {
    minimizer: [
      new TerserWebpackPlugin(),
      new OptimizeCssAssetsWebpackPlugin()
    ]
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin()
  ]
}
```

这样再次执行打包命令，JS 和 CSS 就都可以正常进行压缩了。