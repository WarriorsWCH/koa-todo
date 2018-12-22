const router = require('koa-router')()
const userController = require('../controllers/user')

const routers = router.post('/user/signin.json', userController.signIn)

module.exports = routers