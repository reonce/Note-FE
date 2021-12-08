// reduce回调
function flattenDeep(arr) { 
  return Array.isArray(arr)
    ? arr.reduce( (acc, cur) => [...acc, ...flattenDeep(cur)] , [])
    : [arr]
}

// 堆栈法
function flattenDeep(arr) {
  const result = [] 
  // 将数组元素拷贝至栈，直接赋值会改变原数组
  const stack = [...arr]
  // 如果栈不为空，则循环遍历
  while (stack.length !== 0) {
    const val = stack.pop() 
    if (Array.isArray(val)) {
      // 如果是数组再次入栈，并且展开了一层
      stack.push(...val) 
    } else {
      // 如果不是数组，就用头插法插入到结果数组中
      result.unshift(val)
    }
  }
  return result
}

// 测试
var test = [["d", ["e", ["f"]], "g"], "a", ["b", "c"], ["d", ["e", ["f"]], "g"]]
console.log(flattenDeep(test))
