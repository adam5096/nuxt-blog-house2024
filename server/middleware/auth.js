// 這個中間件提供驗證使用者 cookie 有效期限, 在每次使用者請求不同頁面(路由跳轉)之前

// 所有的 API 路由在進入處理之前，都會先經過伺服器中間件先行處理

import jwt from 'jsonwebtoken'

// 指定哪些 API 請求才需要檢查權限: 節約中間件的運算資源
const urls = [
    {
        path: '/api/articles',
        method: 'POST'
    },
    {
        path: /^\/api\/articles\/(.*)($|\?.*|#.*)/,
        method: 'DELETE'
    },
    {
        path: /^\/api\/articles\/(.*)($|\?.*|#.*)/,
        method: 'PATCH'
    }
]

export default defineEventHandler((event) => {
    // 中間件權限驗證流程優化 start: 只驗證新增文章、刪除文章的API請求
    // 取得單獨文章、取得文章列表，這兩者免權限驗證
    const requireVerify = urls.some((apiUrl) => {
        if (event.method === apiUrl.method) {
            if (apiUrl.path instanceof RegExp) {
                return apiUrl.path.test(event.path)
            }

            return event.path === apiUrl.path
        }

        return false
    })

    if (!requireVerify) {
        return
    }
    // 中間件權限驗證流程優化 end


    // 從每次請求資訊中的 cookie 中的 access_token 欄位中的 jwt token
    const jwtToken = getCookie(event, 'access_token')

    if (jwtToken) {
        try {
            // 驗證前端請求夾帶的 jwt token 沒有過期，沒有竄改
            const { data: user } = jwt.verify(jwtToken, 'JWT_SIGN_SECRET_PLEASE_REPLACE_WITH_YOUR_KEY')

            // 在前端 API 請求的 context 中新增一欄位 auth，並放入驗證後資訊物件 { user:user }
            event.context.auth = {
                user
            }
        } catch (error) {
            console.error(error)
        }
    }
})