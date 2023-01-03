![image-20220202223345035](/Users/jaydonyin/Library/Application Support/typora-user-images/image-20220202223345035.png)

## `<Script>`元素

### crossorigin 

> 涉及到的元素  1.script 2.link 3.img 4.audio 5.video

当浏览器请求这些标签的时候，可以配置跨源

**跨源** origin由三部分组成

源指的是 协议、域名、端口。 即1.protocol 2.domain  3.port

可以通过设置“凭据模式”：

1. `ananymous` 表示不包含凭据，就是不设置cookie，跨源的时候不在请求中附加值，保持匿名请求
2. `use-credentials`表示在请求中包含凭据，cookie、tls证书、http认证（用户身份）
3. 不设置这个属性，或者值是""，相当于`ananymous`

#### intergrity

完整性。涉及子资源完整性，子资源指通过html页面引用的外部资源。

为了防止外部攻击篡改子资源。

## 可以跟上一个散列值算法和base64编码的散列值等，浏览器拿到这个值之后，用第三方服务器返回回来的它自己计算的散列值和intergrity上的匹配，如果相等就显示，否则返回网络错误。

 这个值能确保我们使用第三方值，没有被篡改过。

#### async和defer

![image-20220202224841686](/Users/jaydonyin/Library/Application Support/typora-user-images/image-20220202224841686.png)

1. Parser 表示html引擎的解析，解析html文档的解析器。
2. Fetch 表示获取脚本资源。
3. Execution 执行脚本依赖等。



`defer`属性会异步加载脚本，但是执行脚本是同步的

`async`属性是异步加载和异步执行，加载完成脚本之后就执行

`type=module`默认是使用`defer`的，从入口文件开始，碰到依赖后，加载依赖，加载完依赖之后，再回到入口文件。  如果不依赖html文档文件的话，可以在加上`async`标签，加载完文件之后就可以执行execution。
