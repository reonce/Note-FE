先看下MDN官方介绍:
**Array.from() 方法从一个类似数组或可迭代对象创建一个新的，浅拷贝的数组实例。**
     创建一个新的、浅拷贝的数组，这里最开始很难理解这句话。“新的”或许代表着深拷贝？ 但是为什么又说是创建浅拷贝呢。
  这里放一段让我对`Array.from`**浅拷贝**疑惑的代码

```js
const arr = [1,2,3];
const copyArr = Array.from(arr);
copyArr[0] = 8;
console.log(copyArr); // [8, 2, 3]
console.log(arr); // [1,2,3]
```

  这个疑问首先要在深度理解一下**深浅拷贝**，首先提一个很重要的一句，深浅拷贝只针对于引用类型（对象、数组）的数据。

  `Array.from`拷贝的实际上是伪数组的子元素，以上示例的问题也就暴露出来了：拷贝的是数字，属于基本类型，因此不存在浅拷贝的概念。

```js
const arr = [{id:1, age:23}, {id:2, age: 24}];
const copyArr = Array.from(arr);
copyArr[0].id = 8;
console.log(copyArr); // [{id:8, age:23}, {id:2, age: 24}]
console.log(arr); // [{id:8, age:23}, {id:2, age: 24}]
```

这个示例中就证明了**浅拷贝**的概念。

这里又出现了一个疑问的问题了（来自lly）

```js
const arr = [[1], [2]];
const copyArr = Array.from(arr);
copyArr[0] = [8]
console.log(copyArr); // [[8], [2]];
console.log(arr); // // [[1], [2]];
```

   不是浅拷贝吗，这里怎么没改成。说实话，直接改`copyArr[0] = [8]`这个改法也比较清奇..，正常不应该改`copyArr[0][0] = 8`吗，后者的改法是浅拷贝的。

这里就要提到**“新的”**这个概念了，`Array.from`创建的是一个**新的**、*浅拷贝*的数组。

也就是说生成的这个数组本身是新的，占用内存是独立的。我的理解是，如果数组中的子元素是引用类型，拷贝数组的子元素就会直接指向原数组的子元素。更改引用类型子元素，原数组当然也会更改（同一个），但是直接去更改数组本身，实际上并不影响原数组的，也就是拷贝数组本身是一个**新的**数组。

**Tip:** 在实际开发中，要记住`Array.from`浅拷贝的概念，或者慎用。以避免难以排查的错误。



这里补充一些`Array.from`的用法。 三个传参 要转换的目标、对子元素执行的方法、this指向

下面一些示例介绍具体使用

```
Array.from('foo');
// [ "f", "o", "o" ]
```

```
const map = new Map([[1, 2], [2, 4], [4, 8]]);
Array.from(map);
// [[1, 2], [2, 4], [4, 8]]

const mapper = new Map([['1', 'a'], ['2', 'b']]);
Array.from(mapper.values());
// ['a', 'b'];

Array.from(mapper.keys());
// ['1', '2'];
```

```
function f() {
  return Array.from(arguments);
}

f(1, 2, 3);

// [ 1, 2, 3 ]
```

```
// 第二个传参
Array.from([1, 2, 3], x => x + x);
// [2, 4, 6]

Array.from({length: 5}, (v, i) => i);
// [0, 1, 2, 3, 4]
```

```
// 数组去重 合并
function combine(){
    let arr = [].concat.apply([], arguments);  //没有去重复的新数组
    return Array.from(new Set(arr));
}

var m = [1, 2, 2], n = [2,3,3];
console.log(combine(m,n));                     // [1, 2, 3]
```

