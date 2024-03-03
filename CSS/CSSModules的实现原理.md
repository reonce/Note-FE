
**# CSS modules的实现原理**

**CSS 的隔离主要有两类方案，一类是运行时的通过命名区分，一类是编译时的自动转换 CSS，添加上模块唯一标识。**

编译时的方案有两种，一种是 scoped，一种是 css modules。

**scoped 是 vue-loader 支持的方案，它是通过编译的方式在元素上添加了 data-xxx 的属性，然后给 css 选择器加上[data-xxx] 的属性选择器的方式实现 css 的样式隔离。**


比如：

```javascript
<style scoped> 
.guang { 
    color: red; 
} 
</style>  
<template>  
    <div class="guang">hi</div>  
</template>
复制代码
```

会被编译成：

```javascript
<style> 
.guang[data-v-f3f3eg9] 
{ 
    color: red; 
} 
</style> 
<template> 
    <div class="guang" data-v-f3f3eg9>hi</div> 
</template>
复制代码
```


通过给 css 添加一个全局唯一的属性选择器来限制 css 只能在这个范围生效，也就是 scoped 的意思。

**css-modules 是 css-loader 支持的方案，在 vue、react 中都可以用，它是通过编译的方式修改选择器名字为全局唯一的方式来实现 css 的样式隔离。**

比如：

```javascript
<style module> 
.guang {
    color: red; 
} 
</style>  
<template>
    <p :class="$style.guang">hi</p>  
</template>
复制代码
```

会被编译成：

```javascript
<style module>
._1yZGjg0pYkMbaHPr4wT6P__1 { 
    color: red; 
} 
</style> 
<template> 
    <p class="_1yZGjg0pYkMbaHPr4wT6P__1">hi</p> 
</template>
复制代码
```

和 scoped 方案的区别是 css-modules 修改的是选择器名字，而且因为名字是编译生成的，所以组件里是通过 style.xx 的方式来写选择器名。

coped 的方案是添加的 data-xxx 属性选择器，因为 data-xx 是编译时自动生成和添加的，开发者感受不到。

css-modules 的方案是修改 class、id 等选择器的名字，那组件里就要通过 styles.xx 的方式引用这些编译后的名字，开发者是能感受到的。但是也有好处，配合编辑器可以做到智能提示。


此外，除了 css 本身的运行时、编译时方案，还可以通过 JS 来组织 css，利用 JS 的作用域来实现 css 隔离，这种是 css-in-js 的方案。

比如这样：

```javascript
import styled from 'styled-components';

const Wrapper = styled.div`
    font-size: 50px;
    color: red;
`;

function Guang {
    return (
        <div>
            <Wrapper>内部文件写法</Wrapper>
        </div>
    );
}

```
