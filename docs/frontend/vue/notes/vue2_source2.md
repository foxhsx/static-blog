---
title: Vue2.x 源码解读（二）
date: 2021-05-13
tags:
 - Vue
 - JavaScript
categories:
 - front
---

在初始化 data 时，首先还是先执行  initMixin 方法，在 _init 里面给 vm.$options 赋值这一步操作，是通过 mergeOptions  方法获得的，而在这个方法里在合并 options 对象时，调用的 mergeField 方法：

```js
function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
}
```

而这里的 strats 变量，是在之前就定义好的：

```js
// 先生成一个空对象
var strats = config.optionMergeStrategies;
```

然后将生命周期钩子挂载到 strats 上：

```js
var LIFECYCLE_HOOKS = [
    'beforeCreate',
    'created',
    'beforeMount',
    'mounted',
    'beforeUpdate',
    'updated',
    'beforeDestroy',
    'destroyed',
    'activated',
    'deactivated',
    'errorCaptured',
    'serverPrefetch'
];

LIFECYCLE_HOOKS.forEach(function (hook) {
    strats[hook] = mergeHook;
})
```

这里的 mergeHook 的作用就是将钩子和属性合并为数组：

```js
/**
 * Hooks and props are merged as arrays.
*/
function mergeHook (
    parentVal,
    childVal
) {
    var res = childVal
        ? parentVal
            ? parentVal.concat(childVal)
            : Array.isArray(childVal)
                ? childVal
                :  [childVal]
        : parentVal
    return res
        ? dedupeHooks(res)
        : res
}
```

我们再回到前面的代码中，到 key 为 data 时：

```js
var strat = strats[key] || defaultStrat;
```

此时 strats.data 又在代码中被重新赋值，并不是之前的 mergeHook:

```js
strats.data = function (
    parentVal,
    childVal,
    vm
) {
    if (!vm) {
      if (childVal && typeof childVal !== 'function') {
        warn(
          'The "data" option should be a function ' +
          'that returns a per-instance value in component ' +
          'definitions.',
          vm
        );

        return parentVal
      }
      return mergeDataOrFn(parentVal, childVal)
    }

    return mergeDataOrFn(parentVal, childVal, vm)
}
```

到这里又会执行到 mergeDataOrFn 方法：

```js
function mergeDataOrFn(
    parentVal,
    childVal,
    vm
) {
    if (!vm) { // ... }
    else {
        return function mergedInstanceDataFn () {
            // instance merge
            var instanceData = typeof childVal === 'function'
              ? childVal.call(vm, vm)
              : childVal;
            var defaultData = typeof parentVal === 'function'
              ? parentVal.call(vm, vm)
              : parentVal;
            if (instanceData) {
              return mergeData(instanceData, defaultData)
            } else {
              return defaultData
            }
        }
    }
}
```

再到 mergeData 方法，它将递归合并两个数据对象：

```js
function mergeData (to, from) {
    if (!from) { return to }
    var key, toVal, fromVal;

    var keys = hasSymbol
      ? Reflect.ownKeys(from)
      : Object.keys(from);

    for (var i = 0; i < keys.length; i++) {
      key = keys[i];
      // in case the object is already observed...
      if (key === '__ob__') { continue }
      toVal = to[key];
      fromVal = from[key];
      if (!hasOwn(to, key)) {
        set(to, key, fromVal);
      } else if (
        toVal !== fromVal &&
        isPlainObject(toVal) &&
        isPlainObject(fromVal)
      ) {
        mergeData(toVal, fromVal);
      }
    }
    return to
}
```

这里我们分析一下，to 是 instanceData，它的值是 `{ msg: 'Hello Vue' }`，而 from 实则是 defaultData，它得到一个 undefined（因为传进来的 parent 没有 data 属性，所以这里的 undefined，具体看上一章节）。故而代码执行到第一句就被返回了。返回值就是  `{ msg: 'Hello Vue' }`。

也就是说最终 strats.data 的值是 mergeDataOrFn 函数，而 mergeDataOrFn 函数的返回值又是  mergedInstanceDataFn 函数，而这个函数并没有被调用，所以最终 options.data 的值是  mergedInstanceDataFn 函数。

再执行到 initState 方法里，这个方法里会对 data 参数做响应式处理：

```js
function initState (vm) {
    vm._watchers = [];
    var opts = vm.$options;
    if (opts.props) { initProps(vm, opts.props); }
    // ...
    if (opts.data) {
        initData(vm)
    } else {
        observe(vm._data = {},true/* asRootData */);
    }
    // ...
}
```

调用 initData 来真正处理 data 数据：

```js

```