---
title: 原生的绑定事件的方法有几种
date: 2021-04-06
tags:
 - JavaScript
 - 面试
categories:
 - front
---

## HTML事件处理程序（行内绑定）

```html
<button οnclick="handleClick()">按钮</button>
<script>
  function handleClick(){
    console.log("HTML 事件处理程序");
  };
</script>
```

## DOM0 级事件处理程序（为元素属性赋值）

```js
var btn = document.getElementById('btn');

btn.onclick = function(){//匿名函数
  console.log("DOM0 处理程序");
};
```

## DOM2 级事件处理程序（addEventListener() 方法）

事件绑定使用 `addEventListener`，传入三个参数，第一个参数表示事件类型，第二个参数是事件回调，最后一个参数表示事件处理阶段。false：事件冒泡阶段，true:事件捕获阶段，默认为 false。

```js
document.getElementById('btn').addEventListener("click",function(){
  console.log("DOM2 级事件处理程序");
}, false);//false表示默认事件冒泡阶段
```

当然对应的也添加了事件移除或者说解绑的 API——`removeEventListener`：

```js
function a(){
  console.log("removeClick");
};
document.getElementById('btn').addEventListener("click",a,false);
document.getElementById('btn').removeEventListener("click",a,false);
```

但是有兼容性哦，IE8 以下是不支持的（PS：吐槽一下，微软都不要它了，VUE3 也不支持 IE11了，以后 IE 就会慢慢退出市场的吧）。

## IE 中的事件绑定

其实这块并不是说 IE 所有，只是说 IE8 及以下的版本。

事件绑定——`attachEvent('on'+ type, fn)`：

```js
document.getElementById('btn').attachEvent("on"+"click",function(){
  console.log("attachEvent");
});
```

事件解绑——`detachEvent('on'+type, fnName)`：

```js
function a(){
  console.log("detachEvent");
};

document.getElementById('btn').attachEvent("on"+"click",a);
document.getElementById('btn').detachEvent("on"+"click",a);
```

上述的 DOM2 和 IE 里的API都能为元素添加事件。

但是不同点在于后面的方法是用于 IE8 以下的，且在回调体内 this 的指向是 window 对象。

那么这里有人问了，既然都已经有了 HTML 事件处理程序的写法和 DOM0 级处理函数的写法，为什么 DOM2 里还有一个绑定事件的写法呢？

首先，HTML 事件处理程序，只能把事件绑定到 HTML 元素上，这对后续项目维护成本来讲，是很高昂的，所以不推荐使用这种方法。

其次，是 DOM0 级的处理程序，这种绑定事件的方法，相较于第一种方法，耦合降低，也是以属性的方法将方法绑定在上面，不过一次只能绑定一个方法。

所以在 DOM2 中添加了一个新的 API ——`addEventListener` 和 `removeEventListener`，addEventListener 可以绑定多次同一个事件，且都会执行，前面说的两种方式，如果多次绑定同一个事件，则只会执行一个。

```js
let outer  = document.getElementsByClassName('outer') [0];

function onceHandler(event) {
  alert('outer, once');
}

function noneOnceHandler(event) {
  alert('outer, none-once, default');
}

outer .addEventListener('click', onceHandler, once);
outer .addEventListener('click', noneOnceHandler, noneOnce);

// outer, once
// outer, none-once, default
```

如果我们要兼容到 IE8（我的天，别了吧）：

```js
// 我们可以选择重写 addEventListener 和 removeEventListener 两个方法
function addEventListener(element, type, fn) {
  if (element.addEventListener) {
    element.addEventListener(type, fn, false);
  } else if (element.attachEvent) {
    element.attachEvent('on' + type, fn);
  } else {
    element['on'+type] = fn;
  }
}

function removeEventListener(element, type, fnName) {
  if (element.removeEventListener) {
    element.removeEventListener(type, fnName, false);
  } else if (element.detachEvent) {
    element.detachEvent('on' + type, fnName);
  } else {
    element['on'+type] = null;
  }
}
```