---
title: webpack配置总结
date: 2021-01-14
tags:
 - JavaScript
 - Webpack
categories:
 - front
---

## 基础
 - [概述](../../webpack/)
 - [前端模块化发展史](./modularization_history.html)
 - [安装](./Install.html)

## 开发环境配置
 - [打包样式资源](./webpack_css.html)
 - [打包html资源](./webpack_html.html)
 - [打包图片资源](./webpack_img.html)
 - [打包其他资源](./webpack_other.html)
 - [devServer](./webpack与dev.html)

## 生产环境配置
 - [提取css](./webpack_extract_css.html)
 - [css兼容性处理](./webpack_css_compatible.html)
 - [压缩css](./webpack_css_compress.html)
 - [js语法检查](./webpack_eslint.html)
 - [js兼容性处理](./webpack_js_compatible.html)
 - [js压缩与html压缩](./webpack_compress_htmljs.html)

## 优化配置
 - [HMR](./hot_update.md)
 - [source-map](./webpack_sourceMap.md)
 - [oneOf](./webpack_loader.md#oneof)
 - [cache](../../engineering/notes/Cache.md)
 - [tree_shaking](./treeShakingAndSideEffects.md)
 - [code_split](./webpack_CodeSplitting.md)
 - [lazy_loading](../../engineering/notes/lazyLoading.md)
 - [pwa](../../engineering/notes/PWA.md)
 - [thread](./webpack_thread.md)
 - [externals](./webpack_externals.md)
 - [dll](./webpack_dll.md)

## 配置详解


现在把 package.json 中的 scripts 中添加一项：

```json
"scripts": {
    "dev": "webpack-dev-server"
}
```

然后在命令行中跑一下：

```shell
npm run dev
```

需要注意的是，在最新的版本中（**webpack5**），启动方法改为了：

```javascript
webpack serve
```

且由于兼容问题，html-webpack-plugin插件的版本为：

```json
{
    "html-webpack-plugin": "^5.0.0-alpha.9",
}
```

## 让配置文件支持智能提示

默认 VSCode 并不知道 Webpack 配置对象的类型，我们通过 import 的方式导入 Webpack 模块中的 Configuration 类型，然后根据类型注释的方式将变量标注为这个类型，这样我们在编写这个对象的内部结构时就可以有正确的智能提示了，具体代码如下所示：

```javascript
// webpack.config.js
import { Configuration } from 'webpack'
/**
* @type {Configuration}
*/

const config = {
	entry: './src/index.js',
    output: {
        filename: 'bundle.js'
    }
}
module.exports = config
```

需要注意的是：我们添加的 import 语句只是为了导入 Webpack 配置对象的类型，这样做的目的是为了标注 config 对象的类型，从而实现智能提示。在配置完成后一定要记得注释掉这段辅助代码，因为在 Node.js 环境中默认还不支持 import 语句，如果执行这段代码会出现错误。

使用 import 语句导入 Configuration 类型的方式固然好理解，但是在不同的环境中还是会有各种各样的问题，例如我们这里在 Node.js 环境中，就必须要额外注释掉这个导入类型的语句，才能正常工作。

虽然我们这里只是一个 JavaScript 文件，但是在 VSCode 中的类型系统都是基于 TypeScript 的，所以也可以直接在类型注释中使用 import 动态导入类型。

```javascript
// ./webpack.config.js
/** @type {import('webpack').Configuration} */
const config = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js'
  }
}
module.exports = config
```

webpack 加载资源的方式：

1. 遵循 ES Modules 标准的 import 声明
2. 遵循 CommonJS 标准的 require 函数
3. 遵循 AMD 标准的 define 函数和 require 函数
4. 样式代码中的 @import 指令和 url 函数
5. HTML 代码中图片标签的 src 属性