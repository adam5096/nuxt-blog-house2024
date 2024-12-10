// 這支 API 提供刪除指定文章

import { pool } from '@/server/utils/db'

export default defineEventHandler(async (event) => {

    // 先檢查是否已經過 auth 中間件檢查痕跡( 要存在 auth 物件)
    // 若 user?.id ! == 1 則無權限進行後續操作
    if (event.context?.auth?.user?.id !== 1) {
        throw createError({
            statusCode: 401,
            message: '沒有權限'
        })
    }

    // 取出請求資料中的 param 參數 id
    const articleId = getRouterParam(event, 'id')

    const result = await pool
    // 拿著請求資料中的 param 參數 id , 到資料庫中比對 id ; 找到對應資料後, 將資料從庫中刪除
        .query('DELETE FROM "article" WHERE "id" = $1;', [articleId])
        .catch((error) => {
            console.error(error)
            throw createError({
                statusCode: 500,
                message: '無法刪除文章，請稍候再試'
            })
        })

    if (result.rowCount !== 1) {
        throw createError({
            statusCode: 400,
            message: '刪除文章失敗，請稍候再試'
        })
    }

    return {
        message: '刪除文章成功'
    }
})