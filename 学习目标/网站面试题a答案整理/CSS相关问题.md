# **CSS 相关问题**

## **CSS 选择器的优先级是如何计算的？**

浏览器通过优先级规则，判断元素展示哪些样式。优先级通过 4 个维度指标确定，我们假定以`a、b、c、d`命名，分别代表以下含义：

1. `a`表示是否使用内联样式（inline style）。如果使用，`a`为 1，否则为 0。
2. `b`表示 ID 选择器的数量。
3. `c`表示类选择器、属性选择器（[a[href^="#"]](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Attribute_selectors)）和伪类选择器（a:hover）数量之和。
4. `d`表示标签（类型）选择器和伪元素选择器（::before）之和。

优先级的结果并非通过以上四个值生成一个得分，而是每个值分开比较。`a、b、c、d`权重从左到右，依次减小。判断优先级时，从左到右，一一比较，直到比较出最大值，即可停止。所以，如果`b`的值不同，那么`c`和`d`不管多大，都不会对结果产生影响。比如`0，1，0，0`的优先级高于`0，0，10，10`。

当出现优先级相等的情况时，最晚出现的样式规则会被采纳。如果你在样式表里写了相同的规则（无论是在该文件内部还是其它样式文件中），那么最后出现的（在文件底部的）样式优先级更高，因此会被采纳。

在写样式时，我会使用较低的优先级，这样这些样式可以轻易地覆盖掉。尤其对写 UI 组件的时候更为重要，这样使用者就不需要通过非常复杂的优先级规则或使用`!important`的方式，去覆盖组件的样式了。

## 请问 “resetting” 和 “normalizing” CSS 之间的区别？你会如何选择，为什么？

### resetting 和 normalizing（默认样式重置）出现的原因

在常用的几个主流浏览器中， 当我们没有给html元素设置样式时，这些浏览器会根据自己的默认样式对html元素进行布局，但是由于每个浏览器的默认布局样式不同， 会导致元素的展示方式出现差异，从而使同一页面在不同浏览器中的展示出现差异。

使用CSS样式重置这一方式，就可以使网页展示效果保持 一致。

### 什么是CSS RESET

在HTML标签在浏览器里有默认的样式，例如 p 标签有上下边距，strong标签有字体加粗样式，em标签有字体倾斜样式。不同浏览器的默认样式之间也会有差别，例如ul默认带有缩进的样式，在IE下，它的缩进是通过margin实现的，而Firefox下，它的缩进是由padding实现的。

在切换页面的时候，浏览器的默认样式往往会给我们带来麻烦，影响开发效率。

所以解决的方法就是一开始就将浏览器的默认样式全部去掉，更准确说就是通过重新定义标签样式。“覆盖”浏览器的CSS默认属性。

最简单的说法就是把浏览器提供的默认样式覆盖掉！这就是CSS reset。

### CSS Reset的作用

CSS Reset让各个浏览器的CSS样式有一个统一的基准，而实现这一基准最主要的方式就是“清零”。

举例：

```
* { outline: 0; padding: 0; margin: 0; border: 0; } 
```

其中 * 就是常说的通配符，意思是“所有的”。使用 * 代表所有的标签或元素，就叫做通配符选择器。

由于 * 会匹配所有的元素，所以当浏览器解析到 * 时，会将页面内的所有标签都进行如上的样式重置， 这样会影响网页渲染的时间，所以使用 * 时一定要慎重，尽量不要在样式重置时应用 * 。

### 什么是NORMALIZE

Normalize.css 只是一个很小的CSS文件，但它在默认的HTML元素样式上 提供了跨浏览器的高度一致性。相比于传统的CSS reset，Normalize.css 是一种现代的、为HTML5准备的优质替代方案。

Normalize.css现在已经被 用于Twitter Bootstrap、HTML5 Boilerplate、GOV.UK、Rdio、CSS Tricks 以及许许多多其他框架、工具和网站上。

### normalize创造的目的

- 保护有用的浏览器默认样式而不是完全去掉它们
- 一般化的样式：为大部分HTML元素提供
- 修复浏览器自身的bug并保证各浏览器的一致性
- 优化CSS可用性：用一些小技巧
- 解释代码：用注释和详细的文档来

### RESET和NORMALIZE的区别：

1. Normalize.css 保护了有价值的默认值，Reset通过为几乎所有的元素施加默认样式，强行使得元素有相同的视觉效果。 相比之下，Normalize.css保持了许多默认的浏览器样式。这就意味着你不用再 为所有公共的排版元素重新设置样式。当一个元素在不同的浏览器中有不同的默认值时， Normalize.css会力求让这些样式保持一致并尽可能与现代标准相符合。
2. Normalize.css 修复了浏览器的bug，它修复了常见的桌面端和移动端浏览器的bug。 这往往超出了Reset所能做到的范畴。关于这一点， Normalize.css修复的问题包含了HTML5元素的显示设置、 预格式化文字的font-size问题、在IE9中SVG的溢出、许多 出现在各浏览器和操作系统中的与表单相关的bug。
3. Normalize.css 不会让你的调试工具变的杂乱使用Reset最让人困扰的地方莫过于在浏览器调试工具中大段大段的继承链， 如下图所示。在Normalize.css中就不会有这样的问题，因为在我们的准则中 对多选择器的使用时非常谨慎的，我们仅会有目的地对目标元素设置样式。
4. Normalize.css 是模块化的这个项目已经被拆分为多个相关却又独立的部分， 这使得你能够很容易也很清楚地知道哪些元素被设置了特定的值。 因此这能让你自己选择性地移除掉某些永远不会用到部分（比如表单的一般化）。
5. Normalize.css 拥有详细的文档Normalize.css的代码基于详细而全面的跨浏览器研究与测试。 这个文件中拥有详细的代码说明并在Github Wiki中有进一步的说明。 这意味着你可以找到每一行代码具体完成了什么工作、为什么要写这句代码、 浏览器之间的差异，并且你可以更容易地进行自己的测试。

总得来说，

CSS Reset 是革命党 ，CSS Reset 里最激进那一派提倡不管你有用没用， 通通给我脱了衣服，于是 *{margin:0;} 等等运动，把人家全拍了。看似是众生平等了， 实则是浪费了资源又占不到便宜，有求于人家的时候还得给加回去，实在需要人家的默认 样式了怎么办？自己看着办吧。

Normalize.css 是改良派。他们提倡，各个元素都有其存在的道理， 简单粗暴地一视同仁是不好的。谁都有谁的作用，给他们制定个规范，确保他们 在任何浏览器里都干好自己的活儿就好了。

### 如何选择

一切从需求出发

- 如果要使用reset。则尽量不要去直接拷贝CSS reset的代码， 自己网站上没用到的不用重置，且无意义的重置不要 （比如div本不需要{margin：0；padding：0}）， 尽量保证用到的重置是高效简洁的；
- 如果要使用normalize，可以将normalize.css作为自己项目的基础CSS， 自定义样式值来满足自己的需求。(例如去掉a标签自带的下划线和p标签的自带的margin）
- 如果选择不用，可以根据自己需要的再去设置改变，或者写一段适合自己的修改默认样式的代码。

## 请解释浮动 (Floats) 及其工作原理。

浮动（float）是 CSS 定位属性。浮动元素从网页的正常流动中移出，但是保持了部分的流动性，会影响其他元素的定位（比如文字会围绕着浮动元素）。这一点与绝对定位不同，绝对定位的元素完全从文档流中脱离。

CSS 的`clear`属性通过使用`left`、`right`、`both`，让该元素向下移动（清除浮动）到浮动元素下面。

如果父元素只包含浮动元素，那么该父元素的高度将塌缩为 0。我们可以通过清除（clear）从浮动元素后到父元素关闭前之间的浮动来修复这个问题。

有一种 hack 的方法，是自定义一个`.clearfix`类，利用伪元素选择器`::after`清除浮动。另外还有一些方法，比如添加空的`<div></div>`和设置浮动元素父元素的`overflow`属性。与这些方法不同的是，`clearfix`方法，只需要给父元素添加一个类，定义如下：

.clearfix::after { content: ""; display: block; clear: both; }

值得一提的是，把父元素属性设置为`overflow: auto`或`overflow: hidden`，会使其内部的子元素形成块格式化上下文（Block Formatting Context），并且父元素会扩张自己，使其能够包围它的子元素。

## 描述`z-index`和叠加上下文是如何形成的。

z-index只对定位元素起效，在不同层级展示

个人认知z-index不算是一种很好的设计，数字的设计很容易产生混淆，往往顶级图层都是设置一个99999之类的大数字，我认为应该提供分层级+数字的组合方案。



## 请描述 BFC(Block Formatting Context) 及其如何工作。

### 概念

> **块格式化上下文（Block Formatting Context，BFC）**
 是 Web 页面的可视 CSS 渲染的一部分，是块级盒子的布局过程发生的区域，也是浮动元素与其他元素交互的区域。

列举几个触发`BFC`使用的`CSS`属性

- **`overflow: auto`**
- **`display: flow-root`**
- overflow: hidden
- display: inline-block
- position: absolute
- position: fixed
- display: table-cell
- display: flex

使用它们中的一种时，元素就会被设置为BFC。

**使用 `overflow: auto`**

在创建包含浮动元素的 BFC 时，通常的做法是设置父元素 `overflow: auto` 或者其它除默认的 `overflow: visible` 以外的值。`<div>` 元素变成布局中的迷你布局，任何子元素都会被包含进去。使用 `overflow` 创建新的 BFC，是因为 `overflow` 属性会告诉浏览器应该怎样处理溢出的内容。如果使用它仅仅为了创建 BFC，你可能会遇到不希望出现的滚动条或阴影，需要注意。

**使用 `display: flow-root`**

一个新的 `display` 属性的值，它可以创建无副作用的 BFC。在父级块中使用 `display: flow-root` 可以创建新的 BFC。

给 `<div>` 元素设置 `display: flow-root` 属性后，`<div>` 中的所有内容都会参与 BFC，浮动的内容不会从底部溢出。

你可以从 `flow-root` 这个值的名字上看出来，它创建一个新的用于流式布局的上下文，类似于浏览器的根（`html`）元素。

### 为了解决什么

- **高度塌陷**
- **外边距重叠 [[MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Box_Model/Mastering_margin_collapsing)]**
  
    块的[上外边距 (margin-top)](https://developer.mozilla.org/zh-CN/docs/Web/CSS/margin-top)和[下外边距 (margin-bottom)](https://developer.mozilla.org/zh-CN/docs/Web/CSS/margin-bottom).
    有时合并 (折叠) 为单个边距，其大小为单个边距的最大值 (或如果它们相等，则仅为其中一个)，这种行为称为**边距折叠**
    。
    

看一个塌陷的例子：

```tsx
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>高度塌陷</title>
    <style>
        .box {
            margin: 100px;
            width: 100px;
            height: 100px;
            background: red;
            float: left;
        }
        .container {
            background: #000;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="box"></div>
        <div class="box"></div>
    </div>
</body>
</html>
```

这时候，页面并没有呈现出黑色，因为子元素使用了float，脱离了正常的文档流，导致实际上

`container` 并没有**高度** 

这时候，使用以上的方法给`container` 设置，它就会生成独立的**块格式化上下文**

## 列举不同的清除浮动的技巧，指出各自适用的使用场景

1. 使用空标签清除浮动

结尾处加空div标签clear:both，弊端是增加了无意义标签。

2. 父级添加css属性 overflow:auto
3. 父级div定义height
4. 父级div定义伪类:after(里面写clear:both)

## 最喜欢的图片替换方法是什么，你如何选择使用

- 首先使用图片；然后给图片添加一个alt值，对搜索引擎友好一些。缺点：对搜索引移开文字擎不友好，搜索引擎对于图片alt属性的权重肯定是低于H1的，就算你的图片是放在H1标签里面

```
<h1><img src="image.gif" alt="Image Replacement"></h1> 
```

- 最完善的图文替换技术（最喜欢）：加入空标签,将 H2 的 position 设为 relative ，这样将使 H1 里面的元素定位以 H1 为参照，然后将 SPAN 元素绝对定位，撑满整个 H2 区域，同时将背景图应用在 SPAN 标签里面；这种方法的原理是将 SPAN 标签覆盖在文字内容上面，一旦 SPAN 里面的背景图无法显示，将显示下层的文字内容，不影响正常使用。但是，此方法也有一个缺陷，就是背景图不能透明，否则将透出下面的文字

```html
<h1><span></span>Image Replacement</h1>

h1 {

width: 150px;height: 35px;position: relative; }

h1 span{

position:absolute;

width:100%;

height:100%;

background: url(hello_world.gif) no-repeat
}
```

## 你会如何解决特定浏览器的样式问题？

优雅降级，渐进增强
使用IE条件注释
属性Hack写法
html5shiv.js让老的IE支持HTML5标签，Respond.js让老的IE支持媒体查询
使用CSS reset或者CSS normalize来保证浏览器的统一性

## 如何为有限制的浏览器提供网页

#### 原因：

功能限制的浏览器，比如 IE 低版本、手机浏览器、奇葩国内浏览器，会在很多功能上不符合 Web 标准，而应对的方式有这么几种:

- 只提供符合 Web 标准的页面
- 提供另一个符合那些浏览器标准的页面
- 兼容

##### 兼容:

这里有两种思路，一个是渐进增强，一个优雅降级。
渐进增强的思路就是提供一个可用的原型，后来再为高级浏览器提供优化。
优雅降级的思路是根据高级浏览器提供一个版本，然后有功能限制的浏览器只需要一个刚好能用的版本。
当然，工作中的标准都是尽量满足设计，如果不能满足的话就尽量贴近，不得已（性能之类的问题）才会砍掉某个浏览器版本上的需求。

##### 相关技术

- Media Query
- CSS hack
- 条件判断 除IE外都可识别

## 有哪些隐藏内容的方法

1. display:none;的缺陷

搜索引擎可能认为被隐藏的文字属于垃圾信息而被忽略

屏幕阅读器（是为视觉上有障碍的人设计的读取屏幕内容的程序）会忽略被隐藏的文字，同时不利于搜索引擎。

2. visibility: hidden ;的缺陷

这个大家应该比较熟悉就是隐藏的内容会占据他所应该占据物理空间

3. overflow:hidden;一个比较合理的方法

## 用过那些栅格系统吗

用过antd的

## 如何优化网页的打印样式

我们可以准备2套样式，一套正常的css网页展示的样式，另一套专门给打印的时候用的css样式，只要用户打印，就会通过媒体查询自动用打印的专门样式。这样既可以在浏览器很好展示效果，也不影响具体打印出来的效果。

```
//正常浏览器用的样式
<link rel="stylesheet" type="text/css" media="screen" href="/css/styles.css">

//专门打印用的样式
<link rel="stylesheet" type="text/css" media="print" href="/css/print.css">
```

其汇总**media**指定的属性就是设备，显示器是screen，打印机是print，电视是tv，投影仪是projection。

1.打印机样式表中最好不要用背景图片，因为打印机不能打印CSS中的背景。如要显示图片，请使用html插入到页面中。

2.最好不要使用像素作为单位，因为打印样式表要打印出来的会是实物，所以建议使用pt和cm。

3.隐藏掉不必要的内容。（@print div{display:none;}）

4.打印样式表中最好少用浮动属性，因为他们会消失。

如果想要知道打印样式表的效果如何，直接在浏览器上选择打印预览就可以了。

## 在书写高效 CSS 时会有哪些问题需要考虑？

```
 1.样式是：浏览器是从右向左来解析一个选择器的
 2.ID最快，Universal最慢 有四种类型的key selector，解析速度由快到慢依次是：ID、class、tag和universal
 3.不要tag-qualify （永远不要这样做 ul#main-navigation { } ID已经是唯一的，不需要Tag来标识，这样做会让选择器变慢。）
 4.后代选择器最糟糕（换句话说，下面这个选择器是很低效的： html body ul li a { }）
 5.想清楚你为什么这样写
 6.CSS3的效率问题（CSS3选择器（比如 :nth-child）能够漂亮的定位我们想要的元素，又能保证我们的CSS整洁易读。但是这些神奇的选择器会浪费很多的浏览器资源。）
 7.我们知道#ID速度是最快的，那么我们都用ID，是不是很快。但是我们不应该为了效率而牺牲可读性和可维护性
```

## 使用 CSS 预处理器的优缺点有哪些？

优点：
提高 CSS 可维护性。
易于编写嵌套选择器。
引入变量，增添主题功能。可以在不同的项目中共享主题文件。
通过混合（Mixins）生成重复的 CSS。
Splitting your code into multiple files. CSS files can be split up too but doing so will require a HTTP request to download each CSS file.
将代码分割成多个文件。不进行预处理的 CSS，虽然也可以分割成多个文件，但需要建立多个 HTTP 请求加载这些文件。

缺点：
需要预处理工具。
重新编译的时间可能会很慢。