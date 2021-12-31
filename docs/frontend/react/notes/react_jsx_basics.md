---
title: JSX 语法都能做些啥？
date: 2021-06-20
tags:
 - React
categories:
 - front
---

## 语法规范

1. JSX 不是字符串！最外侧不能有引号！

2. JSX 形式上不是 HTML 语法，而是 XML 语法；故类似换行标签 br 必须写作 `<br/>`；属性值必须用引号；有且只有一个根元素；

3. JSX 中可以使用 HTML 标签，但严格区分大小写——任何 HTML 标签都必须全小写，自定义组件名必须使用大驼峰；

4. 因为 JSX 中都是 JS 对象，所以属性都要使用 DOM 属性，而不是 HTML 属性；

5. JSX 片段中还可以出现 JSX 表达式：{  }

6. 注释方法是 `{/*...*/}`;

7. JSX 表达式可以进行数据绑定或者运算：

   1. `<p>{表达式}</p>`——React 中的内容绑定

   2. `<p title={表达式}></p>`——React 中的属性绑定

   3. JSX 表达式可以出现哪些语句？

      ```md
      1. 算术运算：可以
      2. 比较运算：可以，但是 Boolean 值是不会展示出来的，也就是说 true/false 不显示
      3. 逻辑运算：可以，但是 Boolean 值是不会展示出来的，也就是说 true/false 不显示
      4. 三目运算：可以
      5. 调用函数：可以
      6. 创建对象：可以，只要是可以转换为字符串的对象就可以展示，否则会抛出异常
      7. 调用全局对象方法：可以
      ```

而对于 JSX 语法来说呢，浏览器并不能执行，所以这里还需要 babel 来做 JSX 语法的转换：

```html
<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>

<!-- 注意这里需要加上 type="text/babel" -->
<script type="text/babel">
let el = 
<div>
	<p id="p2">hello <br/> world</p>    
</div>

ReactDOM.render(el, box)
</script>
```

## 使用 JSX 的好处

首先，在我们说 [React 是什么](./react_jsx_basics.html) 这一章的时候，提到过 React.createElement 这个API，那它的作用不言而喻，主要是用来创建并返回指定类型的新 React 元素。但是它的写法可能在我们实际开发过程中是比较繁琐的，而使用 JSX 编写的代码会从写法上更加简单明了，且符合我们日常开发的习惯，而 JSX 最后也是会被转换为使用 React.createElement() 的形式。这是从写法上来说，带来的很明显的一个好处，有助于提高我们日常的开发效率。