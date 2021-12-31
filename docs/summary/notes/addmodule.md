---
title: export default 后不能解构的原因及解决办法
date: 2021-04-12
tags:
 - JavaScript
categories:
 - front
---

今天在项目里遇到一个很灵性的问题，当我在一个 API 文件里导出某个 API 时，是这样的：

```js
export default {
  login,
  config
}
```

然后在页面去使用的时候，就报错了：

```vue
<script>
import { login } from './api'
export default {
  mounted() {
    login().then(res => {
      console.log(res, 'resss')
    })
  }
}
</script>

// login is undefined
```

就很奇怪，看代码从语法上是没有问题的，那为什么获取不到 login 呢？

这是因为在项目编译时经过 webpack 和 babel 的转换，将 ES6 的模块导入与变量解构转换成了 CommonJS 的写法。

```js
export default {
  login,
  config
}
```

变成了：

```js
module.exports.default = {
  login,
  config
}
```

这个时候再使用 ES6 的解构就拿不到值了。那么有什么办法可以解决这个问题呢？

方法一的话，就比较简单粗暴：

- 不改变被引用文件的情况下，在有引用的文件里，先导入完整对象，再解构；

```js
import api from './api'
const { login } = api;
```

- 改变被引用文件：

```js
export const login = '';
export const config = '';
```

方法二，我们可以安装一个插件来解决：

```shell
npm i babel-plugin-add-module-exports -D
```

安装完成之后在 `.babelrc` 文件或者 `babel.config.js` 文件中去配置：

```js
module.exports = {
  presets: [
    '@vue/app',
    '@vue/babel-preset-jsx'
  ],
  plugins: [
    'add-module-exports'
  ]
}
```

重启项目即可。