/*
 * @Author: your name
 * @Date: 2021-07-07 22:49:12
 * @LastEditTime: 2021-07-13 01:01:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vitepress-blog\.vitepress\config.js
 */
const getPages = require("./utils/pages");

const argv = require("minimist")(process.argv.slice(2));
const build = argv._[0] || false;
const baseBuild = build ? "/" : "/";

async function getConfig() {
  let config = {
    title: "Coder小站",
    description: "不积跬步无以至千里",
    head: [
      [
        "meta",
        {
          name: "viewport",
          content:
            "width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no",
        },
      ],
      ["meta", { name: "keywords", content: "Coder杂谈" }],
      ["link", { rel: "icon", href: baseBuild + "favicon.png" }],
      // 引入 Gitalk
      [
        "link",
        { rel: "stylesheet", href: "https://unpkg.com/gitalk/dist/gitalk.css" },
      ],
      ["script", { src: "https://unpkg.com/gitalk/dist/gitalk.min.js" }],
    ],
    themeConfig: {
      logo: baseBuild + "favicon.png",
      pages: await getPages(),
      author: "何三金",
      search: true,
      sidebar: require("./sidebar.js"),
      subSidebar: "auto",
      introduce: "一个想再进一步的野生程序员。",
      nav: require("./nav"),
      authorAvatar: baseBuild + "img/shehui.jpg",
    },
    dest: "public",
    base: baseBuild,
  };
  return config;
}
module.exports = getConfig();
