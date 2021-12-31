/*
 * @Author: your name
 * @Date: 2021-01-05 09:38:13
 * @LastEditTime: 2021-07-12 23:43:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \note\docs\frontend\webpack\sidebar.js
 */
module.exports = [
  {
    text: 'Webpack',
    collapsable: true,
    path: '/docs/frontend/webpack/',
    children: [
      { text: '前端模块化发展史', link: '/docs/frontend/webpack/notes/modularization_history'},
      { text: 'Webpack安装', link: '/docs/frontend/webpack/notes/Install'},
      { text: 'webpack配置之entry', link: '/docs/frontend/webpack/notes/webpack_entry'},
      { text: 'webpack配置之output', link: '/docs/frontend/webpack/notes/webpack_output'},
      { text: 'webpack配置之module', link: '/docs/frontend/webpack/notes/webpack_module'},
      { text: 'webpack配置之resolve', link: '/docs/frontend/webpack/notes/webpack_resolve'},
      { text: 'webpack配置之optimization', link: '/docs/frontend/webpack/notes/webpack_optimization'},
      { text: 'webpack打包样式资源', link: '/docs/frontend/webpack/notes/webpack_css'},
      { text: 'webpack之提取css', link: '/docs/frontend/webpack/notes/webpack_extract_css'},
      { text: 'webpack之css兼容处理', link: '/docs/frontend/webpack/notes/webpack_css_compatible'},
      { text: 'webpack之css压缩', link: '/docs/frontend/webpack/notes/webpack_css_compress'},
      { text: 'webpack打包html资源', link: '/docs/frontend/webpack/notes/webpack_html'},
      { text: 'webpack打包图片资源', link: '/docs/frontend/webpack/notes/webpack_img'},
      { text: 'webpack打包其他资源', link: '/docs/frontend/webpack/notes/webpack_other'},
      { text: 'webpack之JS语法检查eslint', link: '/docs/frontend/webpack/notes/webpack_eslint'},
      { text: 'webpack之JS兼容性处理', link: '/docs/frontend/webpack/notes/webpack_js_compatible'},
      { text: 'webpack之压缩html和js', link: '/docs/frontend/webpack/notes/webpack_compress_htmljs'},
      { text: 'webpack-dev-server版本兼容', link: '/docs/frontend/webpack/notes/webpack_dev'},
      { text: 'webapck之浏览器热更新', link: '/docs/frontend/webpack/notes/hot_update'},
      { text: 'webpack之sourceMap', link: '/docs/frontend/webpack/notes/webpack_sourceMap'},
      { text: 'webpack之loader', link: '/docs/frontend/webpack/notes/webpack_loader'},
      { text: 'webpack之插件', link: '/docs/frontend/webpack/notes/webpack_plugin'},
      { text: 'webpack之TreeShaking和SideEffects', link: '/docs/frontend/webpack/notes/treeShakingAndSideEffects'},
      { text: 'webpack构建结果优化Code Splitting', link: '/docs/frontend/webpack/notes/webpack_CodeSplitting'},
      { text: 'webpack之多进程打包', link: '/docs/frontend/webpack/notes/webpack_thread'},
      { text: 'webpack之externals', link: '/docs/frontend/webpack/notes/webpack_externals'},
      { text: 'webpack之dll', link: '/docs/frontend/webpack/notes/webpack_dll'},
      { text: 'webpack不同环境配置', link: '/docs/frontend/webpack/notes/webpack_env_config'},
      { text: 'webpack构建流程', link: '/docs/frontend/webpack/notes/webpack_structure'},
      { text: 'webpack构建产物分析报告', link: '/docs/frontend/webpack/notes/webpack_analyzer'},
      { text: 'webpack打包结果运行原理', link: '/docs/frontend/webpack/notes/webpack_build_principle'},
      { text: 'Webpack5中的优化细节', link: '/docs/frontend/webpack/notes/webpack_better'},
      { text: 'webpack配置总结', link: '/docs/frontend/webpack/notes/webpack_base_config'},
    ]
  }
]