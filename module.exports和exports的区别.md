

# module.exports和exports的区别



首先要牢记：**require()引入的是module.exports导出的对象，它输出一个对象的优先级最高**，这是区别module.exports和exports最重要的一点。



1. exports只能改变module.exports的属性。例如：

   ```js
   export.name = 'jay';
   module.exports.name === 'jay' // true
   
   // 这时候
   export === module.exports // true
   
   // 如果把export指向一个对象
   export = {id: 123}
   export === module.exports // false
   module.exports // {name: 'jay'}
   
   // 这时，require()，获得的对象就是{name: 'jay'}
   
   ```

   

2. 当module.exports指向一个对象后，之前直接对它赋予的属性将失效，我的理解是会覆盖掉。

   ~~~js
   module.exports.name = 'jay';
   module.exports = {id: 1};
   
   // 这时候获取，只会得到{id: 1}
   
   module.expots.age = 23;
   // 这时候获取，只会得到{id: 1, age: 23}
   ~~~

   

3. 注意，当它们两个混用的时候，容易造成混淆，因此最好只使用一个，因此一般是用module.exports。毕竟它导出对象才作数