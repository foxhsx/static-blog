---
title: BOM对象之location
date: 2021-02-18
tags:
 - JavaScript
categories:
 - front
---

![](../../imgs/bom_location.png)

## Location 对象

location 提供了当前窗口中加载文档的信息，以及通常的导航功能。它独特的地方在于：**既是 window 的属性，又是 document 的属性——window.location 和 document.location 指向同一个对象**。

它不仅保存着当前加载文档的信息，也保存着把 URL 解析为离散片段后能够通过属性访问的信息。

假设浏览器当前加载的 URL 是 `http://foouser:barpassword@www.wrox.com:80/WileyCDA/?q=javascript#contents`。那么 location 对象的内容如下表所示：

| 属性              | 值                                                       | 说明                                                        |
| ----------------- | -------------------------------------------------------- | ----------------------------------------------------------- |
| location.hash     | "#contents"                                              | URL散列值，如果没有则为空字符串                             |
| location.host     | "www.wrox.com:80"                                        | 服务器名及端口号                                            |
| location.hostname | "www.wrox.com"                                           | 服务器名                                                    |
| location.href     | "http://www.wrox.com:80/WileyCDA/?q=javascript#contents" | 当前加载页面的完整 URL。location 的 toString 方法返回这个值 |
| location.pathname | "/WileyCDA/"                                             | URL 中的路径和文件名                                        |
| location.port     | "80"                                                     | 请求的端口。如果 URL 中没有端口，则返回空字符串             |
| location.protocol | "http:"                                                  | 页面使用的协议。通常是 "http:" 或 "https:"                  |
| location.search   | "?q=javascript"                                          | URL 的查询字符串。这个字符串以问号开头                      |
| location.username | "foouser"                                                | 域名前指定的用户名                                          |
| location.password | "barpassword"                                            | 域名前指定的密码                                            |
| location.origin   | "http://www.wrox.com"                                    | URL 的源地址。只读                                          |

我们来说说主要的几个。

### 查询字符串

location.search 是我们在实际开发过程中经常要用到的属性，但是它不容易使用。虽然它返回了从问好开始直到 URL 末尾的所有内容，但没有办法逐个访问每个查询参数。

我们可以写一个解析查询字符串的方法，返回一个以每个查询参数为属性的对象：

```js
let getQueryStringArgs = function () {
    // 首先取得查询字符串
    let qs = (location.search.length > 0 ? location.search.substring(1) : ""),
    // substring(1) 去掉了前面的 ? 号
    args = {};
    
    // 把每个参数都添加到 args 对象里
    for (let item of qs.split("&").map(kv => kv.split("="))) {
        // qs.split("&").map(kv => kv.split("=")) 返回的是一个二维数组，每一项都是 key-value 的组合
        let name = decodeURIComponent(item[0]),
            value = decodeURIComponent(item[1]);
        if (name.length) {
            args[name] = value;
        }
        return args;
    }
}
```

现在，查询字符串中的每个参数都是返回对象的一个属性，这样使用起来就方便多了。

**URLSearchParams**

URLSearchParams 提供了一组标准 API 方法，通过它们可以检查和修改查询字符串。给 URLSearchParams 构造函数传入一个查询字符串，就可以创建一个实例。这个实例上暴露了 get()、set()、delete() 等方法，可以对查询字符串执行相应操作。

```js
let qs = "?q=javascript&num=10";

let searchParams = new URLSearchParams(qs);

alert(searchParams.toString());    // " q=javascript&num=10"
searchParams.has("num");		  // true
earchParams.get("num");		  	  // 10

earchParams.set("page", "3");
alert(searchParams.toString());    // " q=javascript&num=10&page=3"
```

### 操作地址

可以通过修改 location 对象修改浏览器的地址。首先，最常见的是使用 assign() 方法传入一个 URL：

```js
location.assign("http://www.wrox.com")
```

这行代码会立即启动导航到新 URL 的操作，同时在浏览器历史记录中增加一条记录。如果给 location.href 或 window.location 设置一个 URL，也会以同一个 URL 值调用 assign() 方法。

```js
location.href = "http://www.wrox.com";
window.location = "http://www.wrox.com";
```

那修改 location 对象的属性也会修改当前加载的页面。其中，hash、search、hostname、pathname和port属性被设置为新值之后都会修改当前 URL。而除了 hash 之外，只要修改 location 的一个属性，就会导致页面重新加载新 URL。**修改hash的值会在浏览器历史中增加一条新纪录，这对SPA中做前进后退很有效。**

如果不吸氧增加历史记录，可以使用 replace() 方法。这个方法接收一个 URL 参数，但重新加载后不会增加历史记录。在调用 replace() 之后，用户不能回到前一页。

最后一个修改地址的方法是 reload()，它能重载当前显示的页面。调用 reload() 不传参数，页面会以最有效的方式重载——如果页面上次请求以来没有修改过，浏览器可能会从缓存中加载页面。要想强制从服务器重载，可以给 reload() 传个 true。

> 脚本中位于 reload() 调用之后的代码可能执行也可能不执行，这取决于网络延迟和系统资源等因素。所以，**最好把 reload() 作为最后一行代码。**