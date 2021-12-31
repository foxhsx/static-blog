---
title: JavaScript之DOM事件
date: 2020-11-24
tags:
 - JavaScript
categories:
  - front
---

JavaScript 事件基础

1. 什么是事件
2. HTML事件
3. DOM0级事件
4. 常用的鼠标与键盘事件
5. this 指向

### **一、什么是事件**

事件就是文档或浏览器窗口中发生的一些特定的交互瞬间。

### **二、HTML事件**

直接在 HTML 元素标签内添加事件，执行脚本。

语法：

```md
<tag 事件=“执行脚本”></tag>
```

功能：在HTML元素上绑定事件

说明：执行脚本可以是一个函数的调用。

例：

```html
<button onclick="alert(我是按钮)">弹出</button>

<div
     id="btn"
     class="btn"
     onmouseover="mouseoverBeginFn(this)"
     onmouseout="mouseoutBeginFn(this)"
>开始</div>
<!-- 也可以传递其他参数，如颜色 -->
<div
     id="btn1"
     class="btn1"
     onmouseover="mouseoverEndFn(this, '#f00')"
     onmouseout="mouseoutEndFn(this, '#00f')"
>结束</div>
<script type="text/javascript">
	function mouseoverFn() {
        // 鼠标滑过按钮时，按钮的背景变为红色
        var btn = document.getElementById('btn')
        btn.style.backgroundColor = 'red'
    }
    // 如果传进来 this
    function mouseoverBeginFn(btn) {
        // 鼠标滑过按钮时，按钮的背景变为红色
        btn.style.backgroundColor = 'red'
    }
    function mouseoutBeginFn(btn) {
        // 鼠标滑过按钮时，按钮的背景变为蓝色
        btn.style.backgroundColor = 'blue'
    }
    // 如果传进来 this
    function mouseoverEndFn(btn, bgColor) {
        // 鼠标滑过按钮时，按钮的背景变为红色
        btn.style.backgroundColor = bgColor
    }
    function mouseoutEndFn(btn, bgColor) {
        // 鼠标滑过按钮时，按钮的背景变为蓝色
        btn.style.backgroundColor = bgColor
    }
</script>
```

```html
<button onclick="alert('我是按钮')">弹出</button>

<div id="btn" class="btn" onmouseover="mouseoverFn(this)" onmouseout="mouseoutFn(this)">开始</div>
<script type="text/javascript">
    // 如果传进来 this
    function mouseoverFn(btn) {
        // 鼠标滑过按钮时，按钮的背景变为红色
        btn.style.backgroundColor = '#f00';
        btn.style.color = '#fff';
    }
    function mouseoutFn(btn) {
        // 鼠标滑过按钮时，按钮的背景变为蓝色
        btn.style.backgroundColor = '#00f';
        btn.style.color = '#fff';
    }
</script>
```

::: tip

**不建议使用HTML事件**：

1. 多元素绑定相同事件时，效率低
2. 不建议在 HTML 元素中写 JavaScript 代码。

:::

### **三、DOM0级事件**

1. 通过DOM获取HTML元素
2. （获取HTML元素）.事件 = 执行脚本

语法：

```javascript
ele.事件 = 执行脚本
```

功能：在DOM对象上绑定事件

说明：执行脚本可以是一个匿名函数，也可以是一个函数的调用。

例：

```html
<div class="lock" id="btn">锁定</div>
<script type="text/javascript">
	// 获取按钮
    var btn = document.getElementById("btn");
    // 给按钮绑定事件，this 是对该对象DOM元素的引用
    btn.onclick = function () {
        // 取反
        var flag = his.className === 'unlock';
        if (flag) {
            this.className = 'lock';
        	this.innerHTML = '锁定';
        } else {
            this.className = 'unlock';
        	this.innerHTML = '解锁';
        }
    }
</script>
```

```html
<div class="lock" id="btn">锁定</div>
<script type="text/javascript">
	// 获取按钮
    var btn = document.getElementById("btn");
    // 给按钮绑定事件，this 是对该对象DOM元素的引用
    btn.onclick = function () {
        // 取反
        var flag = his.className === 'unlock';
        if (flag) {
            this.className = 'lock';
        	this.innerHTML = '锁定';
        } else {
            this.className = 'unlock';
        	this.innerHTML = '解锁';
        }
    }
</script>
```

### **四、鼠标与键盘事件**

#### **鼠标事件**

- onload: 页面加载时触发

  场景：如果将 JS 代码放在了 body 之前，那么 JS 代码正常执行会是自上而下顺序执行的，此时获取不到DOM，从而会抛出异常，而在使用 onload 事件之后，代码就会在页面加载后执行，就不会抛出异常。

- onclick：鼠标点击时触发

- onmouseover：鼠标滑过时触发

- onmouseout: 鼠标离开时触发

- onfoucs: 获得焦点时触发

  场景：一般会发生在 input, textarea 上面，在输入框中输入值后，获得焦点从而触发 onfoucs 事件里的回调函数

- onblur：失去焦点时触发

  场景：一般会发生在 input , textarea上面，在输入框中输入值后，失去焦点从而触发 onblur 事件里的回调函数

- onchange：域的内容改变时发生

  场景：一般会发生在 input , textarea，select 上面，在输入框中输入值后，失去焦点从而触发 onchange 事件里的回调函数

- onsubmit: 表单中的确认按钮被点时发生
  
  - onsubmit 事件不是加在按钮上，而是表单上
- onmousedown: 鼠标按钮在元素上按下时触发
- onmousemove: 在鼠标指针移动时发生
- onmouseup:  在元素上松开鼠标按钮时触发
- onresize:  当调整浏览器窗口的大小时触发
- onscroll:  拖动滚动条滚动时触发

#### **键盘事件与keyCode属性**

- onkeydown: 在用户按下一个键盘时发生
- onkeypress: 在键盘按键被按下并释放一个键时发生
- onkeyup: 在键盘按键被松开时发生
- keyCode: 返回 onkeypress、onkeydown 或 onkeyup 事件触发的键的值的字符代码、或键的代码。

例子：

```javascript
// 在事件触发的 function 里，用一个参数接收事件对象
document.onkeydown = function (event) {
    // event 代表事件的状态，如触发 event 对象的元素、鼠标的位置及状态等
    console.log(event.keyCode)
}
```

```html
<div>
  <span id="key_code">按下键盘中的键试试！</span>
  <script type="text/javascript">
      var spanDom = document.getElementById('key_code');
      document.onkeydown = function(event) {
          spanDom.innerHTML = "当前键的keyCode为："+event.keyCode
      }
  </script>
</div>
```


### **五、this 指向**

在事件触发的函数中，this 是对该 DOM 对象的引用。