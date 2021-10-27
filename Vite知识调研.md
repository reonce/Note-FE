## Vite知识调研

1. Vite和WebPack的区别，各有哪些优点和不足
2. Vite的适用场景，实际使用中存在哪些问题
3. Vite打包为什么可以那么“快”
4. 将现有的项目迁移使用Vite存在哪些问题
5. Vite的落地前景
6. Vite常见的配置项和其他API

---



**1. Vite和WebPack的区别，各有哪些优点和不足**

现在前端主流的打包工具主要以 Webpack 为代表，但随着项目规模的发展，构建方面的痛点越来越突出，最大的感受就是**太慢了**，一方面项目冷启动时必须递归打包整个项目的依赖树，另一方面 JavaScript 语言本身(解释执行、单线程执行)的限制，导致构建性能遇到瓶颈。

在这样的背景下，一些被称为 Bundleless (或者 Unbundled) 的构建工具应运而生，诸如 Snowpack、Vite，其中 Vite 最近在社区的呼声越来越高，GitHub 上的 star 30k+，甚至已经超过 vue3 仓库的 star 数(目前 24.1k)，可见其影响力之大。

|         |                         **打包过程**                         |                             原理                             |
| ------- | :----------------------------------------------------------: | :----------------------------------------------------------: |
| webpack | 识别入口->逐层识别依赖->分析/转换/编译/输出代码->打包后的代码 | 逐级递归识别依赖，构建依赖图谱->转化AST语法树->处理代码->转换为浏览器可识别的代码 |
| vite    |                              -                               | 基于浏览器原生 ES module，利用浏览器解析 imports，服务器端按需编译返回 |



https://blog.51cto.com/xuedingmaojun/2967713

https://juejin.cn/post/7005731645911203877

**3. Vite打包为什么可以那么“快”**

​	Vite引以为傲的是开发环境不打包

**4. 将现有的项目迁移使用Vite存在哪些问题**

+ *Svg组件报错*

​	Vite 暂时没有对 svg 组件写法的支持，在默认情况下，下面的写法会导致浏览器报错:

```js
import Up from 'common/imgs/up.svg';

function Home() {
  return {
    <>
      // 省略其他子组件
      <Up className="admin-header-user-up" />
    </>
  }
}

```

解决方案 ： 使用`vite-plugin-react-svg`插件, 将svg添加到Vite的plugins数组中，实现了以组件方式引用 SVG 资源的能力

`import Up from 'common/imgs/up.svg?component';`

+ *大量第三方包报错*

