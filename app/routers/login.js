// 登录页路由
const router = require('koa-router')()

const routers = router.get('/', async(ctx) => {
    await ctx.render('login', {
        title: 'ToDo List'
    })
})

module.exports = routers