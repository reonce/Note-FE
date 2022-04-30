instanceof 左操作数是一个类，右操作数是标识对象的类。*如果左侧的对象是右侧类的实例，则返回true.*而js中对象的类是通过初始化它们的构造函数来定义的。即instanceof的右操作数应当是一个函数。所有的对象都是object的实例。如果左操作数不是对象，则返回false,如果右操作数不是函数，则抛出typeError。

instanceof 运算符是用来测试一个对象是否在其原型链原型构造函数的属性。其语法是object instanceof constructor

instanceof 操作符用来比较两个操作数的构造函数。只有在比较自定义的对象时才有意义。 如果用来比较内置类型，将会和 typeof 操作符 一样用处不大。

123 instanceof number // false
new Number(123) instance number // true
Number(123) instance number // false
