# Fetch Api

​	Fetch API能够执行XMLHttpRequest对象的所有任务，但更容易使用，接口也更现代化。



## 基本用法

`fetch()`方法是暴露在全局作用域的。

#### 一.**分派请求**

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

#### 二.**自定义选项**

**body**，请求体内容，必须是Blob、Buffer Source、Form Data、URLSearchParams、ReadableStream或String的实例

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

**redirect**, 用于指定如何处理重定向响应（301、302、303、307或308）

1. 默认值 follow, 跟踪重定向请求，以最终非重定向URL的响应作为最终响应
2. error：重定向请求会抛出错误
3. manual：不跟踪重定向请求，而是返回opaqueredirect类型的响应，同时依然暴露期望的重定向URL。允许手动方式跟踪重定向

**referrer**，用于指定HTTP的Referer头部的内容，必须时以下字符串值之一：

1. no-referrer: 以no-referrer作为值
2. client/about:client:以当前URL或no-referrer(取决于来源策略referrerPolicy)作为值
3. <URL>:以伪造URL作为值。伪造URL的源必须与执行脚本的源匹配

#### 三、常见的Fetch请求模式

与XMLHttpRequest一样，fetch()既可以发送数据也可以接受数据。使用init对象参数，可以配置fetch（）在请求体中发送各种序列化的数据。

1. ##### 发送JSON数据

   可以像下面这样发送简单JSON字符串：

   ```js
   let payload = JSON.stringify({
     foo: 'bar'
   });
   
   let jsonHeaders = new Headers({
     'Content-Type': 'application/json'
   });
   
   fetch('send-me-json', {
     method: 'POST',
     body: payload,
     headers:jsonHeaders
   })
   ```

2. ##### 在请求体中发送参数

   因为请求体支持任意字符串值，所以可以通过它发送请求参数：

   ```js
   let payload = 'foo=bar&baz=qux';
   
   let paramHeaders = new Headers({
     'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
   })
   
   fetch('send-me-json', {
     method: 'POST',
     body: payload,
     headers:paramHeaders
   })
   ```

3. ##### 发送文件

   因为请求体支持FormData实现，所以fetch（）也可以序列化并发送文件字段中的文件：

   ```js
   let imageFormData = new FormData();
   let imageInput = docment.querySelector("input[type='file']");
   
   imageFormData.append('image', imageInput.files[0]);
   
   fetch('/img-upload', {
     method: 'POST',
     body: imageFormData
   })
   // 这个fetch()实现可以支持多个文件：
   let imageFormData = new FormData();
   let imageInput = document.querySelector("input[type='file'][multiple]");
   
   for(let i = 0; i < imageInput.files.length; ++i) {
     imageFormData.append('image', imageInput.files[i]);
   }
   ```

4. ##### 加载Blob文件

   FetchAPI也能提供Blob类型的响应，而Blob又可以兼容多种浏览器API。一种常见的做法是将突破文件加载到内存，然后将其添加到HTML图片元素。为此，可以使用响应对象上暴露的blob()方法。这个方法返回一个promise对象，解决为一个Blob的实例。然后将这个实例传给URL.createObjectUrl()以生成可以添加给图片元素src属性的值：

   ```js
   const imageElement = document.querySelector('img');
   
   fetch('my-image.png').then(res => {
     res.blob()
   }).then(blob => {
     imageElement.src = URL.createObjectURL(blob);
   })
   ```

5. ##### 发送跨源请求

   从不同的源请求资源，响应要包含CORS头部才能保证浏览器收到响应。没有这些头部，跨源请求会失败并抛出错误。

   设置 `access-control-allow-origin`允许跨域请求的地址。

   ```js
   // 其他的一些
   Access-Control-Allow-Methods:POST,GET
   Access-Control-Allow-Credentials:true
   Access-Control-Allow-Headers:Origin,Content-Type,Accept,token,X-Requested-With
   ```

   ~~~js
   // 不加配置
   fetch('//cross-origin.com');
   // TypeError: Failed to fetch
   // No 'Access-Control-Allow-Origin' header is present on the requested resource.
   ~~~

6. ##### 中断请求

   FetchAPi请求通过`AbortController/AbortSignal`对中断请求。调用AbortController.abort()会终端所有网络传输。终端进行中的fetch（）请求会导致包含错误的拒绝。

   ```js
   let abortController = new AbortController();
   
   fetch('wikipedia.zip', {
     signal: abortController.signal
   }).catch(() => {
   	console.log('abortes!')
   })
   
   // 10毫秒后中断请求
   setTimeout(() => {
     abortController.abort()
   }, 10)
   ```

   

