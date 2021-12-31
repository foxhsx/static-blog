---
title: 如何梳理代码？
date: 2021-05-01
tags:
 - 干货
categories:
 - front


---

- 写代码应该如何思考
- 观察者模式组织模块
- 职责链模式组织模块

## 什么是程序

- 程序 = 模块 + 模块之间的沟通

## 思考步骤

1. 这个功能的主体对象如何创建

   从如何创建主体对象这个角度我们往创建型设计模式靠拢，而我们熟知的创建型设计模式呢，又有：工厂模式、单例模式、建造者模式。

   从面向对象的角度来说呢，一个功能的实现必然伴随着一个接口、API 或者说类的实现。因为到最终咱们是要去使用这个功能，而实现这个功能的前提就是使用某种设计模式来抽象出来一个类或者说是一个方法。

   那么上面我们说到的几种模式都适用于哪些场景呢？

   首先，我们来说工厂模式，就以 jQuery 为例，类似 jQuery 这种需要**大量创建实例对象**的时候，就需要使用工厂模式来设计。

   而单例模式呢，恰恰相反，它是**保证我们全局只有一个实例化对象**。比如`vue-router、vuex`这两个在全局中必须得保证只有一个实例对象，如果出现多个，那可想而知，整个项目都会出现问题！

   而建造者模式呢，则是不确定，有时候你可以选择全局只创建一个类，但是也不能保证全局只有一个，那这个时候，我们就需要使用建造者模式。它的特性就是会暴露出去一个类，在使用的时候 `new` 这个类，而且这个类很可能是多个子类组成的。典型的例子就是 `Vue2.x` 。

   ::: tip

   建造者模式可以这样来理解，就是我们需要盖一座房子，那这个房子是由不同的部分组成的，要有房梁，地基，窗户，门，墙壁等等，这些不同的结构共同组成了一个完整的房子。

   而我们熟知的 Vue 内部，其实也是由不同的子类和功能模块来组成。

   :::

2. 脱离代码，抽象思考，实现这个功能需要那几步？

   拿到需求之后，先不要考虑如何用代码去实现，而是先考虑，实现这个功能，需要哪几步？等列举好要实现的步骤之后，再回到代码层面。

3. 回到代码，思考实现这几步，需要什么模块

   思考好步骤之后，就对应每个步骤，思考需要哪些模块？需要做哪些模块出来去协助完成。那这个时候就又涉及到了具体程序设计的模块了。

4. 组织模块沟通

   开头说到的两种模式用起来，让代码变得干净整洁，富有可扩展性和维护性，低耦合。

5. 实现模块

6. 质量调优

## 观察者模式是什么

- 目的：当模块之间不方便直接沟通
- 使用方式：通过一个中介，来转发消息

### 异步模块

事件绑定在本质上就是一个异步模块，我们通过 `onclick` 来触发点击事件，并执行相应的代码。

### 原本不在设计之内的模块

那我们来实现一个最简单的观察者模式的例子：

```js
const observe = {
  message: {
    
  },
  // 注册
  register: function (type, fn) {
    this.message[type] = fn;
  },
  // 发布
  fire: function (type) {
    this.message[type]();
  },
  // 删除
  remove: function (type) {
    delete this.message[type];
  }
}
```

这里我们定义一个 `observe` 的对象，里面有一个 `message` 的属性，用来存储值，`register` 用来注册事件，并将对应的方法注册到 `message` 里去，在 `fire` 的时候调用对应的方法即可，最后可以在不使用的时候删除掉对应的属性。

接下来以实现一个越转越快的转盘为例。

```js
// 一个越转越慢的转盘
// 1. 使用函数式编程

// 2. 获取到最终奖品（点击抽奖之后就已经得到结果，动画只是一个过渡效果），开始转动，每转动一圈减慢速度再转一圈，最后一圈停在对应的奖励
// 3. 结果模块，动画效果模块，转动控制模块
// 4. 使用 setInterval() 异步函数来控制动画，html 结构生成模块

var observe = {
	// 存放注册的事件
	message: {},
	// 注册监听
	register: function (type, fn) {
		this.message[type] = fn;
	},
	fire: function (fire) {
		this.message[fire]();
	}
}

/**
 * 先全部写成空方法 
 * 然后可以用建造者模式来组织他们，也可以直接使用函数式来进行
 */ 

/**
 * html 结构生成模块
 * @param {目标容器} target 
 */
let domArr = [];  // 用于缓存生成的 div
function htmlInit(target) {
	let num = 9;
	for (let i = 0; i <= num; i++) {
		let div = document.createElement('div');
		div.setAttribute('class', 'item');
		div.innerHTML = i;
		target.appendChild(div);
		domArr.push(div);
	}
}

// 结果模块
function getFinal() {
	// 40 是一个基础的转动圈数，这里先生成随机数，然后转动40圈加随机数后停下
	let num = Math.random() * 10 + 40;
	return Math.floor(num);
}

/**
 * 动画效果模块
 * @param {动画设置} moveConfig 
 */
function mover(moveConfig) {
	let nowIn = 0;  // 当前停留在第几个，初始化的时候默认是第一个，下标为 0
	let removeIn = 9;  // 假如这里的选中效果是一个蓝色的边框，那么我们在当前选中效果的基础上，要删除上一个边框的效果

	// 设置定时器动画
	let timer = setInterval(() => {
		if (nowIn != 0) {
			removeIn = nowIn - 1;
		}
		domArr[removeIn].setAttribute('class', 'item');
		domArr[nowIn].setAttribute('class', 'item item-on');
		nowIn++;

		// 如果 nowIn 等于传进来的动画次数，比如 10 个
		if (nowIn === moveConfig.moveTime) {
			// 停止动画
			clearInterval(timer);
			// 如果传进来的动画次数等于10的时候，表示转完了一整圈
			if (moveConfig.moveTime === 10) {
				// 这是触发一个转下一圈的事件
				observe.fire('finish');
			}
		}
		// 传入转动的速度
	}, moveConfig.speed)
}

// 动画控制模块
function moveControll() {
	// 先调用结果模块，拿到最终停留在哪里
	let final = getFinal();
	// 计算出我们需要转动多少圈
	let circle = Math.floor(final/10, 0);
	// 已经跑了几圈了
	let runCircle = 0; // 默认为0
	// 最终停在第几格
	let stopNum = final%10;
	// 定义初始速度为 200 ms
	let speed = 200;

	// 初始转动第一圈
	mover({
		moveTime: 10,
		speed
	})

	// 注册事件
	/**
	 * finish 事件，已经完成一圈后下一圈应该怎么转
	 */
	observe.register('finish', function () {
		// 当前一圈，要转多少次
		let time = 0;
		// 速度递增
		speed -= 50;
		// 转完一圈后 runCircle 递增
		runCircle++;

		// 如果当前的圈数小于等于基础圈数，则转动的次数为10
		if (runCircle <= circle) {
			time = 10;
		} else {
			time = stopNum;
		}

		// 调用动画
		mover({
			moveTime: time,
			speed
		})
	})
}

function begin() {
	htmlInit(document.getElementById('app'));
	moveControll();
}

window.begin = begin();
```

这样就简单的实现了一个转盘抽奖的效果，麻雀虽小，五脏俱全，该有的方法和设计模式都涉及到了。我们使用观察者模式将两个模块之间进行了关联，从而达到了我们期望的效果。

接下来我们再来看看**职责链模式**。

## 职责链模式

首先我们说职责链模式是什么？

- 目的：让功能的完成以消息按链条传递来处理
- 使用方式：线性处理，同步模块
- 适用处：功能不涉及到异步操作

例如，一个水果罐头加工厂加工水果罐头，那么它就有这样一个流水线：切水果 -》 消毒 -》 装瓶 -》 装箱。

典型的例子就是 axios 的拦截器，这是一个很典型的职责链模式，它的响应拦截器和请求拦截器是可以随意添加和扩展的。

接下来我们看一个使用职责链模式做的格式验证的功能。

```js
// 事件绑定模块 -》 前端验证模块 =》 后端验证模块
let input = document.createElement('input');

input.onblur = function () {
    let value = input.value;
    let arr = [frontValidate, back];

	async function test() {
		let result = value;  // 初始化 result

		// 依次执行 arr 里面的每一个方法，然后把上一个方法的结果给到下一个
		// 这里借鉴了 axios 里的拦截器的思路
		while(arr.length > 0) {
			result = await arr.shift()(result);
		}
	}

	test().then(res => {

	})
}

// 前端验证
function frontValidate (result) {
	return result
}

// 后端验证
function back(result) {
	return result
}
```

使用职责链模式，可以在产品开发的同时，避免需求变更带来的些许火焰，比如在原有的基础上再拓展一个功能之类的，上述例子里，就可以再添加一个方法进去，并不会影响到别的代码。

## 质量调优

1. 健壮性
2. 代码简洁性
3. DRY原则

首先对于代码的健壮性来说，其实可以简称为许许多多的 `if...else...`，比如我们之前说的转盘有个方法：

```js
// 动画控制模块
function moveControll() {
	// 先调用结果模块，拿到最终停留在哪里
	let final = getFinal();
    // 这里就需要有一个健壮性判断，final 应该是一个数字
    if (typeof final !== 'number') {
    	throw new Error('final is not a number')   
    }
	// ...
}
```

这样做的作用就是可以避免一些低级错误的出现，并且可以快速定位问题原因和位置。

其次就是代码简洁性，比如代码中的`if..else`过多时，我们可以使用策略模式、状态模式；而当重复对象很多的时候，我们还可以用到享元模式。

最后一个就是 DRY 原则—— don`t repeat yourself。