---
title: Redux 介绍
date: 2021-07-28
tags:
 - React
 - JavaScript
describe: 学习一下什么是 Redux
---

 ## Redux 是什么？

### 专注于状态管理的库

- Redux 专注于状态管理，和 react  解耦
- 单一状态，单向数据流
- 核心概念：store、state、action、reducer

那我们说在一些简单的中小型项目中，如果数据复用度低，那使用 setState 是完全可以的，不必要再引入一个新的库来专门管理状态。但是如果项目规模越来越大，项目中的状态也越来越多，越来越混乱，这个时候我们就需要使用一个状态管理库来集中管理项目中的状态。Redux 也就应用而生了。

#### 它的主要能力如下：

- 在 store 中保存所有的状态，并记录在 state 中；
- 通过 dispatch 方法来触发 action
- reducer 拿到 state 和 action 后，最终生成新的 state

#### 使用：

- 首先通过 reducer 新建一个 store，随时通过 store.getState 获取状态
- 需要状态变更的时候，通过  store.dispatch(action) 来修改状态
- reducer 函数接受 state 和 action，返回新的 state，可以用 store.subscribe 监听每次修改

#### 如何创建：

1. 先引入 redux 中的 createStore 方法；
2. 创建一个 reducer 函数；
3. 调用 createStore 函数，并传入 reducer；

```javascript
import { createStore } from 'redux';

// create reducer function
function counter(state = 0, action) {
    switch(action.type) {
        case 'add':
            return state + 1;
        case 'jian':
            return state - 1;
        default:
            return 10;
    }
}

// create a store
const store = createStore(counter);
console.log(init);  // 10
```

那 redux 和 react 如何一起使用呢？

- 把 store.dispatch 方法传递给组件，内部可以调用修改状态
- subscribe 订阅 render 函数，每次修改都重新渲染
- redux 相关内容，移到单独的文件 `store/index.js` 单独管理；

#### 更进一步

**处理异步、调试工具、更优雅的和 react 结合**

- Redux 处理异步，需要 redux-thunk 插件
- `npm install redux-devtools-extension` 并且开启
- 使用 react-redux 优雅的链接 react 和 redux

##### 处理异步

我们要知道 redux 默认只处理同步，异步任务需要 react-thunk 中间件。

- 所以首先我们要安装 redux-thunk 的插件；

- 然后使用 applyMiddleware 开启 thunk 中间件；
- action 可以返回函数，使用 dispatch 提交 action；

那么具体怎么使用呢？

1. 在入口文件 index.js 中引入 redux 中专门用来管理中间件的插件 appliMiddleware。
2. 在调用 createStore 的时候，将其作为第二个参数传递；
3. 在作为参数传入时，也不单单只是传入方法，而是传入调用后的值；

```javascript
const store = createStore(counter, applyMiddleware(thunk))
```

4. 之后就可以在 redux 文件中导出一个异步的 action 出去，之前都是 return 一个对象，现在可以返回一个函数；
5. 这个函数里就可以包含有异步操作，而这个异步操作的结果最终会被 dispatch 掉；

##### 调试工具

我们可以在浏览器扩展上安装相应的 redux 调试工具插件，并在安装之后：

- 新建 store 的时候先判断是否有 window.devToolsExtension，如果没有就默认给一个空函数
- 使用 redux 里用来组合函数的方法 compose 结合 thunk 和 window.devToolsExtension
- 调试窗的 redux 选项卡，实时看到 state

```javascript
const reduxDevTools = window.devToolsExtension ? window.devToolsExtension() : () => {}
const store = createStore(reducer, compose(
  applyMiddleware(thunk),
  reduxDevTools
))
```

那以上我们手动去链接 redux 和 react，步骤还是挺繁琐的，有没有简单一点的呢？接下来我们学习一下 react-redux。

- `npm install react-redux --save` 
- 忘记 subscribe，记住 reducer，action 和 dispatch 即可；
- react-redux 提供 Provider 和 connect 两个接口来链接；

##### 使用 redux-redux

- Provider 组件在应用最外层，传入 store 即可，只用一次；

```javascript
// 之前的写法
import { counter, add, remove, addAsync } from './index.reducer';

function render() {
  ReactDom.render(<App store={store} add={add} remove={remove} addAsync={addAsync} />, document.getElementById('root'))
}
render()

store.subscribe(render)


// 现在的写法
import { Provider } from 'react-redux'
import { counter } from './index.reducer';

ReactDom.render(
  (
    <Provider store={store}>
      <App />
    </Provider>
  ), 
  document.getElementById('root')
)
```

- connect 负责从外部获取组件需要的参数

```javascript
// 先引入 connect 来链接 store
import { connect } from 'react-redux';
import { add, addAsync, remove } from './index.reducer';

// 需要给 connect 这个方法传递两个参数
const mapStatetoProps = (state) => {
    // 对应会把状态放到属性 props 里面去
    return { num: state }
}

const  actionCreators = { add, remove, addAsync };

// 这里其实已经生成一个新的 App
App = connect(mapStatetoProps, actionCreators)(App);

// 类组件内部也需要修改一下写法了，onClick 里直接传方法进去即可
render() {
    const { num, add, remove, addAsync } = this.props;
    return (
      <>
        <h1>突突突{num}下</h1>
        <button onClick={add}>多突突一下</button>
        <button onClick={remove}>算了，少突突一下</button>
        <button onClick={addAsync}>过两天突突</button>
      </>
    )
  }
```

- connect 可以用装饰器的方式来写
  - `npm run eject` 弹出个性化配置，然后在 package.json 中去配置 babel 相关的东西；
  - `npm install -D @babel/plugin-proposal-decorators` 插件
  - package.json 中的 babel 加上 plugins 的配置

```json
"babel": {
    "presets": [
      "react-app"
    ],
    "plugins": [
      [
        "@babel/plugin-proposal-decorators",
        {
          "legacy": true
        }
      ]
    ]
  },
```

> 复杂 redux 应用，多个 reducer，需要使用 combineReducers 合并

我们需要知道的是，使用装饰器时，后面需要紧跟 class 类，否则会报错。

### 在 reducer 中使用 axios 

```javascript
import axios from 'axios'

const initState = {
  isAuth: false,
  user: 'cecil',
  age: 20
}

export function auth(
  state = initState,
  action
) {
  switch (action.type) {
    case LOGIN:
      return { ...state, isAuth: true }
    case LOGOUT:
      return { ...state, isAuth: false }
    case USER_DATA:
      return { ...state, ...action.data }
    default:
      return state;
  }
}

// action creater
export function getUserData() {
  return dispatch => {
    axios.get('/data')
      .then(res => {
        dispatch(userDate(res.data))
      })
  }
}
export function userDate(data) {
  return { type: USER_DATA, data }
}
```

然后就可以在组件中直接去使用：

```javascript
import { login, getUserData } from './Auth.redux'

@connect(
  state => state.auth,
  { login, getUserData }
)

class Auth extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.getUserData()
  }
}
```

还有一个补充点：

> 可以在 package.json 中写代理 proxy 设置：
>
> `"proxy": "http://localhost:9333"`

