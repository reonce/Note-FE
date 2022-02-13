# Redux实现原理



## 状态管理器

Redux是一个状态管理器，与react不强相关，只是react中使用的多。它也可以应用于其他框架。由React核心开发者Dan开源开发，缺点槽点很多，但这并不妨碍它是目前最流行的react状态管理解决方案。

### 简单的状态管理实现

redux是一个状态管理器，状态指的就是数据，比如计数器中的count。

```js
let state = {
	count: 1
}
```

打印和修改状态

```
console.log(state.count);

state,count = 2;
```

此时我们就完成了状态（计数）的读取和修改了，也就是常说的“get”操作和“set”操作。

这个有个问题，修改count后怎么让使用count的地方收到通知“count修改了”？

> 再阅读redux原理之前，我首先想到的是Object.defineProperty和es6的proxy

Redux使用了发布-订阅模式解决这个问题

```js
let state = {
  count: 1
};
let listeners = [];

/*订阅*/
function subscribe(listener) {
  listeners.push(listener);
}

function changeCount(count) {
  state.count = count;
  /*当 count 改变的时候，我们要去通知所有的订阅者*/
  for (let i = 0; i < listeners.length; i++) {
    const listener = listeners[i];
    listener();
  }
}
```

我们来尝试使用下这个简单的计数状态管理器。

```js
/*来订阅一下，当 count 改变的时候，我要实时输出新的值*/
subscribe(() => {
  console.log(state.count);
});

/*我们来修改下 state，当然我们不能直接去改 state 了，我们要通过 changeCount 来修改*/
changeCount(2);
changeCount(3);
changeCount(4);
```

可以看到当我们修改count的值时，会输出相应的count值，很好，我们已经实现基础的发布-订阅模式。

这时候基于扩展性思考，有两个问题

* 目前只能管理单个状态，不通用
* 公共代码需要进行封装 

我们先解决第二个问题，尝试把公共的代码进行封装

~~~js
const createStore = function (initState) {
  let state = initState;
  let listeners = [];

  /*订阅*/
  function subscribe(listener) {
    listeners.push(listener);
  }

  function changeState(newState) {
    state = newState;
    /*通知*/
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i];
      listener();
    }
  }

  function getState() {
    return state;
  }

  return {
    subscribe,
    changeState,
    getState
  }
}
~~~

接下来我们尝试管理两个状态counter和info

~~~js
let initState = {
  counter: {
    count: 0
  },
  info: {
    name: '',
    description: ''
  }
}

let store = createStore(initState);

store.subscribe(() => {
  let state = store.getState();
  console.log(`${state.info.name}：${state.info.description}`);
});
store.subscribe(() => {
  let state = store.getState();
  console.log(state.counter.count);
});

store.changeState({
  ...store.getState(),
  info: {
    name: '前端九部',
    description: '我们都是前端爱好者！'
  }
});

store.changeState({
  ...store.getState(),
  counter: {
    count: 1
  }
});
~~~

到这里，我们就完成了一个简单的状态管理器。

这里需要理解的是 `createStore`，提供了 `changeState(改变)`，`getState(读取)`，`subscribe(触发)` 。

### 有计划的状态管理器

基于上一节，我们会发现，我们的修改是任意的。例如count，这里明显指代的是数字，但我们可以随意改变成一个字符串甚至是对象。实际场景中，计数器可能会提供一个加一和减一的按钮，我们尝试制定一下计数器的计划。

~~~js
/*注意：action = {type, other}, action 必须有一个 type 属性*/
function plan(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        count: state.count + 1
      }
    case 'DECREMENT':
      return {
        ...state,
        count: state.count - 1
      }
    default:
      return state;
  }
}
~~~

> 是不是特别像React里useContext的reducer方法

OK，接下来我们修改state.changeState，更改状态的时候，按照我们的计划改。

~~~js
/*增加一个参数 plan*/
const createStore = function (plan, initState) {
  let state = initState;
  let listeners = [];

  function subscribe(listener) {
    listeners.push(listener);
  }

  function changeState(action) {
    /*根据上面我们指定的计划修改state*/  
    state = plan(state, action);
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i];
      listener();
    }
  }

  function getState() {
    return state;
  }

  return {
    subscribe,
    changeState,
    getState
  }
}
~~~

我们来尝试使用下新的 createStore 来实现自增和自减

~~~js
let initState = {
  count: 0
}
/*把plan函数*/
let store = createStore(plan, initState);

store.subscribe(() => {
  let state = store.getState();
  console.log(state.count);
});
/*自增*/
store.changeState({
  type: 'INCREMENT'
});
/*自减*/
store.changeState({
  type: 'DECREMENT'
});
/*我想随便改 计划外的修改是无效的！*/
store.changeState({
  count: 'abc'
});
~~~

到这里，我们就已经可以实现有计划的状态管理器了。

这里我们把plan改成reducer，changeState改成dispatch，是不是有点熟悉了呢。

### 进阶的状态管理-多文件协作

这一节开始，我们要开始进入比较难理解的地方了。

以上的reducer是存在问题的，如果项目中存在大量的state计划函数，全写在一起会导致reducer函数及其庞大且复杂，按照以往的经验，我们肯定是要拆分出多个reducer函数，然后通过一个函数把他们合并起来。

简单说我们就是要对`reducer`进行**拆分**和**合并**。

现在，我们来管理两个state，一个counter，一个info。

~~~js
let state = {
  counter: {
    count: 0
  },
  info: {
    name: '前端九部',
    description: '我们都是前端爱好者！'
  }
}
~~~

他们各自的`reducer`， **counterReducer**和**InfoReducer**如下

~~~js
/*counterReducer, 一个子reducer*/
/*注意：counterReducer 接收的 state 是 state.counter*/
function counterReducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + 1
      }
    case 'DECREMENT':
      return {
        ...state，
        count: state.count - 1
      }
    default:
      return state;
  }
}
~~~

~~~js
/*InfoReducer，一个子reducer*/
/*注意：InfoReducer 接收的 state 是 state.info*/
function InfoReducer(state, action) {
  switch (action.type) {
    case 'SET_NAME':
      return {
        ...state,
        name: action.name
      }
    case 'SET_DESCRIPTION':
      return {
        ...state,
        description: action.description
      }
    default:
      return state;
  }
}
~~~

`counterReducer`计数器的计划我们讲过了，这里简单说下`InfoReducer`，通过SET_NAME更新name和通过SET_DESCRIPTION更新description，很简单的两个计划。

> 这里可能有些啰嗦，主要为了加深印象和方便后面的理解。

我们先实现”合并“函数，这里命名为`combineReducers`，它应该实现把多个reducer合并成一个的作用。

大概这样子使用它：

~~~js
const reducer = combineReducers({
    counter: counterReducer,
    info: InfoReducer
});
~~~

现在，我们实现一个combineReducers函数。

~~~js
function combineReducers(reducers) {

  /* reducerKeys = ['counter', 'info']  我们传入的多个状态名称组成的数组 */
  const reducerKeys = Object.keys(reducers)

  /*返回合并后的新的reducer函数，注意这里的传参实际上就是reducer函数的传参，而不是合并函数的*/
  return function combination(state = {}, action:{type: string, other}) {
    /*生成的新的state, 命名为nextState*/
    const nextState = {}

    /*遍历执行所有的reducers，整合成为一个新的state*/
    for (let i = 0; i < reducerKeys.length; i++) {
      /*key就是之前传入的状态名 */
      const key = reducerKeys[i]
      /*reducer是上面的key与之对应的reducer，这里使用到了索引签名，key是一个字符串 */
      const reducer = reducers[key]
      /*之前的 key 的 state， 这里使用合并后的reducer的state */
     /* 这里需要串起来，因此理解较难，这里的初始state是：
         state: {
            counter: { count: 0 },
            info: { name: '前端九部', description: '我们都是前端爱好者！' }
          }
		previousStateForKey自然就是key对应的对象
      */
      const previousState = state[key]
      const nextStateForKey = reducer(previousStateForKey, action)
	  /*到这里，拆分就完成了*/
      nextState[key] = nextStateForKey
    }
     /* 我们把拆分后的reducer，返回出去 */
    return nextState;
  }
}
~~~

基本原理就是，通过combination函数将所有的reducer整合到一起，再根据传入的state和action，找到整合完毕的Reducers当中对应的reducer，返回出实际需要更新的reducer。这一块比较绕，需要多看几遍。

那么我们尝试着使用一下combination函数

~~~js
const reducer = combineReducers({
  counter: counterReducer,
  info: InfoReducer
});

let initState = {
  counter: {
    count: 0
  },
  info: {
    name: '前端九部',
    description: '我们都是前端爱好者！'
  }
}

let store = createStore(reducer, initState);

store.subscribe(() => {
  let state = store.getState();
  console.log(state.counter.count, state.info.name, state.info.description);
});
/*自增*/
store.dispatch({
  type: 'INCREMENT'
});

/*修改 name*/
store.dispatch({
  type: 'SET_NAME',
  name: '前端九部2号'
});
~~~

到这里，我们就完成了对reducer的合并和拆分。同样state数据多了也会造成state树庞大，难维护，因此也需要进行拆分。

**state 的拆分和合并**

这里直接上代码

~~~JS
/* counter 自己的 state 和 reducer 写在一起*/
let initState = {
  count: 0
}
function counterReducer(state, action) {
  /*注意：如果 state 没有初始值，那就给他初始值！！*/  
  if (!state) {
      state = initState;
  }
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + 1
      }
    default:    
      return state;
  }
}
~~~

我们修改下 createStore 函数，增加一行 `dispatch({ type: Symbol() })`

~~~Js
const createStore = function (reducer, initState) {
  let state = initState;
  let listeners = [];

  function subscribe(listener) {
    listeners.push(listener);
  }

  function dispatch(action) {
    state = reducer(state, action);
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i];
      listener();
    }
  }

  function getState() {
    return state;
  }
  /* 注意！！！只修改了这里，用一个不匹配任何计划的 type，来获取初始值 */
  dispatch({ type: Symbol() })

  return {
    subscribe,
    dispatch,
    getState
  }
}
~~~

我们思考下这行可以带来什么效果？

1. createStore 的时候，用一个不匹配任何 type 的 action，来触发 `state = reducer(state, action)`
2. 因为 action.type 不匹配，每个子 reducer 都会进到 default 项，返回自己初始化的 state，这样就获得了初始化的 state 树了。

你可以试试

```js
/*这里没有传 initState 哦 */
const store = createStore(reducer);
/*这里看看初始化的 state 是什么*/
console.dir(store.getState());
```

到这里为止，我们已经实现了一个七七八八的 redux 啦！

