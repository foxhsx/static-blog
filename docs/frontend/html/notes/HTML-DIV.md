---
title: HTML-DIV标签
date: 2020-11-22
tags:
 - HTML
categories:
  - front
---

为什么我们要把`div`标签单独拉一个模块来讲，因为网页布局里，`div`标签可以说是修房时候的钢筋骨架，网页的布局需要使用div标签去划分板块，也不是说其他的标签不可以用，但是相对来说，`div`这种无语意标签更加适合去做划分板块的事情。

语法：

```html
<div class="名" style="样式"></div>
```

`div`是块级元素。所以在页面中，每个DIV的排列会由上而下依次排列。我们在学习过CSS之后，可以给它增加对应的class和id值，这样我们就可以控制它的样式，让其在页面中的展示更加美观漂亮。

::: warning

- `div` 元素应当仅在没有任何其他语义化元素（比如`article`或`nav`）可用时使用。

:::

来看一个简单的例子：

```html
<div>
  <p>这里可以是任何内容，比如 &lt;p&gt;,
  &lt;table&gt;，一切由你作主！</p>
</div> 
```

实际呈现方式：

<div>
  <p>这里可以是任何内容，比如 &lt;p&gt;,
  &lt;table&gt;，一切由你作主！</p>
</div> 

HTML 元素加上 id 以后，这个 id 就自动称为一个全局变量挂载到 window 上了。所以我们平时可以在 JavaScript 中直接使用 id，省略掉 getElementById 的写法。