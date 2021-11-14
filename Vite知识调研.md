## Vite知识调研

1. Vite和WebPack的区别，各有哪些优点和不足
2. Vite的适用场景，实际使用中存在哪些问题
3. Vite打包为什么可以那么“快”
4. 将现有的项目迁移使用Vite存在哪些问题
5. Vite同期竞品比较

---



### 1.Vite和WebPack的区别，各有哪些优点和不足

  现在前端主流的打包工具主要以 Webpack 为代表，但随着项目规模的发展，构建方面的痛点越来越突出，最大的感受就是**太慢了**，一方面项目冷启动时必须递归打包整个项目的依赖树，另一方面 JavaScript 语言本身(解释执行、单线程执行)的限制，导致构建性能遇到瓶颈。

  这时候，基于ES module的 Vite应运而生，由尤雨溪(以下简称尤老师)带队开发。

**区别**

  `webpack`构建项目会先**打包**，之后启动本地开发服务器，采用**全部加载**的方案，请求模块时加载模块相应的打包结果。

   `vite`启动项目则选择的不打包的方案，在浏览器请求某个模块时，根据模块进行编译，实现**按需动态编译**。

从而可以跳过打包过程中的分析模块依赖、编译等操作。当然，不是随便就可以跳过打包的，后文会提到一些关于vite跳过打包要处理的问题。

​	**webpack**作为老牌霸主，把工作放在了服务器上，全部编译打包，经过多年的优化，已经十分稳定。缺陷主要是提到的速度慢。

  **vite**是一颗备受瞩目的新星，你可能并没有开始使用或研究它，但你一定耳闻过它。最大的优势是速度快。Vite在使用热更新的时候，改动一个模块，仅需让浏览器重新请求该模块即可，因此效率更高。项目复杂度越大，vite的优势就越明显。它甚至可以比webpack快十倍百倍...  它目前的缺点有：

1. 浏览器兼容性。只能使用在现代浏览器上（支持es2015+）
2. 打包兼容性不稳定。对于CommonJs的模块不完全兼容
3. 开发服务器和产品构建之间的最佳输出和行为存在不一致的情况
4. 生态不及webpack，插件等不够丰富
5. 生产环境下，ESbuild构建对于css的代码分割不够友好

|         |                         **打包过程**                         |                             原理                             |
| ------- | :----------------------------------------------------------: | :----------------------------------------------------------: |
| webpack | 识别入口->逐层识别依赖->分析/转换/编译/输出代码->打包后的代码 | 逐级递归识别依赖，构建依赖图谱->转化AST语法树->处理代码->转换为浏览器可识别的代码 |
| vite    |                              -                               | 基于浏览器原生支持的 ES module，利用浏览器解析 imports，服务器端按需编译返回 |

  值得一提的是，vite在打包部署到生产环境的时候，是使用**rollup**打包的。从这一点上，个人认为vite的优势主要在**开发阶段**。

  [为什么生产环境仍需打包](https://vitejs.cn/guide/why.html#%E4%B8%BA%E4%BB%80%E4%B9%88%E7%94%9F%E4%BA%A7%E7%8E%AF%E5%A2%83%E4%BB%8D%E9%9C%80%E6%89%93%E5%8C%85)

### 2.Vite的适用场景，实际使用中存在哪些问题

Vite使用有两点必要的先决条件：

- 支持ES2015及以上的现代浏览器

实际中存在的问题：

如官网所说，要确保开发服务器和产品构建之间的最佳输出和行为一致并不容易。但如果开发用vite，实际生产下效果不同，那将是一个十分致命的问题。

### 3. Vite打包为什么可以那么“快”

Vite引以为傲的是开发环境不打包，尤老师利用了[浏览器的原生 ES Module 支持](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)，直接在 html 文件里写诸如这样的代码：

```html
// index.html
<div id="app"></div>
<script type="module">
  import { createApp } from 'vue'
  import Main from './Main.vue'
  createApp(Main).mount('#app')
</script>
复制代码
```

 Vite 会在本地帮你启动一个服务器，当浏览器读取到这个 html 文件之后，会在执行到 import 的时候才去向服务端发送模块的请求，解析成浏览器可以执行的 js 文件返回到浏览器端。也就是说只有在真正使用到这个模块的时，浏览器才会请求并且解析这个模块，最大程度的做到了**按需加载**。

引用Vite 官网上的图，传统的 bundle 模式是这样的：

![传统 bundle](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e1c187722cd9405687c6c0ff40b54b9b~tplv-k3u1fbpfcp-watermark.awebp)

而基于 ESM 的构建模式则是这样的：

![基于 ESM](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/af2907c55cdb4fedadf8e604907ddc57~tplv-k3u1fbpfcp-watermark.awebp)

灰色部分是暂时没有用到的路由，甚至完全不会参与构建过程，即使项目中的路由增加，构建速度也不会变慢。

#### 依赖预编译

[依赖预编译原因](https://vitejs.cn/guide/dep-pre-bundling.html)

  Vite 2在为用户启动开发服务器之前，先用 `esbuild` 把检测到的依赖预先构建了一遍。一方面，它在这个过程中将CommonJS依赖或UMD依赖转换成ESM。另一方面，为了提高性能，它将内部模块的依赖关系转换成单个模块，提高后续页面加载的性能。例如我们导入一个lodash的包，使用它的防抖函数。

 `import { debounce } from 'lodash'` 导入一个命名函数的时候，debounce` 函数的模块内部又依赖了很多其他函数，形成了一个依赖图。

当浏览器请求 `debounce` 的模块时，又会发现内部有 2 个 `import`，再这样延伸下去，这个函数内部竟然带来了 600 次请求，虽然服务器处理这样请求时没有问题，但是大量的请求会导致页面的加载速度相当慢。

![lodash 请求依赖链路](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d9273fbf819c430ea0a44677c789cf6b~tplv-k3u1fbpfcp-watermark.awebp)

这好吗，这不好。于是尤老师想了个折中的办法，利用 [Esbuild](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fevanw%2Fesbuild) 接近无敌的构建速度，让你在没有感知的情况下在启动的时候预先帮你把 `debounce` 所用到的所有内部模块全部打包成一个传统的 `js bundle`（大概作用是把各个模块call一下，然后存到一起，方便其他模块调用）。

[Vite 启动服务器源码](https://github.com/vitejs/vite/blob/main/packages/vite/src/node/server/index.ts)

```ts
// server/index.ts
const listen = httpServer.listen.bind(httpServer)
httpServer.listen = (async (port: number, ...args: any[]) => {
  try {
    await container.buildStart({})
    // 这里会进行依赖的预构建
    await runOptimize()
  } catch (e) {
    httpServer.emit('error', e)
    return
  }
  return listen(port, ...args)
}) as any
```

首先会根据本次运行的入口，来扫描其中的依赖：

```ts
let deps: Record<string, string>, missing: Record<string, string>
if (!newDeps) {
  ;({ deps, missing } = await scanImports(config))
}
```

`scanImports` 其实就是利用 `Esbuild` 构建时提供的钩子去扫描文件中的依赖，收集到 `deps` 变量里，在扫描到入口文件（比如 `index.html`）中依赖的模块后，形成类似这样的依赖路径数据结构：

```js
{
  "lodash-es": "node_modules/lodash-es"
}
```

之后再根据分析出来的依赖，使用 `Esbuild` 把它们提前打包成单文件的 bundle。

```ts
const esbuildService = await ensureService()
await esbuildService.build({
  entryPoints: Object.keys(flatIdDeps),
  bundle: true,
  format: 'esm',
  external: config.optimizeDeps?.exclude,
  logLevel: 'error',
  splitting: true,
  sourcemap: true
  outdir: cacheDir,
  treeShaking: 'ignore-annotations',
  metafile: esbuildMetaPath,
  define,
  plugins: [esbuildDepPlugin(flatIdDeps, flatIdToExports, config)]
})
```

在浏览器请求相关模块时，返回这个预构建好的模块。这样，当浏览器请求 `lodash-es` 中的 `debounce` 模块的时候，就可以保证只发生一次接口请求了。

这一步和 `Webpack` 所做的构建一样，只不过速度快了几十倍。

### 4.将现有的项目迁移使用Vite存在哪些问题

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

+ *第三方包内部报错*

   这里的例子先欠着（haha

  解决思路： 一般来说，解决 node_modules 中第三方库的 bug 大概有两种思路：

  第一种思路是将第三方库中有问题的文件 copy 一份进行修复，放在项目目录里面(非 node_modules)，然后通过构建工具 `resolve.alias` 能力**重定向**到修复后的位置。

  另一种是通过 `patch-package` 记录 node_modules 更改记录，生成 patches 目录，然后通过项目的 post-install 脚本在团队中同步这个更改。
  
+ 预构建反复执行

    Vite 预构建并不只有在服务启动的时候进行，在请求进入的时候也有可能触发预构建，也就是说，**预构建的行为不只是在最开始触发一次，在浏览器访问项目的时候有可能再次触发，甚至是多次触发**。在反复执行的过程中，控制台可能会反复打印`new dependencies`之类的 log，构建缓存目录会一次次刷新，然后页面卡住。

   vite仓库中也有相关的issue，这种二次预构建的过程在正常的项目中也是会真实存在的，主要是为了处理项目中一些动态 import 的场景，当这种通过动态 import 的依赖多了之后，也会非常影响构建性能，这种场景下也可以用 **antfu ** 开发的 `vite-plugin-optimize-persist` 这个插件进行自动优化。


摘自：https://juejin.cn/post/7005731645911203877

### Vite同期竞品比较

和 Vite 同时期出现的现代化构建工具还有：

- [Snowpack - The faster frontend build tool](https://www.snowpack.dev/)
- [preactjs/wmr: 👩‍🚀 The tiny all-in-one development tool for modern web apps.](https://github.com/preactjs/wmr)
- [Web Dev Server: Modern Web](https://modern-web.dev/docs/dev-server/overview/)

**Snowpack **

Snowpack 和 Vite 比较相似，也是基于 ESM 来实现开发环境模块加载，但是它的构建时却是交给用户自己选择，整体的打包体验显得有点支离破碎。

而 Vite 直接整合了 Rollup，为用户提供了完善、开箱即用的解决方案，并且由于这些集成，也方便扩展更多的高级功能。

**WMR **

WMR 是为 Preact（React替代框架） 而生的，如果你在使用 Preact，可以优先考虑使用这个工具。

**@web/dev-server**

这个工具并未提供开箱即用的框架支持，也需要手动设置 Rollup 构建配置，不过这个项目里包含的很多工具也可以让 Vite 用户受益。

[Vite官方文档-比较](https://cn.vitejs.dev/guide/comparisons.html)

## 总结

  Vite 是一个魅力十足的现代化构建工具，尤老师也在各个平台放下狠话，说要替代 Webpack，并怒怼许多vite的负面评论（知乎）。其实 Webpack 在上个世代也是一个贡献非常大的构建工具，只是新特性的出现，出现了可以解决它痛点的解决方案。在我看来，比较理想的方案是开发环境使用vite，生产环境可以使用webpack（vite的Rollup如果优化够好也可以），重难点就是保证它们的一致性以及打包的稳定性。

