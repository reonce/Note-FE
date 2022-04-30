JS函数的柯里化：通过函数调用继续返回函数的形式，实现多次接受参数统一处理的函数编码形式

function sum(a){
 return (b)=>{
    return (c)=>{
       return  a+b+c
       }
   }
}
sum(1)(2)(3)   //6
