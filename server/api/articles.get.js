// 這支 API 提供查詢 "現有全部" 文章資訊


import { pool } from '@/server/utils/db'

export default defineEventHandler(async (event) => {
    // 取出請求資料中的 query 參數
    const query = await getQuery(event)

    // page 要查第 ? 頁
    const page = Math.max(parseInt(query.page) || 1, 1) // 確保 page 值是大於等於 1 的整數
    // pageSize 每頁要呈現 ? 筆資料
    const pageSize = Math.min(Math.max(parseInt(query.pageSize) || 10, 1), 100)// pageSize 最小為1，最大 100

    const articleRecords = await pool
        // ORDER BY "updated_at" DESC => 將查找資料依照 updated_at (日期) 由大至小排序
        // OFFSET $1 LIMIT $2 => 查詢筆數起點&終點 => 從第 1 筆 ~ 第 10 筆;  從第 11 筆 ~ 第 20 筆
        .query('SELECT * FROM "article" ORDER BY "updated_at" DESC OFFSET $1 LIMIT $2;', [
            (page - 1) * pageSize,
            pageSize
        ])
        .then((result) => result.rows)
        .catch((error) => {
            console.error(error)
            throw createError({
                statusCode: 500,
                message: '無法取得文章列表，請稍候再試'
            })
        })

    return {
        items: articleRecords,
        page,
        pageSize
    }
})