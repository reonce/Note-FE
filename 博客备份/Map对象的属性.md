实现：数组对象=>根据对象下的某个键去重
先上方法：
unique(arr: any[], u_key: string) {
const map = new Map();
arr.forEach(item => {
if (!map.has(item[u_key])) {
map.set(item[u_key], item);
}
});
return […map.values()];
}

浅析ES6中的Map对象属性和方法

const map = new Map();
map对象的属性方法有：
size：获取成员的数量 // map.size :number
set：设置成员 key 和 value // map.set(key,value)
get：获取成员属性值 // map.set(key)
has：判断成员是否存在 // map.has(key)
delete：删除成员 // map.delete(key) 返回一个布尔值表示是否删除成功
clear：清空所有 //同上

