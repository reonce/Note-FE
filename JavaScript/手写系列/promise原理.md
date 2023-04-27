# 手写 Promise

```js
// 定义三种状态
const REJECTED = "REJECTED";
const FULFILLED = "FULFILLED";
const PENDING = "PENDING";
//判断一个变量是否是 Promise 的函数：1. 是否是对象并且不是 null 2. 是否有 then 属性并且 then 是一个方法
function isPromise(val) {
  if ((typeof val === "object" && val !== null) || typeof val === "function") {
    return typeof val.then === "function";
  }
  return false;
}
//处理 x 的值，如果是普通值直接返回，如果是 promise 则返回 x.then 执行的结果
const resolvePromise = (promise2, x) => {
  const { resolve, reject } = promise2;
  // 如果 new 出来的 Promise2 和 x 是同一个，直接报错
  if (promise2 === x)
    return reject(
      new TypeError("Chaining cycle detected for promise #`<Promise>`")
    );
  // 先判断是不是对象或者函数
  if ((typeof x === "object" && x !== null) || typeof x === "function") {
    // 调用了成功就不能失败，调用的失败就不能成功。不能多次调用成功或者失败
    let called;
    try {
      // 内部可能抛出错误
      const then = x.then;
      // 如果 x.then 不是函数就说明是一个普通值，直接返回 x
      if (typeof then !== "function") {
        resolve(x);
      } else {
        // 利用.call将this指向 x, 防止x.then()报错
        then.call(
          x,
          (res) => {
            if (called) return;
            called = true;
            // res 可能是一个 promise ，递归调用resolvePromise，直到解析出的值是普通值
            resolvePromise(promise2, res);
          },
          (err) => {
            if (called) return;
            called = true;
            // 直接调用 promise的 reject 作为失败的结果，并向下传递
            reject(err);
          }
        );
      }
    } catch (err) {
      if (called) return;
      called = true;
      reject(err);
    }
  } else {
    resolve(x);
  }
};
//promise 类
class Promise {
  constructor(executor) {
    this.status = PENDING; // Promise 的状态
    this.value = undefined; // 成功后的值
    this.reason = undefined; // 失败后的值
    this.onResolvedCallbacks = []; // 成功回调函数集合
    this.onRejectedCallbacks = []; // 失败回调函数集合
    // Promise 内部提供的 resolve 方法，让 Promise 的状态变成成功态，并让成功回调执行
    const resolve = (value) => {
      //如果value是Promise则返回value.then的执行结果
      if (value instanceof Promise) {
        return value.then(resolve, reject);
      }
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;
        this.onResolvedCallbacks.forEach((fn) => fn());
      }
    };
    // Promise 内部提供的 reject，让 Promise 的状态变成失败态，并让失败回调执行
    const reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        this.onRejectedCallbacks.forEach((fn) => fn());
      }
    };
    // try + catch 只能捕获同步异常
    try {
      //执行入参函数
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }
  then(onFulfilled, onRejected) {
    // 比如.then().then().then(() => {}); 这种调用，对可选参数的处理，透传
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (val) => val;
    // 判断onRejected是否存在或者是否是函数，如果不是函数或者不存在，我们让它等于一个函数，并且在函数内继续将err向下抛出
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (err) => {
            throw err;
          };
    const promise2 = new Promise((resolve, reject) => {
      // 同步：成功
      if (this.status === FULFILLED) {
        setTimeout(() => {
          promise2.resolve = resolve;
          promise2.reject = reject;
          try {
            const x = onFulfilled(this.value);
            resolvePromise(promise2, x);
          } catch (err) {
            reject(err);
          }
        }, 0);
      }
      // 同步：失败
      if (this.status === REJECTED) {
        setTimeout(() => {
          promise2.resolve = resolve;
          promise2.reject = reject;
          try {
            const x = onRejected(this.reason);
            resolvePromise(promise2, x);
          } catch (err) {
            reject(err);
          }
        }, 0);
      }
      // 异步
      if (this.status === PENDING) {
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            // 这里需要加上，不加上跑测试跑不通
            promise2.resolve = resolve;
            promise2.reject = reject;
            try {
              const x = onFulfilled(this.value);
              resolvePromise(promise2, x);
            } catch (err) {
              reject(err);
            }
          });
        });
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            promise2.resolve = resolve;
            promise2.reject = reject;
            try {
              const x = onRejected(this.reason);
              resolvePromise(promise2, x);
            } catch (err) {
              reject(err);
            }
          });
        });
      }
    });
    return promise2;
  }
  // Promise 中的 catch 指代的就是 then 没有成功回调的一个别名而已
  catch(errCallback) {
    return this.then(null, errCallback);
  }
}
// 无论如何都会执行，把上一个 then 的结果向下传递，如果 finally 中返回了一个 Promise 会等待这个 Promise 执行完成后继续执行
Promise.prototype.finally = function (callback) {
  return this.then(
    (val) => {
      return Promise.resolve(callback()).then(() => val);
    },
    (err) => {
      return Promise.resolve(callback()).then(() => {
        throw err;
      });
    }
  );
};

// npm install promises-aplus-tests -g
// promises-aplus-tests promise.js
// 测试自己写的 Promise 是否符合规范的包
Promise.deferred = () => {
  const dfd = {};
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
};
//Promise.resolve 他会等待里面的 Promise 执行成功
Promise.resolve = (val) => {
  return new Promise((resolve) => {
    resolve(val);
  });
};
//Promise.reject 不会等待参数中的 Promise 执行完毕
Promise.reject = () => {
  return new Promise((_, reject) => {
    reject(val);
  });
};
//all 方法表示等待所有的 Promise 全部成功后才会执行回调，如果有一个 Promise 失败则 Promise 就失败了
Promise.all = (promises) => {
  return new Promise((resolve, reject) => {
    //存放结果
    const res = [];
    //计数，当count 等于 length的时候就resolve
    let count = 0;
    const resolveRes = (index, data) => {
      //将执行结果缓存在res中
      res[index] = data;
      //所有子项执行完毕之后，执行resolve 抛出所有的执行结果
      if (++count === promises.length) {
        resolve(res);
      }
    };
    //循环遍历每一个参数的每一项
    for (let i = 0; i < promises.length; i++) {
      const current = promises[i];
      //如果当前项是Promise，则返回 then 的结果
      if (isPromise(current)) {
        current.then(
          (data) => {
            resolveRes(i, data);
          },
          (err) => {
            reject(err);
          }
        );
      } else {
        resolveRes(i, current);
      }
    }
  });
};
//race谁是第一个完成的，就用他的结果，如果是失败这个 Promise 就失败，如果第一个是成功就是成功
Promise.race = (promises) => {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      let current = promises[i];
      //如果是一个 promise 继续执行 then
      if (isPromise(current)) {
        current.then(resolve, reject);
      } else {
        //是普通值则直接 resolve 返回，并终止循环
        resolve(current);
        break;
      }
    }
  });
};
// 专门给 node 的 api 做的 promisify 方法，如 fs.readFile
Promise.promisify = (fn) => {
  return (...arg) => {
    return new Promise((resolve, reject) => {
      fn(...arg, (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });
  };
};
module.exports = Promise;
```
