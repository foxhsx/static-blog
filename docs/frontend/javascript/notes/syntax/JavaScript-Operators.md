---
title: JavaScript操作符
date: 2020-11-28
tags:
 - JavaScript
categories:
 - front
---

### **一、操作符**

:question:**什么是操作符？**

操作符也可以叫做运算符，数学运算类似，其目的是快速实现一些计算，包括数值计算、逻辑计算等等。

:eye_speech_bubble:**操作符的分类**

1. 算数操作符

   - +：加

   - -：减

   - *：乘

   - /：除

   - %：取余

   - 递增：++a和a++都是对a进行递增的操作

     区别：

     - ++a 先返回递增之后的a的值
     - a++先返回a的值，再返回递增之后的值

   - 递减：同递增

   ```javascript
   var num1 = 10,
       num2 = 20,
       num3 = 'c',
       num4 = '5',
       
   console.log(num1+num2);  // 30  加运算
   console.log(num1/num2);  // 0.5 除运算
   console.log(num1%num2);  // 10  取余运算
   console.log(num1*num3);  // number 类型的 NaN
   console.log(num1*num4);  // 50  这里会自动进行隐式转换  乘运算
   ```

   递增和递减：

   ```javascript
   var num1 = 10,
       num2 = 5,
       num5 = ++num1 + num2;
   console.log(num1);  // 11
   console.log(num5);  // 16  ++num1 先返回递增之后的值再加num2就是16
   var nu1 = 10,
       nu2 = 5,
       nu3 = ++num1 + num2;
   console.log(num1);  // 11  
   console.log(num3);  // 5   num1++ 先返回num1的值，再返回递增后的值
   
   var x1 = 20,
       x2 = 30,
       x3 = --x1+x2--;
   console.log(x1);  // 19
   console.log(x2);  // 29
   console.log(x3);  // 49  x2先返回原来的值，即先返回30
   ```

2. 逻辑操作符

   1. &&: 与——只要有一个条件 不成立，返回 false

      ```javascript
      var num1 = 10,
          num2 = 20,
          num3 = 30,
          str = 'welcome',
          bool = true,
          n = null,
          m;
      console.log(num1 < num2 && num2 < num3);    // true
      console.log(num1 < num2 && num2 == num3);    // false
      console.log(num3 < num1 && num2 < num3 && bool);    // true
      ```

      说明：在有一个操作数不是布尔值的情况，逻辑与操作就不一定返回值，此时它遵循下列规则:

      1. 如果第一个操作数隐式类型转换后为true，则返回第二个操作数。
      2. 如果第一个操作数隐式类型转换后为false，则返回第一个操作数。
      3. 如果有一个操作数是null，则返回null。
      4. 如果有一个操作数是NaN，则返回NaN。
      5. 如果有一个操作数是undefined，则返回undefined。

   2. ||：或——只要有一个条件成立，返回true

      ```javascript
      console.log(55>88 || 33 < 66); // true
      console.log(55!='55' || 88=='88') // true
      var m;
      
      console.log('hello' || 0) // hello
      console.log(99 || 0 || 'abc') // 99
      console.log('' || 88 || true) // 88
      console.log('' || 0 || 'abc') // abc
      console.log(0 || '' || null) // null
      console.log(0 || '' || null || 'hello') // hello
      console.log(m || NaN) // NaN
      console.log(m || NaN || 99) // 99
      console.log('' || m) // undefined
      ```

      说明：在有一个操作数不是布尔值的情况，逻辑或操作就不一定返回值，此时它遵循下列规则：

      1. 如果第一个操作数隐式类型转换后为true，则返回第一个操作数。
      2. 如果第一个操作数隐式类型转换后为false，则返回第二个操作数。
      3. 如果两个操作数都是null，返回Null
      4. 如果两个操作数都是NaN，则返回NaN
      5. 如果两个操作数都是undefined，则返回undefined

   3. !： 非

      - 无论操作数是什么数据类型，都会返回一个布尔值
      - !! 同时使用两个逻辑非操作符时：
        - 第一个逻辑非操作会基于无论什么操作数返回一个布尔值
        - 第二个逻辑非则对该布尔值求反

      ```javascript
      console.log(!false);   // true
      console.log(!88);   // false
      console.log(!0);   // true
      
      console.log(!!"");   // false
      console.log(!!'blue');   // true
      ```

      

3. 赋值操作符

   - 简单赋值：=
   - 复合赋值：+=、-=、*=、/=、%=

   ```javascript
   var a = 10,
       b = 20,
       str = 'hello ';
   
   a+=5;  // a = a+5;
   b%=4;  // b = b%4
   str+='world'  // str=str+'world' +还有拼接的作用，当左右两边的值都为字符串时，可以将两边的字符串拼接起来。
   console.log(a);
   ```

4. 比较操作符

   `>、<、>=、<=、==、===、!=、!==`

   - ==：相等，只比较值是否相等
   - ===：相等，比较值的同时比较数据类型是否相等
   - !=：不相等，比较值是否不相等
   - !==：不相等，比较值的同时比较数据类型是否不相等

   返回值：Boolean型

   ```javascript
   var x = 10,
       y = '10',
       f = 16,
       z = x==y,
       a = x===y,
       b = f!==y;
   console.log(z);   // true
   console.log(a);   // false
   console.log(b);   // true
   console.log(null==undefined);   // true
   console.log(null === undefined);   // false
   ```

5. 三元操作符

   语法：`条件 ？ 执行代码1 ：执行代码2`

   说明：

   	1. 可代替简单的if 语句

      	2. 如果条件成立，执行代码1，否则执行代码2

   ```javascript
   var soce = 85;
   var res = (soce > 60) ? '及格' : '不及格'
   console.log(res); // 及格
   ```

   