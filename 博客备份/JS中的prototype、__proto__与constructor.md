①__proto__和constructor属性是对象所独有的；② prototype属性是函数所独有的。但是由于JS中函数也是一种对象，所以函数也拥有__proto__和constructor属性

proto 属性
对象（除null外）独有的_proto_属性实际上是由一个对象指向它的父对象。作用为当访问某一个对象的属性（包含方法）时，比如toString(),找不到时，就会去此对象的父级对找，
即去此对象_proto_指向的父对象找，还找不到就继续父对象的父对象查找，直到JS的Window对象（如果仍然找不到，会抛出undefined异常。
以上这种通过__proto__属性来连接对象直到null的一条链即为我们所谓的原型链。

prototype属性
function Foo() {…};
let f1 = new Foo();

prototype属性是函数独有的，由一个函数指向它的原型对象，即Foo.prototype === f1._proto_。
可以看出，几乎和在对象中的 proto ,d都是指向它的”父对象“。 之所以要区分开，是因为函数需要共享包含特定类型的所有示例的属性和方法。
这样，使用此函数实例化的对象，都可以访问或使用函数中的属性和方法。函数在创建时，默认会同时创建它的prototype

constructor 属性
前面我们提到了_proto_和prototype属性，他们都是去寻找自己的”父对象“。那么，能否根据一个对象去找到它所属的函数呢。
答案就是constructor属性， constructor属性也是对象独有的，含义是指向此对象的构造函数。这个属性是本身拥有或者继承而来，
最终的终点指向是Function函数（也可以说是对象），每个对象（除null）都可以找到他的构造函数constructor。
参考https://blog.csdn.net/cc18868876837/article/details/81211729

