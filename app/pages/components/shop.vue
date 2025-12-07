<template>
  <div class="w-full max-w-md mx-auto">
    <div
      class="shop-card flex flex-col gap-2 rounded-xl border border-slate-100 
             bg-white shadow-sm px-5 py-4 
             hover:shadow-md hover:-translate-y-0.5 
             transition-transform duration-150
             m-3"
    >
      <div v-if="data" class="flex flex-col gap-2">
        <p class="text-lg font-semibold text-gray-800">
          {{ data.name }}
        </p>
        <div class="flex flex-wrap items-center gap-2">
          <span
            class="inline-block rounded-full bg-orange-100 text-orange-700 
                   px-3 py-1 text-xs font-medium"
          >
            {{ data.catergory }}
          </span>

          <span
            class="inline-block rounded-full bg-teal-100 text-teal-700 
                   px-3 py-1 text-xs font-medium"
          >
            {{ data.Subcatergory }}
          </span>
        </div>
        <div class="mt-1 flex items-center justify-between">
          <span class="text-xs text-gray-500">
            行った回数
          </span>

          <span
            class="inline-flex items-center rounded-full bg-yellow-100 px-3 py-1 
                   text-xs font-bold text-yellow-700"
          >
            {{ data.count }} 回
          </span>
        </div>

      </div>

      <div v-else class="py-3 text-center text-sm text-gray-400">
        データなし
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { type ShopData } from '~/dts/shop.dts';
const props = defineProps<{
  data: ShopData | null
}>()
</script>