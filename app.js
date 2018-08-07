//1,导入模板
const fs=require('fs')
const http=require('http')
const path=require('path')
const mime=require('mime')

//2,创建根目录地址
let rootPath=path.join(__dirname,'www')
// console.log(rootPath);

//3,创建服务器
let server=http.createServer((request,response)=>{
    //创建被访问的网页的地址
    let targetPath=path.join(rootPath,request.url)

    //判断被访问的文件是否存在
    if(fs.existsSync(targetPath)){
        //如果存在,判断访问的是文件还是文件夹,调用fs的stat方法,传入路径和回调函数
        fs.stat(targetPath,(err,files)=>{
            //如果是文件,则读取文件,并返回到页面
            if(files.isFile()){
                //console.log(mime.getType(targetPath));//获取文件类型,设置后缀名
                response.setHeader('content-type', mime.getType(targetPath));
                //读取文件
                fs.readFile(targetPath,(err,data)=>{
                    // console.log(data);
                    //返回读取的文件
                    response.end(data)
                })
            }
            //如果是文件夹
            if(files.isDirectory()){
                fs.readdir(targetPath,(err,data)=>{
                    let tmp=''
                    //循环创建li标签
                    for(let i=0;i<data.length;i++){
                        //如果是多级文件则判断是否给文件名后面加/
                        tmp+=`<li><a href="${request.url}${request.url=='/'?'':'/'}${data[i]}">${data[i]}</a></li>`
                    }
                    //渲染到页面
                    response.end(`<!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <meta http-equiv="X-UA-Compatible" content="ie=edge">
                        <title>Document</title>
                        <link rel="icon" href="./favicon.ico">
                    </head>
                    <body>
                        <h1>index Of${request.url}</h1>
                        <ul>${tmp}</ul>
                    </body>
                    </html>`)
                })
            }
        })
    }else{
        //如果不存在,则返回404页面
        //当使用隐式的响应头时（没有显式地调用 
        //response.writeHead()），该属性控制响应头刷新时将被发送到客户端的状态码。
        response.statusCode = 404;
        response.end(
        `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                <title>404 Not Found</title>
            </head>
            <body>
                <h1>Not Found</h1>
                <p>你请求的${request.url}不在服务器上</p>
            </body>
            </html>
        `)
    }
})

//4,开启服务器
server.listen(8848,'127.0.0.1',()=>{
    console.log('开启成功');
})