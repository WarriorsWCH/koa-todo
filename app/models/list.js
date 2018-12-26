const db = require('../utils/db')

const list = {

    // 数据库操作
    // 根据用户名密码查找用户
    async addOneList(model) {
        let result = await db.insertData('data', model)
        return result
    },
    // 获取当前登录用户的所有todo list
    // uid 用户的id
    async getAllList(model) {
        let _sql = `SELECT * FROM data WHERE uid="${model.uid}"`
        let result = await db.query(_sql)
        if (Array.isArray(result)) {
            return result
        } else {
            result = null
        }
    },
    // 更新某条todo list
    async updateOneList(model) {
        console.log(model, 'd')
        let _sql = 'UPDATE data SET title = ?,des = ?,remind_time = ? WHERE id = ?'
        let result = await db.query(_sql, [model.title, model.des, model.remind_time, model.id])
        return result
    }
}

module.exports = list