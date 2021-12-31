---
title: webpack配置之entry
date: 2021-01-31
tags:
 - JavaScript
 - Webpack
categories:
 - front
---

**entry**表示webpack的入口，也就是告诉webpack应该使用哪个模块来作为构建**依赖图**的开始。当加载了入口文件后，webpack会根据里面引入的模块和第三方库，解析出对应的依赖树。它可以是相对路径且 `./` 不能省略。

那它的写法呢，从文件数量上来说，只有两种：

1. 单入口

   - String

   ```js
   module.exports = {
       entry: './src/index.js',
       output: {
           filename: '[name].js',
           path: resolve(__dirname, 'dist')
       },
       plugins: [
           new HtmlWebpackPlugin()
       ],
       mode: 'development'
   }
   ```

   那么这里我们直接在 entry 处写上对应的入口文件的路径，之后打包会形成一个 chunk。输出 dist 文件（默认），而 chunk 的默认名称是 main。

2. 多入口

   - Array

     ```js
     module.exports = {
         entry: ['./src/index.js', './src/add.js'],
         output: {
             filename: '[name].js',
             path: resolve(__dirname, 'dist')
         },
         plugins: [
             new HtmlWebpackPlugin()
         ],
         mode: 'development'
     }
     ```

     那么这种多入口的文件，在打包之后，数组中的所有入口文件会被打包成一个 chunk，输出出去只有一个文件。

     正常的多入口会在打包后生成多个 js 文件，但是数组形式的只会输出一个，这是因为数组中的 js 文件最终都会被打包到第一个 js 文件中去，而第一个 js 文件打包后默认也是 main.js。（其实打包后的结果和单入口打包是一样的，都只有一个文件，与之不同的是，第一个js文件里并没有引入后面的js。）

     适用场景：一般来讲在开发环境下，只有在 HMR 功能中让 html 热更新生效——将 html 文件放到入口文件里即可。

   - Object

     ```js
     module.exports = {
         entry: {
         	index: './src/index.js',
             add: './src/add.js'
         },
         output: {
             filename: '[name].js',
             path: resolve(__dirname, 'dist')
         },
         plugins: [
             new HtmlWebpackPlugin()
         ],
         mode: 'development'
     }
     ```

     有几个入口文件就形成几个 chunk，输出几个 bundle 文件。此时的 chunk 名称其实就是入口的 key 值。

     ::: tip

     **特殊用法**

     ```js
     {
         // 所有入口文件最终只会形成一个 chunk，输出出去只有一个 bundle 文件
         index: ['./src/index.js', './src/test.js'],
         // 形成一个 chunk，输出一个 bundle 文件.
         add: './src/add.js'
     }
     ```

     那这种用法适用将多个文件打包成一个 chunk 的场景。案例[dll](./webpack_dll)

     :::

 