<template>
  <main class="min-h-screen bg-gray-50 py-10 px-5">
    <h1 class="text-2xl font-bold text-gray-800 text-center mb-8">
      お店リスト
    </h1>
    <div class="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
      <div
        v-for="item in lists"
        :key="item.id"
        class="w-full"
      >
        <Shop :data="item" />
      </div>
    </div>
  </main>
</template>
<script lang="ts" setup>
  import Shop from './components/Shop.vue'
  import { useListComposition } from '../compositions/list.composition'

  const { lists } = useListComposition()
  console.log(lists)
</script>