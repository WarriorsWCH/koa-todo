// 登录页路由
const router = require('koa-router')()

const routers = router.get('/', async(ctx) => {
    await ctx.render('index', {
        title: 'ToDo List'
    })
})

module.exports = routers