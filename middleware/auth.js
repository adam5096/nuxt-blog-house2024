// 這個模組提供前端路由權限判斷


export default defineNuxtRouteMiddleware(async () => {
    // 先取得共享狀態(與 components/layoutHeader.vue 共享)
    const userInfo = useState('userInfo')

    if (userInfo.value) {
        if (userInfo.value?.id !== 1) {
            // 如果狀態不存在(使用者處在未登入狀態), 路由重定向到首頁
            return navigateTo('/')
        }
    } else {
        // 經檢查後如 userInfo.value 不存在, 此時再發送API取回使用者資料做驗證
        // 此調整為視情況發送 api 取回使用者資料，而非每次切換路由都發送api，減輕處理負擔
        const user = await $fetch('/api/whoami', {
            // useRequestHeaders 將 cookie 夾帶在請求標頭當中
            headers: useRequestHeaders(['cookie'])
        }).catch((error) => {
            console.error(error)
            return null
        })

        if (user?.id !== 1) {
            return navigateTo('/')
        }
    }
})