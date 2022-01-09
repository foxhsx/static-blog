---
title: v-for 与v-if 哪个先加载
date: 2021-03-23
tags:
 - JavaScript
 - 面试
 - Vue
categories:
 - front
---
## v-for 与v-if 哪个先加载

首先我们来说一下 `v-for` 和 `v-if` 可不可以同时在一个元素上使用？

在官网中我们可以看到这样一个提示：
::: tip TIP
注意，我们**不**推荐在同一元素上使用 `v-for` 和 `v-if`。
:::

所以这里是不推荐，但是不表示 `v-for` 和 `v-if` 不能同时使用。在实际项目中，如果二者同时使用，`v-for` 的优先级是大于 `v-if` 的，来看一段代码：

```vue
<template>
  <div class="about">
    <ul>
      <!-- eslint-disable-next-line vue/no-use-v-if-with-v-for -->
      <li v-for="item in list" :key="item" v-if="showLi">111</li>
    </ul>
  </div>
</template>

<script>
beforeCreate() {
  console.log(this.$options.render);
  // var render = function() {
  //   var _vm = this
  //   var _h = _vm.$createElement
  //   var _c = _vm._self._c || _h
  //   return _c("div", { staticClass: "about" }, [
  //     _c(
  //       "ul",
  //       _vm._l(_vm.list, function(item) {
  //         return _vm.showLi ? _c("li", { key: item }, [_vm._v("111")]) : _vm._e()
  //       }),
  //       0
  //     )
  //   ])
  // }
},
</script>
```

在这里 `_vm._l` 是渲染列表相关的函数，那可以看到的是，当二者同一级时，会先渲染数组，然后在内层再去判断是否渲染某一项。这对于性能而言是不友好的，在一些组件级别的渲染上会消耗很大的内存。

我们修改一下这里的代码，将 `v-for` 和 `v-if` 隔离开：

```vue
<template>
  <div class="about">
    <ul>
      <template v-if="showLi">
        <li v-for="item in list" :key="item">111</li>
      </template>
    </ul>
  </div>
</template>

<script>
beforeCreate() {
  console.log(this.$options.render);
  // var render = function() {
  //   var _vm = this
  //   var _h = _vm.$createElement
  //   var _c = _vm._self._c || _h
  //   return _c("div", { staticClass: "about" }, [
  //     _c(
  //       "ul",
  //       [
  //         _vm.showLi
  //           ? _vm._l(_vm.list, function(item) {
  //               return _c("li", { key: item }, [_vm._v("111")])
  //             })
  //           : _vm._e()
  //       ],
  //       2
  //     )
  //   ])
  // }
},
</script>
```

可以看到的是，我们会先判断 v-if 里的条件，然后再去渲染 list。

那有人就会问了，这只是一种场景，还有一种场景就是内层有 if 判断怎么办呢？官网也给出了解决的办法，比如此时我们有一组数据 list，在渲染之前，我们定义一个计算属性 computed，如下：

```vue
<template>
  <div class="about">
    <ul>
        <li v-for="item in activeList" :key="item">111</li>
    </ul>
  </div>
</template>

<script>
  computed: {
    activeList() {
      return this.list.filter(item => item > 2)
    }
  }
</script>
```

这样的话，等同于我们提前将 `v-if` 的判断写在了外层，只渲染筛选出来的数据，这样就使得渲染更加的高效。

就如同官网所说，我们会获得以下好处：
- 过滤后的列表只会在数组发生相关变化时才重新计算，过滤更高效。
- 使用计算属性将其过滤之后，我们只渲染活跃用户，渲染会更加高效。
- 解耦渲染层的逻辑，可维护性更强。