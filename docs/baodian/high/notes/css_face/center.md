---
title: css 实现居中对齐的方式
date: 2021-04-20
tags:
 - CSS
 - 面试
categories:
 - front
---

对于前端小伙伴来说，CSS 中的居中对齐应该是很常见的场景。今天我们来聊下几个常见的居中对齐的方式。

我们按场景来一一介绍。

## 内联元素水平居中

如果要设置的元素是**文本、图片**等**行内元素**时，水平居中是通过给元素设置 `text-align: center` 来实现的。

## 定宽的块状元素水平居中

满足**定宽**和**块状**两个条件的元素是可以通过设置左右 `margin` 值为 `auto` 来实现居中的——`margin: 0 auto`。

> 注意：当元素设置为 float、绝对定位、固定定位时，左右 margin 就会失效。

## 不定宽的块状元素水平居中

有两种方式：

1. 给父元素设置 `display: table; margin: 0 auto;`。即将父元素转换为表格形式，然后让里面的子元素水平居中。
2. 给父元素设置 `text-align: center;`，然后给子元素设置 `display: inline-block;`。这个也很好理解，首先将子元素设置为内联块状元素，然后给父元素一个内联元素水平居中的样式属性即可。

## 定宽高的元素在屏幕窗口水平垂直都居中

这个我们可以直接使用固定定位和调整 `margin` 的方式来实现。

```css
element {
  width: value;
  height: value;
  position: fixed;
  left: 50%;
  top: 50%;
  margin-left: -width/2 px;
  margin-top: -height/2 px;
}
```

什么意思呢？

首先，宽高是知道的，然后我们设置元素**层模型**（布局模型之一）为固定定位--fixed，让其脱离文档流。然后设置元素的 left 和 top 都为 50%，这里的 50% 是以元素的上边框和左边框为基础的，所以我们还要在此基础上通过设置元素的 `margin-left` 和 `margin-top` 将元素的位置调整到正中央，移动的距离就是元素宽高的一半，水平方向向左，垂直方向向上，所以这里是负数。

## 不定宽高的元素在屏幕窗口水平垂直居中

这里直接使用固定定位和CSS3的 `translate` 就可以实现。

```css
element {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
```

原理就是在元素位置向上和向左 50% 的基础上，通过 `CSS3` 中的 `transform` 代替 `margin`，`transform` 中 `translate` 偏移的百分比值是相对自身大小的。所以这里哪怕我们不设置元素的宽高，也能达到水平垂直居中的效果。

还有一种情况比较特殊，**需要是图片这种自身包含尺寸的元素**。

```css
element {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
```

如果自身不包含尺寸，则不适合这种方法，还是老老实实用上一个方法吧。

那么为啥 `margin: auto` 就会让固定定位或者说是绝对定位元素居中了呢？

> [原文地址](https://www.zhangxinxu.com/wordpress/2013/11/margin-auto-absolute-%e7%bb%9d%e5%af%b9%e5%ae%9a%e4%bd%8d-%e6%b0%b4%e5%b9%b3%e5%9e%82%e7%9b%b4%e5%b1%85%e4%b8%ad/)，张鑫旭大神的文章

当一个绝对定位元素，其对立定位方向属性通时具有定位数值的时候，流体特性就发生了，例如：

```html
<style>
  .box {
    position: absolute;
    left: 0;
    right: 0;
  }
</style>

<div class="box"></div>
```

如果只有 `left` 属性或者只有 `right` 属性，则由于包裹性此时 `.box` 宽度是 0。但是，在本例中，因为 `left/right` 同时存在，因此宽度就不是0，而是自适应于 `.box` 包含块的 `padding box` 宽度，也就是随着包含块 `padding box` 的宽度变化，`.box` 的宽度也会跟着一起变。

具有流体特性绝对定位元素的 `margin:auto` 的填充规则和普通流体元素一模一样：

1. 如果一侧定值，一侧 `auto`，`auto` 为剩余空间大小；
2. 如果两侧均是 `auto`, 则平分剩余空间;

例如，下面的CSS代码：

```css
.father {
  width: 300px;
  height:150px;
  position: relative;
}
.son { 
  position: absolute; 
  top: 0;
  right: 0; 
  bottom: 0; 
  left: 0;
}
```

此时 `.son` 这个元素的尺寸表现为“格式化宽度和格式化高度”，和 `<div>` 的“正常流宽度”一样，同属于外部尺寸，也就是尺寸自动填充父级元素的可用尺寸的，然后，此时我们给 `.son` 设置尺寸，例如：

```css
.son { 
  position: absolute; 
  top: 0; 
  right: 0; 
  bottom: 0;
  left: 0;
  width: 200px;
  height: 100px;
}
```

此时宽高被限制，原本应该填充的空间就被多余了出来，这多余的空间就是 `margin:auto` 计算的空间，因此，如果这时候，我们再设置一个 `margin:auto`，那么：

```css
.son { 
  position: absolute; 
  top: 0; 
  right: 0; 
  bottom: 0; 
  left: 0;
  width: 200px; 
  height: 100px;
  margin: auto;
}
```

我们这个 `.son` 元素就水平和垂直方向同时居中了。因为，`auto` 正好把上下左右剩余空间全部等分了，自然就居中啦！

## 定宽高子元素在父元素中水平垂直都居中

这里我们使用相对定位和绝对定位配合的方法来达成我们想要的效果。

::: tip
因为绝对定位的参照物和绝对定位必须是包含和被包含的关系，而且参照物本身必须得具有定位的属性，所以这里我们在父级使用 relative 相对定位，使得父元素成为子元素的定位参照物，这样就可以实现子元素在父元素内部达到水平垂直都居中的效果。
:::

首先，父元素设置为相对定位，如果要垂直居中，则必须有高度。

```css
parentElement {
  position: relative;
  height: 100vh;
}
```

其次，子元素设置为绝对定位：

```css
childElement {
  width: value;
  height: value;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -width/2 px;
  margin-top: -height/2 px;
}
```

## 不定宽高子元素在父元素中水平垂直都居中

有两种方案可以实现这个效果。

第一种，还是相对加绝对的方法。

父元素(如果要垂直居中，同样要有高度)：

```css
parentElement {
  position: relative;
  height: 100vh;
}
```

子元素：

```css
childElment {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
```

第二中，直接将父元素转换为表格单元格的形式。同样，如果要水平垂直居中，父元素要定宽高：

```css
parentElement {
  display: table-cell;
  width: 100vw;
  height: 100vh;
  text-align: center;
  vertical-align: middle;
}
```

## 万能水平居中大法

flex 布局（弹性布局）是现在布局中经常使用到的一种布局方式，我们可以通过在父级元素设置元素主轴和交叉轴的对齐方式来达到水平垂直居中对齐的效果。

同样，如果要垂直居中，父元素要设定高度。

```css
parentElment {
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
}
```