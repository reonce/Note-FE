# Bash学习（一）

## Shell概念

Shell的含义是外壳，和内核相对性。比喻内核外的一层，也就是用户和内核交互的界面。

Shell有很多种类。可以通过 `echo $SHELL`命令查看系统的默认Shell

查看当前使用的Shell类型可以通过 `echo $0`命令查看，或者直接输入一条不存在的命令，查看报错

## 命令提示符

~~~bash
[user@hostname] $
~~~

上面例子中，完整的提示符是`[user@hostname] $`，其中前缀是用户名（`user`）加上`@`，再加主机名（`hostname`）。比如，用户名是`bill`，主机名是`home-machine`，前缀就是`bill@home-machine`。

注意，根用户（root）的提示符，不以美元符号（`$`）结尾，而以井号（`#`）结尾，用来提醒用户，现在具有根权限，可以执行各种操作，务必小心，不要出现误操作。这个符号是可以自己定义的，详见《命令提示符》一章。



## echo命令

`pwd`查看当前路径

echo命令是最常见的命令之一，作用类似于js中的console.log(),输出一行数据

~~~js
$ echo hello world
hello world
~~~

输出多行文本，需要把文本放到 引号当中。例如：

~~~js
$ echo "<HTML>
    <HEAD>
          <TITLE>Page Title</TITLE>
    </HEAD>
    <BODY>
          Page body.
    </BODY>
</HTML>"
~~~

单引号会直接输出其中的内容，双引号则具有一些使用变量的操作，很类似js当中的``。

双引号当中的 $会被解析成变量 ， 例如：

~~~bash
$ test=123
$ echo "$test"
$ echo '$test'
123
test
~~~

### 参数

`-n`参数，默认echo输出的文本后面会有一个回车符，加了`-n`后会取消末尾的回车符

`-e`参数，会解释引号当中的特殊字符（比如换行符`\n`），例如：

~~~bash
$echo "Hello\nShell"
Hello\nShell

# 引号的情况
$echo -e "Hello\nShell"
Hello
Shell
~~~

## 命令格式

通产

~~~bash
$ command [ arg1 ... [ argN ]]
~~~

上面代码中，`command`是具体的命令或者一个可执行文件，`arg1 ... argN`是传递给命令的参数，是可选的。

```
$ ls -l
```

上面这个命令中，`ls`是命令，`-l`是参数。

上列参数中 `-l`是短形式，如果用`-list`则是长形式，短形式用于方便执行代码，长形式用于保持代码的阅读性。

### 换行

Bash 单个命令一般都是一行，用户按下回车键，就开始执行。有些命令比较长，写成多行会有利于阅读和编辑，这时可以在每一行的结尾加上反斜杠，Bash 就会将下一行跟当前行放在一起解释。

```bash
$ echo foo bar
# 等同于
$ echo foo \
bar
```

### 空格

Bash使用空格或`Tab`键来区别不同的参数。

如果参数之间有多个空格，Bash 会自动忽略多余的空格。

```bash
$ echo this is a     test
this is a test
```

上面命令中，`a`和`test`之间有多个空格，Bash 会忽略多余的空格。

### 分号

分号（`;`）是命令的结束符，使得一行可以放置多个命令，上一个命令执行结束后，再执行第二个命令。

```bash
$ clear; ls
```

## 组合符 `&& ` 和 `||`

`&&`表示第一个执行成功之后，第二个再执行

`||`表示第一个执行失败，第二个再执行

## type命令

Bash本身内置了很多命令，也可以执行外部程序。可以通过 `type`命令判断命令的来源

~~~bash
$type echo
echo is a shell builtin
$type ls
ls is hashed(/bin/ls)
~~~

可以加 `-a`参数查看命令的所有定义

可以加 `-t`参数查看命令的类型

~~~ bash
$ type -t bash
file
~~~

## 快捷键

部分常用快捷键：

- `Ctrl + L`：清除屏幕并将当前行移到页面顶部。
- `Ctrl + C`：中止当前正在执行的命令。
- `Shift + PageUp`：向上滚动。
- `Shift + PageDown`：向下滚动。
- `Ctrl + U`：从光标位置删除到行首。
- `Ctrl + K`：从光标位置删除到行尾。
- `Ctrl + W`：删除光标位置前一个单词。
- `Ctrl + D`：关闭 Shell 会话。
- `↑`，`↓`：浏览已执行命令的历史记录。