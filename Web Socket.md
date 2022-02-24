# Web Socket

​	Web Socket目标是通过一个长时连接实现与服务器全双工、双向的通信。

在JS创建它的时候，一个HTTP请求会发送到服务器以初始化连接。

## API

```js
let socket = new WebSocket("ws://www.example.com/server.php")
```

​	注意，必须给WebSocket构造函数传入一个绝对URL，同源策略不适用于Web Socke，因此可以打开到任意站点的连接。至于是否进行页面通信，则完全取决于服务器。

​	浏览器会在初始化WebSocket对象之后立即创建连接。与XHR类似，webSocket也有一个`readyState`属性表示当前状态。但是值和XHR值得不一样。

+ webSocket.OPENING(0): 连接正在建立。以下用“~”代替webSocket。

+ ~.OPEN(1)： 连接已经建立。

+ ~.CLOSING(2)：连接正在关闭。

+ ~.CLOSE(3):连接已经关闭。

  它没有readystatechange事件。

  readyState都是从0开始的，并且任何时候都可以调用close()方法关闭WebSocket连接：

  ~~~js
  socket.close();
  ~~~

  调用close()之后，readyState立即变为2（连接正在关闭），并会在关闭后变为3（连接已关闭）

### 发送和接受数据

​	服务器向客户端发消息时，WebSocket对象上会触发message事件。这个事件和其他消息协议类似，可以通过event.data属性访问到有效载荷：

```js
let socket = new WebSocket("ws://www.example.com/server.php");

let stringData = "Hello world!";
let blobData = new Blob(['f', 'o', 'o']);
// 发送数据
socket.send(stringData);
socket.send(blobData);

// 接收
socket.onmessage = function(event) {
  let data = event.data;
  // 对数据做某些操作
}
```

​	与通过send()方法发送的数据类似，event.data返回的数据也可能是ArrayBuffer或Blob。这由WebSocket对象的binaryType属性决定，该属性可能是”blob“或”arraybuffer“。



## 其他事件

open、error、close，分别在连接成功、发生错误、连接关闭时触发。

```js
let socket = new WebSocket("ws://www.example.com/server.php");
socket.onopen = function() {
  ...
}
socket.error = function() {
  ...
}
socket.close = function() {
  ...
}
```

