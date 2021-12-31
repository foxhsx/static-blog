/*
 * @Author: your name
 * @Date: 2020-12-29 11:19:23
 * @LastEditTime: 2021-07-11 12:10:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \docs\frontend\Engineering\sidebar.js
 */
module.exports = [
  {
    text: '前端工程化',
    collapsable: true,
    path: '/docs/frontend/Engineering/',
    children: [
      { text: '项目基石——前端脚手架工具', link: '/docs/frontend/Engineering/notes/base'},
      { text: '接口调试——Mock 工具如何快速进行接口调试', link: '/docs/frontend/Engineering/notes/mock'},
      { text: '编码效率', link: '/docs/frontend/Engineering/notes/efficiency'},
      { text: '低代码工具-更少的代码更灵活的需求', link: '/docs/frontend/Engineering/notes/LowCodeDev'},
      { text: '如何为 Webpack 编译阶段提速？', link: '/docs/frontend/Engineering/notes/compileSpeedUp'},
      { text: '如何为 Webpack 打包阶段提速？', link: '/docs/frontend/Engineering/notes/buildSpeedUp'},
      { text: '构建过程中的缓存优化方案', link: '/docs/frontend/Engineering/notes/Cache'},
      { text: 'webpack中的增量构建', link: '/docs/frontend/Engineering/notes/IncrementalBuild'},
      { text: '无包构建', link: '/docs/frontend/Engineering/notes/noBundle'},
      { text: '性能优化介绍', link: '/docs/frontend/Engineering/notes/performanceOptimization'},
      { text: '懒加载与预加载', link: '/docs/frontend/Engineering/notes/lazyLoading'},
      { text: 'PWA', link: '/docs/frontend/Engineering/notes/PWA'},
      { text: '自制vue-cli工具', link: '/docs/frontend/Engineering/notes/selfcli'},
    ]
  }
]