---
title: H5与Android交互
date: 2021-01-11
tags:
 - JavaScript
categories:
 - front
---

在进行混合开发时，会遇到这样的场景：

> 使用 H5 原生开发，然后外层套一个安卓的壳子，最后打包成APP。里面的一些逻辑交互，是 H5 与安卓之间进行的。

像以上这种情况就会有 H5 与安卓之间如何进行数据传递的问题。

那么 H5 和安卓之间是如何进行数据交互的呢？

1. JS 向安卓发送消息（**基于安卓通过`WebViewClient`的回调方法`shouldOverrideUrlLoading()`拦截 url**）

   ```js
   // 传给Android
   callAndroid() {
       document.location = `js://androidFunction?argument`;
   }
   ```

   这里我们只需要修改当前的 location 路径，后面的参数是要传给安卓的信息。

   - 在 JS 约定所需要的 URL 协议。

   - androidFunction：这个参数传给安卓之后，安卓需要以这个参数名为方法名，创建一个方法。
   - argument：传给安卓时携带的参数。

2. 安卓接收到消息后，再给 H5 返回数据，H5接收即可。

   这里需要通过 `WebView `的 `loadUrl()` 去执行 JS 方法把返回值传递回去：

   ```js
   // Android: Mainactivity.java
   mWebView.loadUrl("javascript:returnResult(" + result + ")");
   
   // JS：javascript.html
   function returnResult(result){
       alert("result is" + result);
   }
   ```

   可以看到，首先在安卓那边需要调用 `loadUrl` 来定义一个 JavaScript 方法，用来返回数据；那在 JS 这边需要定义一个相同方法名的方法来接收数据。

   这样就完成了 H5 与 安卓之间的数据交互。

在 vue 中，我们可以使用 vuex 或者 BUS 总线的方式把这个数据存储起来，JS 接收数据的方法写在 main.js 中即可。然后就可以在页面中使用数据了。

