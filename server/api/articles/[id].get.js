// 這支 API 提供查詢 "指定編號" 文章資訊


import { pool } from '@/server/utils/db'

export default defineEventHandler(async (event) => {
    // 取得請求主體中的 param 參數
    const articleId = getRouterParam(event, 'id')

    const articleRecord = await pool
        // 拿著瀏覽器請求查找的參數id，到資料庫中比對
        .query('SELECT * FROM "article" WHERE "id" = $1;', [articleId])
        // 回傳查詢結果陣列的第一個元素(估計是資料主體會放在第0位置, 其他資訊往後銜接)
        .then((result) => result.rows?.[0])
        .catch((error) => {
            console.error(error)
            throw createError({
                statusCode: 500,
                message: '無法取得文章，請稍候再試'
            })
        })

    // 文章資料不存在: 使用者請求一份不存在的內容
    if (!articleRecord) {
        throw createError({
            statusCode: 400,
            message: '取得文章失敗，請稍候再試'
        })
    }

    return articleRecord
})