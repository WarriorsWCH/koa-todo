const db = require('../utils/db')

const user = {

    // 数据库操作
    // 创建用户
    async create(model) {
        let result = await db.insertData('user', model)
        return result
    },

    // 根据用户名密码查找用户
    async login(model) {
        let _sql = `SELECT * FROM user WHERE 
        password="${model.password}" and name="${model.name}" limit 1`
        let result = await db.query(_sql)
        console.log('sql:', result)
        if (Array.isArray(result)) {
            return result
        } else {
            result = null
        }
    }
}

module.exports = user