---
title: HTML元素类型
date: 2020-11-21
tags:
 - HTML
categories:
  - front
---

HTML元素分为三大类：**块元素**，**内联元素**，**可变元素**

#### 一、块元素

::: tip

常见块元素：`div`、`p`、`ol`、`ul`、`li`、`dl`、`dt`、`dd`、`form`、`table`、`tr`，`td`、`fieldset`，`h1-h6`、`hr`

默认情况下有`margin`和`padding`的元素：`body`、`h1-h6`、`p`、`ul`、`ol`、`dl`、`dd`、`td`、`input`

:::

块级元素特点：

1. 块元素以块的形式显示为一个矩形区域
2. 块元素默认自上而下排列
3. 块元素可以定义自己的宽度和高度，以及盒模型中任意值（`margin`、`padding`、`border`）
4. 块元素可以作为一个容器容纳其他的块元素和内联元素

#### 二、内联元素

::: tip

常见内联元素：`a`、`span`、`b`、`strong`、`em`、`i`、`label`、`img`、`input`、`select`、`textarea`

:::

内联元素特点：

1. 内联元素默认在一行逐个进行显示
2. 内联元素没有自己的形状，不能定义自己的宽高，它的宽高由内容来决定，也显示为一个矩形区域
3. 内联元素设置于高度相关的一些属性（`margin-top`、`margin-bottom`、`padding-top`、`padding-bottom`、`line-height`、`height`），显示无效或显示不准确
4. 内联元素可以设置左右的`margin`、`padding`值
5. 内联元素不能嵌套块元素

**内联块状元素特点**：

::: tip

常见的内联块状元素：`img`、`input`、`select`、`textarea`

:::

1. 既具有内联元素特点，在一行逐个进行显示
2. 又具有块状元素特点，可以设置宽高，任何`padding`、`border`、`margin`值
3. `vertical-align`属性支队内联块状元素有效

#### 三、可变元素

根据上下文关系决定元素类型（块元素或内联元素）——常见的可变元素有`button`、`iframe`、`script`

#### 四、元素类型转换——延伸

::: tip

语法：`display:block | inline-block | inline | none | list-item;`

:::

**block** 大部分块状元素的默认`display`属性值，给元素设置为`block`即具有了块状元素的特点

**inline-block** 将元素转换为内联块状元素，是`img`、`input`等内联块状元素的默认`display`属性值

**inline** 将元素转换为内联元素，是`a`、`span`等内联元素的默认`display`属性值

**none** 将元素隐藏不可见，如需将元素再次显示，设置该元素默认`display`属性值即可

**list-item** 将元素转换为列表页，是`li`的默认`display`属性值

> 注：当给元素设置了 float 属性后，就相当于转成了 block 类型，可以设置宽高

#### 五、置换元素和非置换元素

1. 置换元素

   浏览器根据元素的标签和属性，来决定元素的具体显示内容。

   例如：`img`标签的`src`属性决定了在网页中呈现不同的图片

   ​			`input`标签的`type`属性决定在网页中呈现不同类型的`input`控件

2. 非置换元素

   除了置换元素，`html`大部分元素都是非置换元素，其内容直接表现在浏览器中