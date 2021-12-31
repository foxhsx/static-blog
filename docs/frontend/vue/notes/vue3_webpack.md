---
title: 手动搭建 Vue3 框架
date: 2021-02-23
tags:
 - JavaScript
 - Vue
categories:
 - front
---
今天尝试了使用 webpack 和 vue3 来做一个 demo，其中遇到了几个问题，分享一下：
## 1、打包时报错 "export 'default' (imported as 'Vue') was not found in 'vue'
原因是 vue3 中没有全局的 vue，所以下面这种写法就会报错:
```js
import Vue from 'vue';

const Counter = {
  data() {
    return {
      counter: 0
    }
  }
}

Vue.createApp(Counter).mount('#app')
```

怎么解决呢？结构出 createApp:
```js
import { createApp } from 'vue';

const Counter = {
  data() {
    return {
      counter: 0
    }
  }
}

createApp(Counter).mount('#app')
```

## 2、[Vue warn]: Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js". at
打开打包后的 html 文件，发现写的 vue 相关代码并没有执行，但是页面也没有报错，只是抛出了一个警告：`[Vue warn]: Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js". at <App>`。
其实这段报错的意思就很明显：`[Vue warn]：组件提供了模板选项，但此版本的Vue不支持运行时编译。将捆绑程序配置为别名“vue”到“vue/dist”/vue.esm公司-捆绑机.js"`。那此时我们按照报错信息内容对 Vue 进行别名配置:
```js
// webpack.config.js
module.exports = {
  ...
  resolve: {
    alias: {
      "vue": "vue/dist/vue.esm-bundler.js"
    }
  }
  ...
}
```

再重新编译打包即可。