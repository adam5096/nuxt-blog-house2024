<template>
    <div class="flex flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div class="w-full max-w-md">
            <div class="flex flex-col items-center">
                <NuxtLink to="/">
                    <Icon name="logos:nuxt-icon" size="80" />
                </NuxtLink>
                <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-700">登入帳號</h2>
            </div>

            <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div class="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
                    <!-- .prevent 修飾符可在提交表單後防止瀏覽器刷新畫面 -->
                    <form class="space-y-6" @submit.prevent="handleLogin">
                        <div>
                            <label for="account" class="block text-sm font-medium text-gray-700">帳號</label>
                            <div class="mt-1">
                                <input id="account" v-model="loginData.account" name="account" type="text"
                                    autocomplete="account" required
                                    class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 sm:text-sm" />
                            </div>
                        </div>

                        <div>
                            <label for="password" class="block text-sm font-medium text-gray-700">密碼</label>
                            <div class="mt-1">
                                <input id="password" v-model="loginData.password" name="password" type="password"
                                    autocomplete="current-password" required
                                    class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 sm:text-sm" />
                            </div>
                        </div>

                        <div>
                            <button type="submit"
                                class="flex w-full justify-center rounded-md border border-transparent bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">
                                登入
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    definePageMeta({
        // 停用預設佈局模板
        layout: false
    })

    // 保存使用者輸入的帳號、密碼
    const loginData = reactive({
        account: '',
        password: ''
    })

    // 登入函數
    const handleLogin = async () => {
        const { data } = await useFetch('/api/login', {
            method: 'POST',
            body: {
                account: loginData.account,
                password: loginData.password
            }
        })

        // 如成功登入
        if (data.value) {
            // 路由重定向到首頁
            navigateTo('/')
        }
    }
</script>