# Fiber

#### 回答关键的几个的地方

1. 递归树改成链表，可中断

2. 链表节点有4个关键属性，return父亲，child子节点，sibling兄弟，alternate拷贝

3. DFS，一路到底，再向上遍历兄弟 ，可以补充 react自己实现了reaquestIdleCallback