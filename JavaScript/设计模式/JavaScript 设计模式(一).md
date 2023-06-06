# 理解 JavaScript 设计模式(一)

## 前言

​	本篇文章用于帮助理解 JavaScript 设计模式，内容上会由易到难，举例子的原则是尽可能简单。本文比较适合对设计模式概念不深的朋友阅读，对于有一定开发经验但不了解过设计模式的朋友，读本文过程中你会发现，原来我早就已经用过这个设计模式了。让我们开始吧~

### 概念

* 思想： 封装变化
* 定义： 在 **面向对象 **软件设计过程中针对 **特定问题** 的简洁而优雅的解决方案
* 遵循原则： 将变与不变分离，保证“变部分”的 **灵活** 的同时，确保“不变部分”的 **稳定**

### 作用

> 在软件设计中，模式是经过大量实际项目验证的优秀的解决方案。熟悉这些模式的程序员，对某些模式的理解也许成为了条件反射。当合适的场景出现的时，他们可以很快地找到某种模式作为解决方案     ---JavaScript 设计模式与开发实践

​	设计模式可以帮助让人们写出 **可复用** 和 **可维护性** 更高的程序。假设有一个空房间，不断的往里面放东西很容易，但是时间久了会发现很难从这个房子里找到想要的东西，要调整东西的位置也不容易。所以在这个房间里放几个柜子是个更好的选择，虽然柜子会增加我们的成本，但它可以在维护阶段带来好处。使用柜子的方案，也许就是一种“模式”，要注意一点，如果你的东西不多，在房间里查找也很便利，就不建议使用“柜子”了，这个观点的探讨我们接下来会在 **适用性 **中聊到

### 适用性

​	设计模式经常会被认为是夸夸奇谈的东西。有些人认为它并没有多大用途，用普通的方法就能解决问题，使用设计模式反而会增加代码的**复杂度**，阅读起来会更吃力。这种看法笔者也是认同的，对于一些使用不当的设计模式，后续的维护可能会变得很糟，反而使用普通的解决方式会让代码逻辑分明清晰

​	设计模式被人**误解 **为没用的一个重要原因是人们对它的误用和滥用。特别是初学者刚学会使用一个模式时，恨不得所有的代码都用它来实现。**锤子理论**在这里体现的非常明显： 当我们有了一把锤子，看什么都是钉子

​	可惜的是，我们每个人只能控制自己是否选择使用设计模式，总会遇到其他人使用了恰当或不那么合适的设计模式方案，因此为了我们的开发体验，笔者认为不但要学，而且还要深入的去理解设计模式，对于个人代码水平的增加倒是次要，重要的是能够更顺畅读懂其他人的设计模式代码...

## 构造器模式与原型模式

对于重复的对象声明，推荐使用**构造器模式**，举个例子：

~~~js
const employeel = {
    name: 'kevin',
    age: 6
}

const employee2 = {
    name: 'bob',
    age: 18
}
...
~~~

如果数据量的更多，代码就会变得重复和臃肿，我们使用一个构造函数：

~~~js
function Employeel (name, age) {
    this.name = name;
    this.age = age;
}

const employeel = new Employeel('kevin', 6);
const employee2 = new Employeel('bob', 18);
~~~

这里就已经是一个简单的构造器模式了，如果这个构造函数里有个方法：

~~~js
function Employeel (name, age) {
    this.name = name;
    this.age = age;
    this.say = function() {
        console.log(`姓名： ${this.name} --- 年龄：${this.age}`)
    }
}

const employeel = new Employeel('kevin', 6);
const employee2 = new Employeel('bob', 18);

employeel.say();
employee2.say();
~~~

执行是没有问题的，但是 `say()` 函数实际上被创建了多次， 有没有什么方式可以让他们共用这个方法，答案就是原型模式

~~~js
function Employeel (name, age) {
    this.name = name;
    this.age = age;
}

Employeel.prototype.say = function() {
    console.log(`姓名： ${this.name} --- 年龄：${this.age}`)
}

const employeel = new Employeel('kevin', 6);
const employee2 = new Employeel('bob', 18);

employeel.say();
employee2.say();
~~~

ES6以后，JavaScript有了 **“类”** 的概念，它兼顾了构造器模式和原型模式

~~~js
class Employeel{
    constructor(name, age) {
      this.name = name;
      this.age = age;
    }
    
    say() {
       console.log(`姓名： ${this.name} --- 年龄：${this.age}`)
    }
}

const employeel = new Employeel('kevin', 6);
const employee2 = new Employeel('bob', 18);

employeel.say();
employee2.say();
~~~

### 工厂模式

#### 简单工厂模式

假定现在有一个菜单需求，已经一个标识，根据这个标识返回不同的菜单。

正常存放静态变量的场景可能是：

~~~js

const menuInfos = {
    menu1: [...],
    menu2: [...],
    menu3: [...],
}
       
...
switch(flag) {
    case 'flag1':
    return menuInfos.menu1;
    ...
    default:
    throw new Error('xxx')
}
~~~

可以实现功能，但是多余的变量声明造成了一些内存的浪费

~~~js
function menuFactory (flag) {
    switch(flag) {
    case 'flag1':
    return menuInfos.menu1;
    ...
    default:
    throw new Error('xxx')
 }
}
~~~

通过一个参数，可以获取到所需要的对象，这种思想就叫做 **简单工厂模式**，优点在于只需要正确的参数就可以获得需要的对象，不需要知道具体细节。缺陷是每增加新的构造函数需要修改判断逻辑代码，当我们需要的对象不是上面3个，而是更多时，这个函数会变成很庞大的一个函数，难以维护，这时候可以考虑 **抽象工厂模式**

#### 抽象工厂模式

> 抽象工厂模式不直接生成实例，而是用于对产品类簇的创建

~~~js
class User {
  constructor(name, role) {
    this.name = name;
    this.role = role;
  }

  welcome() {
    console.log("welcome back", this.name);
  }

  dataShow() {
    console.log("抽象工厂的dataShow方法执行了");
  }
}

class BotUser extends User {
  constructor(name) {
    super(name, "bot");
  }

  dataShow() {
    console.log(`my name is ${this.name}, i am a ${this.role}`);
  }
}

const kevin = new KevinUser("kevin");
kevin.dataShow();
~~~

### 单例模式

>  保证一个类仅有一个实例，并提供一个访问它的全局访问点

~~~js
function User(name, age) {
    this.name = name;
    this.age = age;
}

var Singleton = (function() {
    var instance
    
    return funciton(name, age) {
        if(!instance) {
            instance = new User(name, age)
        }
        return instanceq
    }
})()
~~~

ES6写法：

~~~js
class Singleton {
  constructor(name, age) {
    if (!Singleton.instance) {
      this.name = name;
      this.age = age;
      Singleton.instance = this;
    }

    return Singleton.instance;
  }
}

new Singleton("kevin", 18) === new Singleton("bob", 21); // true
~~~

### 策略模式

> 策略模式定义了一系列算法，将每个算法封装起来，使他们可以相互替换，且算法的变化不会影响使用算法的人。 用于解决有多种相似算法且数量庞大时，使用 `if...else` 会复杂和难以维护，它的有点是算法可以自由切换，避免多重 `if...else` 判断，并具有良好的扩展性

假定有一个抽奖函数，根据抽奖等级和投入资金，

~~~js
function lottery(level, money) {
  const result = Math.random();
    
  if (level === "A") {
    if (result < 0.05) {
      return money * 100;
    }
    if (result < 0.1) {
      return money * 30;
    }
  }

  if (level === "B") {
    if (result < 0.1) {
      return money * 20;
    }
    if (result < 0.3) {
      return money * 5;
    }
  }

  return 0;
}

~~~

~~~js
let strategy = {
  A: (money) => {
    const result = Math.random();
    if (result < 0.05) {
      return money * 20;
    }
    if (result < 0.1) {
      return money * 10;
    }
    return 0;
  },

  B: (money) => {
    const result = Math.random();
    if (result < 0.1) {
      return money * 5;
    }
    if (result < 0.3) {
      return money * 2;
    }
    return 0;
  },
};

function lottery(level, money) {
  return strategy[level](money);
}

lottery("A", 15)
~~~

### 代理模式

> 一个对象通过某种代理方式来控制对另一个对象的访问

假设现在需要雇佣装修工人，一般来说是要和装修公司去谈的，与装修公司谈妥价格后，工人才会前往工作，这里装修公司扮演的角色就是 **“代理”**

~~~js
class Worker {
  play() {
    console.log("合作愉快");
  }
}

class WorkerProxy {
  constructor() {
    this.superStar = new Star();
  }

  talk(price) {
    if (price >= 10000) {
      this.superStar.play();
      return;
    }
    console.error("干不了，得加钱");
  }
}

const company = new Worker();
company.talk(5000)
~~~

~~~js
// Proxy 语法
const worker = {
  name: 'bob',
  salary: 8000,
};

let companyProxy = new Proxy(worker, {
  get(target, key) {
    if (key === "salary") {
      return 10000;
    }
    return target[key];
  },

  set(target, key, value) {
    if (key === "salary") {
      console.log('商量价格')
      if(value >= 10000) {
          console.log('可以合作')
      } else {
          console.error('干不了，得加钱')
      }
    }
  },
});

companyProxy.salary // 10000
companyProxy.salary = 9000
~~~

### 观察者模式

>  定义了一种一对多的关系, 所有观察对象同时监听某个观察目标对象，当观察目标对象状态发生变化时会通知所有观察者对象并被自动更新，解决了观察目标对象与观察者之间功能的耦合，即一个对象被所有其他对象“观察”

~~~js
class Subject {
  constructor() {
    this.observers = [];
  }

  add(observer) {
    this.observers.push(observer);
  }

  remove(observer) {
    this.observers = this.observers.filter((item) => item !== observer);
  }

  notify() {
    this.observers.forEach((item) => {
      console.log(item);
      item.update();
    });
  }
}

class Observer {
  constructor(name) {
    this.name = name;
  }
  update() {
    console.log(`my name is ${this.name}`);
  }
}

const subject = new Subject();

const observer1 = new Observer("kevin");
const observer2 = new Observer("bob");

subject.add(observer1);
subject.add(observer2);

subject.notify();
~~~

### 发布订阅模式

与前面提到的 **观察者模式** 原理非常相似，一些文章讲它们是一种模式，其实是有区别的，可以说是一种“包含关系”

> 1. 观察者和目标要相互知道
> 2. 发布者和订阅者不用互相知道，通过第三方实现调度，是一种经过解耦合的观察者模式

先看一个最简单的发布订阅模型：

~~~js
const publishSub = {
  list: [],
  publish() {
    this.list.forEach((item) => item());
  },
  subscribe(cb) {
    this.list.push(cb);
  },
};

function testA() {
  console.log("testA");
}

function testB() {
  console.log("testB");
}

publishSub.subscribe(testA);
publishSub.subscribe(testB);

publishSub.publish();
~~~

有个明显的缺陷是，每次 “发布” 都会执行所有订阅的模式，可不可以按照需求给订阅分类呢？ 肯定是可以的

~~~js
const publishSub = {
  message: {},
  publish(type) {
    if (this.message[type]) {
      this.message[type].forEach((cb) => cb());
    }
  },
  subscribe(type, cb) {
    if (!this.message[type]) {
      this.message[type] = [cb];
      return;
    }
    this.message[type].push(cb);
  },
  unsubscribe(type, cb) {
    if (!this.message[type]) return;
    if (!cb) {
      this.message[type] = [];
      return;
    }
    this.message[type] = this.message[type].filter((item) => item !== cb);
  },
};

function testA() {
  console.log("testA");
}

function testB() {
  console.log("testB");
}

function testBob() {
  console.log("testBob");
}

publishSub.subscribe("A", testA);
publishSub.subscribe("B", testB);
publishSub.subscribe("B", testBob);

publishSub.publish("B");

~~~

