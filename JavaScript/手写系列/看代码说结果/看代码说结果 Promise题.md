# 看代码说结果 Promise题

~~~js
const p = new Promise((resolve,reject) => {
    console.log(0)
    reject()
    console.log(1)
    resolve()
    console.log(2)
  })
p.then(res => {
  console.log(3)
}).then(res => {
  console.log(4)
}).catch(res => {
  console.log(5)
}).then(res => {
  console.log(6)
}).catch(res => {
  console.log(7)
}).then(res => {
  console.log(8)
})
~~~

**小提示**：这里主要想考察的是两个点：

1.在 `Promise` 中，`resolve`或者`reject`不会阻止`Promise`内的其余代码的执行

2.并且后面的`then`和`catch`，会链式调用；

结果 👇











**结果为：`0 1 2 5 6 8`**