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
