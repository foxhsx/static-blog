const jsSideBar = require("./js.sidebar");
const webpackSideBar = require("./webpack.sidebar");

module.exports = [...jsSideBar, ...webpackSideBar];
