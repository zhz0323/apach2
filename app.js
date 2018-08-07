//1,导入模板
const fs=require('fs')
const http=require('http')
const path=require('path')

//2,创建根目录地址
let rootPath=path.join(__dirname,'www')

//3,创建服务器
let server=http.createServer((request,response)=>{
    response.end('hello world')
})

//4,开启服务器
server.listen(8848,'127.0.0.1',()=>{
    console.log('开启成功');
})