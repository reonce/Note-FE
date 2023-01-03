# 概念
BOM是浏览器对象模型，核心是window对象，表示浏览器的实例。
## Global作用域
用var声明的变量和方法会自动声明到全局作用域，let和const不行
## 窗口关系和位置
`top`始终指向最上层的窗口，即浏览器窗口本身。而`parent`对象始终指向当前窗口的父窗口，如果当前窗口是最上层窗口，则parent等于top（等于window)。
`self`对象是终极window对象，它是为了和top、parent保持一致。
`moveTo`和`moveBy`可以移动窗口位置。它们都接受两个参数，表示移动的x和y，单位都是px。前者是移动到新位置的坐标，后者是相对于当前坐标移动多少。
### 像素比
window。devicePixelRatio属性提供了分辨率缩放的倍数功能。例如在物理分辨率1920*1080的屏幕下展示逻辑分辨率为640*320，它的值就是3。
## 窗口大小 

现代浏览器都支持4个属性：innerWidth、innerHediht、outerWidth、outerHeight

前两个表示当前浏览器窗口的视口大小，后两个表示浏览器自身的窗口大小

document.documentElement.clientWidth和document.documentElement.clientHeight会返回当前页面视口的宽度和高度

获取页面视口大小的方法：

~~~js
let pageWidth = window.innerWidth, pageHeight = window.innerHeight;
// 如果没获取到视口大小的值
if(typeof pageWidth !== 'number') {
  // CSS1Compat表示标准模式，BackCompat表示怪异模式
  if(document.compatMode === 'CSS1Compat') {
    pageWidth = document.documentElement.clientWidth;
    pageHeight = document.documentElement.clientheight;
  } else {
    pageWidth = document.body.clientWidth;
    pageHeight = document.body.clientheight;
  }
}
~~~

`resiezeTo`和`resizeBy`方法可以调整窗口大小，这两个方法都接收两个参数。前者接收要调整到的尺寸宽度和高度，后者接收相对现在尺寸要缩放多少（可以是负值）

和移动窗口的方法一样，调整窗口大小的方法可能被浏览器禁用。

## documnet和window的区别

`documnet` 是 `window`的一部分，属于被包含关系。

document 指窗体，表示页面文档创建的一个对象，它是一个只读属性

window 指窗体，表示的是浏览器的实例

用户不能改变 document.location(因为这是当前显示文档的位置)。但是可以改变 window.location (用其它文档取代当前文档)window.location 本身也是一个对象, 而 document.location 不是对象。

## window.open 导航和打开新窗口

`window.open`可接收四个参数：要加载的URL、目标窗口、特性字符串和表示新窗口在浏览器历史记录中是否替代当前加载页（boolean）

特性字符串选项有很多都被禁用了，可配置的包括窗口大小、窗口高度、是否显示地址栏/菜单栏等，书中在P365

可以用一个值接收它，并进行操作（同样很多操作都被浏览器禁止了）

~~~js
let wroWin = window.open('http://xxxx', 'trowWindow',"...");
// 缩放
wroWin.resizeTo(100, 100)
// 关闭窗口，需要经过用户确认
wroWin.close()
console.log(worWin.closed) // true
// 指向window的指针
wroWin.opener === window   //true
// 切断与原始页面的联系,独立占用进程
wroWin.opener = null
~~~

