// 這支 api 提供使用者查詢登入資訊

import jwt from 'jsonwebtoken'

export default defineEventHandler((event) => {
    // 與 login.post.js 註冊登入的不同點在此: 
    // 從瀏覽器請求中取出 cookie 中 access_token 欄位中的 token 並驗證它
    const jwtToken = getCookie(event, 'access_token')

    try {
        // 驗證瀏覽器請求中所夾帶 token 與我伺服器當初簽發給他的內容是否一致
        // 預期: 如 token 未過期、未遭竄改, 應該可以通過驗證
        const { data: userInfo } = jwt.verify(jwtToken, 'JWT_SIGN_SECRET_PLEASE_REPLACE_WITH_YOUR_KEY')

        // 通過 token 驗證無誤後, 回傳登入使用者資料給瀏覽器, 提供渲染畫面
        return {
            id: userInfo.id,
            nickname: userInfo.nickname,
            email: userInfo.email,
            avatar: userInfo.avatar
        }
    } catch (e) {
        // 錯誤處理
        throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized'
        })
    }
})