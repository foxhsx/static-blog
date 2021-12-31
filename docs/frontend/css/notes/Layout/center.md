---
title: 常用的几种居中方式
date: 2020-12-12
tags:
 - CSS
categories:
 - front
---

[[toc]]

## **文字垂直居中**

实现方法：

1. height&line-height

   ```css
   div {
       height: 30px;
       line-height: 30px;
   }
   ```

   当元素的高和行高相等时，就可以实现文字垂直居中的效果。

2. flex

   ```css
   div {
       display: flex;
       align-items: center;
   }
   ```

   当元素布局为弹性布局时，将其 align-items 属性设置为 center 也可以实现文字垂直居中的效果。

3. vertical-align

   ```css
   table {
       vertical-align: middle;
   }
   ```

   此属性可设置 table 单元格框中的内容的垂直对齐方式。

## **块元素垂直居中于父元素**

1. 相对定位加决定定位

   ```css
   div {
       position: relative;
       height: 100px;
   }
   div child {
       position: absolute;
       top: 50%;
       margin-top: -50px;
   }
   ```

   即在设置 50% 之后，再返回去父元素高度的一半即可。

2. flex--同文字垂直

## **块元素（容器）水平居中**

1. margin

   满足顶宽高和块级元素两个条件的元素是可以通过设置左右margin来实现水平居中的。

   ```css
   div {
       margin: 0 auto;
   }
   ```

   **注意**：当元素设置了float，绝对定位，固定定位时，左右margin为auto就会失效。

2. table布局

   给父元素设置`dislay: table;margin: 0 auto;`，也就是将元素转换为表格形式。

   ```css
   div {
       display: table;
       margin: 0 auto;
   }
   ```

3. text-align

   给父元素设置`text-align:center;`，然后给子元素设置`display: inline-block;`。

   ```css
   div {
       text-align: center;
   }
   div child {
       display: inline-block;
   }
   ```

4. 相对定位加绝对定位

   同垂直同样的原理

   ```css
   div {
       position: relative;
       width: 100px;
   }
   div child {
       position: absolute;
       left: 50%;
       margin-left: -50px;
   }
   ```

   