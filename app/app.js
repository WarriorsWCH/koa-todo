const path = require('path')
const Koa = require('koa')
const views = require('koa-views')
const koaStatic = require('koa-static')
const bodyParser = require('koa-bodyparser')
const session = require('koa-session-minimal')
const MysqlStore = require('koa-mysql-session')
const koaLogger = require('koa-logger')

const routers = require('./routers/index')

// 初始化koa
const app = new Koa()

// session存储配置
const sessionMysqlConfig = {
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '123456',
    database: 'koa_db'
}

// 配置session中间件
app.use(session({
    key: 'USER_SID',
    store: new MysqlStore(sessionMysqlConfig)
}))

// 配置控制台日志中间件
// 日志是项目error调试和日常维护的基本手段,命令程序就会在控制台自动打印日志，当然如果你对Koa-logger的风格不满意或者想要看到更多得信息也可以自己编辑代码实现有自己风格的日志打印。
app.use(koaLogger())

// 配置body解析中间件
app.use(bodyParser())

// 配置静态资源加载中间件
app.use(koaStatic(path.join(__dirname, './../static')))

// 配置服务端模板渲染引擎中间件
app.use(views(path.join(__dirname, './views'), {
    extension: 'ejs'
}))

// 初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods())

// 监听启动端口
app.listen(3000, () => {
    console.log('the server is starting at port 3000')
})