## 彻底理解Import和Export

前端工程，在最早的时候是没有模块的概念的。随着前端工程的发展，前端开发也越来越规范化，更像是软件工程了。那么随之而来的，为了解决工程化的问题，就引入了模块的概念。但是在早期，因为ecmascript原本是没有模块语法的，所以采用的都是社区的各种版本协议，其中影响最深的，就是nodejs使用的[CommonJS规范](https://link.zhihu.com/?target=http%3A//www.commonjs.org/) 。

当模块化的概念越来越重要的时候，在es6中，引入了模块的语法：import ，下面我们简单了解一下，import是怎么使用的。一下内容，参考 [官方文档](https://link.zhihu.com/?target=https%3A//developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/import)

### 1、export

一个js文件，可以理解成一个模块，这个模块可以被任意其他的模块引入，引入的结果，就是对这个模块进行执行后，所持有的对象。那么随之而来就有一个问题，文件模块被引入后，所有的东西，都是在自己的作用域中，主动发起引入行为的那个文件，虽然获取到了被引入的对象，但是并不能访问作用域里的东西，所以提供了export，来决定一个模块对外暴露什么东西。

[export](https://link.zhihu.com/?target=https%3A//developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/export)的作用，就是用于从模块中导出函数、对象或原始值，以便其他程序可以通过 import 语句使用它们.

在import 一个文件的时候，会获取这个文件对象，默认是空对象，代表我们不能访问文件的东西。使用export，来给这个对象添加内容

用法：
`module1.js` :

```text
function f1 (){
    console.log("module - 1 : functino 1")
}

let b = {
    name:"test_obj"
}

let str = "hell绿绿绿"

export {
    f1,b,str
}
```

在`main.js` 中进行引入

```text
// 先忽略 import 的写法，后面再说明
import * as m1 from "./m1.js"
console.log(m1)
```

在这个文件中，我们对外暴露了 一个函数，一个变量，一个对象。所以，在使用 import 导入的文件对象，就不在是一个空对象，而是包含了export 内容的对象，所以，我们打印出`m1.js` 文件对象，也就是 `m1` ：

![image-20211028143553854](C:\Users\newrank\AppData\Roaming\Typora\typora-user-images\image-20211028143553854.png)


所以，我们知道，export 导出的内容，都会添加到文件对象中，可以简单的先理解为深拷贝。

### 2、export default

很多初学者很困惑，既然有了 export ，为什么还要有个 export default 呢？网上给出的答案往往是，作为文件的默认导出接口。那什么又是文件的默认导出接口呢？

其实这个问题很简单，我们先抛开 import ，不考虑import 的语法，仅考虑 export default具体做了什么。
修改 `module1.js` :

```text
function f1 (){
    console.log("module - 1 : functino 1")
}
let b = {
    name:"test_obj"
}
let str = "hell绿绿绿"
export {
    f1,b,str
}
export default{
    name:"default"
}
```

main.js不变，在执行一遍，继续查看打印出来的文件对象：

![image-20211028143529900](C:\Users\newrank\AppData\Roaming\Typora\typora-user-images\image-20211028143529900.png)


发现了吗，export default 的作用，是给文件对象，添加一个 default属性，default属性的值也是一个对象，且和export default导出的内容完全一致。

### 3、文件导出的总结

那么到这里，我们明白了，一个js文件被当做一个模块引入，会暴露为一个对象（也就是被导入后，可以当做一个对象来操作）。

export的作用，是在这个文件对象中添加属性，export出来的东西，全部会添加到文件对象中。

export default 的作用，是给文件对象的 `default` 属性，添加值。

### 4、import

在上面的例子中，我们明白了模块对外暴露的都是什么东西，那么我们如何来使用文件对外暴露的东西呢？
首先我们已经明白，文件对象是什么。

### 4.1导出整个文件对象

那么首先，我们就导出整个文件对象，看一看是什么样子的。就是上面例子中，我们使用到的语法，`import *` 来导出文件模块的所有接口，`as m_name` 来指定一个命名空间对象。
`main.js` ：

```text
import * as m1 from "./m1.js"
console.log(m1)
```

示例中的`m1` 命名空间对象，可以访问到文件对象的所有对外接口，包括export，和export default。

![image-20211028143607519](C:\Users\newrank\AppData\Roaming\Typora\typora-user-images\image-20211028143607519.png)



### 4.2 导出export的部分接口

在实际开发中，我们并不需要导出所有的接口。例如在vue项目中，使用某个组件库中的某个组件，我们只需要引入这一个组件，不必要引入所有组件。

我们知道，import 导出的是整个文件对象，那么我们直接在 `import` 语句中，对这个对象进行解构，就可以获得其中某一部分接口：
`main.js` :

```text
import {f1，b} from "./m1.js"
console.log(f1)
console.log(b)
```

打印结果，就是：

![image-20211028143619134](C:\Users\newrank\AppData\Roaming\Typora\typora-user-images\image-20211028143619134.png)


但是这种方式，仅限于获取文件对象的正常属性，default属性是获取不到的，原因有两个：

- 未解构的对象全部进行了丢弃
- default是关键字，不能再解构中当做变量进行使用

### 4.3 导入export default 的接口

export default是文件的默认导入，其实这句话的重点，并不在于 export default，而是在于 import 语句是如何处理文件默认导入的。
修改`main.js` 文件内容为：

```text
import d from "./m1.js"
console.log(d)
```

打印出来，惊奇的发现，d 竟然和 export default 的内容一样。

所以，现在可以这么理解，所谓的默认导入，就是毫无花哨的直接导入一个模块，然后赋值给一个命名空间，这种时候，这个命名空间，持有的就是 文件对象的default 对象，也就是export default 出来的东西。

其实，默认导入可以理解为也是解构的一个语法糖（仅仅用作理解，实际是语法错误的）:

```text
import d from "./m1.js"  可以等价为 import {default as d} from "./m1.js"
```

### 5、import动态导入

还有一种高端的玩法，在项目中也是很有用处的。

import不光是一个关键字，同时也是一个函数，函数的参数是需要导入模块的路径，函数返回一个promise对象。

```text
import("./m1.js").then(m=>{
  console.log('then:',m)
})
```

在这段代码中，then中回调的m，就是文件模块的整个文件对象（包括export和export default）。

### 6、import不导入文件对象

import还可以不导入文件对象，仅仅是使用文件模块提供的功能。也就是传说中的，import将文件模块仅仅最为副作用进行导入，而不获取文件模块的接口。

在项目中，实践的地方，例如一个vue项目，我们需要给vue对象挂载很多东西，但是全部写在`src/main.js` 文件中，又会显得特别啰嗦，不利于维护，也没能体现工程化的理念。所以我们常常单独新建一个文件`lib/init.js` ,然后在这个 `init.js` 文件中，编写相关逻辑。这个文件的作用，仅仅是执行一遍，我们不期望这个文件暴露什么变量，所以没必要获取文件对象。那么这个时候，`import` 关键字的另一个作用就体现出来了：
`main.js` ：

```text
import './lib/init.js';
```

使用import直接引用一个文件时，会执行一遍这个文件，而不获取任何文件对象。