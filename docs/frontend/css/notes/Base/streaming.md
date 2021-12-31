---
title: 块状元素的流体特性
date: 2021-04-21
tags:
 - CSS
categories:
 - front
---

> 文章节选自张鑫旭大神的博客，[原文地址](https://www.zhangxinxu.com/wordpress/2015/02/css-deep-understand-flow-bfc-column-two-auto-layout/)

## 流体特性

块状元素，在默认情况下，会在水平方向上自动填充满外部容器。如果有 `margin、padding、border` 的 `left` 和 `right` 的话，实际的内容区域就会响应变窄。

来看个例子：

<iframe src="https://www.zhangxinxu.com/study/201502/div-flow.html" width="510" height="520" frameborder="0"></iframe>

在上面例子中，图片的宽度虽然一直是 `100%`，但是随着依次点击三个按钮，结果随着 `margin、padding、border` 的出现，其可用宽度自动就跟着减少，形成了自适应的效果。就像是一个容器，四周内部被加了三层一样，最中间的内容自动会填满剩余的空间，这就是块状元素的流体特性。
