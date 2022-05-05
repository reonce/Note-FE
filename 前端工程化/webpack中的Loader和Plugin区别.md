# webpack中的Loader和Plugin区别

## Loader
Loader：直译为"加载器"，主要是解析一些非js文件的，例如：`babel-loader`、 `less-loader`、`file-loader`等
Webpack将一切文件视为模块，但是webpack原生是只能解析js文件，如果想将其他文件也打包的话，就会用到`loader`。 所以Loader的作用是让webpack拥有了加载和解析非JavaScript文件的能力。

## Plugin
Plugin:直译为"插件"，可以扩展webpack的功能，让webpack具有更多的灵活性。 在 Webpack 运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在合适的时机通过 Webpack 提供的 API 改变输出结果。例如`html-webpack-plugin`、`eslint-webpack-plugin`等等。简易实战：在代码中加入版权所属、写作日期，都可以用Plugin实现.


