---
title: React 中父子组件数据传递
date: 2021-06-27 12:02:00
tags:
 - React
categories:
 - front
describe: React 中组件之间怎么传值？父子、兄弟组件、子传父等等。让我们一起来看看
---

| 框架    | 父传子     | 子传父    |
| ------- | ---------- | --------- |
| Vue     | Props Down | Events Up |
| Angular | Props Down | Events Up |
| React   | Props Down | Props Up  |

## 父传子

父组件通过子组件的自定义属性，把自己的数据传递下去。

```jsx
// 父组件
<Parent myName={ state.name } />

// 子组件
function Child(props) {
    return (
    	<h3>{ props.myName}</h3>
    )
}
```

## 子传父

父组件通过子组件的自定义属性，把自己的方法传递下去。子组件内部调用此方法，传递实参给父组件就可以达到子传父的效果。

```jsx
// 父组件
function Parent() {
    function fn() {}
    // 子组件
    <Child parentFn={fn} />
}

// 子组件
function Child(props) {
    <button onClick={ props.parentFn }>子传父</button>
}
```

React 中没有直接的兄弟间数据传递机制，只能借助于父组件：兄弟1 =》 父组件 =》 兄弟2。

而在 React 中父组件想要获得子组件的所有成员，有简便方法：

首先是 Vue:

::: tip Vue

Vue 中父组件获得子组件的引用：

`<Child ref="child" />`

this.$refs.child

:::

然后是 Angular 中父组件获得子组件的引用：

::: tip Angular

`<Child #c2 />`

@ViewChild('c2', { static: true })

private child2;

:::

最后是 React ：

::: tip React

子组件自身有一些状态属性。比如：在 constructor 函数中定义`this.c0 = React.createRef()`

`<Child ref={ this.c0 } />`

然后输出 `this.c0.current` 就是子组件对象。

:::

## 理论知识补充

class 中的静态（static）成员；

类（class）中的成员分为两大类：

- 实例成员：实例属性、实例方法
- 静态成员：静态属性、静态方法

来看个例子：

```js
class Cls {
    name = 'Coco'   // 实例属性
	age = 20       // 实例属性
	// 上述实例属性，在每个实例里是共用的属性，对于重复属性，这样做的结果就是在多次实例化的时候，会造成内存浪费严重，而且不方便统一维护，对于这样的数据，我们可以在其前面加一个 static，比如：
	static location = '中国'

	// 说到底我们可以理解为在创建 class 类的时候，里面的属性需要区分实例属性和静态属性，我们在静态属性前加上 static 关键字即可。

	// 实例属性是每个实例都具备的属性，但是值是不一样的，而静态属性不但 key 一样，而且值也一样，对于这样的属性，我们就不用将其设置为实例属性了。
	printInfo() {  // 实例方法
        console.log(this.name, this.age)
    }
}

let e1 = new Cls()
el.printInfo()

let e2 = new Cls()
e2.name = 'mary'
e2.age = 19
e2.printInfo()
```

概念：如果某个 class 的每一个实例都具备的成员，且值各不相同（例如员工的姓名、年龄），应该声明为实例成员。如果某个class 的所有实例都共用的成员，值在内存中只需保存一份，那么应该声明为静态成员。

::: tip 注意

一般情况下，class 内部，静态属性通过静态方法来访问，实例成员通过实例方法来访问。

class 外部，实例成员需要通过对象的引用来访问；静态成员通过类名来访问。

:::

那么我们在面试中经常会遇到这样的面试题：请说一下 React 中组件的声明周期钩子函数？

::: tip 注意

React 不同版本的生命周期钩子函数各不相同！

**重点记忆：三大框架中，组件加载完成和卸载完成钩子函数**

|              | Vue.js             | Angular       | React                  |
| ------------ | ------------------ | ------------- | ---------------------- |
| 组件加载完成 | mounted() {}       | ngOnInit()    | componentDidMount()    |
| 组件即将卸载 | beforeDestroy() {} | ngOnDestroy() | componentWillUnmount() |

:::

React 组件的生命周期钩子函数分为三类：

1. 首次渲染相关

   - constructor()

   - componentWillMount()：已废弃
   - getDerivedStateFromProps：用于将 props 转为 state
   - render()
   - componentDidMount()：组件渲染完成 ，用于初始化组件中的数据，比如调用接口

2. 二次渲染相关——props更改、setState 状态修改

   - componentWillReceiveProps——已废弃，被静态方法 `getDerivedStateFromProps` 代替。需要注意的是，使用这个方法，首先咱们组件内部是必须有状态的，也就是说这个方法是需要有一个初始状态做支撑的；其次，使用此方法的时候，一些旧的方法（废弃的）是不能在使用的；最后，需要有返回值。

   - shouldComponentUpdate：必须返回一个 Boolean 值，true 为渲染，false 为阻止渲染

   - componentWillUpdate——已废弃

   - render()
   - componentDidUpdate()

3. 组件卸载相关

   - componentWillUnmount：销毁组件，创建长期存在的数据，如定时器