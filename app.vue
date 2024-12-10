<template>
  <div>
    <NuxtLayout >
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
  // 再渲染出來完整的 HTML 中添加標籤在 head 區塊

  // 組合函數 useHead
  useHead({
    title: 'Nuxt 3 Blog',
    // /pages 目錄中各個.vue元件中, 如有書寫 useHead 指定各別文字內容時, 當頁面切換到該頁, 則該頁title 的內容就會自動改以 `${title} - Nuxt 3 Blog` 格式串接
    // 如果沒有書寫 useHead, 則以此處預設的 'Nuxt 3 Blog' 所見原樣顯示
    titleTemplate: (title) => (title ? `${title} - Nuxt 3 Blog` : 'Nuxt 3 Blog'),
    htmlAttrs: {
      lang: 'zh-TW'
    },
    link: [
      {
        rel: 'icon',
        href: '/favicon.ico'
      }
    ]
  })

  // 組合函數 useSeoMeta
  useSeoMeta({
    description: '歡迎來到使用 Nuxt 3 開發的部落格網站',
    ogTitle: 'Nuxt 3 Blog',
    ogDescription: '歡迎來到使用 Nuxt 3 開發的部落格網站',
    ogUrl: 'http://localhost:3000/',
    ogImage: 'https://i.imgur.com/AVNujNC.png'
  })
</script>