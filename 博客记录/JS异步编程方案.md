# JS异步编程方案

JS是一门单线程语言，并且浏览器使用异步非阻塞的事件循环模型来进行JS任务调度，JS常用的有这几种：回调函数、事件监听、Promise、Generator、async/await。回调函数是异步编程的通用方式，后随着 ES标准的发展，Promise、Generator 和 async/await 接连出现。

回调函数是JS异步编程的最基本、最原始的方式，例如事件回调、setTimeout/setInterval、ajax等，但是使用回调函数存在一个非常棘手的问题，那就是回调地狱。
*Promise* 是异步编程的一种解决方案，比传统的解决方案 “回调函数和事件” 更合理和更强大。它由社区最早提出和实现，ES6 将其写进了语言标准，统一了用法，原生提供了Promise对象，在一定程度上解决了回调地狱的问题。

## Promise

**Promise**是一个包含三种状态（pending待定、fulfilled兑现、rejected拒绝）的有限状态机，状态名称很好地解释了它为什么叫Promise（承诺、期约）。一个Promise实例持有着一个异步操作未来的某个状态，即前面提到的三种状态之一，它提供统一的API来让我们获取异步操作的执行结果。
使用Promise提供的then链式调用改写上面的代码：

~~~js
function read(path) {
return new Promise((resolve, reject) => {
fs.readFile(path, ‘utf8’, (err, data) => {
if(err) reject(err);
resolve(data);
});
});
}
read(A).then(dataA => {
return read(dataA);
}).then(dataB => {
return read(dataB);
}).then(dataC => {
return read(dataC);
}).then(dataD => {
return read(dataD);
}).then(dataE => {
console.log(dataE)
}).catch(reason => {
console.log(reason);
});
~~~

从上面的代码可以看出，针对回调地狱进行这样的改进，可读性的确有一定的提升，优点是可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数，并且使用Promise提供catch方法可以统一处理then链式调用可能产生的异常。但是存在的问题也很明显，过多使用then链式调用，其实并没有从根本上解决回调地狱的问题，只是换了一种写法，可读性虽然有所提升，但是依旧很难维护。
对于相互间没有依赖关系的多个异步请求，Promise提供all方法来帮助我们集中处理它们，它接受一个迭代对象，迭代元素都是一个Promise实例，当全部实例都处于兑现状态时返回一个包含执行结果的数组，否则产生一个异常。

~~~js
function read(path) {
return new Promise((resolve, reject) => {
fs.readFile(path, ‘utf8’, (err, data) => {
if(err) reject(err);
resolve(data);
});
});
}
// 通过 Promise.all 可以实现多个异步操作并行执行
Promise.all([read(A), read(B), read(C)]).then(result => {
console.log(result);
}).catch(reason =>
console.log(reason)
);
~~~

## Generator

------

Generator同样是ES6新增的特性之一，也是一种异步编程解决方案，它最大的特点就是可以交出函数的执行权，这一点就于协程非常类似，可以把它看作协程的ES6实现。Generator 函数可以看出是异步任务的容器，通常配合yield来使用，在需要暂停的地方，都用 yield 关键字来标注。Generator 函数最后返回的是迭代器对象。
使用Generator创建一个随机数生成器函数：
function * randomFrom(base) {
while (true)
yield arr[Math.floor(Math.random() * base];
}

const getRandom = randomFrom(10);
getRandom.next().value; // 返回随机的一个数
那么在异步操作方面如何使用生成器解决呢？
继续以上面的文件读取代码为例子：

~~~js
function read(path) {
return new Promise((resolve, reject) => {
fs.readFile(path, ‘utf8’, (err, data) => {
if(err) reject(err);
resolve(data);
});
});
}
function* readGenerator(path){
let dataA = yield readFile(path);
let dataB = yield readFile(dataA);
let result = yield readFile(dataB);
yield result
}
let gen = readGenerator(A)
gen.value.then(function(dataA){
return gen.next(dataA);
}).then(function(dataB){
return gen.next(dataB);
}).then(function(resuly){
console.log(result);
});
~~~

*Generator*更多地是用在异步流程控制上。

## async/await

------

async/await是ES7提出的一种异步解决方案，它相当于Generator + 执行器的语法糖，就目前来说，是最佳的异步解决方案，真正实现了异步代码，同步表示。
首先，async用于标识一个函数，这个函数的任何返回结果都会被包装成一个Promise实例，同时，对于Promsie实例，使用await来进行解析。
使用方式也很简单，创建一个async标识的函数，表明这个函数内部将执行异步操作，对于函数内部的异步操作，使用await来标识，await可以看作是一个Promise的状态解析器，即自动调用Promise实例的then方法并将结果取出来。
使用async/await改进上面的Generator代码：

~~~js
function read(path) {
return new Promise((resolve, reject) => {
fs.readFile(path, ‘utf8’, (err, data) => {
if(err) reject(err);
resolve(data);
});
});
}
const asyncReadFile = async function (path) {
let dataA = await readFile(path);
let dataB = await readFile(dataA);
let result = await readFile(dataB);
console.log(result);
};
~~~



可以看到，代码书写完全和同步代码一样，非常的优雅，不仅可读性强，更利于维护。
