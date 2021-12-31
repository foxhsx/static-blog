---
title: webpack之css兼容处理
date: 2021-01-08
tags:
 - JavaScript
 - Webpack
categories:
 - front
---

那么我们说在打包提取 css 后，对于不同的浏览器，肯定会有 css 兼容性问题的存在，那么此时的 css 兼容应该怎么去做呢？

在 webpack 中做 css 兼容性处理我们一般都会使用 postcss 这个库。而要使用这个库，我们又需要使用 postcss-loader 加载器来进行处理，除了 loader 之外，我们还需要使用 postcss-preset-env。这个插件的作用就是帮助postcss识别某些环境，从而加载指定的配置，让css兼容性能够精确到浏览器的某一个版本。

同样的，先安装这两个依赖:

```shell
npm install postcss-loader postcss-preset-env -D
```

等安装完成之后呢，我们就可以开始写配置了。这里的写法呢，有两种：

1. loader 的默认配置
2. 修改 loader 的配置——使用对象的写法

```js
// ./webpack.config.js
module.exports = {
    ...
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                	MiniCssExtractPlugin.loader,
          			'css-loader',
                    // 'postcss-loader'  默认写法
                    // 修改 loader 配置的写法
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                [
                                'postcss-preset-env',
                                {
                                    ident: 'postcss'
                                }
                                ]
                            }
                        }
                    }
                ]
            }
        ]
    }
    ...
}
```

其中 postcss-preset-env 它帮助 postcss 找到 package.json 中 browserslist 里面的配置，通过配置加载指定的 css 兼容性样式。

```json
{
    "browserslist": {
        "development": [
            "last 1 chrome version",
            "last 1 firefox version",
            "last 1 safari version"
        ],
        "production": [
            ">0.2%",
            "not dead",
            "not op_mini all"
        ]
    }
}
```

那么这些参数都是什么意思呢？

首先 browserslist 里的两个参数 `development` 和 `production` 这两个应该很好理解，一个对应开发环境，一个对应生产环境。

那么在开发环境下我们将兼容最近的几个浏览器的版本；而在生产环境下呢，我们就需要兼容大于百分之零点二的浏览器，也就是说要适配99.8%的浏览器，并且对于已经废弃掉的浏览器我们不去做兼容，因为已经没有意义。后面的 op_mini 也是一样的，欧朋浏览器国内已经见不到了。

**这里有一点需要注意的就是当前的环境变量了，因为这块postcss默认去取生产环境的配置，所以这里需要设置环境变量（nodejs 中的环境变量）：**

```js
process.env.NODE_ENV = 'development'
```

设置完之后就会去拿开发环境的配置。

::: tip

关于`browserslist`更加详细的配置，可以到 github上去搜索。[传送门](https://github.com/browserslist/browserslist)

:::

接下来我们打包之后就可以发现，打包后的 css 样式带上前缀：

```css
#title {
  color: #000;
  display: flex;
  -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
}
```

