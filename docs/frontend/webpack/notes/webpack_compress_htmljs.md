---
title: webpack之压缩html和js
date: 2021-01-13
tags:
 - JavaScript
 - Webpack
categories:
 - front
---

其实相对CSS压缩而言，HTML压缩和JS压缩是比较简单的，比如说JS，我们只要将 mode 改成 production 模式即可。因为在生产环境下会自动压缩JS代码，不需要有额外的配置。而在开发环境下呢，我们是不需要压缩的（毕竟你压缩后，无法定位追踪报错）。

而 HTML 的压缩，是在我们之前说的 HtmlWebpackPlugin 插件里配置一个选项 `minify` 来进行压缩的。

```js
// ./webpack.config.js
module.exports = {
    ...
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            minify: {
                // 移除空格
                collapseWhitespace: true,
                // 移除注释
                removeComments: true
            }
        })
    ]
    ...
}
```

