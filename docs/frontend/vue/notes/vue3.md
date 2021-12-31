---
title: vue3概述
date: 2021-02-23
tags:
 - JavaScript
 - Vue
categories:
 - front
---

## Vue3.0 亮点
- Performance（比 vue2 runtime 快了2倍）
- Tree Shaking（按需编译代码）
- Ts support（更优秀的 TS 支持）
- Componsition API（组合API）
- Custom Renderer API（自定义渲染器）
- 内置新特性组件

### Performance-性能
- 重写了虚拟 dom 的实现
- 编译模板的优化（运行时编译）
- update 性能提高（1.3到2倍）
- SSR 速度提高（2-3倍）

要知道的是，我们在 Vue 组件中写的 template 最终是会被渲染成 render 函数。我们可以在[Vue3 Template Explorer](https://vue-next-template-explorer.netlify.app/)上查看相关代码：

左侧是 template:
```html
<div :id="id">{{msg}}</div>
```

右侧是渲染而成的 render 函数：
```js
import { toDisplayString as _toDisplayString, createVNode as _createVNode, openBlock as _openBlock, createBlock as _createBlock } from "vue"

export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createBlock("div", { id: _ctx.id }, _toDisplayString(_ctx.msg), 9 /* TEXT, PROPS */, ["id"]))
}

// Check the console for the AST
```

这里的数字 9 是一个运行时编译的标记，表示需要更新的是 text 和 props，而 props 里可能会更改的属性是 id，也就是后面的数组中的值。

### Tree shaking
- 按需打包
- Vue2 纯 HelloWorld: 31.94kb

而 Vue3 官方给出的数据是：
1. 如果没有用到里面的功能，那么打包出来是13.5kb
2. 如果有用，打包出来是22.5kb

### TypeScript
- 自动的类型定义提示

### Fragment
- 不再限于模板中的单个根节点

```vue
<!-- vue2 -->
<template>
  <div>
    <p>Hello World</p>
  </div>
</template>

<!-- vue3 -->
<template>
  <p>Hello</p>
  <p>World</p>
</template>
```

::: tip Vue2 升级
vue add vue-next
:::

### Composition API
- 灵活的逻辑组合与复用
- 响应式对象
  - ref
  - reactive
- 生命周期
  - onMounted
  - onUnmounted

## Custom Renderer API
- 解决什么问题？
  - 允许用户自定义渲染平台
比如将代码绘制在 canvas 画布上。
  - createRenderer
  - 接口
    - createElement
    - insert
    - patchProp