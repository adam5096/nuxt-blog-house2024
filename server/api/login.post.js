// 這是一支提供登入驗證用的 API

import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
    // 取出來自瀏覽器請求的請求主體
    const body = await readBody(event)

    // 驗證: 錯誤處理 & 回應
    // 為方便測試，我們僅檢查 body.account, body.password 兩項
    // 這裡我們預期該用戶上一次註冊帳號、密碼為 adam, House2024
    if (!(body.account === 'adam' && body.password === 'House2024')) {
        throw createError({
            statusCode: 400,
            statusMessage: '登入失敗'
        })
    }

    // 驗證: 通過驗證後, 開始建構使用者資訊, 裝載 TOKEN 內容
    const jwtTokenPayload = {
        id: 1,
        nickname: 'Adam',
        email: 'Adamyao123@gmail.com',
        avatar: 'https://images.unsplash.com/photo-1577023311546-cdc07a8454d9?fit=crop&w=128&h=128'
    }

    // 設定 TOKEN 時效為 7 天
    const maxAge = 60 * 60 * 24 * 7
    // 設定 TOKEN 保存在 cookie 的到期日
    const expires = Math.floor(Date.now() / 1000) + maxAge

    // 簽發 jwt TOKEN
    const jwtToken = jwt.sign(
        {
            exp: expires,
            data: jwtTokenPayload
        },
        // 加入密鑰, 建議使用非對稱式加、解密
        'JWT_SIGN_SECRET_PLEASE_REPLACE_WITH_YOUR_KEY'
    )

    // 驗證: 將 TOKEN 放入 cookie 並發給瀏覽器
    // token 保存在 cookie 中的 access_token 這個欄位(key)中
    setCookie(event, 'access_token', jwtToken, {
        maxAge,
        expires: new Date(expires * 1000),
        secure: true,
        httpOnly: true,
        path: '/'
    })

    return '登入成功'
})