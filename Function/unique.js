// reduce去重
function unique (arr) {
  return arr.sort().reduce((acc, cur) => {
   if (acc.length === 0 || acc[acc.length - 1] !== cur) {
       acc.push(cur);
   }
   return acc
}, [])}
;

// filter+索引
function unique(arr) { 
  return arr.filter( (element, index, array) => {
   return array.indexOf(element) === index
})
}

// 测试
var arr = [1, 2, 2, 3]
unique(arr); // [1, 2, 3]
