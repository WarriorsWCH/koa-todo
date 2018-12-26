// 首页路由
const router = require('koa-router')()

const routers = router.get('/', async(ctx) => {
    await ctx.render('home', {
        title: 'TODO-HOME'
    })
})

module.exports = routers