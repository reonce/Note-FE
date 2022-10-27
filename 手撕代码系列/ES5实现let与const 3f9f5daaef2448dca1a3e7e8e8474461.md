# ES5实现let与const

在es5中，没有块级作用域的概念，只有 `函数作用域` 的概念。

webpack进行模块化打包的时候，也需要把不同的函数隔离开，使得各个模块的代码互不影响，它的实现原理也是 `IIFE` 

## 实现let

使用 `IIFE` 可以很方便的创建一个块级作用域，在这个块级作用域之外的地方访问其中的变量都会报错。做到了 `let` 声明中**隔离作用域**和**防止变量声明提升**的概念。

```jsx
try {
	console.log('变量声明提升a', a);
}catch(error){
	console.error('变量未被定义');
}

(function () {
	var a = 1;
	console.log('内部可以正常使用a', a)
})()

try {
	console.log('外部a', a);
}catch(error){
	console.error('变量未被定义');
}
```

## 实现const

const相比较let要复杂一些，除了制造块级作用域，const 需要额外处理它**值不可变**的特性。

基于数据类型区分，const声明对于基本类型的数据，不变的就是它的值。而对于引用类型数据，不变的是它的引用的地址，内存地址中的数据是可变的。看一个简单的例子：

```jsx
const a = {id:1};
a.age = 23;
console.log(a); // {id:1, age:23}

/**但是直接进行修改会抛异常*/
a = {} // Assignment to constant variable.
// 数组同理
```

这个例子也就验证了，修改的是内存地址上的数据，而不是引用的“地址”（类似C语言中的指针）

了解这个概念后，我们也很容易读懂下面这段示例

```jsx
const obj1 = {id: 123};
const obj2 = {id: 123};
// 指向不同的内存空间
obj1 === obj2 // false   

const obj3 = {id: 123};
const obj4 = obj3;
// 指向相同的内存空间
obj3 === obj4 // true
obj3.age = 23;
console.log(obj4) // {id:123, age: 23}
```

接下来我们利用这个概念看一下具体实现：

```jsx
try {
	console.log('变量声明提升a', a);
}catch(error){
	console.error('变量未被定义');
}

(function () {
	var a = {id:123, age:23};
	const type = Object.prototype.toString.call(a);
	// 引用类型数据
	if(type === [Object, Object] || type === [Object, Array]) {
		var b = a;
		a.sex = 1;
		if(a !==b) {
			console.error('Assignment to constant variable.');
			a = b;
		}
	} else {
		 // 基本类型
			var pre = a;
			if(a !== pre) {
				console.error('Assignment to constant variable.');
				a = pre;
			}
	}
		console.log('这是作用域中的a', a)
})()

try {
	console.log('外部a', a);
}catch(error){
	console.error('变量未被定义');
}
```

（小黄书上  p63）补充： 试用 try..catch的组合更加通用。IIFE作为函数，可能会影响this、return、break、continue。

