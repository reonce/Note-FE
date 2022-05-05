# webpack从0搭建react项目

本教程不会涉及到任何的实现原理，只是 **webpack 的使用**和**第三方库的使用**

# 准备

后续补齐相关学习资料

学习之前，你需要做一些知识的了解：

- node 入门（path模块，命令行）
- 前端模块化入门
- webpack 入门
- babel 入门
- 正则入门



**请务必保证上述内容都至少了解的情况下，再开始学习本教程**

------

# 前言

一般情况下一个新项目来临时，都是通过内部脚手架直接创建项目，如下：

```bash
npx create-react-app project-name --scripts-version @newrank/react-scripts --template @newrank/mamba-pro
```

但开发时项目里面很多前端的部分都是知其然而不知其所以然，心中自然会有一些疑问：

- 不同浏览器的 js 语法兼容怎么处理的？
- 最终生成的 js 是怎么到 html 中的？
- 不同环境的 webpack 配置怎么实现的？
- ...

通过本教程你可以学会使用 webpack 怎么从零一步一步的搭建一个完整的 react 项目。

# 需求

最终都会通过webpack的打包输出成 html + css + js

搭建的react项目支持以下基础内容：

- ES新语法
- HTML
- React
- 本地开发（dev-server）
- 处理文件

- - CSS
  - 资源

- 区分开发/生产环境
- 修改本地开发域名/端口
- 配置环境变量的获取
- build 静态资源
- 第三方工具库

- - react-router
  - 状态管理
  - antd
  - 可视化工具库
  - 发请求

# 项目搭建

教程中所有图片中有 dist 文件夹就是 build文件夹，命名不同而已

## 新建项目

![img](https://cdn.nlark.com/yuque/0/2022/png/1032556/1646017817046-69bfb37e-d05d-4086-8c7a-ed09c8e10d28.png)

## 初始化项目

npm 是 JavaScript 世界的包管理工具，并且是 Nodejs 平台的默认包管理工具。通过 npm 可以安装、共享、分发代码，管理项目依赖关系。



包管理工具统一使用 yarn。（npm有点慢）

```bash
yarn init -y
```

## 使用webpack

webpack 版本：webpack5

安装 webpack

```bash
yarn add webpack webpack-cli -D
```

项目根目录添加 webpack 配置文件 webpack.config.js

```javascript
module.exports = {
};
```

## 配置mode和输入输出

根目录下新建文件夹 src，并添加 index.js 文件

![img](https://cdn.nlark.com/yuque/0/2022/png/1032556/1646030482380-1614a429-b95b-4db4-bb83-a0caef92a8f3.png)

```javascript
const fun = () => {
  const name = "aobam";
  console.log("he name is", name);
};
console.log(fun);
```

添加 webpack 配置

path.resolve 参考资料：http://nodejs.cn/api/path/path_resolve_paths.html

```javascript
const path = require("path");

module.exports = {
  // 启用 webpack 内置在相应环境（development/production）下的优化
  mode:"development",
  // 输入
  entry: "./src/index.js",
  // 输出
  output: {
    filename: "[name].[contenthash:8].js",
    // 默认配置，可以不写
    // path: path.resolve(__dirname, "build"),
    // 清除之前生成的文件
    clean:true
  },
};
```

package.json 添加 scripts

```json
{
  "scripts": {
      "build": "webpack"
    }
}
```

执行 yarn build

![img](https://cdn.nlark.com/yuque/0/2022/png/1032556/1646030813706-7c690af3-a7a2-4e55-abe8-573baab56483.png)

```javascript
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("const fun = () => {\r\n  const name = \"aobam\";\r\n  console.log(\"he name is\", name);\r\n};\r\nconsole.log(fun);\r\n\n\n//# sourceURL=webpack://webpack-react-demo/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;
```

修改 webpack 配置的 mode 为 "production"

```javascript
module.exports = {
  mode:"production",
};
```

执行 yarn build

![img](https://cdn.nlark.com/yuque/0/2022/png/1032556/1646031178512-0a0b12ea-3598-4b82-ac44-8831d1224452.png)

```javascript
// 省略了定义的部分
console.log((()=>{console.log("he name is","aobam")}));
```

可以看出 mode 不同时 webpack 在打包时做了不同的处理。

contenthash 的值也是有所不同的。

## 支持es新语法

安装 babel

```bash
yarn add @babel/core @babel/preset-env babel-loader -D
```

Babel 是一个工具链，主要用于将 ECMAScript 2015+ 代码转换为当前和旧版浏览器或环境中向后兼容的 JavaScript 版本。



@babel/preset-env 是一个智能预设，允许您使用最新的 JavaScript，而无需微观管理目标环境需要哪些语法转换。利用你指定的任何目标环境,然后检查它们对应的插件,并传给 Babel 进行转译。

添加 babel 配置文件 .babelrc

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": "> 0.25%, not dead",
        // 是否引入polyfill，usage表示按需引入
        "useBuiltIns": "usage",
        "corejs": "3.21.1"
      }
    ]
  ]
}
```

注意：后续任何步骤中提示 core-js 错误时，请 yarn add core-js -D 安装 core-js

webpack 中配置 babel

```bash
module.exports = {
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
};
```

执行 yarn build

```javascript
// 
console.log((function(){console.log("he name is","aobam")}));
```

箭头函数被转义成 function 了，babel 生效了，但是看不到 const 的转义

修改 mode 为 "development"，再执行 yarn build

```javascript
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("var fun = function fun() {\n  var name = \"aobam\";\n  console.log(\"he name is\", name);\n};\n\nconsole.log(fun);\n\n//# sourceURL=webpack://webpack-react-demo/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;
```

可以看到 const 转义成了 var，babel 确实生效了。

## js插入HTML

每次构建生成的 js 文件带着的 hash 值不一样，例如 main.9358ee34.js，所以每次 html 中应该引入的 js 文件是不同的。每次都去手动的修改又比较麻烦，就可以通过插件的形式自动插入。

根目录下创建 public 文件夹 并新建 index.html

![img](https://cdn.nlark.com/yuque/0/2022/png/1032556/1646032751903-fe8a9473-24fe-4700-9382-1cff3d39f4ac.png)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>webpack-react-demo</title>
  </head>
  <body>
    <div>webpack-react-demo</div>
  </body>
</html>
```

复制 index.html 到 build 目录下，添加 script 标签引入刚才生成的 js 文件

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>webpack-react-demo</title>
  </head>
  <body>
    <div>webpack-react-demo</div>
    <script src="./main.2d1423ae.js"></script>
  </body>
</html>
```

直接启动 live server（需要安装 vscode 插件：Live Server）

![img](https://cdn.nlark.com/yuque/0/2022/png/1032556/1646033219465-0c8fc0ea-bde2-4c6d-af70-839933d329c8.png)

每次打包生成的 js 带有 hash 值，手动添加就会过于麻烦，所以通过插件 html-webpack-plugin 自动将生成的 js 引入到 html文件中。

安装 html-webpack-plugin：自动在模板 html 中插入 script 标签引入 js

```bash
yarn add html-webpack-plugin -D
```

添加 webpack 配置

```javascript
const HtmlWebpackPlugin=require("html-webpack-plugin");
module.exports = {
  plugins: [
    ...,
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './public/index.html'),
    }),
  ],
};
```

## 配置React

使用 react 框架构建用户界面

安装 react

```bash
yarn add react react-dom
```

修改 index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>webpack-react-demo</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

在 src 中新增 App.jsx 和 index.jsx，删除 index.js

```jsx
import React from "react";

const App=()=>{
	return <div>app</div>
}

export default App;
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));
```

添加 webpack 配置：识别后缀为 .js 和 .jsx 的文件

```javascript
module.export={
  resolve: {
    extensions: [ '.jsx', '.js'],
  },
}
```

修改 webpack 配置：js 改为 jsx

```javascript
const path = require("path");

module.exports = {
  // 输入
  entry: "./src/index.jsx",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
    ],
  },
};
```

安装 @babel/preset-react

```bash
yarn add @babel/preset-react -D
```

添加 babel 配置

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": "> 0.25%, not dead",
        "useBuiltIns": "usage",
        "corejs": "3.21.1"
      }
    ],
    "@babel/preset-react"
  ]
}
```

执行 yarn build

![img](https://cdn.nlark.com/yuque/0/2022/png/1032556/1646034930053-33fb73b2-76b0-4437-bebf-0b813eef1c32.png)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>webpack-react-demo</title>
		<!-- defer 延迟加载  -->
    <script defer="defer" src="main.bcb48309.js"></script>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
// main.bcb48309.js
// 自己打包出来看
```

index.html 启动 live server

![img](https://cdn.nlark.com/yuque/0/2022/png/1032556/1646035187646-51842906-9284-448a-9316-4d9089c909c6.png)

nice啊，react成功了，牛啊

## 支持本地开发

每次写好代码如果都要去 build，然后再去看页面效果，实在是麻烦，如果能有一个本开发的服务器，可以改了代码马上就能看到页面效果就好了。哎，webpack-dev-server 正好可以提供了完美的解决方案。

安装 webpack-dev-server

```bash
yarn add webpack-dev-server -D
```

添加 webpack 配置：通过 devServer 使用插件

```javascript
module.exports={
	devServer: {
    // history路由
    historyApiFallback: true,
    // 自动打开浏览器
    open: true,
  },
}
```

package.json 添加 scripts

```json
{
	"scripts": {
    "start": "webpack serve"
  },
}
```

执行 yarn start

![img](https://cdn.nlark.com/yuque/0/2022/png/1032556/1646036144298-c0faa9e3-fcd9-4a8e-9659-1d6ca45603c5.png)

修改页面内容会发现有点迟钝，请确定 mode 为 "development" 时再启动本地开发服务器。

## 处理样式文件

html+js 都有了，css 肯定也不能少

安装各种样式 loader

```bash
yarn add style-loader css-loader -D
```

添加webpack配置

```javascript
module.exports = {
  module: {
    rules: [
      // 配置css
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          'css-loader'
        ],
      }
    ],
  },
};
```

给 App.jsx 添加 App.css 文件并引入

```css
.red {
  color: red;
}
import React from "react";
import "./App.css";

const App = () => {
  return <div className="red">app</div>;
};
export default App;
```

执行 yarn start

![img](https://cdn.nlark.com/yuque/0/2022/png/1032556/1646036465151-dbc976ac-97a4-4780-ae77-0ff8c7f10b6c.png)

css 也有了！

## 处理其他文件（静态资源等）

图片等资源文件的处理都是需要单独配置的

添加webpack配置

```javascript
 module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
};
```

新增 assets 文件夹，并添加 [📎logo.svg](https://newrank.yuque.com/attachments/yuque/0/2022/svg/1032556/1646037387762-37d77ba4-4bd5-4a16-af7c-3bb0dda34569.svg)

![img](https://cdn.nlark.com/yuque/0/2022/png/1032556/1646037362299-28fa1956-b284-47ef-be84-e5f28b5a2faf.png)

App.jsx 中使用 svg

```jsx
import React from "react";
import "./App.css";
import logo from "./assets/logo.svg";

const App = () => {
  return (
    <div className="red">
      <img src={logo} />
      app
    </div>
  );
};

export default App;
```

执行 yarn start

![img](https://cdn.nlark.com/yuque/0/2022/png/1032556/1646037540137-373313ea-69eb-4815-a86e-11ac5b7c1e80.png)

勉强可以开发页面了。

## 区分开发/生产环境

开发和生产需要不同的 webpack 配置

在根目录下新建config文件夹，并创建以下三个文件：webpack.common.js，webpack.dev.js，webpack.prod.js

![img](https://cdn.nlark.com/yuque/0/2022/png/1032556/1646038804318-94e1aca0-8857-4dbf-8d4a-864110483644.png)

安装webpack-merge合并使用配置

```bash
yarn add webpack-merge -D
```

公共配置 webpack.common.js

```javascript
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // 输入
  entry: "./src/index.jsx",
  resolve: {
    extensions: [".jsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      // 配置css
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      // 注意路径
      template: path.join(__dirname, "../public/index.html"),
    }),
  ],
};
```

开发环境配置 webpack.dev.js

```javascript
const common = require("./webpack.common");
const { merge } = require("webpack-merge");

module.exports = merge(common, {
  // 启用 webpack 内置在相应环境（development/production）下的优化
  mode: "development",
  devServer: {
    // history路由
    historyApiFallback: true,
    // 自动打开浏览器
    open: true,
  },
});
```

生产环境配置 webpack.prod.js

```javascript
const path = require("path");
const common = require("./webpack.common");
const { merge } = require("webpack-merge");

module.exports = merge(common, {
  // 启用 webpack 内置在相应环境（development/production）下的优化
  mode: "production",
  // 输出
  output: {
    filename: "[name].[contenthash:8].js",
    // 默认配置可以不写，写了要注意修改 path 路径
    // path: path.resolve(__dirname, "build"),
    clean: true,
  },
  // 关闭资源超过 250kb 的性能提示（当前不需要）
  performance: {
    hints: false,
  },
});
```

注意为了保证打包的正常执行，此处我们关闭了 performance 的性能提示配置

修改 package.json 中 scripts

```json
{
	"scripts": {
    "start": "webpack serve --config config/webpack.dev.js",
    "build": "webpack --config config/webpack.prod.js"
  }
}
```

执行 yarn build 和 yarn start

自行验证是否正常打包和启动本地服务器

## 修改本地开发的域名和端口

添加 webpack 配置

公司内部项目本地开发时，往往需要用到用户信息，此时就需要修改域名为 xx.newrank.cn，才能在发起请求时将属于.newrank.cn 的 cookies 带到请求 header 中，从而得到接口返回的用户信息。

```javascript
module.exports = merge(common, {
  devServer: {
    port: 7080,
    // 需要修改本地电脑 hosts 文件
    host: "local.newrank.cn",
  },
});
```

修改本地 hosts，win+R 打开运行 C:\WINDOWS\system32\drivers\etc

![img](https://cdn.nlark.com/yuque/0/2022/png/1032556/1646293478345-e41f5c9e-5dd1-4fc8-9ca0-9b7f9dd9f25e.png)

使用任意编辑器打开hosts文件，在最下方添加 127.0.0.1 local.newrank.cn，保存退出

```javascript
# Copyright (c) 1993-2009 Microsoft Corp.
#
# This is a sample HOSTS file used by Microsoft TCP/IP for Windows.
#
# This file contains the mappings of IP addresses to host names. Each
# entry should be kept on an individual line. The IP address should
# be placed in the first column followed by the corresponding host name.
# The IP address and the host name should be separated by at least one
# space.
#
# Additionally, comments (such as these) may be inserted on individual
# lines or following the machine name denoted by a '#' symbol.
#
# For example:
#
#      102.54.94.97     rhino.acme.com          # source server
#       38.25.63.10     x.acme.com              # x client host

# localhost name resolution is handled within DNS itself.
#	127.0.0.1       localhost
#	::1             localhost


127.0.0.1 local.newrank.cn
```

执行 yarn start

![img](https://cdn.nlark.com/yuque/0/2022/png/1032556/1646293732874-fa08e241-225a-4875-bdaf-db09b1ee5fa1.png)

## 流水线关联配置

### 配置环境变量的获取

项目中我们常常需要通过环境变量灵活的控制 webpack 的配置和页面中也一些变量等，例如：不同环境下的请求地址不同。

添加 webapck 配置

```javascript
module.exports={
	plugins:[
  	new webpack.DefinePlugin({
      // 设置 mode 时会自动定义
      // "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      // 定义打包之后的静态资源访问路径
      "process.env.PUBLIC_URL": JSON.stringify(process.env.PUBLIC_URL),
      // 定义接口域名
      "process.env.REACT_APP_API_HOST": JSON.stringify(
        process.env.REACT_APP_API_HOST
      ),
    }),
  ]
}
```

环境变量不限于以上内容，按需添加

使用环境变量，index.jsx 中添加代码

```javascript
console.log("process.env.PUBLIC_URL", process.env.PUBLIC_URL); // process.env.PUBLIC_URL undefined
console.log("process.env.REACT_APP_API_HOST", process.env.REACT_APP_API_HOST); // process.env.REACT_APP_API_HOST undefined
```

可以看到获取到的值都是 undefined，配置是成功了，但我们并没有在任何地方有添加过环境变量， 后续会**在流水线中有添加使用**

### build 静态资源

添加/修改 webpack 配置

publicPath 配置打包之后资源访问路径

```javascript
module.exports = merge(common, {
  output: {
    // 修改
    filename: "static/js/[name].[contenthash:8].js",
    // 添加
    publicPath: process.env.PUBLIC_URL ?? "/",
  },
});
module.exports={
	module: {
    generator: {
      "asset/resource": {
        // asset/资源模块的 generator 选项
        // 自定义 asset/resource 模块的 publicPath
        publicPath: (process.env.PUBLIC_URL ?? "") + "/static/assets/",
        // 将静态资源输出到相对于 'output.path' 的指定文件夹中
        outputPath: "static/assets/",
      },
    },
  }
}
```

执行 yarn build

![img](https://cdn.nlark.com/yuque/0/2022/png/1032556/1646294098913-c00cafb2-1d0c-40ab-bded-70eb8596af60.png)

将打包之后的静态资源都放在 static 目录下，方便 oss 把 static 目录的内容全部上传，**流水线中有使用**

## .gitignore

忽略一些文件不需要上传到

```plain
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules

# production
/build

# misc
.idea
.vscode

npm-debug.log*
yarn-debug.log*
yarn-error.log*
debug.log*

.env.development.local
```

## 第三方工具库

通过添加第三方库补充项目的一些实际需求，例如：UI库带来一些通用组件的便利，spa路由，状态管理，数据交互，可视化图库等

### react-router

安装 react-router-dom

```bash
yarn add react-router-dom
```

全局配置 history 路由模式，修改 index.jsx

```jsx
import React from "react";
import ReactDom from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

ReactDom.render(
  <BrowserRouter>
     <App />
  </BrowserRouter>,
  document.getElementById("root")
);
```

useRoutes 管理路由，修改 App.jsx

```jsx
import React from "react";
import "./App.css";
import Header from "./layout/Header";
import Home from "./pages/Home";
import { useRoutes } from "react-router-dom";
import One from "./pages/One";
import NoMatch from "./pages/NoMatch";
import Two from "./pages/Two";

export default function App() {
  const element = useRoutes([
    {
      path: "/",
      element: <Header />,
      children: [
        { index: true, element: <Home /> },
        {
          path: "/one",
          element: <One />,
        },
        {
          path: "/two",
          element: <Two />,
        },
        // 找不到路由
        { path: "*", element: <NoMatch /> },
      ],
    },
  ]);

  return <div className="red">{element}</div>;
}
```

Layout 与 Outlet 的使用

```jsx
import React from "react";
import { Outlet } from "react-router-dom";
import "./index.css";

const Header = () => {
  return (
    <div>
      我是header
      <div className="line"></div>
      <Outlet />
    </div>
  );
};

export default Header;
```

Link 路由跳转

```jsx
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      Home
      <div>
        <Link to="/one">去one页面</Link>
      </div>
      <div>
        <Link to="/two">去two页面</Link>
      </div>
    </div>
  );
};

export default Home;
```

useNavigate 替代以前的 useHistory

```jsx
import React, { useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";

const Two = () => {
  const navigate = useNavigate();

  const _backHome = useCallback(() => {
    navigate("/");
  }, []);

  return (
    <div>
      Two
      <div>
        <button onClick={_backHome}>回到Home</button>
      </div>
    </div>
  );
};

export default Two;
```

配置basename

```jsx
import React from "react";
import ReactDom from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

import { RecoilRoot } from "recoil";

console.log("process.env.PUBLIC_URL", process.env.PUBLIC_URL);
console.log("process.env.REACT_APP_API_HOST", process.env.REACT_APP_API_HOST);
// 教程中名称规范，姓名缩写
ReactDom.render(
  <BrowserRouter basename="/js">
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </BrowserRouter>,
  document.getElementById("root")
);
```

BrowserRouter 上的 basename 可以配置根路由，同一域名下有多个项目时使用。结合后面的 nginx 部分配置。

### recoil

安装 recoil

```json
yarn add recoil
```

index.jsx 中全局配置 recoil

```jsx
import React from "react";
import ReactDom from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";

ReactDom.render(
  <BrowserRouter>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </BrowserRouter>,
  document.getElementById("root")
);
```

src 中创建 recoil 目录，并创建 app.js 用于 app.jsx 使用的 recoil

![img](https://cdn.nlark.com/yuque/0/2022/png/1032556/1646058831004-15062c8a-db6c-41fc-a5b1-1e22b3d9800d.png)

```javascript
import { atom } from "recoil";

export const textState = atom({
  key: "textState",
  default: "",
});
```

App.jsx 中使用 recoil

```jsx
import React, { useEffect } from "react";
import { textState } from "./recoil/app";
import { useRecoilState } from "recoil";

export default function App() {

  const [text, setText] = useRecoilState(textState);

  useEffect(() => {
    setText("welcome my app from recoil !!!");
  }, []);

  return (
    <div>
      <h1>{text}</h1>
    </div>
  );
}
```

### antd

安装 antd

```bash
yarn add antd
```

全局引入antd的样式

```css
@import '~antd/dist/antd.css';
.red{
    color:red;
}
```

使用 antd

```jsx
import React from "react";
import { Button } from "antd";
import "./app.css";

export default function App() {
  return (
    <div>
      <h1>{text}</h1>
      <Button type="primary">antd按钮</Button>
    </div>
  );
}
```

### echarts

安装echarts

echarts-for-react 封装了 echarts 的使用，更加方便

```bash
yarn add echarts echarts-for-react
```

新建组件 MyCharts

```bash
import React from "react";
import ReactECharts from "echarts-for-react";

const MyCharts = () => {
  const options = {
    grid: { top: 8, right: 8, bottom: 24, left: 36 },
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: "line",
        smooth: true,
      },
    ],
    tooltip: {
      trigger: "axis",
    },
  };

  return <ReactECharts option={options} />;
};

export default MyCharts;
```

### fetch

安装公司内部的npm包需要添加npm和yarn的配置文件

```json
registry=https://registry.npm.taobao.org
save-prefix=
@newrank:registry=https://npm.newrank.cn
registry "https://registry.npm.taobao.org"
save-prefix ""
"@newrank:registry" "https://npm.newrank.cn"
```

安装 @newrank/axios-fetch

一个基于 fetch 封装成 axios 使用方式的工具包

```bash
yarn add @newrank/axios-fetch
```

base文件

```javascript
import axios from "@newrank/axios-fetch";

let apiHost = process.env.REACT_APP_API_HOST ?? "https://gw.newrank.cn";

if (process.env.NODE_ENV !== "production") {
  apiHost = process.env.REACT_APP_API_HOST ?? "http://test-gw.newrank.cn:18080";
}
export const apiUrl = apiHost
  ? apiHost + "/api/inner/xdnphb/cloud/internal/monitor"
  : "";

// gateway 应用 N_TOKEN，每一个应用对应一个项目对应一个 N_TOKEN
export const N_TOKEN = "1c3d8c48886f43df86d3c570bd783933";

export const BASE_CONFIG = {
  baseURL: apiUrl,
  withCredentials: true,
  headers: {
    "N-Token": N_TOKEN,
  },
};

export { apiHost };
export default axios.create(BASE_CONFIG);
import axios, { createError } from "@newrank/axios-fetch";
import { BASE_CONFIG } from "./axios-fetch-base";

const axiosFetchUser = axios.create(BASE_CONFIG);

// response interceptors
axiosFetchUser.interceptors.response.use(function (response) {
  if (response.data.code !== 200) {
    return Promise.reject(
      createError(
        response.data.msg,
        response.config,
        response.data.code,
        response
      )
    );
  }
  return response;
});

export default axiosFetchUser;
```

创建 api 文件夹统一管理请求，并创建 user.js

![img](https://cdn.nlark.com/yuque/0/2022/png/1032556/1646296641002-36288e37-36df-493d-a5da-072968c10b15.png)

```javascript
import axiosFetchUser from "../fetch/axios-fetch-user";

export const getUserInfo = () => axiosFetchUser.post("/user/getInnerUserInfo");
```

使用 api

```jsx
import { getUserInfo } from "./api/user";

export default function App() {
  const _getDemoData = useCallback(async () => {
    const { data } = await getUserInfo();
    console.log(data);
  });

  return (
    <div>
      <Button type="primary" onClick={_getDemoData}>
        antd按钮
      </Button>
    </div>
  );
}
```

![img](https://cdn.nlark.com/yuque/0/2022/png/1032556/1646296371061-653d3180-ecca-4891-8d2c-a0de374ae7a3.png)

完整代码阿里云地址：https://code.aliyun.com/nr-fe/webpack-react-demo.git