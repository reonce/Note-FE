------

# CSS文字换行

**word-wrap: normal; || word-break: normal;**

当word-wrap或者word-break为normal时，也就是浏览器的默认设置时。

换行规则是这样的：

　　　　*情景一：*　　当一个单词在行尾不能完整容纳时，会自动将这个单词换到下一行，示例如下。

　　　　　　　　　　![img](https://images2015.cnblogs.com/blog/666306/201508/666306-20150829131640390-213490926.png)

　　　　*情景二：*　　当一个长长的单词在行尾不能完整容纳，并且换行后还是不能容纳时，单词就会溢出容器，示例如下。

　　　　　　　　　　![img](https://images2015.cnblogs.com/blog/666306/201508/666306-20150829131952750-73018671.png)

------

**word-wrap: break-word;**

当word-wrap设置为break-word时，

换行规则如下：

　　　  *情景一：*　和normal情况相同。

　　　　　　　　![img](https://images2015.cnblogs.com/blog/666306/201508/666306-20150829133020312-273716609.png)

　　　 *情景二：*　这时，单词不会溢出容器，而是单词断开，换到下一行。

　　　　　　　　![img](https://images2015.cnblogs.com/blog/666306/201508/666306-20150829133126484-1462778884.png)　　　　 

------

 

**word-break: break-all;**

当word-break设置为break-all时，

换行规则如下：

　　　  *情景一：*　这时，发生了变化。单词不会整体换行，而是断开单词，换到下一行。

　　　　　　　　![img](https://images2015.cnblogs.com/blog/666306/201508/666306-20150829133533890-1946999992.png)

　　　　*情景二：*　这时，和之前相比，又发生了变化。单词还是不会整体换行，单词会不断的断开，换到下一行。

　　　　　　　　![img](https://images2015.cnblogs.com/blog/666306/201508/666306-20150829133726265-1767961043.png)

------

**总结：**

normal和break的**区别**在于：**单词是否会断开**。normal不会断开单词，只会把单词整体换行或者溢出容器。而break会选择断开单词换行。

word-wrap和word-break的**区别**在于：**单词是否会整体换行**。前者会整体换行再断开单词，而后者直接断开单词。

------

 **white-space: nowrap;**

white-space用于处理文字中的空白。会让文字**不自动换行，全部显示在一行内**。

　　　  *情景一：*

　　　　　　　　*![img](https://images2015.cnblogs.com/blog/666306/201508/666306-20150829135244609-1697680237.png)*



题外： user-select: none;  // 文字不可选中
