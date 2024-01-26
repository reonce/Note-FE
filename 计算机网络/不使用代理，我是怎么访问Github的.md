
最近更换了 windows系统的电脑， `git clone` 项目的时候会连接超时的错误，不管我怎么把环境变量放到终端里尝试走代理都无果，于是开始了排查

> 以下命令是基于 git bash 终端使用的

## 检测问题

通过 `ssh -T git@github.com` 命令查看，会报如下错误：

`ssh: connect to host github.com port 22: : Connection timed out`

思索了一下，难道是端口的问题吗， 于是从 overflow 上找到回答：

修改 `~/.ssh/config` 路径下的内容，增加如下

```
Host github.com
 Hostname ssh.github.com
 Port 443
```

这段配置实际上是让 `github.com` 走 443 端口去执行，评论上有些说 22端口被占用，某些路由器或者其他程序会占用它，想了一下有道理，于是使用  `vim ~/.ssh/config` 编辑加上，结果...

``ssh: connect to host github.com port 443: : Connection timed out``

正当我苦苦思索，为什么 `ping github.com` 超时的时候，脑子里突然回忆起那道久违的八股文面试题： “url输入网址到浏览器上会发生什么"，突然顿悟：是不是DNS解析出了问题，找不到服务器地址？

网上学到一行命令，可以在终端里看DNS服务器的域名解析

```
//nslookup是域名解析工具
nslookup baidu.com
```

先执行以下 `baidu.com` 的，得到如下：

```
Server:		119.6.6.6
Address:	119.6.6.6#53

Non-authoritative answer:
Name:	baidu.com
Address: 110.242.68.66
Name:	baidu.com
Address: 39.156.66.10
```

在执行一下  `nslookup github.com `，果然发现不对劲了：

```
Name:	github.com
Address: 127.0.0.1
```

返回了 `127.0.0.1`，这不对啊，我可是读过书的，这是本地的 IP 地址啊，原来是这一步出了问题..

## 解决问题

大部分同学应该都改过本地的 DNS 域名映射文件，这也是上面那道八股文题中回答的知识点之一，我们打开资源管理器输入一下路径改一下：

`C:\Windows\System32\drivers\etc\hosts`

> MacOs的同学可以在终端使用 sudo vi /etc/hosts 命令修改

在下面加上下面这一行， 其中 `140.82.113.4` 是 github 的服务器地址，添加后就可以走本地的域名映射了

```
140.82.113.4 github.com
```

保存之后，就可以不使用代理，快乐访问 github.com 了，笔者顺利的完成了梦想第一步： `git clone`

## 5. 结语

我是饮东，欢迎点赞关注，我们江湖再会
