---
title: webpack打包其他资源
date: 2020-12-22
tags:
 - JavaScript
 - Webpack
categories:
 - front
---

所谓的其他资源比如字体图标，这种资源是不需要去做处理的，只需要原封不动的输出出去就可以了。

这个我们只需要在配置文件里再加一个 rule 就可以了。打包其他资源的时候就使用 file-loader 就可以了。

```javascript
module.exports = {
    module: {
        rules: [
            {
                // 打包其他资源（除了 html/js/css 资源以外的资源）
                // 排出 css js  html 资源
                exclude: /\.(css|js|html)$/,
                loader: 'file-loader',
                options: {
                    name: '[hash:10].[ext]',
                    // 输出到 media 目录下面
                    outputPath: 'media'
                }
            }
        ]
    }
}
```

