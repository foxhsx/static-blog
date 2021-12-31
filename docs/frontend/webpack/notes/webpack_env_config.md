---
title: webpack不同环境配置
date: 2021-01-14
tags:
 - JavaScript
 - Webpack
categories:
 - front
---
因为生产环境和开发环境有很大差异，在生产环境中我们强调要以更少量、更高效的代码完成业务功能，也就是注重运行效率。而开发环境中我们是需要注重开发效率的。

[[toc]]

## 不同环境下的配置
我们应该为不同的环境创建不同的配置文件。创建不同环境配置的方式主要有两种：
1. 在配置文件中添加相应的判断条件，根据环境不同导出不同的配置；
2. 为不同的环境单独添加一个配置文件，即一个环境对应一个配置文件。

### 同一个文件
webpack 配置文件还支持导出一个函数，然后在函数中返回所需要的配置对象。这个函数可以接收两个参数，一个是env，是我们通过 CLI 传递的环境名参数，第二个是 argv，是运行 CLI 过程中所有的参数。
```js
// ./webpack.config.js
module.exports = (env, argv) => {
  return {
    // ...webpack 配置
  }
}
```

我们可以借助这个特点，对开发环境和生产环境创建不同的配置。首先我们将不同环境下的公共配置提取出来：
```js
// ./webpack.config.js
module.exports = (env, argv) => {
  // 公共配置
  const config = {
    //...不同环境下的公共配置
  }
  return config
}
```

然后通过判断，为 config 对象添加不同环境下的特殊配置：
```js
// ./webpack.config.js
module.exports = (env, argv) => {
  // 公共配置
  const config = {
    //...不同环境下的公共配置
  }

  if (env === 'development') {
    // 为 config 添加开发模式下的特殊配置
    config.mode = 'development'
    config.devtool = 'cheap-eval-module-source-map'
  } else if (env === 'production') {
    // 为 config 添加生产模式下的特殊配置
    config.mode = 'production'
    config.devtool = 'nosources-source-map'
  }
  return config
}
```

通过这种方式配置完成后，我们再执行 webpack 命令时就可以通过 `--env="环境"` 参数去指定具体的环境名称，从而实现不同环境中使用不同的配置。

### 不同文件
通过判断环境名参数返回不同配置对象的方式只适用于中小型项目，因为一旦项目变得复杂，我们的配置也会一起变得复杂起来。所以对于大型的项目来说，还是建议使用不同环境对应不同配置文件的方式来实现。

一般在这种方式下，项目中最少会有三个 webpack 的配置文件。其中两个用来分别适配开发环境和生产环境，另外一个则是公共配置。因为开发环境和生产环境的配置并不是完全不同的，所以需要一个公共文件来抽象两者相同的配置。
```md
.
├── webpack.common.js ···························· 公共配置
├── webpack.dev.js ······························· 开发模式配置
└── webpack.prod.js ······························ 生产模式配置
```

那么不同的环境配置文件里我们都要先导入公共配置对象，然后这里我们可以使用`webpack-merge`来将公共配置和具体的环境配置合并到一起。

::: tip

这里为啥不用`Object.assign` 的原因是这个方法会完全覆盖掉前一个对象中同名属性。这对于普通值类型的属性是没有啥问题的，但是对于 plugins 这种数组而言，就会把它整个都替换掉，而我们想要的效果只是在原有的基础上，再 push 进去其他插件。

:::

先安装一下 `webpack-merge`：

```shell
npm i webpack-merge -D
```

安装完之后，我们在配置文件中引入这个模块。这个模块导出的就是一个 merge 函数，我们使用这个函数来合并这里的配置与公共的配置：

```js
// ./webpack.common.js
module.exports = {
    // ... 公共配置
}

// ./webpack.prod.js
const merge = require('webpack-merge')
const common = require('./webpack.common')
module.exports = merge(common, {
    // 生产模式配置
})

// ./webpack.dev.js
const merge = require('webpack-merge')
const common = require('./webpack.common')
module.exports = merge(common, {
    // 开发模式配置
})
```

然后我们在命令行终端，通过 `--config` 参数来指定我们所使用的配置文件路径。

```shell
webpack --config webpack.prod.js
```

当然，我们也可以直接将其写到 `package.json` 中：

```json
"scripts": {
   "build": "webpack --config webpack.prod.js"
}
```

## 生产模式下的优化插件

在 Webpack 4 中新增的 production 模式下，内部就自动开启了很多通用的优化功能。对于使用者而言，开箱即用是非常方便的，但是对于学习者而言，这种开箱即用会导致我们忽略掉很多需要了解的东西。以至于出现问题无从下手。

我们先一起学习 production 模式下几个主要的优化功能，顺便了解一下 Webpack 如何优化打包结果。

### Define Plugin

DefinePlugin 是用来为我们代码中注入全局成员的。在 production 模式下，默认通过这个插件往代码中注入了一个 process.env.NODE_ENV。很多第三方模块都是通过这个成员去判断运行环境，从而决定是否执行例如打印日志之类的操作。

DefinePlugin 是一个内置的插件，所以我们先导入 webpack 模块，然后在 plugins 中添加这个插件。这个插件的构造函数接收一个对象参数，对象中的成员都可以被注入到代码中：

```js
// ./webpack.config.js
const webpack = require('webpack')
module.exports = {
    //...其他配置
    plugins: [
        new webpack.DefinePlugin({
            API_BASE_URL: JSON.stringify('https://api.example.com')
        })
    ]
}

// ./src/main.js
console.log(API_BASE_URL)
```

::: tip

这里要使用 `JSON.stringify` 的原因是因为 `DefinePlugin` 其实就是把我们配置的字符串内容直接替换到了代码中，并不会包含引号，所以这里我们要么传入一个字符串字面量语句，要么使用 `JSON.stringify`的方式来得到表示这个值的字面量。

:::

### Mini CSS Extract Plugin

[传送门](./webpack_extract_css)

### Optimize CSS Assets Webpack Plugin

[传送门](./webpack_css_compress)

