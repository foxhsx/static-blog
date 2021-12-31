const jsSideBar = require('./js.sidebar');
const vueSideBar = require('./vue.sidebar');
const webpackSideBar = require('./webpack.sidebar');
const cssSideBar = require('./css.sidebar');
const httpSideBar = require('./http.sidebar');

module.exports = [
  ...jsSideBar,
  ...cssSideBar,
  ...vueSideBar,
  ...webpackSideBar,
  ...httpSideBar,
]