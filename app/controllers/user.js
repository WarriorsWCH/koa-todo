const user = require('../models/user')

module.exports = {

    // 登录
    async signIn(ctx) {
        let formData = ctx.request.body
        let result = {
            success: true,
            message: 'ok',
            data: {},
            code: '10000'
        }

        let userResult = await user.login(formData)
        console.log('查询数据库结果：', userResult)
        if (userResult.length > 0) {
            result.data = userResult[0]
        } else {
            result.code = '19002'
            result.message = '用户名或登录密码错误'
        }

        if (formData.source === 'form' && result.success === true) {
            let session = ctx.session
            session.isLogin = true
            session.name = userResult.name
            session.id = userResult.id
        } else {
            ctx.body = result
        }
    }
}