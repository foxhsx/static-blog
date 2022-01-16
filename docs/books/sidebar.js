const webpack_in_action = require("./webpack_in_action/sidebar");
const kubernetes = require("./kubernetes/sidebar");
module.exports = [
  ...webpack_in_action,
  ...kubernetes,
  { text: "《我是猫》", link: "/docs/books/cat/iamcat" },
];
