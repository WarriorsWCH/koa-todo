const router = require('koa-router')()
const userController = require('../controllers/user')
const listController = require('../controllers/list')

const routers = router.post('/user/signin.json', userController.signIn)
    .post('/list/add.json', listController.add)
    .get('/list/getall.json', listController.getAllData)
    .post('/list/update.json', listController.updateData)
    .post('/list/delete.json', listController.deleteData)


module.exports = routers