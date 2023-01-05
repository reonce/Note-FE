# 跨域执行、HTTP简单复杂请求

# 跨域问题

[https://reonce.github.io/2022/06/11/跨域详解/](https://reonce.github.io/2022/06/11/%E8%B7%A8%E5%9F%9F%E8%AF%A6%E8%A7%A3/)

# **跨域的请求在服务端会不会真正执行？**

## **跨域请求的拦截**

这个问题的答案是看情况。

跨域是浏览器同源策略的影响，对于服务端来说是不受影响的，因此服务端正常来说是正常执行的。

但是，以上是针对的**简单请求。**

还有一种**复杂请求**，它会正常请求之前发送一个**预检请求**

### 会处理的原因之一：

用 `CORS` 去解决跨域的大概原理就是客户端会通过服务端返回的一些 `Header` 去判断该请求是否允许跨域：

[https://mmbiz.qpic.cn/mmbiz_png/e5Dzv8p9XdT4I7sZCLd4Wm7u8s6nlD5ibPfCzWzxBAWdM1jYvXGHT5MBMNYgibxBzz0CpLzBBwGbVq9ibcU6I5Vhw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1](https://mmbiz.qpic.cn/mmbiz_png/e5Dzv8p9XdT4I7sZCLd4Wm7u8s6nlD5ibPfCzWzxBAWdM1jYvXGHT5MBMNYgibxBzz0CpLzBBwGbVq9ibcU6I5Vhw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

比如，`Access-Control-Allow-Origin` 告诉客户端允许请求在哪些 `Origin` 下被发送，这些 `Header` 一般都是我们配在 `Server` 上的。

回到上面的问题，如果请求没发出去，这个 `Header` 是怎么被带回来的呢？浏览器又咋知道 `Server` 允许请求在哪些 `Origin` 下跨域发送呢？

所以，我们又明确了一个信息：请求一定是先发出去，在返回来的时候被浏览器拦截了，如果请求是有返回值的，会被浏览器隐藏掉。

## **预检请求**

那这么说，请求既然被发出去了，服务端又不会拦截，所以一定会被执行喽？

那当然不是，我们再回来把 `CORS` 这张图放大来看：

我们发现，在发送真正的请求之前，浏览器会先发送一个 `Preflight` 请求，也就是我们常说的预检请求，它的方法为 `OPTIONS`。

这也就是为什么有的时候我们明明只发了一个请求，在 `Network` 里却看到两个：

[https://mmbiz.qpic.cn/mmbiz_png/e5Dzv8p9XdT4I7sZCLd4Wm7u8s6nlD5ibtTnSAddDibkmW8Q4kM8UnD4Xzm5NAL8VOibiaNVt3DN003OUiaicXBYO1zA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1](https://mmbiz.qpic.cn/mmbiz_png/e5Dzv8p9XdT4I7sZCLd4Wm7u8s6nlD5ibtTnSAddDibkmW8Q4kM8UnD4Xzm5NAL8VOibiaNVt3DN003OUiaicXBYO1zA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

预检请求有一个很重要的作用就是 `询问` 服务端是不是允许这次请求，如果当前请求是个跨域的请求，你可以理解为：`询问` 服务端是不是允许请求在当前域下跨域发送。

当然，它还有其他的作用，比如 `询问` 服务端支持哪些 HTTP 方法。

## **预检的过程**

当预检请求到达服务端时，服务端是不会真正执行这个请求的逻辑的，只会在这个请求上返回一些 `HTTP Header`，以此来告诉客户端是不是要发送真正的请求。

如果服务端告诉客户端，请求是允许被发送的，那真正的请求才会发出去。

比如：我在 `a.com` 这个 `origin` 下，发送了 `conardli.top` 这个域名的请求。

那么浏览器会先向  `conardli.top`  发送一个预检，预检请求不会真正执行这个域名的请求，而是返回了一些 `CORS Header`，比如 `Access-Control-Allow-Origin: a.com`

这时候浏览器发现， `conardli.top` 的请求是允许在 `a.com` 下发送的，才会真正发出请求。这时服务端才会真正执行请求接口的逻辑。

那么，所有的请求都会有预检吗？当然不是。

## **简单请求和复杂请求**

某些请求不会触发 [CORS 预检请求](https://developer.mozilla.org/zh-CN/docs/Glossary/Preflight_request)。MDN称这样的请求为`简单请求`

浏览器判定请求是否为简单请求要**同时满足以下四个条件**：

- 使用下列方法之一：
    - `GET`
    - `HEAD`
    - `POST`
- 只使用了如下的安全 `Header`，不得人为设置其他 `Header`
    - `text/plain`
    - `multipart/form-data`
    - `application/x-www-form-urlencoded`
    - `Accept`
    - `Accept-Language`
    - `Content-Language`
    - `Content-Type` 的值仅限于下列三者之一：
        - text/plain
        - multipart/form-data
        - application/x-www-form-urlencoded
- 请求中的任意 `XMLHttpRequest` 对象均没有注册任何事件监听器；`XMLHttpRequest` 对象可以使用 `XMLHttpRequest.upload` 属性访问。
- 请求中没有使用 `ReadableStream` 对象。

所以，如果你发送的是一个简单请求，这个请求不管是不是会受到跨域的限制，只要发出去了，一定会在服务端被执行，浏览器只是隐藏了返回值而已。

如果是复杂请求，未通过预检则不进行处理，通过则要处理。

## **总结**

最后来总结下要点：

- 简单请求：不管是否跨域，只要发出去了，一定会到达服务端并被执行，浏览器只会隐藏返回值
- 复杂请求：先发预检，预检不会真正执行业务逻辑，预检通过后才会发送真正请求并在服务端被执行