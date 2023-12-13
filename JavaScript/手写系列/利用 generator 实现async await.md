先实现一个简易版本的调用：

```jsx
function testFn(log) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(log);
    }, 1000);
  });
}

function* generatorFn() {
  // 这里的 yield 相当于 await
  const test1 = yield testFn('test1');
  console.log('test1', test1)
  const test2 = yield testFn('test2');
  console.log('test2', test2)
  return "success";
}

generatorFn().then(res => console.log(res))
```

因为执行 `generator` 函数需要手动执行 `next()` 的，所以我们需要封装一个函数去实现异步调用完成后，手动的循环调用 `next()` 的函数。

```jsx

function testFn(log) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(log);
    }, 1000);
  });
}

function* generatorFn() {
  // 这里的 yield 相当于 await
  const test1 = yield testFn('test1');
  console.log('test1', test1)
  const test2 = yield testFn('test2');
  console.log('test2', test2)
  return "success";
}

function loopNext(fn, params) {
  const currentFn = fn.next(params);
  if (!currentFn?.done) {
    currentFn.value.then((res) => {
      loopNext(fn, res)
      return res
    });
  }
}

loopNext(generatorFn())
```

至此，一个简易的 `async await` 实现就形成了
