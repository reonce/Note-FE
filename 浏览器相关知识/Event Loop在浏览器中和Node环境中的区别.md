# Event Loop在浏览器中和Node环境中的区别

## 浏览器中的Event Loop

事件循环中的异步队列有两种：macro（宏任务）队列和 micro（微任务）队列。宏任务队列可以有多个，微任务队列只有一个。
常见的 macro-task 比如：setTimeout、setInterval、 setImmediate、script（整体代码）、 I/O 操作、UI 渲染等。
常见的 micro-task 比如: process.nextTick、new Promise().then(回调)、MutationObserver(html5 新特性) 等。

> 扩展一下process.nextTick()，它一般用于控制代码执行顺序，可用于赋予用户一，去保证方法在对象完成constructor后但是在I/O发生前调用。它可扩展学习的内容也较多，下一个issue单独介绍下。
> 

**执行机制**：当某个宏任务执行完后,会查看是否有微任务队列。如果有，先执行微任务队列中的所有任务，如果没有，会读取宏任务队列中排在最前的任务，执行宏任务的过程中，遇到微任务，依次加入微任务队列。栈空后，再次读取微任务队列里的任务，依次类推。

## Node环境中的Event Loop

Node 中的 Event Loop 和浏览器中的是完全不相同的东西。Node.js采用V8作为js的解析引擎，而I/O处理方面使用了自己设计的libuv，libuv是一个基于事件驱动的跨平台抽象层，封装了不同操作系统一些底层特性，对外提供统一的API，事件循环机制也是它里面的实现

Node的Event loop一共分为6个阶段，每个细节具体如下：

- timers: 执行setTimeout和setInterval中到期的callback。
- pending callback: 上一轮循环中少数的callback会放在这一阶段执行。
- idle, prepare:仅在内部使用。
- poll:最重要的阶段，执行pending callback，在适当的情况下回阻塞在这个阶段。
- check:执行setImmediate的callback。
- close callbacks: 执行close事件的callback，例如socket.on(‘close’[,fn])或者http.server.on('close, fn)。
注意：上面六个阶段都不包括 process.nextTick()。
在Node.js中，一次宏任务可以认为是包含上述6个阶段、**微任务**microtask会在**事件循环的各个阶段**之间执行，也就是一个阶段执行完毕，就会去执行microtask队列的任务。
process.nextTick()

在前面就已经了解到，process.nextTick()属于微任务，但是这里需要重点提及下：
process.nextTick()虽然它是异步API的一部分，但未在图中显示。因为process.nextTick()从技术上讲，它不是事件循环的一部分；
当每个阶段完成后，如果存在 nextTick，就会清空队列中的所有回调函数，并且优先于其他 microtask 执行（可以理解为微任务中优先级最高的）