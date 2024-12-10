// 由於 JWT TOKEN 特性, 實際在簽發後並無註銷功能
// 只能透過黑名單或其他判斷方式來阻擋

export default defineEventHandler((event) => {
    // 將 cookie 當中保存 token 的欄位 access_token 內容給清空
    // 登出狀態: 表示 cookie 中沒有保存任何 token
    setCookie(event, 'access_token', null)

    return 'ok'
})