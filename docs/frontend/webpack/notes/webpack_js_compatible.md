---
title: webpack之JS兼容性处理
date: 2021-01-11
tags:
 - JavaScript
 - Webpack
categories:
 - front
---

[[toc]]

说到兼容性，那么首先想到的就是 ES6+ 以上的语法对一些浏览器来说，是不怎么兼容的，或者说这些浏览器对 ES6+ 的语法不怎么友好，比如 IE 浏览器，虽然现在微软已经放弃了 IE，转向了新生代 Edge，但是不可否认的是，IE 浏览器还有一些用户在使用，所以我们在开发的时候并不能彻底抛弃它，因此 ES6+ 的兼容问题还是得解决，那么在 webpack 中我们怎么去处理 ES6+ 的兼容性问题呢？

## 基本JS兼容性处理

这里著名的 JS 兼容性处理工具 `babel` 就闪亮登场了。首先，安装 `babel-loader`：

```shell
npm i babel-loader -D
```

安装完成之后再到配置文件去进行配置：

```js
// webpack.config.js
module.exports = {
    ...
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    // babel-loader 要进行语法转换时的规则
                    // 预设：指示 babel 做怎样的兼容性处理
                    presets: ['@babel/preset-env']
                }
            }
        ]
    }
    ...
}
```

这里我们在 options 中设置了 preset 选项，意思是提前告知 babel 要做怎样的兼容性处理。这里的 `@babel/preset-env` 也要进行安装：

```shell
npm i @babel/preset-env -D
```

那么在安装时，我们会发现控制台会提示你，让你再安装一个 @babel/core@^7.0.0-0 的依赖，那这个依赖是干嘛的呢？这个是 babel 的核心库，那既然是 babel 的核心库，那说明我们还得需要下载 babel 这个库。

```shell
npm i babel @babel/core -D
```

配置完成这些之后，我们就完成了基本的JS 兼容性处理。

## 全部JS兼容性处理

但是，光有基本的兼容性处理是不够的，比如 Promise 就不能转换。那这里我们就需要使用全部的 JS 兼容性处理——@babel/polyfill。

```shell
npm i @babel/polyfill -S
```

安装完之后，只需要在文件中引入就可以了，因为它不是 babel 的插件。

```js
import '@babel/polyfill';

const es6Add = (x, y) => x + y;
console.log(es6Add(2, 1));

const promise = new Promise((resolve) => {
    setTimeout(() => {
        console.log('定时器完成');
        resolve();
    }, 1000)
})

console.log(promise)
```

那其实这种方式也有一个问题，那就是如果我们只要解决部分的兼容性问题，但是它会将所有兼容性代码全部引入，从而导致代码打包后的体积增大。

## 按需处理

所以针对以上问题就有了——按需处理兼容性：corejs。

```shell
npm i core-js -D
```

同样，安装好之后进行配置。

```js
// webpack.config.js
module.exports = {
    ...
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    // babel-loader 要进行语法转换时的规则
                    // 预设：指示 babel 做怎样的兼容性处理
                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                // 按需加载
                                useBuiltIns: 'usage',
                                // 指定 core-js 版本
                                corejs: {
                                    version: 3
                                },
                                // 指定兼容性做到哪个版本的浏览器
                                targets: {
                                    chrome: '60',
                                    firefox: '60',
                                    ie: '9',
                                    safari: '10',
                                    edge: '17'
                                }
                            }
                        ]
                    ]
                }
            }
        ]
    }
    ...
}
```

这里，我们重新写了配置项：

1. presets 数组里嵌套二维数组。
2. 二维数组中，第一项为基础配置项，也就是 `@babel/preset-env`，用来转换基础语法。
3. 第二项是一个对象：
   1. useBuiltIns：设置按需加载。
   2. corejs：用来指定 core-js 版本。
   3. targets：用来更加精确的指定兼容性要做到哪个版本的浏览器。