# 微信小程序封装wx.request请求


首先官方的文档不是支持Promise风格的请求
我们通过[官方文档](https://link.juejin.cn/?target=https%3A%2F%2Fdevelopers.weixin.qq.com%2Fminiprogram%2Fdev%2Fapi%2Fnetwork%2Frequest%2Fwx.request.html)可以看到微信小程序发请求的一些具体参数，下面的代码展示了用wx.request()发送的一个标准请求：

```js
     wx.request({
          url: "https://xxx.com",
          method:"POST",
          data:{
            phone:187********,
            password:'123456'
          },
          success:res=>{
            console.log('登录成功',res)
          },
          fail:err=>{
            console.log('登录失败',err)
          }
        })
复制代码
```

#### 封装

在封装前我们需要知道用wx.request发请求的几个比较重要的参数:

- url -- 请求地址
- method -- 请求方式(Get/Post,这里我们只封装这2个请求)
- data -- 请求的参数
- success -- 接口调用成功的回调函数
- fail -- 接口调用失败的回调函数

OK,了解完这几个参数后我们开始正式封装一个Promise风格的请求

```js
  /**
       request.js
     * 封装一个Promise风格的通用请求
     * url - 请求地址
     * option - 包含请求方式、请求参数的配置对象
 */
 var app = getApp(); //引入全局app.js，我们可以在globalData中定义一些公用的数据，比如baseUrl、token
 import Toast from '/@vant/weapp/toast/toast';//引入vant插件，用于提示错误
 const request = function(url,options){
     reuturn new Promise((resolve,reject)=>{
         wx.request({
             url:app.globalData.baseUrl+url,
             method:options.method,
             data:options.method=="GET"?options.data:JSON.stringify(options.data),
             // header这里根据业务情况自行选择需要还是不需要
             header:{
                 'Authorization':'Bearer '+app.globalData.token
             },
             success: (res) => {
                if (res.data.code == 500) {
                  Toast(res.data.msg);
                  reject(res.data.msg)
                } else {
                  resolve(res)
                }
              },
              fail: (err) => {
                reject(err)
              }
         })
     })
 }
    

   module.exports = {
       //封装get方法
       get(url,data){
           reutrn request(url,{
               method:"GET",
               data
           })
       }
       //封装post方法
       post(url,data){
           return request(url,{
               method:"POST",
               data
           })
       }
   }
复制代码
```

这样，一个简单的Promise风格的请求就封装好了，接下来我们看如何使用

#### 使用

```js
    //api.js 我们将所有的接口统一管理
    const request = require("./request") //引入封装好的js文件
    module.exports = {
      // 登录
      login(data){
       return request.post('/learn/auth/login',data)
      }
    }
    
复制代码
   // login.js
   const api = require("../../api") //引入同意管理的接口js
   const app = getApp() //引入全局对象
   import Toast from '/@vant/weapp/toast/toast'; //引入vant提示插件
   Page({
       data:{
           phone:123456,
           code:0000
       },
       //登录
       login() {
        if (!this.data.phone.trim()) {
          Toast('请输入正确的手机号');
          return
        }
        let data = {
          phone: this.data.phone,
          password: this.data.password,
        }
        api.login(data)
          .then(res => {
            console.log('登录成功', res)
            wx.reLaunch({
              url: '../index/index',
            })
          })
          .catch(err => {
            console.log('登录失败', err)
          })
      },
     })
复制代码
```

