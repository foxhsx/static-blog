/*
 * @Author: your name
 * @Date: 2021-03-09 22:46:19
 * @LastEditTime: 2021-07-14 23:49:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \note\docs\frontend\react\sidebar.js
 */
module.exports = [
  {
    text: 'React',
    collapsable: true,
    path: '/docs/frontend/react/',
    children: [
      {
        text: 'React 入门',
        children: [
          {
            text: 'React 开发环境介绍',
            link: '/docs/frontend/react/notes/base/what_is_react',
          },
        ],
      },
      {
        text: 'Hooks',
        children: [
          {
            text: 'useState 的使用',
            link: '/docs/frontend/react/notes/hook_useState',
          },
        ],
      },
      {
        text: 'Redux 入门',
        collapsable: false,
        children: [
          {
            text: 'Redux 介绍',
            link: '/docs/frontend/react/notes/base/what_is_redux',
          },
        ],
      },
      {
        text: 'React Router 入门',
        children: [
          {
            text: 'React Router 介绍',
            link: '/docs/frontend/react/notes/base/what_is_router',
          },
          {
            text: '前端路由介绍',
            link: '/docs/frontend/react/notes/front_router',
          },
          {
            text: '原生js实现前端路由',
            link: '/docs/frontend/react/notes/js_router',
          },
          {
            text: 'react-router简介及环境配置',
            link: '/docs/frontend/react/notes/router_env',
          },
          {
            text: 'Route 渲染内容的三种方式',
            link: '/docs/frontend/react/notes/router_method',
          },
          {
            text: 'React-动态路由与嵌套路由',
            link: '/docs/frontend/react/notes/dynamic_routing',
          },
          {
            text: '手写 BrowserRouter、Route 和 Link',
            link: '/docs/frontend/react/notes/handle_browser_router',
          },
        ],
      },
      {
        text: '深入理解 React',
        children: [
          {
            text: 'React 是什么？',
            link: '/docs/frontend/react/notes/what_is_react',
          },
          {
            text: '为什么 React 要用 JSX ?',
            link: '/docs/frontend/react/notes/why_jsx',
          },
          {
            text: 'React 生命周期中的坑',
            link: '/docs/frontend/react/notes/react_life',
          },
          {
            text: '类组件与函数组件有什么区别？',
            link: '/docs/frontend/react/notes/classVSfunction',
          },
          {
            text: '如何设计 React 组件？',
            link: '/docs/frontend/react/notes/how_reactComponent',
          },
          {
            text: 'setState 是同步更新还是异步更新？',
            link: '/docs/frontend/react/notes/setState',
          },
          {
            text: 'React Hooks 是什么？',
            link: '/docs/frontend/react/notes/react_hooks',
          },
          {
            text: 'JSX 语法都能做些啥？',
            link: '/docs/frontend/react/notes/react_jsx_basics',
          },
          {
            text: 'React 中的数据绑定',
            link: '/docs/frontend/react/notes/bind_data',
          },
          {
            text: 'React 中绑定事件',
            link: '/docs/frontend/react/notes/react_event',
          },
          {
            text: 'React 中 state 到底怎么用?',
            link: '/docs/frontend/react/notes/react_state',
          },
          {
            text: 'React 中的双向数据绑定',
            link: '/docs/frontend/react/notes/react_data_bind',
          },
          {
            text: 'React 中父子组件数据传递',
            link: '/docs/frontend/react/notes/react_props',
          },
        ],
      },
    ],
  },
];
