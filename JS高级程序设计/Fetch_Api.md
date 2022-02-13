# Fetch Api

​	Fetch API能够执行XMLHttpRequest对象的所有任务，但更容易使用，接口也更现代化。



## 基本用法

`fetch()`方法是暴露在全局作用域的。

1. **分派请求**

​	`fetch()`只有一个必须的参数input。多数情况下，这个参数是要获取资源的URL。这个方法返回一个Promise对象：

~~~js
let r = fetch('/bar');
console.log(r); // Promise <pending>
r.then(response => {
    console.log(response.status); // 200
})
~~~

URL的格式与XHR对象的一样。

通常状态码为200就会被认为成功了，其他情况可以被认为未成功。为了区分这种情况，可以在状态码非200~299时检查Response对象的ok属性：

~~~js
fetch('/bar').then(response => {
    console.log(response.status); // 200
    console.log(response.ok); // true
})
~~~

2. **自定义选项**

   **body**，请求体内容，必须是Blob、Buffer Source、Form DATa、URLSearchParams、ReadableStream或String的实例

   **cache**，用于控制浏览器与HTTP缓存的交互。请求的redirect属性值必须是“follow”，具有以下几个值：

   1. Default 默认的
      + fetch()返回命中的有效缓存。不发送请求
      + 命中无效（stale）缓存会发送条件式请求。如果响应已改变，则更新缓存的值。然后fetch()返回缓存的值。
      + 未命中缓存会发送请求，并缓存响应。然后fetch（）返回响应。
   2. no-store，浏览器忽略缓存
      + 浏览器不检查缓存，直接发送请求
      + 不缓存响应，直接通过fetch()返回
   3. reload，浏览器始终正常发送请求，但是会更新缓存
      + 浏览器不检查缓存，直接发送请求
      + 缓存响应，再通过fetch()返回
   4. no-cache，存在误导，作用是不论缓存是新鲜还是腐败的，都要请求去校验，再提供响应。
      + 无论命中有效/无效缓存都会发条件式请求。如果响应已改变，则更新缓存的值。然后fetch()返回缓存的值。
      + 未命中缓存会发送请求，并缓存响应，然后fetch（）返回响应。
   5. force-cache，暴力缓存，有就用，不管新旧。
      + 无论命中缓存是有效/无效的，都通过fetch()返回，不发送请求。
      + 未命中缓存会发送请求，并缓存响应，然后fetch（）返回响应。

   wip: ['13:35'](https://www.bilibili.com/video/BV1p541177F4?p=15)

