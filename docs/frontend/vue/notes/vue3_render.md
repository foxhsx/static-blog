---
title: vue3实现自定义的 render
date: 2021-03-02
tags:
 - Vue
categories:
 - front
---

- canvas 和 vue3 的碰撞
- canvas --> pixi.js
- 目标：vue3 结合 pixi.js 实现把图形绘制到 canvas 上

## setup 初始化环境

- webpack

- vue3

- 配置 scripts

 - build

 - serve



## 实现 renderer

- createRenderer({...nodeOps, patchProp})

- const nodeOps = {}

- function patchProp(){}



## 构建程序入口

- createApp()



## 构建 canvas 根容器

- 引入 pixi.js

- 初始化 canvas 容器



## 构建根组件

- defineComposition()
- Renderer
- h
- vnode

## 完善渲染接口

- insert
- createElement
- setElementText

## 完善 patchProp

- patchProp(el, key, prevValue, nextValue)

## 初始化项目

首先我们在上面可以看到初始化环境需要的依赖，我们根据这些依赖进行下载安装：

```shell
npm i @vue/runtime-core pixi.js webpack-dev-server -S
npm i webpack webpack-cli -D
```

然后新建 webpack.config.js

```js
const { resolve } = require('path')

module.exports = {
  entry: './main.js',
  output: {
    filename: '[name].js',
    path: resolve(__dirname, './dist')
  },
  devtool: 'source-map',
  devServer: {
    contentBase: resolve(__dirname, './dist')
  }
}
```

创建入口文件 main.js:

```js
import { createApp } from './src/runtime-canvas'
import App from './src/App'
import { getRootComponent } from './src/Game'

// 需要根组件
// 调用 mount 需要传入一个根容器
createApp(App).mount(getRootComponent())
```

runtime-canvas 是我们自定义的渲染器：

```js
// ./src/runtime-canvas/index.js
import { createRenderer } from '@vue/runtime-core'
import { Graphics, Text } from 'pixi.js'

// 创建一个 renderer
const renderer = createRenderer({
    createElement(type) {
        // 根组件 App 里的虚拟DOM标签
        // 绘制一个矩形
        // 使用 pixi
        let element;
        if (type === 'rect') {
            // 绘制一个矩形
            element = new Graphics()
            element.beginFill(0xff0000)  // 红色矩形
            element.drawRect(0,0,500,500)  // x y 宽 高
            element.endFill()  // 结束绘制
        }
        if (type === 'circle') {
            // 绘制一个矩形
            element = new Graphics()
            element.beginFill(0xff0000)  // 红色矩形
            element.drawCircle(0,0,50)  // x y 半径
            element.endFill()  // 结束绘制
        }
        return element
    },
    patchProp(el, key, prevValue, nextValue) {
        // pixi
        // el.x = value
        // el.y = value
        el[key] = nextValue
    },
    setElementText(node, text) {
        const cText = new Text(text)
        node.addChild(cText)
    },
    createText(text) {
        return new Text(text)
    },
    insert(el, parent) {
        console.log(el);      // createElement 创建的 canvas
    	console.log(parent);  // pixi 的容器
        parent.addChild(el)
    }
})

export function createApp(rootComponent) {
    return renderer.createApp(rootComponent)
}
```

接下来是创建根组件 App:

```js
// App.js
// 根组件
import { defineComponent, h } from '@vue/runtime-core'
import Circle from './component/Circle'

export default defineComponent({
    // defineComponent 用来定义组件
    render() {
        // 创建 vnode，为了支持 tree shaking 所有的模块都需要导入进来
        const vnode = h('rect', { x: 100, y: 100 }, [
            '这是 vue3',
              // h("circle", { x: 150, y: 150 })
              h(Circle)
        ])
        return vnode
    }
})
```

我们将绘制的圆也封装成一个组件 Circle:

```js
import { h, defineComponent } from '@vue/runtime-core';

export default defineComponent({
  render() {
    return h("circle", {
      x: 150,
      y: 250
    })
  }  
})
```

最后获取根容器：

```js
// ./src/Game.js
import { Application } from 'pixi.js'

// canvas -> pixi.js 然后初始化 canvas 
// 生成 canvas
const game = new Application({
  width: 750,
  height: 1080
})

console.log(game);
// 添加到 body 中
// game.view ==> canvas
document.body.append(game.view)

// game.stage ==> pixi 的根容器

export function getRootComponent() {
  return game.stage
}
```

那么准备工作就做好了。
