---
title: Vue2.x 源码解读（一）
date: 2021-05-11
tags:
 - Vue
 - JavaScript
categories:
 - front
---

## 初始化

只有挂载节点的初始化过程。
在初始化 Vue 实例的时候，会进入到构造函数 Vue 中：

```js
function Vue (options) {
    if (!(this instanceof Vue)) {
        warn('Vue is a constructor and should be called with the `new` keyword');
    }
    this._init(options);
}
```

在这里会执行到 _init 方法，而 _init 方法又是绑定在 Vue 原型上的，而绑定的过程实际是在 initMixin 方法上的：

```js
var uid$3 = 0;
function initMixin (Vue) {
    // 只展示初始化执行代码
    Vue.prototype._init = function (options) {
        var vm = this;
        // a uid
        vm._uid = uid$3++;

        var startTag, endTag;
        /* istanbul ignore if */
        if (config.performance && mark) {
            startTag \="vue-perf-start:"+ (vm.\_uid);
            endTag \="vue-perf-end:"+ (vm.\_uid);
            mark(startTag);
        }

        // a flag to avoid this being observed
        vm._isVue = true;

        // merge options
        if (options && options._isComponent) {
            // ...
        } else {
            vm.$options = mergeOptions(
                resolveConstructorOptions(vm.constructor),
                options || {},
                vm
            );
        }
        
       // ...
        
        if (vm.$options.el) {
            vm.$mount(vm.$options.el);
        }
    }
}
```

而这个方法在源码中，我们在定义完构造函数 Vue 后就会去执行调用：

```js
functionVue(options){
    if (!(thisinstanceofVue)) {
        warn('Vue is a constructor and should be called with the `new` keyword');
    }
    this._init(options);
}

initMixin(Vue);  // 在这里执行
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);
```

当执行到 _init 里后，一般会走到 mergeOptions 这一步来：

```js
vm.$options = mergeOptions(
    resolveConstructorOptions(vm.constructor),
    options || {},
    vm
);
```

mergeOptions 的作用就是将两个选项对象合并为一个新对象。是用于实例化和继承的核心实用程序。

```js
function mergeOptions (
    parent,
    child,
    vm
) {
    // 只展示初始化执行代码

    // ...

    var options = {};
    var key;
    for (key in parent) {
        mergeField(key);
    }
    for (key in child) {
        if (!hasOwn(parent, key)) {
            mergeField(key)
        }
    }

    function mergeField(key) {
        var strat = strat[key] || defaultStrat;
        options[key] = strat(parent[key], child[key], vm, key);
    }
    return options;
}
```

在初始化的时候，实际上代码是会走到最下面的 mergeField 方法这，而此时的 strat 就等于 defaultStrat 方法：

```js
function defaultStrat = function (parentVal, childVal) {
    return childVal === undefined ? parentVal : childVal
}
```

再通过赋值的操作，最后将合并后的 options 返回出去。
 那么在代码中还有一行代码：

```js
resolveConstructorOptions(vm.constructor)
```

它的作用就是获取到 Vue 函数本身上的 options。
 到这里就会给 vm.$options 附上值，代码继续向下执行到：

```js
if (vm.$options.el) {
    // 这里实际返回了 Vue 的实例

    vm.$mount(vm.$options.el);
}
```

就会执行 $mount 方法：

```js
var mount = Vue.prototype.$mount;
// 这里重新定义 $mount 属性方法
Vue.prototype.$mount = function (
    el,
    hydrating
) {
    el = el && query(el);
    if (el === document.body || el === document.documentElement) {
        warn(
            "Do not mount Vue to  or  - mount to normal elements instead."
          );
        return this
    }

    var options = this.$options;
    if (!options.render) {
        var template = options.template;
        if (template) {
            // ...
        } else if (el) {
            template = getOuterHTML(el);  // 拿到 html
        }

        if (template) {
            // 将 template 模板编译成 render 函数
            var ref = compileToFunctions(
                template,
                {
                    outputSourceRange:"development"!=='production',
                    shouldDecodeNewlines: shouldDecodeNewlines,
                      shouldDecodeNewlinesForHref: shouldDecodeNewlinesForHref,
                      delimiters: options.delimiters,
                      comments: options.comments
                },
                this
            )

            var render = ref.render;
            var staticRenderFns = ref.staticRenderFns;
            options.render = render;
            options.staticRenderFns = staticRenderFns;
            
            // ...
        }
    }
    return mount.call(this, el, hydrating)
}
```

而这里的 mount 是之前定义的 Vue.prototype.$mount 方法：

```js
Vue.prototype.$mount = function (
    el,
    hydrating
) {
    el = el && inBrowser ? query(el) : undefined
    return mountComponent(this, el, hydrating)
}
```

执行到 mountComponent 方法，在这一步将完整的 Vue 实例返回出去:

```js
function mountComponent (
    vm,
    el,
    hydrating
) {
    // 只展示执行代码
    vm.$el = el;
    if (!vm.$options.render) { // ... }
    // 挂载生命周期钩子函数 beforeMount
    callHook(vm,'beforeMount');

    // 更新组件方法
    var updateComponent;
    if (config.performance && mark) { // ... }
    else {
        updateComponent = function(){
            vm._update(vm._render(), hydrating);
        };
    }

    // 调用 Watcher 构造函数
    // 在 Watcher 里，会把 Watcher 挂载在 vm._watcher 上
    // updateComponent 会挂载到 Watcher 的 getter 上
    new Watcher(vm, updateComponent , noop, {
        before: function before() {
            if (vm._isMounted && !vm._isDestroyed) {
                // 更新组件前的钩子函数
                callHook(vm,'beforeUpdate');
            }
        }
    }, true)
    hydrating = false;

    // 手动挂载实例，调用自行挂载
    // 在插入的钩子中为渲染创建的子组件调用mounted
    if (vm.$node == null) {
        vm._isMounted = true;
        // 注册 mounted 钩子函数
        callHook(vm,'mounted');
    }

    return vm;
}
```

至此，Vue 的初始化就完成了。