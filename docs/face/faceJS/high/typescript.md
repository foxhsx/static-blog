---
title: 对 Typescript 有多少了解
date: 2021-04-12
tags:
 - JavaScript
 - 面试
categories:
 - front
---

这篇文章不详细讲 TypeScript 的用法，只是粗略的讲一下 TypeScript 是什么？

TypeScript 是微软产出的，具有类型系统，是 JavaScript 的超集。可以编译成普通的 JavaScript 代码。

支持任意浏览器，任意系统，任意的环境。

相较于 JavaScript 来说，TypeScript 的强大之处在于它属于强类型语言，而不是像 JavaScript 这种弱类型语言。写法上更倾向于 Java。我们来大概说下它具有哪些优点：

## 类型注解

在 TypeScript 中的类型注解是一种轻量级的为函数或者变量添加约束的方式。用来约束传入的参数或者变量的类型。

```ts
function greeter(person: string) {
  return 'hello, '+ person;
}
```

## 接口

在 TypeScript 中，只在两个类型内部的结构兼容那么这两个类型就是兼容的。这就允许我们在实现接口的时候只要保证包含了接口要求的结构就可以，而不必明确使用 `implements` 语句。

```ts
interface Person {
  firstName: string,
  lastName: string
}

function greeter(person: Person) {
  return "Hello, " + person.firstName + " " + person.lastName;
}
```

## 类

我们创建一个Student类，它带有一个构造函数和一些公共字段。还要注意的是，**在构造函数的参数上使用public等同于创建了同名的成员变量**。

```ts
class Student {
  fullName: string,
  constructor(public firstName, public middleInitial, public lastName) {
    this.fullName = firstName + " " + middleInitial + " " + lastName;
  }
}

interface Person {
  firstName: string,
  lastName: string
}

function greeter(person: Person) {
  return "Hello, " + person.firstName + " " + person.lastName;
}

let user = new Student("Jane", "M.", "User");

document.body.innerHTML = greeter(user);
```

当然，从另一方面来说，TypeScript 是强类型的 JavaScript 超集，支持 ES6 语法，支持面向对象编程的概念，如类、接口、继承、泛型等。TypeScript 并不直接在浏览器上运行，需要编译器编译成纯 JavaScript 来运行。编译时也会提供错误检查，避免一些低级错误。但是需要花费一些时间成本去编译成 JavaScript 才可以运行。