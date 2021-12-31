---
title: vnode到真实DOM是如何转变的
date: 2021-02-01
tags:
 - JavaScript
 - Vue
categories:
 - front
---

![](../imgs/render.png)

- 在 Vue.js 中，组件是一个非常重要的概念，整个应用的页面都是通过组件渲染来实现的，但是它内部是如何工作的？
- 从我们编写组件开始，到最终真实的 DOM 又是怎样的一个转变过程？

## 组件

组件是一个抽象的概念，它是对一颗 DOM 树的抽象。

比如我们在页面中写一个组件节点：

```html
<helloworld></helloworld>
```

它并不会在页面上渲染一个 helloworld 标签，它具体渲染成什么，取决你里面的模板。

比如组件内部是这样的：

```html
<template>
  <div>
  	<p>
    	Hello World    
    </p>    
  </div>
</template>
```

那在页面中 helloworld 组件就会渲染成 div 里包含一个 p 标签，标签内容是 Hello World 文本。

一个组件想要真正的渲染生成DOM的几个步骤：

1. 创建 vnode
2. 渲染 vnode
3. 生成 DOM

那 vnode 在这里我们可以理解为描述组件信息的JavaScript对象即可。

## 应用程序初始化

- 一个组件可以通过 “模板加对象描述” 的方式创建，组件创建好以后是如何被调用并初始化的呢？
- 因为整个组件树是由**根组件**开始渲染的，为了找到根组件的渲染入口，需要从**应用程序的初始化过程**开始分析。

Vue 2.x 初始化一个应用的方式：

```js
import Vue from 'vue'
import App from './App'

const app = new Vue({
    render: h => h(App)
})
app.$mount('#app')
```

Vue 3.0 初始化一个应用：

```js
import { createApp } from 'vue'
import App from './app'
const app = createApp(App)
app.mount('#app')
```

我们来看看 Vue 3.0 中 createApp 的内部实现：

```js
const createApp = ((...args) => {
    // 创建app对象
    const app = ensureRenderer().createApp(...args)
    const { mount } = app
    // 重写 mount 方法
    app.mount = (containerOrSelector) => {
        // ...
    }
    return app
})
```

首先是使用 `ensureRenderer().createApp()` 来创建 app 对象，ensureRenderer 方法用来创建一个渲染器对象：

```js
// 渲染相关的一些配置，比如更新属性的方法，操作 DOM 的方法
const rendererOptions = {
    patchProp,
    ...nodeOps
}
let renderder
// 延时创建渲染器，当用户只依赖响应式包的时候，可以通过 tree-shaking 移除核心渲染逻辑相关的代码
function ensureRenderer() {
    return renderer || (renderder = createRenderer(rendererOptions))
}

function createRenderer(options) {
    return baseCreateRenderer(options)
}

function baseCreateRenderer(options) {
    function render(vnode, container) {
        // 组件渲染的核心逻辑
    }
    
    return {
        render,
        createApp: createAppAPI(render)
    }
}

function createAppAPI(render) {
    // createApp 方法接受的两个参数：根组件的对象和 prop
    return function createApp(rootComponent, rootProps = null) {
        const app = {
            _component: rootComponent,
            _props: rootProps,
            mount(rootContainer) {
                // 创建根组件的 vnode
                const vnode = createVNode(rootComponent, rootProps)
                // 利用渲染器渲染 vnode
                render(vnode, rootContainer)
                app._container = rootContainer
                return vnode.component.proxy
            }
        }
    }
}
```

在整个 app 对象创建过程中，Vue.js 利用**闭包和函数柯里化**的技巧，很好地实现了参数保留。比如，在执行 app.mount 的时候，**不需要传入渲染器 render**，因为在执行 createAppAPI 的时候渲染器 render 参数已经被保留了下来。

::: tip

渲染器：是为跨平台渲染做准备的。也可以理解为包含平台核心逻辑的JavaScript对象。

:::

为什么要重写这个方法，而不把相关逻辑放在 app 对象的 mount 方法内部来实现呢？

因为 Vue 不仅仅是为 Web 平台服务，它的目标是**支持跨平台渲染**，createApp 函数内部的 app.mount 方法是一个标准的课跨平台的组件渲染流程。也就是先创建 vnode，再渲染 vnode，而这里面的参数 rootContainer 也可以是不同类型的值，比如在 Web 平台它是一个 DOM 对象，而在 weex 和小程序中可以是其他类型的值。所以这里面的代码不应该包含特定平台的相关逻辑，只保留与平台无关的纯净代码。

```js
mount(rootContainer) {
    // 创建根组件的 vnode
    const vnode = createVNode(rootComponent, rootProps)
    // 利用渲染器渲染 vnode
    render(vnode, rootContainer)
    app._container = rootContainer
    return vnode.component.proxy
}
```

而 app.mount 重写都做了哪些事情呢？

```js
app.mount = (containerOrSelector) => {
    // 标准化容器
    const container = normalizeContainer(containerOrSelector)
    if (!container) return
    const component = app._component
    // 如组件对象没有定义 render 函数和 template 模板，则取容器的 innerHTML 作为组件模板内容
    if (!isFunction(component) && !component.render && !component.template) {
        component.template = container.innerHTML
    }
    // 挂载前清空容器内容
    container.innerHTML = ''
    // 真正的挂载
    return mount(container)
}
```

首先是 `normalizeContainer` 标准化容器，这里可以传字符串或者DOM对象，但如果是字符串选择器就需要把它转成DOM对象作为最终挂载的容器。

然后判断组件如果没有定义 render 函数和 template 模板，就取容器的 innerHTML 作为组件模板内容。而且在挂载前，需要清空容器的内容，最后再调用 mount 方法进行挂载。

**重写的目的**：既能让用户在使用 API 时可以更加灵活，也兼容了 Vue 2.x 的写法，比如 app.mount 的第一个参数就同时支持选择器字符串和 DOM 对象两种类型。

## 核心渲染流程：创建 vnode 和 渲染 vnode

vnode 本质上是用来描述 DOM 的 JavaScript 对象，它在 Vue 中可以描述**不同类型的节点**。比如普通元素节点、组件节点等。

普通元素节点：

```html
<button class="btn" style="width:100px;height:50px">
    click me
</button>
```

那使用 vnode 来表示 button 标签：

```js
const vnode = {
    type: 'button',  // DOM 的标签类型
    props: {         // DOM 的一些附件信息
        'class': 'btn',
        style: {
            width: '100px',
            height: '50px'
        }
    },
    children: 'click me'  // DOM 的子节点，也可以是 vnode 数组
}
```

vnode 除了可以描述一个真实 DOM，也可以用来描述一个组件：

```html
<custom-component msg="test"></custom-component>
```

同样我们可以用 vnode 来表示 `custom-component` 组件：

```js
const CustomComponent = {
    // 在这里定义组件对象
}
const vnode = {
    type: CustomComponent,
    props: {
        msg: 'test'
    }
}
```

那组件 vnode 是对抽象事物的描述。这是因为我们并不会在页面上渲染一个 CustomComponent 标签，而是渲染组件内部的 html 标签。

那 vnode 类型不止上述的两种，还有**纯文本 vnode**和**注释 vnode**等等。

那么 vnode 有什么优势呢？为什么一定要设计 vnode 这样的数据结构呢？

1. **抽象**：引入 vnode，可以把渲染过程抽象化，从而使得组件的抽象能力也得到提升。
2. **跨平台**：因为 patch vnode 的过程，不同平台可以由自己的实现，基于 vnode 再做服务器渲染、weex 平台、小程序平台的渲染。

那这样的话是不是 vnode 的性能一定比手动操作原生 DOM 好，这个其实是不一定的：

- 首先这种基于 vnode 实现的 MVVM 框架，在每次 render to vnode 的过程中，渲染组件会有一定的 JavaScript 耗时，特别是大组件。
- 当我们去更新组件的时候，用户会感觉到明显的卡顿，虽然 diff 算法在减少 DOM 操作方面足够优秀，但是最终还是避免不了操作 DOM，所以说性能并不是 vnode 的优势。

Vue 内部通过 createVNode 函数创建了根组件的 vnode:

```js
const vnode = createVNode(rootComponent, rootProps)
```

createVNode 的大致实现：

```js
function createVNode(type, props = null, children = null) {
    if (props) {
        // 处理 props 相关逻辑，标准化 class 和 style
    }
    // 对 vnode 类型信息编码
    const shapeFlag = isString(type)
    	? 1/* ELEMENT */
    	: isSuspense(type)
    	? 128 /* SUSPENSE */
    	: isTeleport(type)
    	? 64 /* TELEPORT */
    	: isObject(type)
    	? 4 /* STATEFUL_COMPONENT */
    	: isFunction(type)
    	? 2 /* FUNCTIONAL_COMPONENT */
    	: 0
    const vnode = {
        type,
        props,
        shapeFlag,
        // 其他属性
    }
    
    // 标准化子节点，把不同数据类型的 children 转成数组或者文本类型
    normalizeChildren(vnode, children)
    return vnode
}
```

然后渲染创建好的 vnode:

```js
render(vnode, rootContainer)
const render = (vnode, container) => {
    if (vnode == null) {
        // 销毁组件
        if (container._vnode) {
            unmount(container._vnode, null, null, true)
        }
    } else {
        // 创建或者更新组件
        patch(container._vnode || null, vnode, container)
    }
    // 缓存 vnode 节点，表示已经渲染
    container._vnode = vnode
}
```

那创建或者更新组件中的 patch 是怎样的呢？

```js
const patch = (
    n1,
    n2,
    container,
    anchor = null, 
   	parentComponent = null, 
    parentSuspense = null, 
    isSVG = false, 
    optimized = false
) => {
    // 如果存在新旧节点，且新旧节点类型不同，则销毁旧节点
    if (n1 && !isSameVNodeType(n1, n2)) {
        anchor = getNextHostNode(n1)
        unmount(n1, parentComponent, parentSuspense, true)
        n1 = null
    }
    const { type, shapeFlag } = n2
    switch(type) {
        case Text:
            // 处理文本节点
            break
        case Comment:
            // 处理注释节点
            break
        case Static:
            // 处理静态节点
            break
        case Fragment:
            // 处理 Fragment 元素
            break
        default:
            if (shapeFlag & 1 /* ELEMENT */) {
                // 处理普通 DOM 元素
                processElement(
                	n1,
                    n2,
                    container,
                    anchor, 
                    parentComponent, 
                    parentSuspense, 
                    isSVG, 
                    optimized
                )
            } else if (shapeFlag & 6 /* COMPONENT */) {
                // 处理 TELEPORT
                processComponent(
                    n1,
                    n2,
                    container,
                    anchor, 
                    parentComponent, 
                    parentSuspense, 
                    isSVG, 
                    optimized
                )
            } else if (shapeFlag & 64 /* TELEPORT */) {
                // 处理 TELEPORT
            } else if (shapeFlag & 128 /* SUSPENSE */) {
                // 处理 SUSPENSE
            }
    }
}
```

- **n1**：表示旧的 vnode，当 n1 为 null 的时候，表示是一次挂载的过程
- **n2**：新的 vnode 节点，后续会根据这个 vnode 类型执行不同的处理逻辑
- **container**：表示 DOM 容器，在 vnode 渲染生成DOM后，会挂载到 container 下面

对于渲染的节点，我们这里重点关注两种类型节点的渲染逻辑：对组件的处理和对普通 DOM 元素的处理。

先来看对组件的处理。由于初始化渲染的是 App 组件，它是一个组件 vnode，所以我们来看一下组件的处理逻辑是怎样的。首先是用来处理组件的 processComponent 函数的实现：

```js
const processComponent = (
    n1, 
    n2, 
    container, 
    anchor, 
    parentComponent, 
    parentSuspense, 
    isSVG, 
    optimized
) => {
  if (n1 == null) {
   // 挂载组件
   mountComponent(
       n2, 
       container, 
       anchor, 
       parentComponent, 
       parentSuspense, 
       isSVG, 
       optimized
   )
  }
  else {
    // 更新组件
    updateComponent(n1, n2, parentComponent, optimized)
  }
}
```

该函数的逻辑很简单，如果 n1 为 null，则执行挂载组件的逻辑，否则执行更新组件的逻辑。

我们接着来看挂载组件的 mountComponent 函数的实现：

```js
const mountComponent = (
    initialVNode, 
    container, 
    anchor, 
    parentComponent, 
    parentSuspense, 
    isSVG, 
    optimized
) => {
  // 创建组件实例
  const instance = (
      initialVNode.component = createComponentInstance(
          initialVNode, 
          parentComponent, 
          parentSuspense
      )
  )
  // 设置组件实例
  setupComponent(instance)
  // 设置并运行带副作用的渲染函数
  setupRenderEffect(
      instance, 
      initialVNode, 
      container, 
      anchor, 
      parentSuspense, 
      isSVG, 
      optimized
  )
}
```

可以看到，挂载组件函数 mountComponent 主要做三件事情：创建组件实例、设置组件实例、设置并运行带副作用的渲染函数。

首先是创建组件实例，Vue.js 3.0 虽然不像 Vue.js 2.x 那样通过类的方式去实例化组件，但内部也通过对象的方式去创建了当前渲染的组件实例。

其次设置组件实例，instance 保留了很多组件相关的数据，维护了组件的上下文，包括对 props、插槽，以及其他实例的属性的初始化处理。

最后是运行带副作用的渲染函数 setupRenderEffect，我们重点来看一下这个函数的实现:

```JS
const setupRenderEffect = (
    instance, 
    initialVNode, 
    container, 
    anchor, 
    parentSuspense, 
    isSVG, 
    optimized
) => {
  // 创建响应式的副作用渲染函数
  instance.update = effect(function componentEffect() {
    if (!instance.isMounted) {
      // 渲染组件生成子树 vnode
      const subTree = (instance.subTree = renderComponentRoot(instance))
      // 把子树 vnode 挂载到 container 中
      patch(null, subTree, container, anchor, instance, parentSuspense, isSVG)
      // 保留渲染生成的子树根 DOM 节点
      initialVNode.el = subTree.el
      instance.isMounted = true
    }
    else {
      // 更新组件
    }
  }, prodEffectOptions)
}
```

该函数利用响应式库的 effect 函数创建了一个副作用渲染函数 componentEffect （effect 的实现我们后面讲响应式章节会具体说）。**副作用**，这里你可以简单地理解为，当组件的数据发生变化时，effect 函数包裹的内部渲染函数 componentEffect 会重新执行一遍，从而达到重新渲染组件的目的。

渲染函数内部也会判断这是一次初始渲染还是组件更新。这里我们只分析初始渲染流程。

**初始渲染主要做两件事情：渲染组件生成 subTree、把 subTree 挂载到 container 中。**

首先，是渲染组件生成 subTree，它也是一个 vnode 对象。这里要注意别把 subTree 和 initialVNode 弄混了（其实在 Vue.js 3.0 中，根据命名我们已经能很好地区分它们了，而在 Vue.js 2.x 中它们分别命名为 _vnode 和 $vnode）。举个例子说明，在父组件 App 中里引入了 Hello 组件：

```html
<template>
  <div class="app">
    <p>This is an app.</p>
    <hello></hello>
  </div>
</template>
```

在 Hello 组件中是 `<div> `标签包裹着一个 `<p>` 标签：

```html
<template>
  <div class="hello">
    <p>Hello, Vue 3.0!</p>
  </div>
</template>
```

在 App 组件中， `<hello>` 节点渲染生成的 vnode ，对应的就是 Hello 组件的 initialVNode ，为了好记，你也可以把它称作“组件 vnode”。而 Hello 组件内部整个 DOM 节点对应的 vnode 就是执行 renderComponentRoot 渲染生成对应的 subTree，我们可以把它称作“子树 vnode”。

我们知道每个组件都会有对应的 render 函数，即使你写 template，也会编译成 render 函数，而 renderComponentRoot 函数就是去执行 render 函数创建整个组件树内部的 vnode，把这个 vnode 再经过内部一层标准化，就得到了该函数的返回结果：子树 vnode。

渲染生成子树 vnode 后，接下来就是继续调用 patch 函数把子树 vnode 挂载到 container 中了。

那么我们又再次回到了 patch 函数，会继续对这个子树 vnode 类型进行判断，对于上述例子，App 组件的根节点是 `<div>` 标签，那么对应的子树 vnode 也是一个普通元素 vnode，那么我们接下来看对普通 DOM 元素的处理流程。

首先我们来看一下处理普通 DOM元素的 processElement 函数的实现：

```js
const processElement = (
    n1, 
    n2, 
    container, 
    anchor, 
    parentComponent, 
    parentSuspense, 
    isSVG, 
    optimized
) => {
  isSVG = isSVG || n2.type === 'svg'
  if (n1 == null) {
    //挂载元素节点
    mountElement(n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized)
  }
  else {
    //更新元素节点
    patchElement(n1, n2, parentComponent, parentSuspense, isSVG, optimized)
  }
}
```

该函数的逻辑很简单，如果 n1 为 null，走挂载元素节点的逻辑，否则走更新元素节点逻辑。

我们接着来看挂载元素的 mountElement 函数的实现：

```js
const mountElement = (
    vnode, 
    container, 
    anchor,
    parentComponent,
    parentSuspense,
    isSVG,
    optimized
) => {
  let el
  const { type, props, shapeFlag } = vnode
  // 创建 DOM 元素节点
  el = vnode.el = hostCreateElement(vnode.type, isSVG, props && props.is)
  if (props) {
    // 处理 props，比如 class、style、event 等属性
    for (const key in props) {
      if (!isReservedProp(key)) {
        hostPatchProp(el, key, null, props[key], isSVG)
      }
    }
  }
  if (shapeFlag & 8 /* TEXT_CHILDREN */) {
    // 处理子节点是纯文本的情况
    hostSetElementText(el, vnode.children)
  }
  else if (shapeFlag & 16 /* ARRAY_CHILDREN */) {
    // 处理子节点是数组的情况
    mountChildren(vnode.children, el, null, parentComponent, parentSuspense, isSVG && type !== 'foreignObject', optimized || !!vnode.dynamicChildren)
  }
  // 把创建的 DOM 元素节点挂载到 container 上
  hostInsert(el, container, anchor)
}
```

可以看到，挂载元素函数主要做四件事：创建 DOM 元素节点、处理 props、处理 children、挂载 DOM 元素到 container 上。

首先是创建 DOM 元素节点，通过 hostCreateElement 方法创建，这是一个平台相关的方法，我们来看一下它在 Web 环境下的定义：

```js
function createElement(tag, isSVG, is) {
  isSVG ? document.createElementNS(svgNS, tag)
    : document.createElement(tag, is ? { is } : undefined)
}
```

它调用了底层的 DOM API document.createElement 创建元素，所以本质上 Vue.js 强调不去操作 DOM ，只是希望用户不直接碰触 DOM，它并没有什么神奇的魔法，底层还是会操作 DOM。

另外，如果是其他平台比如 Weex，hostCreateElement 方法就不再是操作 DOM ，而是平台相关的 API 了，这些平台相关的方法是在创建渲染器阶段作为参数传入的。

创建完 DOM 节点后，接下来要做的是判断如果有 props 的话，给这个 DOM 节点添加相关的 class、style、event 等属性，并做相关的处理，这些逻辑都是在 hostPatchProp 函数内部做的。

接下来是对子节点的处理，我们知道 DOM 是一棵树，vnode 同样也是一棵树，并且它和 DOM 结构是一一映射的。

如果子节点是纯文本，则执行 hostSetElementText 方法，它在 Web 环境下通过设置 DOM 元素的 textContent 属性设置文本：

```js
function setElementText(el, text) {
  el.textContent = text
}
```

如果子节点是数组，则执行 mountChildren 方法：

```js
const mountChildren = (
    children,
    container, 
    anchor,
    parentComponent,
    parentSuspense,
    isSVG,
    optimized,
    start = 0
) => {
  for (let i = start; i < children.length; i++) {
    // 预处理 child
    const child = (children[i] = optimized
      ? cloneIfMounted(children[i])
      : normalizeVNode(children[i]))
    // 递归 patch 挂载 child
    patch(null, child, container, anchor, parentComponent, parentSuspense, isSVG, optimized)
  }
}
```

子节点的挂载逻辑同样很简单，遍历 children 获取到每一个 child，然后递归执行 patch 方法挂载每一个 child 。注意，这里有对 child 做预处理的情况。

可以看到，mountChildren 函数的第二个参数是 container，而我们调用 mountChildren 方法传入的第二个参数是在 mountElement 时创建的 DOM 节点，这就很好地建立了父子关系。

另外，通过递归 patch 这种深度优先遍历树的方式，我们就可以构造完整的 DOM 树，完成组件的渲染。

处理完所有子节点后，最后通过 hostInsert 方法把创建的 DOM 元素节点挂载到 container 上，它在 Web 环境下这样定义：

```js
function insert(child, parent, anchor) {
  if (anchor) {
    parent.insertBefore(child, anchor)
  }
  else {
    parent.appendChild(child)
  }
}
```

这里会做一个 if 判断，如果有参考元素 anchor，就执行 parent.insertBefore ，否则执行 parent.appendChild 来把 child 添加到 parent 下，完成节点的挂载。

因为 insert 的执行是在处理子节点后，所以挂载的顺序是先子节点，后父节点，最终挂载到最外层的容器上。

::: tip

**知识延伸：嵌套组件**
细心的你可能会发现，在 mountChildren 的时候递归执行的是 patch 函数，而不是 mountElement 函数，这是因为子节点可能有其他类型的 vnode，比如组件 vnode。

在真实开发场景中，嵌套组件场景是再正常不过的了，前面我们举的 App 和 Hello 组件的例子就是嵌套组件的场景。组件 vnode 主要维护着组件的定义对象，组件上的各种 props，而组件本身是一个抽象节点，它自身的渲染其实是通过执行组件定义的 render 函数渲染生成的子树 vnode 来完成，然后再 patch 。通过这种递归的方式，无论组件的嵌套层级多深，都可以完成整个组件树的渲染。

:::

