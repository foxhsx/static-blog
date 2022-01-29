/*
 * @Author: your name
 * @Date: 2021-07-07 23:40:23
 * @LastEditTime: 2021-07-11 12:07:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vitepress-blog\.vitepress\sidebar.js
 */
module.exports = {
  // front
  "/html/": require("../docs/frontend/html/sidebar"),
  "/css/": require("../docs/frontend/css/sidebar"),
  "/javascript/": require("../docs/frontend/javascript/sidebar"),
  "/webpack/": require("../docs/frontend/webpack/sidebar"),
  "/Engineering/": require("../docs/frontend/Engineering/sidebar"),
  "/vue/": require("../docs/frontend/vue/sidebar"),
  "/react/": require("../docs/frontend/react/sidebar"),
  "/flutter/": require("../docs/frontend/flutter/sidebar"),
  "/summary/": require("../docs/summary/sidebar"),
  // 面试
  "/faceJS/": require("../docs/face/faceJS/sidebar.js"),
  "/faceCSS/": require("../docs/face/faceCSS/sidebar.js"),
  "/faceNetwork/": require("../docs/face/faceNetwork/sidebar.js"),
  "/faceVue/": require("../docs/face/faceVue/sidebar.js"),
  "/faceWebpack/": require("../docs/face/faceWebpack/sidebar.js"),
  // 拓展学习
  "/cloud/": require("../docs/cloud/sidebar"),
  "/notes/": require("../docs/study/notes/sidebar"),
  "/blog/": require("../docs/study/blog/sidebar"),
  // 其他：生活、读书、分享
  "/other/": require("../docs/other/sidebar"),
  "/books/": require("../docs/books/sidebar"),
  "/shared/": require("../docs/shared/sidebar"),
};
