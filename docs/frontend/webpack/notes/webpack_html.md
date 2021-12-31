---
title: webpack打包html资源
date: 2020-12-21
tags:
 - JavaScript
 - Webpack
categories:
 - front
---

[[toc]]

## **下载插件**

```shell
npm i html-webpack-plugin -D
```

然后在 webpack.config.js 中去引入插件，引入的插件实际上是一个构造函数，我们在使用时，在对应的 plugins 配置项里去new一个实例出来，再在里面添加需要的配置即可。

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    ...
    plugins: [
       // html-webpack-plugin
        // 功能：默认会创建一个空的 HTML，自动引入打包输出的所有资源（js/css）
        // 需求：需要有结构的 HTML 文件——加 template 配置
        new HtmlWebpackPlugin({
            // 复制对应的 html 文件，并自动引入打包输出的所有资源（js/css）
            template： './src/index.html'
        })
    ]
    ...
}
```

打包输出之后会发现，打包的目录里会多出来 html 文件，并且此文件是以 `./src/index.html` 为模板的。

那么在 webpack5之后，我们再这样安装，那现在会安装到的版本是@5.0.0-beta.1，但是有一个问题，我们再引入 mini-css-extract-plugin 插件进行css提取之后呢，会报错：

```javascript
ERROR in TypeError: The ‘compilation’ argument must be an instance of Compilation

JavascriptModulesPlugin.js:119 getCompilationHooks
[webpack-demo]/[_webpack@5.6.0@webpack]/lib/javascript/JavascriptModulesPlugin.js:119:10

CommonJsChunkFormatPlugin.js:30
[webpack-demo]/[_webpack@5.6.0@webpack]/lib/javascript/CommonJsChunkFormatPlugin.js:30:19

Hook.js:14 Hook.CALL_DELEGATE [as _call]
[npm]/[webpack]/[_tapable@2.1.1@tapable]/lib/Hook.js:14:14

Compiler.js:942 Compiler.newCompilation
[npm]/[webpack]/lib/Compiler.js:942:30

Compiler.js:984
[npm]/[webpack]/lib/Compiler.js:984:29

Hook.js:18 Hook.CALL_ASYNC_DELEGATE [as _callAsync]
[npm]/[webpack]/[_tapable@2.1.1@tapable]/lib/Hook.js:18:14

Compiler.js:979 Compiler.compile
[npm]/[webpack]/lib/Compiler.js:979:28

Compiler.js:494 Compiler.runAsChild
[npm]/[webpack]/lib/Compiler.js:494:8
webpack 5.6.0 compiled with 1 error in 1055 ms
```

那这就是因为 webpack5的版本和 html-webpack-plugin 的版本兼容问题而导致的，在查阅一些资料和博客后发现，将 html-webpack-plugin 插件的版本回退到 @5.0.0-alpha.9 之后就可以正常使用了。