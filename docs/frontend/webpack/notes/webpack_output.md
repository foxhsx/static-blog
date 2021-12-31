---
title: webpack配置之output
date: 2021-01-31
tags:
 - JavaScript
 - Webpack
categories:
 - front
---

那么既然有 entry 入口，那相对应的也有 output 出口。它的作用是告诉 webpack 在哪里输出它所创建的 bundles，以及如何命名这些文件，默认值为 `dist`。

```js
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: '[name].js',
        path: resolve(__dirname, 'dist')
    },
    plugins: [new HtmlWebpackPlugin()],
    mode: 'development'
}
```

以上只是我们常用的基本的 output 的配置：

- **filename**：文件名称，还可指定名称+目录；
- **path**：输出文件的目录，是将来所有资源输出的公共目录，必须是绝对路径；

还有的其他的配置如下：

- **publicPath**：所有资源引入的公共路径前缀，它会补充在一般路径的前面。

  ::: tip

  'imgs/1.png'  ==> 这个路径的意思是在当前路径下直接找 imgs 目录。

  '/imgs/1.png'  ==> 这个路径前面的 `/` 会以当前的服务器地址去补充，会到服务器根目录下去找 `imgs` 目录，然后再找 `1.png`。

  那么在线上环境会更倾向于第二种路径方式，所以通过 `publicPath` 来配置一个公共路径。

  **注意**：它并不表示资源输出到哪里，而是表示打包上线后的资源路径前面要不要加设置的公共路径前缀，设置了就加，没有设置就不加。一般用于生产环境。

  :::

-  **chunkFilename**：非入口 chunk 的名称。当在项目中遇到 chunk 很多的时候，即可使用。

> 怎么样才算是额外的 chunk 呢？有两种方式：
>
> 1. 通过 ES6 import 语法，它会将一个文件单独分割成一个 chunk。
> 2. 通过 optimization，它会将 node_modules 中的第三方库单独分割成一个 chunk。

- **library**：定义**整个库**向外暴露的全局变量名称。当外界引入 js 文件后，可以找到这个变量，从而使用里面的值。通常结合 dll 将某个库单独打包，引入使用时才会配置 library；正常打包不需要。
- **libraryTarget**：通过 library 定义的变量就会指定在当前设置的对象下。比如 window，适用于 browser 即浏览器端。当然也可以指定 global，适用于 nodejs，也可以直接指定为 commonjs，这样就是以 commonjs 的方式导出。