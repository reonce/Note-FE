/**简单实现一个Redux-理解Redux原理*/
/**这里是第一节 */

/*------count 的发布订阅者实践------*/
let state = {
  count: 1
};
let listeners = [];

/*订阅*/
function subscribe(listener) {
  console.log(11)
  listeners.push(listener);
}

function changeCount(count) {
  console.log(22)
  state.count = count;
  /*当 count 改变的时候，我们要去通知所有的订阅者*/
  for (let i = 0; i < listeners.length; i++) {
    const listener = listeners[i];
    listener();
  }
}
/*来订阅一下，当 count 改变的时候，我要实时输出新的值*/
subscribe(() => {
  console.log(33)
  console.log(state.count);
});

/*我们来修改下 state，当然我们不能直接去改 state 了，我们要通过 changeCount 来修改*/
changeCount(2);
// changeCount(3);
// changeCount(4);
