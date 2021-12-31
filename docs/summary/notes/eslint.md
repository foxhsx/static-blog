---
title: ESlint 的一些使用经验
date: 2021-04-20
tags:
 - JavaScript
 - 日常问题
categories:
 - front
---

我们在写项目时要注意书写规范等问题，这个时候会常常使用到 ESlint 来做代码规范校验，从而也出现了大批爆红（就很戳气--此处自行脑补表情包）。

下面是笔者在项目中遇到的一些问题，大家自行匹配，一起避坑。

## import/no-extraneous-dependencies

```md
'chalk' should be listed in the project's dependencies. Run 'npm i -S chalk' to add it (import/no-extraneous-dependencies)
```

一般这个错误是在于我们开启 ESlint 之后，从 `package.json` 中的 `devDependencies` 开发依赖中去引入依赖，而导致的错误。

解决的方法也很简单，在项目根目录下找到 ESlint 的配置文件 `.eslintrc.js` ，然后在 rules 里配置一条相关规则即可：

```js
module.exports = {
  rules: {
    "import/no-extraneous-dependencies": ["error", {"devDependencies": true}]
  }
}
```

那么为什么会有这么一条规则呢？

在[文档里是这么描述的](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-extraneous-dependencies.md)：

```md
Forbid the import of external modules that are not declared in the package.json's dependencies, devDependencies, optionalDependencies, peerDependencies, or bundledDependencies. The closest parent package.json will be used. If no package.json is found, the rule will not lint anything. This behaviour can be changed with the rule option packageDir.
```

也就是禁止导入未在 `package.json` 的 `dependencies, devDependencies, optionalDependencies, peerDependencies, or bundledDependencies` 中声明的外部模块。

其实对于 `devDependencies` 来说，默认这块本来就是 `true`，只不过我们安装的某个插件里面被设置为了 `false` 或者其他配置项而导致的。比如 `eslint-config-airbnb-base` 里的 `imports.js` 中就有：

```js
'import/no-extraneous-dependencies': ['error', {
  devDependencies: [
    'test/**', // tape, common npm pattern
    'tests/**', // also common npm pattern
    'spec/**', // mocha, rspec-like pattern
    '**/__tests__/**', // jest pattern
    '**/__mocks__/**', // jest pattern
    'test.{js,jsx}', // repos with a single test file
    'test-*.{js,jsx}', // repos with multiple top-level test files
    '**/*{.,_}{test,spec}.{js,jsx}', // tests where the extension or filename suffix denotes that it is a test
    '**/jest.config.js', // jest config
    '**/jest.setup.js', // jest setup
    '**/vue.config.js', // vue-cli config
    '**/webpack.config.js', // webpack config
    '**/webpack.config.*.js', // webpack config
    '**/rollup.config.js', // rollup config
    '**/rollup.config.*.js', // rollup config
    '**/gulpfile.js', // gulp config
    '**/gulpfile.*.js', // gulp config
    '**/Gruntfile{,.js}', // grunt config
    '**/protractor.conf.js', // protractor config
    '**/protractor.conf.*.js', // protractor config
    '**/karma.conf.js' // karma config
  ],
  optionalDependencies: false,
}],
```

## @vue/cli-plugin-eslint

这个插件是用于 `vue-cli` 的 `eslint` 插件。

我们在 `vue.config.js` 中有一个 `lintOnSave` 配置项，干嘛用的呢？它表示是否在开发环境下通过 `eslint-loader` 来在每次保存代码时 `lint` 代码，而我们要使用这个功能，就要安装这个插件。

设置为 `true` 或 `'warning'` 时，`eslint-loader` 会将 lint 错误输出为编译警告。默认情况下，警告仅仅会被输出到命令行，且不会使得编译失败。

如果你希望让 lint 错误在开发时直接显示在浏览器中，你可以使用 `lintOnSave: 'default'`。这会强制 `eslint-loader` 将 lint 错误输出为编译错误，同时也意味着 lint 错误将会导致编译失败。

设置为 `error` 将会使得 `eslint-loader` 把 lint 警告也输出为编译错误，这意味着 lint 警告将会导致编译失败。

或者，你也可以通过设置让浏览器 overlay 同时显示警告和错误：

```js
// vue.config.js
module.exports = {
  devServer: {
    overlay: {
      warnings: true,
      errors: true
    }
  }
}
```

当 `lintOnSave` 是一个 truthy 的值时，`eslint-loader` 在开发和生产构建下都会被启用。如果你想要在生产构建时禁用 `eslint-loader`，你可以用如下配置：

```js
// vue.config.js
module.exports = {
  lintOnSave: process.env.NODE_ENV !== 'production'
}
```

## ESLint

在安装了上面的插件后，还必须安装 ESlint，不然在编译的时候，会出错，这是因为上面的插件需要使用 `eslint` 的 `package.json`。

```js
// node_modules/@vue/cli-plugin/eslint/index.js

const path = require('path')

module.exports = (api, options) => {
  if (options.lintOnSave) {
    const cwd = api.getCwd()
    const eslintPkg =
      loadModule('eslint/package.json', cwd, true) ||
      loadModule('eslint/package.json', __dirname, true)

    // eslint-loader doesn't bust cache when eslint config changes
    // so we have to manually generate a cache identifier that takes the config
    // into account.
    const { cacheIdentifier } = api.genCacheConfig(
      'eslint-loader',
      {
        'eslint-loader': require('eslint-loader/package.json').version,
          
        // 就是这句会导致错误
        eslint: eslintPkg.version
      },
      [
        '.eslintrc.js',
        '.eslintrc.yaml',
        '.eslintrc.yml',
        '.eslintrc.json',
        '.eslintrc',
        '.eslintignore',
        'package.json'
      ]
    )

    api.chainWebpack(webpackConfig => {
      const { lintOnSave } = options
      const allWarnings = lintOnSave === true || lintOnSave === 'warning'
      const allErrors = lintOnSave === 'error'
  }
}

```

## [eslint-plugin-vue](https://eslint.vuejs.org/)

Vue.js的官方ESLint插件。

该插件使我们可以使用ESLint检查`<template>`和`<script>`的`.vue`文件以及`.js`文件中的Vue代码。

- 查找语法错误。
- 发现[Vue.js指令](https://v3.vuejs.org/api/directives.html)的错误使用[ （在新窗口中打开）](https://v3.vuejs.org/api/directives.html)。
- 查找违反[Vue.js样式指南](https://v3.vuejs.org/style-guide/)的行为[ （在新窗口中打开）](https://v3.vuejs.org/style-guide/)。

