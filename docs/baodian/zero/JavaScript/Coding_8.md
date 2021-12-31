---
title: 编程题汇总（八）
date: 2021-03-16
tags:
 - JavaScript
 - 面试
categories:
 - front
---
## 1、输出下面代码结果

```js
// ./module.js
export default () => 'Hello world'
export const name = 'Lydia'

// ./index.js
import * as data from './module'

console.log(data)
```

::: tip 参考答案
{ default: function default(), name: 'Lydia' }

使用 `import * as name` 语法，我们将 module.js 文件中所有 export 导入到 index.js 文件中，并且创建了一个名为 data 的新对象。在 module.js 中有两个导出：默认导出和命名导出。默认导出是一个返回字符串 'Hello world' 的函数，命名导出是一个名为 name 的变量。

data 对象具有默认导出的 default 属性，其他属性具有指定 exports 的名称及其对应的值。
:::

## 2、输出下面代码结果

```js
const numbers = [1, 2, 3];
numbers[10] = 11;
console.log(numbers);
```

::: tip 参考答案
[1, 2, 3, 7 x empty, 11]

当我们为数组中的元素设置一个超过数组长度的值时，JavaScript 会创建一个名为 '空插槽' 的东西。这些位置的值实际上是 undefined，但实际会看到类似的值：
```js
[1, 2, 3, 7 x empty, 11]
```
:::

## 3、输出下面代码结果

```js
const person = {
  firstName: 'Lydia',
  lastName: 'Hallie',
  pet: {
    name: 'Mara',
    breed: 'Dutch Tulip Hound'
  },
  getFullName() {
    return `${this.firstName} ${this.lastName}`
  }
}

console.log(person.pet?.name);
console.log(person.pet?.family?.name);
console.log(person.getFullName?.());
console.log(member.getLastName?.());
```

::: tip 参考答案
Mara undefined Lydia Hallie undefined

通过 ES10 或 TS3.7+ 的可选链操作符 `?.`，我们不再需要显式检测更深层的嵌套值是否有效。如果我们尝试获取 undefined 或者 null 的值(nullish)，**表达式将会短路并返回 undefined**。

person.pet?.name 中 person 有一个名为 pet 的属性，而 person.pet 不是 nullish。它有个名为 name 的属性，并返回字符串 Mara。

person.pet?.family?.name 中 person 有一个名为 pet 的属性，但是 pet 没有 family 的属性，此时 person.pet.family 是 nullish，表达式返回 undefined。

person.getFullName?.() 中 person 有一个 getFullName 的属性，所以 getFullName() 不是 nullish 并可以被调用，返回字符串 Lydia Hallie。

member.getLastName?.() 中，member 就是一个未定义的值，所以直接返回了 undedined。
:::

## 4、输出下面代码结果

```js
console.log(`${(x => x)('I love')} to program`)
```

::: tip 参考答案
I love to program

带有模板字面量的表达式首先被执行。相当于字符串会包含表达式，这个立即执行函数 `(x => x)('I love')` 返回的值。我们向箭头函数 x => x 传递 I love 作为参数，并返回。最后结果就是 I love to program。
:::

## 5、怎么在 index.js 中调用 sum.js 中的 sum 函数？

```js
// ./sum.js
export default function sum(x) {
  return x + x;
}

// ./index.js
import * as sum from './sum';
```

::: tip 参考答案
sum.default(4)

使用符号 *，我们引入文件中的所有值，包括默认和具名。默认值导出后的呈现方式是以 key-value 的形式出现：

```js
{ default: function sum(x) { return x + x } }
```
:::

## 6、输出下面代码结果

```js
async function getData() {
  return await Promise.resolve('I made it!')
}

const data = getData();
console.log(data);
```

::: tip 参考答案
Promise {\<pengding\>}

异步函数始终返回一个 promise。await 仍然需要等待 promise 的解决：当我们调用 getData() 并将其赋值给 data，此时 data 为 getData 方法返回的一个挂起的 promise，该 promise 并没有解决，还处于 pengding 状态。

如果我们想要访问已解决的值 'I made it!'，可以在 data 上使用 .then() 方法：

```js
data.then(res => console.log(res))
```
:::

## 7、输出下面代码结果

```js
const numbers = [1, 2, 3, 4, 5];
const [y] = numbers;

console.log(y);
```

::: tip 参考答案
1

我们可以通过解构赋值来解析来自对象的数组或属性的值。在数组的解构中，我们通常将左边的值和右边的值按照下标做一一对应。
:::

## 8、输出下面代码结果

```js
[1,2,3,4].reduce((x, y) => console.log(x, y))
```

::: tip 参考答案
1 2 and undefined 3 and undefined 4

reducer 函数接收四个参数：
1. Accumulator (acc) (累计器)
2. Current Value (cur) (当前值)
3. Current Index (idx) (当前索引)
4. Source Array (src) (源数组)

语法：
```js
arr.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue])
```

其中这个 accumulator 值呢是累计器累计回调的返回值；它是上一次调用回调时返回的累积值，或者 initialValue。

PS: initialValue 是作为第一次调用 callback 函数时的第一个参数的值。如果没有提供初始值，则将使用数组中的第一个元素。在没有初始化值的空数组上调用 reduce 将报错。

上面例子里，并没有返回值，只是打印了累计器和当前值。
:::

## 9、输出下面代码结果

```js
const name = 'Lydia Hallie';

console.log(!typeof name === 'object');
console.log(!typeof name === 'string');
```

::: tip 参考答案
false false

首先 typeof 返回的是一个字符串，但是对字符串取反之后就成了布尔值，所以 === 不成立。
:::

## 10、输出下面代码结果

```js
const emojis = ['🐒', ['😉', '😉', ['😪', '😪', '😪']]];

console.log(emojis.flat(1));
```

::: tip 参考答案
['🐒', '😉', '😉', ['😪', '😪', '😪']]

通过 flat 方法，我们可以创建一个新的，已被扁平化的数组。被扁平化的深度取决于我们传递的值。在这里例子中，我们传递了 1（其实默认就是 1），相当于只有第一层的数组才会被扁平化。
:::