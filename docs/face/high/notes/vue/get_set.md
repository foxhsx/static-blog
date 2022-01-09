---
title: $get 和 $set 的作用和区别？
date: 2021-03-24
tags:
 - Vue
 - 面试
categories:
 - front
---

## $get
其实在 vue2.x 版本之后，取消了 $get 方法，因为此时从实现上来讲，当我们把一个普通的 JavaScript 对象传入 Vue 实例作为 data 选项时，Vue 会遍历此对象的所有 property，并使用 `Object.defineProperty` 把这些 proerty 全部转为 getter/setter，所以不必要再专门去做一个 $get 方法出来。 在 1.x 版本中的 $get 方法可以实现类似 computed 计算属性的功能，而在 2.x 版本中 computed 属性和 $get 从功能上来讲是有些冗余的。

我们在访问 vue 中某个 data 值的时候，其实就已经触发了该值的 getter 方法。如果要在访问某属性时，做一些数据劫持操作，可以将该属性设置为 computed 计算属性来实现。

## $set
Vue 无法检测 property 的添加或删除。由于 Vue 会在初始化实例时对 property 执行 getter/setter 转换，所以 property 必须在 data 对象上存在才能让 Vue 将它转换为响应式的。那么对于已经创建的实例，Vue **是不允许动态添加跟级别的响应式** property。但是，可以使用 `Vue.set(object, propertyName, value)` 方法向**嵌套对象**添加响应式 property。也可以使用它的别名——$set。

```js
const vm = new Vue({
  data: {
    a: 1,
    obj: {},
    arr: []
  }
})

// vm.a  是响应式的

vm.b = 2;
// vm.b 是非响应式的

Vue.set(vm.obj, 'b', 2);

// 或者
vm.$set(vm.obj, 'b', 2);

// 对于数组也是一样
Vue.set(vm.arr, 0, 2);
vm.$set(vm.arr, 1, 2);

// 如果要修改数组的长度，我们可以使用 splice
const newLength = 3;
vm.arr.splice(newLength)
```

在源码中，$set 的定义是在 `stateMixin` 方法里实现的，在这个方法里定义了 ` $set $delete $watch`：

```js
// ./dist/vue.common.dev.js
function stateMixin(Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function() { return this._props };
  {
    dataDef.set = function() {
      warn(
        'Avoid replacing instance root $data.'+
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function() {
      warn('$props is readonly.', this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function(
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options);
    };
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}
```

那么在这里 set 方法被定义在了外边：

```js
// ./dist/vue.common.dev.js

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set(target, key, val) {
  // isUndef 如果未定义或者为 null
  // isPrimitive 检查值是否为原始值
   if (isUndef(target) || isPrimitive(target)
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  // 目标对象是数组并且 检查val是否是有效的数组索引。
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    // 取最大值修改目标数组长度
    target.length = Math.max(target.length, key);
    // 插入数据进去
    target.splice(key, 1, val);
    return val
  }
  // 如果目标对象已经存在要添加或者修改的属性，直接设置属性值
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  // 如果是一个新属性，那先取得  target 的 __ob__
  var ob = (target).__ob__;
  // 如果目标对象是 Vue 实例 或者 在根属性上，是不允许修改的
  if (target._isVue || (ob && ob.vmCount)) {
    warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  // ob.value 其实也就是 target
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}
```

`__ob__` 属性的来源是在 initData 函数里执行了 `observe` 方法。

```js
// ./dist/vue.common.dev.js

/**
 * 尝试为值创建观察者实例，
 * 如果观察成功，则返回新的观察者，
 * 或者现有的观察器（如果值已经有一个观察器）
 */
function observe(value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}
```

Observer 构造函数：

```js
// ./dist/vue.common.dev.js

/**
 *附加到每个观察对象的观察者类
 * 对象。连接后，观察者将转换目标
 * 对象的属性键插入getter/setters
 * 收集依赖项并发送更新
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  // 设置 __ob__ 属性，并将值指向了自身
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      protoAugment(value, arrayMethods);
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};
```

所以在 set 函数中得到的 ob 其实就是 Observe 对象本身。当 ob 不存在时，直接赋值属性值然后返回，而当 ob 存在，target 也不是 Vue 实例或者根属性时，调用 `defineReactive$$1` 把新添加的属性设置为响应式，再调用 `ob.dep.notify()` 进行渲染更新。

