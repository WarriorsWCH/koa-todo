const list = require('../models/list')

module.exports = {

    // 添加todo
    async add(ctx) {
        let formData = ctx.request.body
        let result = {
            success: true,
            message: 'ok',
            data: [],
            code: '10000'
        }

        let listResult = await list.addOneList(formData)
        console.log('新增结果：', listResult)
        if (!listResult.insertId) {
            result.success = false
            result.message = '添加失败'
            result.code = '19003'
        } else {
            let r = await list.getAllList({ uid: formData.uid })
            result.data = r
        }
        ctx.body = result
    },
    // 查找todo
    async getAllData(ctx) {
        let formData = ctx.request.query
        let result = {
            success: true,
            message: 'ok',
            data: [],
            code: '10000'
        }

        let listResult = await list.getAllList(formData)
        console.log('查询结果：', listResult)
        if (Array.isArray(listResult) && listResult.length >= 0) {
            result.data = listResult
        } else {
            result.code = '19004'
            result.message = '查找失败'
        }
        ctx.body = result
    },

    // 更新
    async updateData(ctx) {
        let formData = ctx.request.body
        let result = {
            success: true,
            message: 'ok',
            data: [],
            code: '10000'
        }
        let listResult = await list.updateOneList(formData)
        console.log('更新结果：', listResult)
        if (!listResult.changedRows) {
            result.success = false
            result.message = '更新失败'
            result.code = '19003'
        } else {
            let r = await list.getAllList({ uid: formData.uid })
            result.data = r
        }
        ctx.body = result
    },
    // 删除
    async deleteData(ctx) {
        let formData = ctx.request.body
        let result = {
            success: true,
            message: 'ok',
            data: [],
            code: '10000'
        }

        let listResult = await list.deleteOneList(formData)
        console.log('删除结果：', listResult)
        if (!listResult) {
            result.success = false
            result.message = '删除失败'
            result.code = '19003'
        } else {
            let r = await list.getAllList({ uid: formData.uid })
            result.data = r
        }
        ctx.body = result
    }
}