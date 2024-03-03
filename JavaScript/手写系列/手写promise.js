class newPromise {
  constructor(callback) {
    this.status = "pending";
    this.value = undefined;
    this.reason = undefined;
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (this.status === "pending") {
        this.status = "fulfilled";
        this.value = value;
        this.onResolvedCallbacks.forEach((cb) => cb());
      }
    };
    const reject = (reason) => {
      if (this.status === "pending") {
        this.status = "rejected";
        this.reason = reason;
        this.onRejectedCallbacks.forEach((cb) => cb());
      }
    };

    callback(resolve, reject);
  }

  then = (onResolved, onRejected) => {
    const promise2 = new newPromise((resolve, reject) => {
      try {
        if (this.status === "rejected") {
          const x = onRejected(this.reason);
          // 处理返回值
          resolve(x);
        }

        if (this.status === "fulfilled") {
          const x = onResolved(this.status);
          resolve(x);
        }

        if (this.status === "pending") {
          this.onResolvedCallbacks.push(() => {
            if (this.status === "rejected") {
              const x = onRejected(this.reason);
              // 处理返回值
              resolve(x);
            }
          });

          this.onRejectedCallbacks.push(() => {
            if (this.status === "fulfilled") {
              const x = onResolved(this.status);
              resolve(x);
            }
          });
        } else {
          // 执行完所有回调函数之后，清空回调数组
          this.onResolvedCallbacks = [];
          this.onRejectedCallbacks = [];
        }
      } catch (error) {
        // 如果回调函数抛出异常，将异常作为失败状态的值
        reject(error);
      }
    });

    return promise2;
  };

  catch(onRejected) {
    return this.then(null, onRejected);
  }
}
