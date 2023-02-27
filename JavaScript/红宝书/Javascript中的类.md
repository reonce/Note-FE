# 类

ES6引入新的class关键字，是一个新的基础语法糖。虽然表面上看起来支持正式的面向对象编程，但实际上**背后使用的仍然是原型和构造函数**的概念。

定义类的两种方式：类声明和类表达式。

```js
// 类声明
class Person {}

// 类表达式
const Animal = class {};
```

与函数表达式类似，类表达式在他们被求值前也不能引用。与函数定义不同的是：

1. 类定义声明不能提升，而函数的可以。
2. 函数受函数作用域限制，而类受块级作用域限制。

```js
console.log(Fn) // fn(){}
function Fn () {}

console.log(Person) // undefined
class Person () {}
```

##### 类的首字母要大写

## 类构造函数

constructor关键字用于在类定义块内部构造函数，非必须的。

##### 如果构造函数返回非空对象，则返回该对象；否则返回刚创建的对象

> 如果返回的不是this对象，而是其他对象，那么这个对象不会通过instanceof操作符检测出和类有关联

##### 类中的代码默认是严格模式

##### 调用类构造函数时如果不适用new则会抛出异常

```js
class Animal{}
let a = Animal();
// TypeError: class construction ...
```

类构造函数在实例化之后，它就会成为普通的实例方法。

严格来说，类中定义的普通方法都定义在原型上，所以constructor并不是实例方法。只有在构造函数中定义在this的方法才是实例自己的方法。

##### 所有类的constructor都等于Funciton

```js
class Person {}
Person.constructot // Function() { [native code] }
```

类不能在类块中给原型添加值作为成员数据，也就是说目前没有显示支持添加数据成员的方法（目前有提案在进行）

类定义语法支持在原型和类本身上定义生成器方法：

```js
class Person {
  *createNicknameIterator(){
    yiekd 'Butcher';
    yiekd 'Baker';
  }
}

let p = Person.createNicknameIterator
P.next // Butcher
```

类支持生成器方法，因此可以**通过添加一个默认的迭代器，把类实例变成可迭代对象：**

```js
class Person {
  constructor() {
    this.nickNames = ['a', 'b', 'c'];
  }
  
  *[Symbol.iterator]() {
    yield *this.nickNames.entries();
  }
}

let p = new Person();
for (let [ids, nickName] of p) {
  console.log(nickName)
}
```

### 继承

1. #### extends

可以使用extends继承类，也可以继承普通的构造函数（保持向后兼容

 extend关键字也可以在类表达式中使用

```js
let Bar = class extends Foo {}
```

2. #### 构造函数、HomeObjcet和super()

###### 派生类方法可以通过super关键字引用它们的原型

> 在实例方法中，super引用父类原型，可以通过它调用父类原型上的方法。在类方法（静态方法）中，super引用父类，可以调用父类的静态方法。在构造函数中，super是父类构造函数的别名，通过它可以调用父类构造函数。

##### 使用super的注意事项：

* suiper只能在**派生类**构造函数和静态方法中使用。

派生类中必须先调用super（），再操作this，否则会报错。

* 继承自其他类的类被称作派生类，如果在派生类中指定 了构造函数，则要么必须再其中调用super（），要么必须在其中返回一个对象。如果不这样做程序就会报错。如果选择不使用构造函数，则当创建新的类实例时会自动调用super()并传入所有参数
