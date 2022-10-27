# React函数组件中使用防抖节流

##### 由于react组件变量变化会导致重复渲染的特性，不能直接的使用loadsh的debouce进行防抖。

### 解决思路： 使用useCallback保持防抖函数的唯一性，不重复渲染

例如：

~~~js
function useDebounce(fn, delay) {
  return useCallback(debounce(fn, delay), [])
}

export default function() {
  const [counter, setCounter] = useState(0);

  const handleClick = useDebounce(function() {
    setCounter(counter + 1)
  }, 1000)

  return <div style={{ padding: 30 }}>
    <Button
      onClick={handleClick}
    >click</Button>
    <div>{counter}</div>
  </div>
}
~~~

点击按钮会发现counter变成1后不变了。

**原因：**由于我们的`useCallback`依赖为空数组，所以组件初始化完成后，`handleClick`函数永远为初始化时的函数快照，也就是后续组件重新渲染时不会更新`handleClick`，同时，`handleClick`持有的`counter`也为本次函数创建时的快照，即永远为`0`,所以，哪怕防抖函数保持不变，也没法使程序正常运行。

>  这个例子中可以通过` setCounter(x => x + 1)`来得到正确的`counter`值，但其他的事件场景不适用。

### 解决思路：用Ref来保持唯一性

在函数组件中，如果你实在难以阻止重复渲染，那么用ref会是个保底的方法(尽量不要滥用)。

~~~js
function useDebounce(fn, delay, dep = []) {
  const { current } = useRef({ fn, timer: null });
  useEffect(function () {
    current.fn = fn;
  }, [fn]);

  return useCallback(function f(...args) {
    if (current.timer) {
      clearTimeout(current.timer);
    }
    current.timer = setTimeout(() => {
      current.fn(...args);
    }, delay);
  }, dep)
}
~~~

这个方法是可行的，封装成一个公共hooks还是比较实用的。

完