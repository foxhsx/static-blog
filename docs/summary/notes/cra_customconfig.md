---
title: CRA 自定义配置
date: 2021-12-31
tags:
  - JavaScript
  - 日常问题
describe: CRA 脚手架生成的项目，如何实现自定义配置
categories:
  - front
---

今天在给新的 React 构建的博客项目使用了 `jsx` 文件后，在打包的时候报错，最后发现是项目没有识别到 `.jsx` 文件的原因，所以想着在 `webpack` 里增加 `resolve` 配置来识别 `jsx` 文件，但是想起来 CRA 创建的 React 项目是无法自定义配置的，不过幸亏社区里有大佬搞了 `customize-cra` 和 `react-app-rewired` 两个插件来辅助我们实现在项目中自定义配置的愿望。它们的使用也是及其的方便。我们一起来学习一下。
首先来说说这俩的关系，它们之间其实时一个依赖关系，`customize-cra` 是依赖 `react-app-rewired` 的，所以我们需要同时安装两个插件才可以。

```shell
yarn add customize-cra react-app-rewired --dev
```

因为我们只修改一下开发环境的一些配置，所以这里是 `--dev`，如果是需要在生产环境上使用，那么可以直接 `--dev-save` 或者简写 `-S`。

完成上述操作之后，我们可以到 `customize-cra` 的 github 上去看下相关的 API，将官网中的例子 copy 一份下来，到项目中，此时我们需要在根目录下新建一个配置文件 `config-overides.js`，把刚刚 cp 的内容粘贴到里面去，修改添加我们需要配置的代码，重启项目即可：

```js
// config-overides.js
const {
  override,
  addDecoratorsLegacy,
  addBundleVisualizer,
  addWebpackAlias,
  addWebpackResolve,
} = require("customize-cra");
const path = require("path");

module.exports = override(
  // enable legacy decorators babel plugin
  addDecoratorsLegacy(),

  // add webpack bundle visualizer if BUNDLE_VISUALIZE flag is enabled
  process.env.BUNDLE_VISUALIZE == 1 && addBundleVisualizer(),

  // add an alias for "ag-grid-react" imports
  addWebpackAlias({
    Component: path.resolve(__dirname, "src/components/"),
  }),

  addWebpackResolve({
    extensions: [".jsx", ".js"],
  })
);
```

这样就大功告成了。

### 配置 SASS

项目中还有使用到 SCSS 这种 CSS 预编译器，配置方法令人意想不到的简单，直接安装 `node-sass` 即可，这里安装完之后，还遇到一个安装问题：

```shell
Node Sass version 7.0.1 is incompatible with ^4.0.0 || ^5.0.0.
```

意思是我安装的 `node-sass` 版本过高了，需要 4.x 版本或者 5.x 版本的，所以又带了版本号重新安装了一遍，以防有缓存，我们最好是先将之前的 `node-sass` 卸载掉再重新安装。
