---
title: 函数基础题
date: 2020-12-14
tags:
 - JavaScript
categories:
 - front
---

1. 下面这段代码的运行结果是？

   ```javascript
   function if () {
   	alert(123);             
   }
   ```

   答案：控制台报错	解析：if 是关键字不能作为函数名使用。

2. 代码中输入框里最后的值是多少？

   ```html
   <body>
       <input type="text" id="txt" />
       <input type="button" value="开始" />
       <script type="text/javascript">
           var num = 0,
           timer = null,
           begin = document.getElementsByTagName("input")[1],
           text = document.getElementById('txt');
   
           begin.onclick = function numCount() {
               text.value = num;
               num = num+1;
               timer = setTimeout(numCount, 1000);
           }
       </script>
   </body>
   ```

   答案：一直循环下去，input框里的值累加。	解析：setTimeout里一直回调 numCount 函数，每隔一秒调一次，所以会一直循环。