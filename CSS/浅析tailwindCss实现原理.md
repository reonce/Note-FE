# 浅析tailwindCss实现原理

## 原理概括

TailwindCss 官网在安装使用的顶部已经概括出了它的原理

>  Tailwind CSS 的工作原理是扫描所有 HTML 文件、JavaScript 组件和任何其他模板的类名，生成相应的样式，然后将它们写入静态 CSS 文件。

> 它快速、灵活、可靠，且运行时间为零。

## 源码解读

概括的很清晰，但是笔者并不清楚它是怎么实现的，于是简单阅读了一下它的源码

~~~js

module.exports = function tailwindcss(configOrPath) {
  return {
    postcssPlugin: 'tailwindcss',
    plugins: [
      ...

    ]，

    ...

}

~~~

从 `plugin.js` 这几行代码可以看出， TailwindCss 本身是通过 作为一个plugin 的形式去处理数据的， 从 `postcssPlugin` 可以看出，它是借助 postcss 实现的样式写入操作。

这里科普一下 postcss 是干嘛的：

PostCSS 是一个用 JavaScript 编写的工具，用于转换 CSS 代码。它的目标是通过插件系统实现对 CSS 进行更灵活、高效的处理。

PostCSS 的**工作原理**是将 CSS 解析成抽象语法树（AST），然后通过插件对这棵树进行操作，最后再将其转换回 CSS。这种模块化的设计使得开发者可以轻松地编写自定义插件，用于执行各种 CSS 转换任务，例如自动添加浏览器前缀、压缩 CSS、转换未来 CSS 特性等。PostCSS 在前端开发中得到了广泛的应用，特别是在构建工具链中的 CSS 处理环节。

 看到这里，可以粗浅的理解为 TailwindCss 是在 PostCSS  把代码解析成 AST 后进行样式转换操作改变 AST ，再由 PostCSS 将代码转换回去。 

