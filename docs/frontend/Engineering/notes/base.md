---
title: 项目基石——前端脚手架工具
date: 2020-12-29
tags:
 - JavaScript
 - 前端工程化
categories:
 - front
---

[[toc]]

## 脚手架工具的作用

脚手架，原是建筑工程术语，指为了保证施工过程顺利而搭建的平台，为各层施工提供基础的功能保障。而在软件开发领域，脚手架是指通过各种工具来生成项目基础代码的技术。通过脚手架工具生成后的代码，通常已包含了**项目开发流程中所需的工作目录内的通用基础设施**。主要作用有以下三点：

- 利用脚手架工具，我们可以经过几个简单的选项快速生成项目的基础代码。
- 使用脚手架工具生成的项目模板通常是经验丰富的开发者提炼和检验的，很大程度上代表某一类项目开发的最佳实践，相较于让开发者自行配置提供了更优选择。
- 同时，脚手架工具也支持使用自定义模板，我们也可以根据项目中的实际经验总结、定制一个脚手架模板。

对于一个熟练的前端工程师来说，要掌握的基本能力之一就是通过技术选型来确定所需要使用的技术栈，然后根据技术栈选择合适的脚手架工具，来做项目代码的初始化。

那么对于日常的前端开发流程来说，项目内究竟有哪些部分属于基础设施呢？让我们从项目创建的流程说起。对于一个前端项目来说，一般在进入开发之前我们需要做的准备有：

1. 要有 **package.json**，它是 npm 依赖管理体系下的基础配置文件。
2. 然后**选择使用 npm 或 Yarn 作为包管理器**，这会在项目里添加上对应的**lock文件**，来确保在不同环境下部署项目时的依赖稳定性。
3. **确定项目技术栈**，在明确选择后安装相关依赖包并在**src**目录中建立入口源码文件。
4. **选择构建工具**。目前来说，构建工具的主流选择还是 webpack，对应项目里就需要增加相关的 webpack 配置文件，可以考虑针对开发/生产环境使用不同配置文件。
5. **打通构建流程**，通过安装与配置各种 **loader、插件和其他配置项**，来确保开发和生产环境能正常构建代码与预览效果。
6. **优化构建流程**，针对开发/生产环境的不同特点进行各自优化。那开发环境更关注构建效率和调试体验，而生产环境更关注访问性能等。
7. **选择和调试辅助工具**，比如代码检查工具和单元测试工具，安装响应依赖并调试配置文件。
8. **收尾工作**，检查各主要环节的脚本是否工作正常，编写说明文档 README.md，将不需要纳入版本管理的文件目录记入 .gitignore 等。

下面是一个简单的示例项目模板：

```md
package.json         1) npm 项目文件
package-lock.json    2) npm 依赖 lock 文件
public/              3) 预设的静态目录
src/                 3) 源代码目录
  main.js            3) 源代码中的初始入口文件
  router.js          3) 源代码中的路由文件
  store/             3) 源代码中的数据流模块目录
webapck/             4) webpack 配置目录
  common.config.js   4) webpack 通用配置文件
  dev.config.js      4) webpack 开发环境配置文件
  prod.config.js     4) webpack 生产环境配置文件
.browserlistrc       5) 浏览器兼容描述 browserlist 配置文件
babel.config.js      5) ES 转换工具 babel 配置文件
tsconfig.json        5) typescript 配置文件
postcss.config.js    5) css 后处理工具 postcss 配置文件
.eslintrc            7) 代码检查工具 eslint 配置文件
jest.config.js       7) 单元测试工具 jest 配置文件
.gitignore           8) Git 忽略配置文件
README.md            8) 默认文档文件
```

通过脚手架工具，我们就能免去人工处理的欢姐，大大节省了开发时间，轻松搭建起项目的初始环境。

## 三种代表性的前端脚手架工具

|       名称       | 模板框架 | 多选项生成 | 支持自定义模板 |       特点       |
| :--------------: | :------: | :--------: | :------------: | :--------------: |
|      Yeoman      |    -     |     是     |       是       | 庞大的生成器仓库 |
| Create-React-App |  React   |     否     |       是       |  React 官方维护  |
|     Vue Cli      |   Vue    |     是     |       是       |   Vue 官方维护   |

### Yeoman

![](https://yeoman.io/static/yeoman-02.83c46c7213.png)

[Yeoman](https://yeoman.io/) 是前端领域内较早出现的脚手架工具，它由 Google I/O 在 2012 年首次发布。Yeoman 提供了基于特定生成器（Generator）来创建项目基础代码的功能。时至今日，在它的网站中能找到超过 5600 个不同技术栈的代码生成器。

作为早期出现在前端领域的脚手架工具，它没有限定具体的开发技术栈，提供了足够的开放性和自由度，但也因此缺乏某一技术栈的深度集成和技术生态。随着前端技术栈的日趋复杂化，人们更倾向于选择那些以具体技术栈为根本的脚手架工具，而 Yeoman 则更多用于一些开发流程里特定片段代码的生成。

### Create-React-App

![](https://create-react-app.bootcss.com/img/logo.svg)

[Create React App](https://create-react-app.dev/)（后简称 CRA ）是 Facebook 官方提供的 React 开发工具集。它包含了 create-react-app 和 react-scripts 两个基础包。其中 create-react-app 用于选择脚手架创建项目，而 react-scripts 则作为所创建项目中的运行时依赖包，提供了封装后的项目启动、编译、测试等基础工具。

正如官方网站中所说的，CRA 带来的最大的改变，是将一个项目开发运行时的各种配置细节完全封装在了一个 react-scripts 依赖包中，这大大降低了开发者，尤其是对 webpack 等构建工具不太熟悉的开发者上手开发项目的学习成本，也降低了开发者自行管理各配置依赖包的版本所需的额外测试成本。

但事情总有两面性，这种近乎黑盒的封装在初期带来便利的同时，也为后期的用户自定义优化带来了困难。虽然官方也提供了 eject 选项来将全部配置注入回项目，但大部分情况下，为了少量优化需求而放弃官方提供的各依赖包稳定升级的便利性，也仍不是一个好的选择。在这种矛盾之下，在保持原有特性的情况下提供自定义配置能力的工具 [react-rewired](https://github.com/timarney/react-app-rewired/) 和 [customize-cra](https://github.com/arackaf/customize-cra) 应运而生。

### Vue CLI

![](https://cli.vuejs.org/favicon.png)

正如 Create-React-App 在 React 项目开发中的地位， Vue 项目的开发者也有着自己的基础开发工具。Vue CLI 由 Vue.js 官方维护，其定位是 Vue.js 快速开发的完整系统。完整的 Vue CLI 由三部分组成：作为全局命令的 @vue/cli、作为项目内集成工具的 @vue/cli-service、作为功能插件系统的 @vue/cli-plugin-。

Vue CLI 工具在设计上吸取了 CRA 工具的教训，在保留了创建项目开箱即用的优点的同时，提供了用于覆盖修改原有配置的自定义构建配置文件和其他工具配置文件。

同时，在创建项目的流程中，Vue CLI 也提供了通过用户交互自行选择的一些定制化选项，例如是否集成路由、TypeScript 等，使开发者更有可能依据这些选项来生成更适合自己的初始化项目，降低了开发者寻找模板或单独配置的成本。

除了技术栈本身的区别之外，以上三种脚手架工具，实际上代表了三种不同的工具设计理念：

- Yeoman 代表的是一般开源工具的理念。它不提供某一技术栈的最佳实践方案，而专注于实现脚手架生成器的逻辑和提供展示第三方生成器。作为基础工具，它的主要目标群体是生成器的开发者，而非那些需要使用生成器来开发项目的人员，尽管后者也能通过前者的实践而受益。
- CRA 代表的是面向某一技术栈降低开发复杂度的理念。它通过提供一个包含各开发工具的集成工具集和标准化的开发-构建-测试三步流程脚本，使得开发者能无障碍地按照既定流程进行 React 项目的开发和部署。
- Vue CLI 代表的是更灵活折中的理念。它一方面继承了 CRA 降低配置复杂度的优点，另一方面在创建项目的过程中提供了更多交互式选项来配置技术栈的细节，同时允许在项目中使用自定义配置。这样的设计在一定程度上增加了模板维护的复杂度，但是从最终效果来看，能够较大程度满足各类开发者的不同需求。

## 如何定制一个脚手架模板

虽然官方提供的默认脚手架模板已经代表了对应技术栈的通用最佳实践，但是在实际开发中，我们还是时常需要对通过这些脚手架创建的模板项目进行定制化，例如：

1. 为项目引入新的通用特性。
2. 针对构建环节的 webpack 配置优化，来提升开发环境的效率和生产环境的性能等。
3. 定制符合团队内部规范的代码检测规则配置。
4. 定制单元测试等辅助工具模块的配置项。
5. 定制符合团队内部规范的目录结构与通用业务模块。

通过将这些实际项目开发中所需要做的定制化修改输出为标准的脚手架模板，我们就能在团队内部孵化出更符合团队开发规范的开发流程。一方面最大程度减少大家在开发中处理重复事务的时间，另一方面也能减少因为开发风格不一导致的团队内项目维护成本的增加。

### 使用 Yeoman 创建生成器

脚手架模板在 Yeoman 中对应的是生成器（Generator）。一个基本的复制已有项目模板的生成器包含了：

1. 生成器描述文件 **package.json**，其中限定了 name、file、keywords 等对应字段的规范赋值。
2. 作为主体的 **generators/app** 目录，包含生成器的核心文件。该目录是执行 yo 命令时的默认查找目录，Yeoman 支持多目录的方式集成多个子生成器。
3. **app/index.js** 是生成器的核心控制模块，其内容是导出一个继承自 yeoman-generator 的类，并由后者提供运行时上下文、用户交互、生成器组合等功能。
4. **app/templates/** 目录是我们需要复制到新项目中的脚手架模板目录。

基本目录结构如下：

```md
generator-[name]/ 
  package.json 
  generators/ 
      templates/... 
      index.js
```

其中 app/index.js 的核心逻辑如下：

```javascript
var Generator = require('yeoman-generator') 
module.exports = class extends Generator { 
  writing() { 
    this.fs.copyTpl( 
      this.templatePath('.'),
      this.destinationPath('.')) 
  } 
  install() { 
    this.npmInstall() 
  } 
}
```

writing 和 install 是 Yeoman 运行时上下文的两个阶段。在例子中，当我们执行下面的创建目录命令时，依次将生成器中模板目录内的所有文件复制到创建目录下，然后执行安装依赖。

在完成生成器的基本功能后，我们就可以通过在生成器目录里 npm link，将对应生成器包挂载到全局依赖下，然后进入待创建项目的目录中，执行 yo 创建命令即可。

### 为 create-react-app 创建自定义模板

为 create-react-app 准备的自定义模板在模式上较为简单。作为一个最简化的 CRA 模板，模板中包含如下必要文件：

- README.md：用于在 npm 仓库中显示的模板说明。
- package.json：用于描述模板本身的元信息（例如名称、运行脚本、依赖包名和版本等）。
- template.json：用于描述基于模板创建的项目中的 package.json 信息。
- tempalte 目录：用于复制到创建后的项目中，其中 gitignore 在复制后重命名为 .gitignore，public/index.html 和 src/index 为运行 react-scripts 的必要文件。

具体目录结构如下：

```md
cra-template-[template-name]/ 
  README.md (for npm) 
  template.json 
  package.json 
  template/ 
    README.md (for projects created from this template) 
    gitignore 
    public/ 
      index.html 
    src/ 
      index.js (or index.tsx)
```

在使用时，同样还需要将模板通过 npm link 命令映射到全局依赖中，或发布到 npm 仓库中，然后执行创建项目的命令。

```shell
npx create-react-app [app-name] --template [template-name]
```

### 为 Vue Cli 创建自定义模板

相比CRA模板而言，Vue 的模板中变化最大的当属增加了 meta.js/json 文件，用于描述创建过程中的用户交互信息以及用户选项对于模板文件的过滤等。

```md
[template-name]/
  README.md(for npm)
  meta.js or meta.json
  template/
```

此外，Vue 中的 template 目录中包含了复制到项目中的所有文件，并且在相关文件中还增加了 handlebars 条件判断的部分，根据 meta.js 中指定用户交互结果选项来讲模板中带条件的文件转换为最终生成到项目中的产物。如下代码：

```md
template/package.json
...
"dependencies": {
	"vue": "^2.5.2"{{#router}},
	"vue-router": "^3.0.1"{{/router}}
},
...
meta.js
...
prompts: {
	...
	router: {
		when: 'isNotTest',
		type: 'confirm',
		message: 'Install vue-router?',
	}
	...
}
```

使用自定义模板创建项目的命令为：

```shell
npm install -g @vue/cli-init
vue init [template-name] [app-name]
```

这样就完成了脚手架的定制工作。有了定制化后的脚手架，我们就可以在之后的创建项目时直接进入到业务逻辑的开发中，而不必重复地对官方提供的标准化模板进行二次优化。