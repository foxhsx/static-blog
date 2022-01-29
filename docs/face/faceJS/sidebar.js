const jsBase = require("./base/sidebar");
const jsHigh = require("./high/sidebar");
module.exports = [
  {
    text: "JS 篇",
    collapsable: true,
    path: "/docs/face/faceJS/",
    children: [
      {
        text: "基础部分",
        children: jsBase,
      },
      {
        text: "进阶部分",
        children: jsHigh,
      },
    ],
  },
];
