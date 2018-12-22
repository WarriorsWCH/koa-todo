// 整合所有子路由
const router = require('koa-router')()
const login = require('./login')
const api = require('./api')

router.use('/', login.routes(), login.allowedMethods())
router.use('/api', api.routes(), api.allowedMethods())


module.exports = router