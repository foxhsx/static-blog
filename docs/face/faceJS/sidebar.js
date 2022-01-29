const jsBase = require("./base/sidebar");
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
    ],
  },
];
