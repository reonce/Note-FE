/*注意：action = {type:'',other:''}, action 必须有一个 type 属性*/
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
/*增加一个参数 plan*/
// 我们把这个计划告诉 store，store.changeState 以后改变 state 要按照我的计划来改
const createStore = function (plan, initState) {
  let state = initState;
  let listeners = [];

  function subscribe(listener) {
    listeners.push(listener);
  }

  function changeState(action) {
    /*请按照我的计划修改 state*/  
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
// 我们来尝试使用下新的 createStore 来实现自增和自减
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
// 到这里为止，我们已经实现了一个有计划的状态管理器！

// 我们商量一下吧？我们给 plan 和 changeState 改下名字好不好？**plan 改成 reducer，changeState 改成 dispatch！**不管你同不同意，我都要换，因为新名字比较厉害（其实因为 redux 是这么叫的）!
