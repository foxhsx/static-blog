---
title: JavaScript之switch
date: 2020-12-7
tags:
 - JavaScript
categories:
 - front
---

语法：

```javascript
switch(expression) {
    case value: statement
    break;
    case value: statement
    break;
    ...
    default:statement
}
```

在这里再介绍一个向浏览器输出内容的语法：

```javascript
document.write('内容')
```

功能：向浏览器输出内容

例如获取星期：

```javascript
var week = new Date().getDay();
// 多条件的判断 switch
switch(week) {
    case 0:
        document.write('今天是星期天');
        break;
    case 1:
        document.write('今天是星期一');
        break;
    case 2:
        document.write('今天是星期二');
        break;
  	case 3:
        document.write('今天是星期三');
        break;
    case 4:
        document.write('今天是星期四');
        break;
    case 5:
        document.write('今天是星期五');
        break;
    case 6:
        document.write('今天是星期六');
        break;
    default:
    	document.write('今天是星期一');                
}
```

