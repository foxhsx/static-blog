---
title: JavaScript之BOM
date: 2020-11-23
tags:
 - JavaScript
categories:
  - front
---

**学习目的**

- 掌握BOM的核心——window对象
- 掌握什么是BOM
- 掌握window对象的控制、弹出窗口的方法

### 什么是BOM

BOM(browser object model) 浏览器对象模型

BOM对象有：

1. window
2. navigator
3. screen
4. histroy
5. location

#### 一、window

window 是浏览器的一个实例，在浏览器中，window 对象有双重角色，它既是通过 JavaScript 访问浏览器窗口的一个接口，又是 ECMAScript 规定的 Global 对象。

```javascript
var age = 20;
function sayAge() {
    alert('我'+age);
}
// 声明一个全局变量
window.username = 'tracy';   // var username = "tracy";
window.sayName = function () {
    alert("我是"+ this.username);
}
sayAge();
window.sayName();

```

::: tip

**全局变量**

<b>所有的全局变量和全局方法都被归在window上</b>

- window 声明
  - window.变量名 = 值
- 关键字声明
  - var 变量名 = 值

:::

##### window 对象的方法

1. 功能：显示带有一段消息和一个确认按钮的警告框

   语法：

```javascript
window.alert('content')
```

2. 显示一个带有指定消息和OK及取消按钮的对话框

   语法：

```javascript
window.confirm('message')
```

返回值：

- 如果用户点击确定按钮，则 confirm() 返回 true
- 如果用户点击取消按钮，泽 confirm() 返回 false

例子：

```html
<span>iphone12 </span>
<button id="btn">删除</button>

<script>
	// 获取按钮，绑定事件
    var btn = document.getElementById('btn');
    btn.onclick = function () {
        // 弹出确认对话框
        var result = window.confirm('您确定要删除吗？');
        console.log(result);
    }
</script>
```

3. 显示可以输入文字的对话框，如果不输入文字，也可以设置默认文字

   语法：

   ```javascript
   window.prompt('text, defaultText')
   ```

   参数说明：

   - text : 要在对话框中显示的纯文本（不是HTML格式的文本）
   - defaultText: 默认的输入文本
   - 返回值：
     - 如果用户单击提示框的取消按钮，则返回 Null
     - 如果用户单击确认按钮，则返回输入字段当前显示的文本

   例子：

   ```javascript
   var message = window.prompt("请输入您的星座"， "天蝎座");
   console.log(message);
   ```

4. 打开一个新的浏览器窗口或查找一个已命名的窗口

   语法：

   ```javascript
   window.open(pageUrl, name, parameters)
   ```

   参数说明：

   - pageURL: 子窗口路径
   - name: 子窗口句柄（<span style="color:red">name声明了新窗口的名称，方便后期通过name对子窗口进行引用</span>）
   - parameters: 窗口参数（各参数用逗号分隔）
     - width: 窗口宽度
     - height：窗口高度
     - left: 窗口x轴坐标
     - top: 窗口Y轴坐标
     - toolbar: 是否显示浏览器的工具栏
     - menubar: 是否显示菜单栏
     - scrollbars: 是否显示滚动条
     - location: 是否显示地址字段
     - status: 是否添加状态栏

   例子：

   ```javascript
   window.onload = function() {
       // 打开子窗口，显示 newwindow.html
       window.open('newwindow.html', 'newwindow')
   }
   ```

5. 关闭浏览器

   语法：

   ```javascript
   window.close()
   ```

6. 定时器

   1. 掌握超时调用

      功能：在指定的毫秒数后调用函数或计算表达式

      语法：

      ```javascript
      setTimeout(code, millisec)
      ```

      参数：

      - code: 要调用的函数或要执行的JavaScript代码串
      - millisec: 在执行代码前需要等待的毫秒数

      例子：

      ```javascript
      var fnCall = function () {
          alert('word');  // 自定义函数
      }
      
      var settime1 = setTimeout(function() {  // 匿名函数
          alert('hello');
      }, 2000);
      
      clearTimeout(settime1);  // 清除定时器
      setTimeout(fnCall, 5000)
      ```

      ::: tip

      setTimeout() 只执行 code 一次。如果要多次调用，可以让 code 自身再次调用 setTimeout()

      :::

   2. 掌握间歇调用

      功能：每隔指定的时间执行一次代码

      语法：

      ```javascript
      setInterval(code, millisec)
      ```

      参数说明：

      - code: 要调用的函数或要执行的代码串
      - millisec: 周期性执行或调用 code 之间的时间间隔，以毫秒计

      例子：

      ```javascript
      var intervalId = setInterval(function() {
          console.log("您好");
      }, 1000)
      
      // 十秒之后停止打印
      setTimeout(function() {
          clearInterval(intervalId);
      }, 10000)
      ```

   3. 清除超时调用

      功能：取消由 setTimeout() 方法设置的 timeout

      语法：

      ```javascript
      clearTimeout(id_of_settimeout)
      ```

      参数：

      - id_of_settimeout： 由 setTimeout() 返回的ID值，该值表示要取消的延迟执行代码块

   4. 清除间歇调用

      功能：取消由 setInterval() 方法设置的 interval

      语法：

      ```javascript
      clearInterval(id_of_setinterval)
      ```

      参数说明：

      - id_of_setinterval：由 setInterval() 返回的ID值

   ::: danger

   JavaScript 是单线程语言，单线程就是所执行的代码必须按照顺序。

   :::

#### 二、location 对象

location 对象提供了**与当前窗口中加载的文档**有关的信息，还提供了一些导航的功能，它既是 window 对象的属性，又是 document 对象的属性。

##### **location对象的常用属性**

1. 功能：返回当前加载页面的完整URL

   语法：

   ```javascript
   location.href
   ```

   说明：`location.href`和`window.location.href`等价

2. 功能：返回 URL 中的 hash （#号后跟零或多个字符），如果不包含则返回空字符串。

   语法：

   ```javascript
   location.hash
   ```

3. 功能：返回服务器名称和端口号（如果有，默认80）

   语法：

   ```javascript
   location.host
   ```

4. 功能：返回不带端口号的服务器名称

   语法：

   ```javascript
   location.hostname
   ```

5. 功能：返回 URL 中的目录和（或）文件名

   语法：

   ```javascript
   location.pathname
   ```

6. 功能：返回 URL 中指定的端口号，如果没有，返回空字符串

   语法：

   ```javascript
   location.port
   ```

7. 功能：返回页面中使用的协议

   语法：

   ```javascript
   location.protocol
   ```

8. 功能：返回 URL 的查询字符串，这个字符串以问号开头

   语法：

   ```javascript
   location.search
   ```

9. 功能：重定向 URL

   语法：

   ```javascript
   location.replace(url)
   ```

   说明：使用 location.replace 不会在历史记录中生成新记录

10. 功能：重新加载当前显示的页面

    语法：

    ```javascript
    location.reload()
    ```

    说明：

    - location.reload() 有可能从缓存中加载
    - location.reload(true) 从服务器重新加载

#### 三、history 对象

history 对象保存了用户在浏览器中访问页面的历史记录。

##### **history历史对象**

1. 功能：回到历史记录的上一步

   语法：

   ```javascript
   history.back()
   ```

   说明：相当于使用了 history.go(-1)

2. 功能：回到历史记录的下一步

   语法：

   ```javascript
   location.forward()
   ```

   说明：相当于使用了 history.go(1)

3. 功能：回到历史记录的前n步

   语法：

   ```javascript
   history.go(-n)
   ```

4. 功能：回到历史记录的后n步

   语法：

   ```javascript
   history.go(n)
   ```

#### 四、Screen 对象

##### **Screen**

Screen 对象包含有关客户端显示屏幕的信息

| 属性        | 描述                                       |
| ----------- | ------------------------------------------ |
| availHeight | 返回显示屏幕的高度（除 window 任务栏之外） |
| availWidth  | 返回显示屏幕的宽度（除 window 任务栏之外） |
| width       | 返回显示器屏幕的宽度                       |
| height      | 返回显示器屏幕的高度                       |

说明：availHeight 显示浏览器的屏幕的可用高度，以像素计，但是这个高度不包括屏幕底部的任务栏，所以高度会比 screen.height 少了任务栏的高度。

1. 功能：返回可用的屏幕宽度

   语法：

   ```javascript
   screen.availWidth
   ```

2. 功能：返回可用的屏幕高度

   语法：

   ```javascript
   screen.availHeight
   ```

::: tip

- 获取窗口文档显示区的高度和宽度，可以使用 innerHeight 和 innerWidth——window
- 获取显示屏幕的高度和宽度，可以使用 availHeight 和 availWidth——Screen

:::

#### 五、Navigator 对象

1. UserAgent: 用来识别浏览器名称、版本、引擎以及操作系统等信息的内容

```javascript
// 检测浏览器类型
function getBrowser() {
    // 获取 userAgent 属性
    var exploer = navigator.userAgent.toLowerCase(), browser;
    if (exploer.indexOf('msie') > -1) {
        browser = 'IE';
    } else if (exploer.indexOf('chrome') > -1) {
        browser = 'chrome';
    } else if (exploer.indexOf('opera') > -1) {
        browser = 'opera';
    } else if (exploer.indexOf('safari') > -1) {
        browser = 'safari';
    }
    return browser;
}
var exploer = getBrowser();
console.log(exploer)
```

