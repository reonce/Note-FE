/**
已知某团队小测数据结构如下：

const jsonQuiz = [{
"username": "张三",
"times": 24
}, {
"username": "李四",
"times": 1
}, {
"username": "王二",
"times": 6
}, {
"username": "麻子",
"times": 9
}];

请写一个名为 urLucky 的方法，此方法支持一个参数，为每次抽奖抽中的人员数量，人员的中奖概率按照 times 次数分配。

例如执行 urLucky(2)，张三、李四、王二、麻子中会有两人中奖，每人中奖概率分别是：60%，2.5%，15%，22.5%。

 */

const jsonQuiz = [{
  "username": "张三",
  "times": 24
  }, {
  "username": "李四",
  "times": 1
  }, {
  "username": "王二",
  "times": 6
  }, {
  "username": "麻子",
  "times": 9
  }];

function urLucky (num) {
  if(!num) return new Array(jsonQuiz.length).fill(0);
  const allTimes = jsonQuiz.reduce((x,y) => x + y.times, 0)
  return jsonQuiz.map(item => {
    return item.times / allTimes
  })
}
console.log(urLucky(2))
