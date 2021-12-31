---
title: webpack配置之resolve
date: 2021-01-31
tags:
 - JavaScript
 - Webpack
categories:
 - front
---

resolve 配置呢，主要是用来设置模块如何被解析。也就是说用来解析模块的规则。比如，在 ES6 中调用 `import "lodash"`，那 `resolve` 选项就能够对 webpack 查找 `lodash` 的方式去做修改。

来看下一个简单的例子：

```js
module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'js/[name].js',
        path: resolve(__dirname, 'dist')
    },
    module: {
        rules: []
    },
    plugins: [
        new HtmlWebpackPlugin()
    ],
    mode: 'development',
    // 解析模块的规则
    resolve: {
        // 配置解析模块的路径别名：简写路径
        alias: {
            $css: resolve(__dirname, 'src/css')
        },
        // 配置省略文件路径的后缀名，默认是 js 和 json
        extensions: ['.js', '.json'],
        // 告诉 webpack 解析模块的时候去找哪个目录
        // 定位到上上一级目录的 node_modules，第二个 node_modules 的作用，防止第一个找不到
        modules: [resolve(__dirname, '../../node_modules'), 'node_modules']
    }
}
```

- **alias**：配置解析模块的路径别名（简写路径）。

- **extensions**：配置省略文件路径的后缀名，默认是 js 和 json。

  ::: warning

  使用此选项，会**覆盖默认数组**，这就意味着 webpack 将不再尝试使用默认扩展来解析模块。

  :::

- **modules**：告诉 webpack 解析模块的时候去找哪个目录。配置项会告诉 webpack 解析模块的时候去哪个目录找，默认是 node_modules，它会一层一层去找这个目录，当前目录没有，就会去上一层目录找。我们也可以直接使用 resolve 函数将路径写死，从而直接定位到对应的目录，优化解析速度。

