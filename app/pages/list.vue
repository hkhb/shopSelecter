<template>
  <main class="min-h-screen bg-gradient-to-b from-sky-50 to-white py-10 px-4">
    <div class="max-w-5xl mx-auto mb-8 flex items-center justify-between gap-4">
      <h1 class="text-2xl sm:text-3xl font-bold text-gray-800 tracking-tight">
        お店リスト
      </h1>
      <button
      class="inline-flex items-center gap-2 rounded-full border border-sky-200 
               bg-white px-4 py-2 text-sm font-medium text-sky-700
               shadow-sm hover:shadow-md hover:border-sky-300
               hover:-translate-y-0.5 active:translate-y-0
               transition"
        @click="handleClick()">
        追加
      </button>
      <NuxtLink
        to="/"
        class="inline-flex items-center gap-2 rounded-full border border-sky-200 
               bg-white px-4 py-2 text-sm font-medium text-sky-700
               shadow-sm hover:shadow-md hover:border-sky-300
               hover:-translate-y-0.5 active:translate-y-0
               transition"
      >
        <span class="text-base">←</span>
        <span>ホームへ</span>
      </NuxtLink>
    </div>
    <div class="max-w-5xl mx-auto">
      <div class="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="item in items"
          :key="item.id"
          class="w-full"
          @click="handleClick(item)"
        >
          <Shop :data="item" />
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import Shop from './components/Shop.vue'
import { useListComposition } from '../compositions/list.composition'

const { items, handleClick } = useListComposition()

const shopStore = useShopStore()

await useAsyncData('shops', () => shopStore.fetchShops())

onUnmounted(() => {
  shopStore.$reset() // もしくは shopStore.$reset()
})
</script>