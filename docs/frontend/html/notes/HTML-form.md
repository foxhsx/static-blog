---
title: HTML-FORM表单及其控件元素
date: 2020-11-21 20:30:00
tags:
 - HTML
categories:
  - front
---

第一节的时候我们大概了解了一下表单的一些标签和用法，这一节我们来具体说一下。

### 一、表单

作用：用来搜集用户信息，如用户登录注册等功能，都需要表单来完成。

语法：

```html
<form method="get/post" action="home.php"></form>
```

注：所有的表单控件都放在 form 标签之间

#### **表单控件**

1. 文本框

   语法：

   ```html
   <input type="text" value="admin" placeholder="请输入" />
   ```

   属性：

   1. type 为当前表单控件的类型，text 表示是文本框
   2. value 用来设置或获取文本框的值
   3. placeholder 用来设置默认提示语句

2. 密码框

   语法：

   ```html
   <input type="password" value="password" placeholder="请输入" />
   ```

3. 提交按钮

   语法：

   ```html
   <input type="submit" value="提交" />
   ```

   ::: tip

   注：提交按钮的默认提示信息为提交或提交查询，通过 value 属性可以重新设置按钮文字内容

   :::

4. 重置按钮

   语法：

   ```html
   <input type="reset" value="重置" />
   ```

   ::: tip

   注：与提交按钮相同，必须放在form中才具备重置的功能

   :::

5. 单选按钮

   语法：

   ```html
   <input type="radio" name="a" checked="checked" />
   <input type="radio" name="a" />
   ```

   ::: tip

   注：

   1. 单选按钮必须添加一致的 name 属性值，才能达到多选一的效果
   2. 设置 checked 属性，可以在页面加载完成后添加默认选中状态（主要用在单选和复选按钮上）

   :::

6. 复选按钮

   语法：

   ```html
   <input type="checkbox" disabled="disabled" />
   ```

   注：设置 disabled="disabled" 后，input 控件为禁用状态

7. 下拉列表

   语法：

   ```html
   <select>
       <option></option>
       <option selected="selected"></option>
       ...
   </select>
   ```

   注：selected="selected" 改变下拉列表默认选中项

8. 文本域

   语法：

   ```html
   <textarea cols="字符宽度" rows="行数"></textarea>
   ```

   > 扩展：textarea { resize: none; } 不允许用户手动拖拽改变文本域的大小

9. 按钮

   语法：

   ```html
   <input type="button" value="立即领取" />
   ```

   > 普通按钮不具备提交功能，通常结合 js 来使用。
   >
   > 普通按钮默认文字内容为空，碧玺添加 value 属性设置相关的按钮文字内容。

10. 上传文件

    使用**`type="file"`**的`<input>`元素使得用户可以选择一个多个元素以提交表单的方式上传到服务器上，或者通过JavaScript的File API对文件进行操作。

    ```html
    <input type="file" />
    ```

    属性：

    | 属性     | 说明                                                     |
    | -------- | -------------------------------------------------------- |
    | accept   | 一个或多个 unique file type specfiers 描述允许的文件类型 |
    | capture  | 捕获图像或视频数据的源                                   |
    | files    | FileList 列出了已选择的文件                              |
    | multiple | 布尔值，如果出现，则表示用户可以选择多个文件             |

11. 隐藏域控件

    **`"hidden"`** 类型的 `<input>` 元素允许 Web 开发者存放一些用户不可见、不可改的数据，在用户提交表单时，这些数据会一并发送出。比如，正被请求或编辑的内容的 ID，或是一个唯一的安全令牌。

    ```html
    <input id="prodId" name="prodId" type="hidden" value="xm234jq">
    ```

    ::: danger

    :warning:重要提示：尽管该值未在页面内容中显示给用户，但可以使用任何浏览器的开发人员工具或“查看源代码”功能来查看并进行编辑。 请不要依赖 `hidden` 输入作为安全表单。

    :::

12. 图像域控件

    ```html
    <input type="image" src="图片路径" />
    ```

    这个标签是一个图片提交按钮。必须使用 src 属性来定义图片的源，并且使用 alt 来定义当图片无法显示时候的替代文字。height 和 width 属性是用来定义图片的高和宽的。

13. 提示信息

    我们通常会把提示信息放在一个 label 标签中

    ```html
    <label for="girl">女</label><input type="radio" name="a" id="girl" />
    ```

    给 input 添加 ID 属性，给 label 添加 for 属性，可以实现点击文字选中按钮的功能；

    也可以通过给 label 设置样式实现一些特殊的表单效果。

14. 表单字段集及表单字段集标题

    作用：对表单域中的多个表单元素进行分组

    语法：

    ```html
    <form>
        <fieldset>
        	<legend>
                用户注册
            </legend>
            ...
        </fieldset>
    </form>
    ```

最后我们来看一个比较完整form表单的例子：

```html
<form action="" method="get" class="form-example">
  <fieldset>
    <legend>Text</legend>
    <label for="name">Enter your name: </label>
    <input type="text" name="name" id="name" required>
  </fieldset>
  <fieldset>
    <legend>Password</legend>
    <label for="name">Enter your name: </label>
    <input type="password" name="password" id="password" required>
  </fieldset>
  <fieldset>
    <legend>Radio</legend>
    <label><input type="radio" name="radio"> Select me</label>
      <label><input type="radio" name="radio"> Select other</label>
  </fieldset>
  <fieldset>
    <legend>Checkbox</legend>
    <label><input type="checkbox" checked>读书</label>
    <label><input type="checkbox">运动</label>
  </fieldset>
  <fieldset>
    <legend>Select</legend>
    <label>下拉框</label>
    <select>
    	<option>option1</option>
    	<option selected>option2</option>
    	<option>option3</option>
    	<option>option4</option>
    	<option>option5</option>
    	<option>option6</option>
    </select>
  </fieldset>
  <div class="form-example">
    <input type="submit" value="Subscribe!">
  </div>
</form>
```

实际显示在页面中就是这样的：

> <form action="" method="get" class="form-example">
>   <fieldset>
>     <legend>Text</legend>
>     <label for="name">Enter your name: </label>
>     <input type="text" name="name" id="name" required>
>   </fieldset>
>   <fieldset>
>     <legend>Password</legend>
>     <label for="name">Enter your name: </label>
>     <input type="password" name="password" id="password" required>
>   </fieldset>
>   <fieldset>
>     <legend>Radio</legend>
>     <label><input type="radio" name="radio"> Select me</label>
>     <label><input type="radio" name="radio"> Select other</label>
>   </fieldset>
>   <fieldset>
>     <legend>Checkbox</legend>
>     <label><input type="checkbox" checked>读书</label>
>     <label><input type="checkbox">运动</label>
>   </fieldset>
>   <fieldset>
>     <legend>Select</legend>
>     <label>下拉框</label>
>     <select>
>     	<option>option1</option>
>     	<option selected>option2</option>
>     	<option>option3</option>
>     	<option>option4</option>
>     	<option>option5</option>
>     	<option>option6</option>
>     </select>
>   </fieldset>
>   <div class="form-example">
>     <input type="submit" value="Subscribe!">
>   </div>
> </form>

<hr />
::: tip

扩展1: method 主要用来设置数据的发送方式，常用的为 GET 和 POST

GET 和 POST 的区别：

1. GET 主要用来获取数据，POST 主要用来发送数据
2. GET 可以发送的数据量较小，一般为2KB，POST 可以发送的数据量较大
3. GET 发送的数据会直接显示在 URL 地址栏中，不安全，它将表单中的数据按照`key=value`的形式，添加到action 所指向的URL后面，并且两者使用`?`连接，而各个变量之间使用 "&" 连接；POST 直接通过服务器来发送更安全，它将表单中的数据放在form的数据体中，按照`key:value`的方式，传递到action所指向的程序。

扩展2：action 主要用来设置数据发送到的位置，一般为后端文件

扩展3：表单元素还有一个用于指定表单数据编码类型的 enctype 属性，其值有如下几种：

1. application/x-www-form-urlencoded: 窗体数据被编码为键值对。这是标准的编码格式。
2. multipart/form-data: 窗体数据被编码为一条消息，页上的每个控件对应消息中的一个部分。它会把表单数据转换为二进制传输，适用于上传文件。
3. text/plain: 窗体数据以纯文本形式进行编码，其中不含任何控件或格式字符。

:::

