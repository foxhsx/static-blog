---
title: Vue 的父组件和子组件生命周期钩子执行顺序是什么？
date: 2021-03-16
tags:
 - Vue
 - 面试
categories:
 - front
---

父子组件加载渲染过程：

@flowstart 
st=>start: 父 beforeCreate
crte=>operation: 父 created
bmount=>parallel: 父 beforeMount
bcre=>parallel: 子 beforeCreate
cred=>operation: 子 created
bmchd=>parallel: 子 beforeMount
mouchd=>parallel: 子 mounted
e=>end: 父 mounted

st->crte->bmount(path1)->e
bmount(path2, right)->bcre(path1, bottom)->cred->bmchd(path1, bottom)->mouchd(path1, left)->e
@flowend

> 父beforeCreate->父created->父beforeMount->子beforeCreate->子created->子beforeMount->子mounted->父mounted

子组件更新过程：

@flowstart
st=>start: 父 beforeUpdate
chdbf=>operation: 子 beforeUpdate
chdup=>operation: 子 updated
e=>end: 父 updated

st->chdbf->chdup->e
@flowend

> 父beforeUpdate->子beforeUpdate->子updated->父updated

::: tip
**注意**：如果是某个组件更新，则只会触发此组件的生命周期，也就是在此组件的生命周期上：beforeUpdate->updated。而父子组件的更新依赖执行顺序是在于**全局状态的更新**，比如通过 props 传递，或者 vuex 等存在数据流向触发的更新，此时的更新顺序才是 `父beforeUpdate->子beforeUpdate->子updated->父updated`。
:::

父组件更新过程：

@flowstart
st=>start: 父 beforeUpdate
e=>end: 父 updated

st->e
@flowend

> 父beforeUpdate->父updated

销毁过程：

@flowstart
st=>start: 父 beforeDestroy
chdbf=>operation: 子 beforeDestroy
chdde=>operation: 子 destroyed
e=>end: 父 destroyed

st->chdbf->chdde->e
@flowend

> 父beforeDestroy->子beforeDestroy->子destroyed->父destroyed