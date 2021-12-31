---
title: React 入门及开发环境介绍
date: 2021-07-14
tags:
 - React
categories:
 - front
describe: React 的入门基础知识及开发环境的准备
---

## 基础知识

首先我们说 React 不同于 Vue 和 Angular，它自称自己只是一个构建用户界面的 JavaScript 库，而并非框架（实际上，还真是如此）。它呢，是一个声明式，高效且灵活的用于构建用户界面的 JavaScript 库。使用 React 可以把一些简短、独立的代码片段组合成复杂的 UI 界面，这些代码片段就被称为“组件”。

组件会接收一些参数，我们把这些参数叫做 props （props 是 properties 的简写），然后通过 render 方法返回需要展示在屏幕上的视图的层次结构。

render 函数返回了一个 React 元素，这是一种对渲染内容的轻量级描述。

我们会使用 JSX 来构建我们的组件，而在 JSX 中，你可以任意使用 JavaScript 表达式，只需要一个大括号把表达式括起来。每一个 React 元素实际上都是一个 JavaScript 对象，你可以在程序中把它保存在变量中或者作为参数传递。

> 剩下的不赘述了，可以移步到官网去看。

它的三大核心：

- 声明式：React 使创建交互式 UI 变得轻而易举。为使用者应用的每一个状态设计简洁的视图，当数据变动时，React 能高效更新并渲染合适的组件。以声明式编写 UI，可以让你的代码更加可靠，且方便调试。

- 组件化：构建管理自身状态的封装组件，然后对其组合以构成复杂的 UI。由于组件逻辑使用 JavaScript 编写而非模板，因此你可以轻松的在应用中传递数据，并保持状态与 DOM 分离。

- 一次学习，跨平台编写：无论你现在使用什么技术栈，在无需重写现有代码的前提下，通过引入 React 来开发新功能。

  React 还可以使用 Node 进行服务器渲染，或使用 [React Native](https://reactnative.dev/) 开发原生移动应用。

## 开发环境

我们可以使用官方提供的脚手架工具来快速搭建我们的 React 应用——`create-react-app`。

首先，我们要全局安装这个脚手架：

```shell
# npm
npm install -g create-react-app
```

然后就可以使用这个命令来创建一个 React 项目了：

```shell
# 全局安装
create-react-app <project_name>

# 非全局安装
npx create-react-app <project_name>
```

执行完这个命令后，它会帮我们安装一个 React 项目需要的最基本的依赖，包括 React 和 React-DOM 等等。

我们来看看执行完之后生成的项目目录：

```md
│  .gitignore-----------git 配置
│  package.json---------npm 项目配置
│  project.txt
│  README.md------------介绍文档
│  yarn.lock
├─public----------------静态资源文件
│      favicon.ico
│      index.html ------项目骨架
│      logo192.png
│      logo512.png
│      manifest.json
│      robots.txt
└─src ------------------源码目录
        App.css
        App.js
        App.test.js
        index.css
        index.js -------入口文件
        logo.svg
        reportWebVitals.js
        setupTests.js
```

那么接下来我们安装一下以后要用到的其他依赖：

- Redux：`npm install redux --save` 
- 配置文件：`npm run eject` 弹出配置文件，可以自定义配置 webpack

当然我们也可以扩展 package.json 里的 scripts 字段，扩展 npm run 命令。

> 在使用 eject 的时候，要注意，项目中如果有修改文件等操作，需要将修改先挂起，然后再进行 `yarn eject` 的操作，之后再 pop 回来。

新生成的项目目录里会多出来两个文件夹：

- config：这个里面其实是对 webpack 详细的配置
- scripts：这个里面其实就是我们实际执行 `yarn start` 时候的代码，也是很复杂的

而此时不光是这些，还会下载安装很多的依赖到项目里去，方便后面的开发调试。具体的依赖可以看最新的 `package.json` 文件。