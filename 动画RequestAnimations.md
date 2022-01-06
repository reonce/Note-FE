# 动画RequestAnimationFrame与canvas

早期的动画是用`setInterval()`做的，存在不精确的缺陷。

现在一般显示器的屏幕刷新率是60Hz，基本上意味着每秒需要重绘60次。很多浏览器会限制重绘频率，不超过显示屏的刷新率，因为超过**刷新率用户也感知不到**

因此实现平滑动画最佳的重回间隔是1000毫秒/60，大约17毫秒。

无论是`setInterval`还是`setTimeout`，由于时间循环机制的存在，它们都是不精确的，再加上早起浏览器的计时器精度很差，基本上是雪上加霜的，现在好很多，现在Chrome大约是4毫秒。

### RequestAnimationFrame()

**RequestAnimationFrame()函数**就是修改DOM样式以反映下一次重绘有什么变化的地方，直白说就是在下一次绘制之前，先执行你的函数，更新你的动画。RequestAnimationFrame()只会调用一次传入的函数，所以每次更新用户界面时再手动调用它一次。

`cancleAnimationFram()`可以取消执行动画的绘制

```js
let requestId = window.requestAnimationFrame(() => {
	console.log('Repaint');
});
window.cancleAnimationFrame(requestID);
```
#### 节流

正常触发一个滚动事件，会执行很多次函数。

```js
function extendFn() {
    console.log(Date.now())
}

// 这样做时，当你滚动会发生非常多的打印
window.addEventListener('scroll', ()=> {
    extendFn()
})
```

通过requestAnimationFrame函数绘制改变一个标识符，会好一点，但是仍然很多。

```js
let enqueued = false;

function extendFn() {
    console.log(Date.now());
  	enqueued = false;
}

// 这样做时，要好一些，但是17毫秒打印一次也很多，称不上节流
window.addEventListener('scroll', ()=> {
    if(!enqueued) {
      enqueued = true;
      requestAnimationFrame(extendFn);
    }
})
```

最佳做法是添加一个计时器，达到节流的效果。

```js
let enabled = true;

function extendFn() {
    console.log(Date.now());
}

// 这样做时，要好一些，但是17毫秒打印一次也很多，称不上节流
window.addEventListener('scroll', ()=> {
    if(enabled) {
      enabled = false;
      requestAnimationFrame(extendFn);
      window.setTimeout(() => enabled =  true, 500);
    }
})
```

~~~js
function throttle(fn, time) {
  let pre = Date.now();
  return function () {
    const that = this;
    let nowDate = Date.now();
    if(nowDate - pre >=time) {
      fn.apply(that, arguments);
      pre = Date.now();
    }
  }
}

function logTime() {
  console.log(Date.now())
}

window.addEventListener('scroll', throttle(logTime, 500))
~~~

