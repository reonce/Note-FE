## node版本管理及包管理

  #### 1.版本管理

  目前主流的node版本管理工具是`nvm`和`n`，由于前者支持win和mac双平台，并且不依赖node（n是一个node的包），在泛用性和适用性上都要好一点，因此个人选择了`nvm`。

win环境：直接下载安装即可 [下载地址](https://github.com/coreybutler/nvm-windows/releases)

mac环境： 

**命令：**

 `nvm ls-remote`：列出所有可以安装的node版本号

 `nvm install v10.4.0`：安装指定版本号的node

 `nvm use v10.3.0`：切换node的版本，这个是全局的

 `nvm current`：当前node版本

 `nvm ls`：列出所有已经安装的node版本

 `nvm ls available` : 查看远程线上的node版本列表



#### 2.包管理

- npm
- yarn
- pnpm

  实际项目中，为了兼容不同的开发者(同事)开发，会在项目中配置一些国内的镜像或者公司镜像。

在项目的根目录下配置`.npmrc`文件或者`.yarnrc`文件。 

```js
registry "https://registry.npm.taobao.org"  // 指定国内镜像
some_package "https://url"  // 给某个包名指定某个特定地址

```

#### 3.资源管理

`nrm`可以快速设置包管理工具所使用的“来源”，例如快速设置npm淘宝镜像等

##### `nrm`常用命令

```
npm install -g nrm  ## nrm 安装
nrm ls ## 列出可用的源
nrm use taobao ## 选择国内淘宝的源
nrm test npm ## 测试速度
nrm add taobao http://192.168.10.127:8081/repository/npm-public/ ##  添加源
nrm del taobao ## 删除对应的源
```


