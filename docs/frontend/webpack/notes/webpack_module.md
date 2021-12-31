---
title: webpack配置之module
date: 2021-01-31
tags:
 - JavaScript
 - Webpack
categories:
 - front
---

module 顾名思义，这个配置项里的选项决定了如何处理**不同类型的模块**。

一般我们经常使用的就是 rules：

```js
module.exports = {
    ...
    module: {
        rules: {
            // loader 的配置
            {
            	test: /\.css$/,
            	// 多个 loader 用 use
            	use: ['style-loader', 'css-loader']
        	},
    		{
    			test: /\.js$/,
    			// 排除 node_modules 下的 js 文件
    			exclude: /node_modules/,
    			include: resolve(__dirname, 'src'),
                 // 优先执行
                 enforce: 'pre',
                 // 延后执行
                 // enforce: 'post',
                 // 单个 loader 用 loader
                 loader: 'eslint-loader',
                 // 指定一些配置选项
                 options: {}
			},
             {
                 // 以下配置只会生效一个
                 oneOf: []
             }
        }
    }
    ...
}
```

关于 enforce ，如果不写此属性，表示中间执行。