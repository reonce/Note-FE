# html+css

盘点记录一些面试题，开始刷题了 7.2。目录如下：

细说一下css盒模型

[[MDN]](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/The_box_model#%E5%9D%97%E7%BA%A7%E7%9B%92%E5%AD%90%EF%BC%88block_box%EF%BC%89_%E5%92%8C_%E5%86%85%E8%81%94%E7%9B%92%E5%AD%90%EF%BC%88inline_box%EF%BC%89)官方盒模型解读

在css中，广泛使用的是 块级盒子（Block box）和 内联盒子（inline box）

[块级盒子和内联盒子](html+css%20231ff6a1cad748458b80f60f60c8a2e0/%E5%9D%97%E7%BA%A7%E7%9B%92%E5%AD%90%E5%92%8C%E5%86%85%E8%81%94%E7%9B%92%E5%AD%90%20e6220aa45e6a42e98210cc8afdb588d6.md)

完整的盒模型应用在快级盒子上，主要分为 **标准盒模型**和**IE盒模型**

CSS 中组成一个块级盒子需要：

- **Content box**: 这个区域是用来显示内容，大小可以通过设置 `[width](https://developer.mozilla.org/zh-CN/docs/Web/CSS/width)` 和 `[height](https://developer.mozilla.org/zh-CN/docs/Web/CSS/height)`.
- **Padding box**: 包围在内容区域外部的空白区域； 大小通过 `[padding](https://developer.mozilla.org/zh-CN/docs/Web/CSS/padding)` 相关属性设置。
- **Border box**: 边框盒包裹内容和内边距。大小通过 `[border](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border)` 相关属性设置。
- **Margin box**: 这是最外面的区域，是盒子和其他元素之间的空白区域。大小通过 `[margin](https://developer.mozilla.org/zh-CN/docs/Web/CSS/margin)` 相关属性设置。**[标准盒模](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/The_box_model#%E6%A0%87%E5%87%86%E7%9B%92%E6%A8%A1%E5%9E%8B)**

![Untitled](html+css%20231ff6a1cad748458b80f60f60c8a2e0/Untitled.png)

### [标准盒模型](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/The_box_model#%E6%A0%87%E5%87%86%E7%9B%92%E6%A8%A1%E5%9E%8B)

在标准模型中，如果你给盒设置 `width` 和 `height`，实际设置的是 *content box*。 padding 和 border 再加上设置的宽高一起决定整个盒子的大小。

### [替代（IE）盒模型](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/The_box_model#%E6%9B%BF%E4%BB%A3%EF%BC%88ie%EF%BC%89%E7%9B%92%E6%A8%A1%E5%9E%8B)

你可能会认为盒子的大小还要加上边框和内边距，这样很麻烦，而且你的想法是对的 ! 因为这个原因，css 还有一个替代盒模型。使用这个模型，所有宽度都是可见宽度，所以内容宽度是该宽度减去边框和填充部分。

也就是它最终呈现的“content”包含了padding和border

默认浏览器会使用标准模型。如果需要使用替代模型，您可以通过为其设置 `box-sizing: border-box` 来实现。 这样就可以告诉浏览器使用 `border-box` 来定义区域，从而设定您想要的大小。

`.box {
  box-sizing: border-box;
}`

# 列举你知道的行内元素和块级元素，图片属于什么

## 块级元素

**div、p、h1-h6、form、ul、ol、dl、dt、dd、li、table、tr、td、th、hr、blockquote、address、table、menu、pre**

**HTML5：header、section、article、footer等等**

块级元素的几个特点：

1. 块级元素独占一行，当没有设置宽高时，它默认设置为100%
2. 块级元素允许设置宽高，width、height、margin、padding、border都可控制
3. 块级元素可以包行内元素、块级元素通过图片能够得到块级元素的几个特点：

## 行内元素（内联元素）及行内块元素

span、img、a、label、code、input、abbr、em、b、big、cite、i、q、textarea、select、small、sub、sup，strong、u

button（display：inline-block）

行内元素特点：

1. 行内元素不能独占一行，与其他行内元素排成一行
2. 行内元素不能设置width、height、margin、padding
3. 行内元素默认宽度为其content宽度
4. 行内元素只能包括文字或行内元素、行内块元素，不能包括块级元素
5. display：inline-block：行内块元素与行内元素属性基本相同即不能独占一行，但是可以设置width及height

有一些特别的行内元素可以设置宽高

替换元素：<img>、<input>、<textarea>、<select>、<object>

这些元素与其他行内元素不同的是，它有内在尺寸。因为它像是一个框，比如img元素，他能显示出图片是由于src的值，在审查元素时就不能直接看到图片，而input是输入框或是复选框也是因为其type的不同。

这种需要通过属性值显示的元素，其本身是一个空元素，像一个空的框架。

如上，图片属于一种特别的行内元素

# doctype的作用

DOCTYPE是Document Type(文档类型的）的简写。在HTML代码中，用来说明当前代码用的XHTML或者HTML是哪一种规范。

在制作网页的时候，必须告诉浏览器你所写的HTML代码使用了哪一种规范，才可以正确的显示网页。如果没有说明自己HTML代码所采用的何种规范，浏览器将以**怪异模式**解析网页代码，这样就可能无法正常的将网页显示在浏览器上，不同的浏览器怪异模式差别不同，所显示出网页也不同。

## DOCTYPE的用法

- <!DOCTYPE> 声明处于 <html> 标签之前
- DOCTYPE声明必须放在每一个XHTML文档最顶部，在所有代码和标识之上
- <!DOCTYPE> 声明没有结束标签
- <!DOCTYPE> 声明对大小写不敏感

例：

`<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta http-equiv="X-UA-Compatible" content="ie=edge"><title>Document</title></head><body>
    hello world
</body></html>`

现代的浏览器一般都有两种渲染模式：**标准模式**和**怪异模式**。在**标准模式**下，浏览器按照HTML与CSS标准对文档进行解析和渲染；而在**怪异模式**下，浏览器则按照旧有的非标准的实现方式对文档进行解析和渲染。这样的话，对于旧有的网页，浏览器启动怪异模式，就能够使得旧网页正常显示；对于新的网页，则可以启动标准模式，使得新网页能够使用HTML与CSS的标准特性。

# link和@import的区别

### 1.从属关系区别

`@import`是 CSS 提供的语法规则，只有导入样式表的作用；`link`是HTML提供的标签，不仅可以加载 CSS 文件，还可以定义 RSS、rel 连接属性等。

### 2.加载顺序区别

加载页面时，`link`标签引入的 CSS 被同时加载；`@import`引入的 CSS 将在页面加载完毕后被加载。

### 3.兼容性区别

`@import`是 CSS2.1 才有的语法，故只可在 IE5+ 才能识别；`link`标签作为 HTML 元素，不存在兼容性问题。

可以通过 JS 操作 DOM ，插入`link`标签来改变样式；由于DOM方法是基于文档的，无法使用`@import`的方式插入样式。

**4.异步加载**

@import 是同步的 GUI渲染页面的时候遇到@import会等它获取新的样式回来后继续渲染

link是异步操作 遇到link不会开辟新的HTTP线程去获取资源 GUI继续渲染页面；

> 它们并没有权重上的区别。但是由于渲染机制（异步渲染）的影响。link标签会层叠渲染到@import上，造成好像它的权重高一点，实际上，只是样式覆盖了。
> 

# 如何实现图片压缩，png如何转化为jpg，png8，png24，png32区别

[张鑫旭原文](https://juejin.cn/post/6844903713929166855)

要想使用JS实现图片的压缩效果，原理其实很简单，核心API就是使用`canvas`的`drawImage()`方法。Canvas本质上就是一张位图，而`drawImage()`方法可以把一张大大的图片绘制在小小的Canvas画布上，不久等同于图片尺寸压缩了？

对于本案例的压缩，使用的5个参数的API方法：

```
context.drawImage(img, dx, dy, dWidth, dHeight);
```

各参数具体含义可以参见“[Canvas API中文文档-drawImage](https://www.canvasapi.cn/CanvasRenderingContext2D/drawImage)”，这里不展开。**举例：**一张图片（假设图片对象是`img`）的原始尺寸是4000*3000，现在需要把尺寸限制为400*300大小，很简单，原理如下代码示意：

```
var canvas = document.createElement('canvas');
var context = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 300;
// 核心JS就这个
context.drawImage(img,0,0,400,300);
```

把大图片画在一张小画布上，压缩就这么实现了，是不是简单的有点超乎想象。

### 如果想要上传或下载？

如果想要上传图片或者下载图片，可以使用`canvas.toDataURL()`或者`canvas.toBlob()`方法先进行转换。

**1. canvas.toDataURL()**

语法如下：

```
canvas.toDataURL(mimeType, qualityArgument)
```

可以把画布转换成base64格式信息图像信息，纯字符的图片表示法。

其中：`mimeType`表示`canvas`导出来的`base64`图片的类型，默认是png格式，也即是默认值是`'image/png'`，我们也可以指定为jpg格式`'image/jpeg'`或者webp等格式。`file`对象中的`file.type`就是文件的mimeType类型，在转换时候正好可以直接拿来用（如果有file对象）。`qualityArgument`表示导出的图片质量，只要导出为`jpg`和`webp`格式的时候此参数才有效果，默认值是`0.92`，是一个比较合理的图片质量输出参数，通常情况下，我们无需再设定。更多关于toDataURL()方法的信息可以参见“[Canvas API中文文档-toDataURL()](https://link.juejin.cn/?target=https%3A%2F%2Fwww.canvasapi.cn%2FHTMLCanvasElement%2FtoDataURL)”。

**2. canvas.toBlob()方法**

语法如下：

```
canvas.toBlob(callback, mimeType, qualityArgument)
```

可以把画布转换成[Blob文件](https://link.juejin.cn/?target=http%3A%2F%2Fwww.zhangxinxu.com%2Fwordpress%2F2013%2F10%2Funderstand-domstring-document-formdata-blob-file-arraybuffer%2F)，通常用在文件上传中，因为是二进制的，对后端更加友好。

和`toDataURL()`方法相比，`toBlob()`方法是异步的，因此多了个`callback`参数，这个`callback`回调方法默认的第一个参数就是转换好的`blob`文件信息，本文一开始的demo案例中的文件上传就是将`canvas`图片转换成二进制的`blob`文件，然后再`ajax`上传的，代码如下：

```
// canvas转为blob并上传
canvas.toBlob(function (blob) {
  // 图片ajax上传
  var xhr = new XMLHttpRequest();
  // 开始上传
  xhr.open("POST", 'upload.php', true);
  xhr.send(blob);
});
```