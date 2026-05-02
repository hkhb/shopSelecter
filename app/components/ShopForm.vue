<template>
  <div class="w-full max-w-md mx-auto">
    <form
      class="shop-card flex flex-col gap-4 rounded-xl border border-slate-100 
             bg-white shadow-sm px-5 py-4 
             hover:shadow-md hover:-translate-y-0.5 
             transition-transform duration-150
             m-3"
      @submit.prevent="onSubmit"
    >
      <h2 class="text-lg font-semibold text-gray-800">
        お店情報フォーム
      </h2>

      <!-- 店名 -->
      <div class="flex flex-col gap-1">
        <label class="text-xs font-medium text-gray-600">
          店名 <span class="text-red-500">*</span>
        </label>
        <input
          v-model="form.name"
          type="text"
          class="w-full rounded-md border px-3 py-2 text-sm
                 focus:outline-none focus:ring-2
                 "
          :class="errors.name
            ? 'border-red-400 focus:ring-red-300 focus:border-red-300'
            : 'border-slate-200 focus:ring-sky-300 focus:border-sky-300'
          "
          placeholder="例：ラーメン太郎"
          required
        />
        <p v-if="errors.name" class="mt-1 text-xs text-red-600">
          {{ errors.name }}
        </p>
      </div>

      <!-- カテゴリー -->
      <div class="flex flex-col gap-1">
        <label class="text-xs font-medium text-gray-600">
          カテゴリー <span class="text-red-500">*</span>
        </label>
        <input
          v-model="form.category"
          type="text"
          class="w-full rounded-md border px-3 py-2 text-sm
                 focus:outline-none focus:ring-2
                 "
          :class="errors.category
            ? 'border-red-400 focus:ring-red-300 focus:border-red-300'
            : 'border-slate-200 focus:ring-orange-300 focus:border-orange-300'
          "
          placeholder="例：restaurant / cafe / bar"
        />
        <p v-if="errors.category" class="mt-1 text-xs text-red-600">
          {{ errors.category }}
        </p>
      </div>

     <!-- サブカテゴリ -->
      <div class="flex flex-col gap-1">
        <label class="text-xs font-medium text-gray-600">
          サブカテゴリ
        </label>
        <input
          v-model="form.subCategory"
          type="text"
          class="w-full rounded-md border border-slate-200 px-3 py-2 text-sm
                focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-teal-300"
          placeholder="例：ra-men / izakaya など"
        />
        <p v-if="errors.subCategory" class="mt-1 text-xs text-red-600">
          {{ errors.subCategory }}
        </p>
      </div>

      <!-- 行った回数 -->
      <div class="flex flex-col gap-1">
        <label class="text-xs font-medium text-gray-600">
          行った回数
        </label>
        <input
          v-model.number="form.count"
          type="number"
          min="0"
          max="999"
          class="w-full rounded-md border border-slate-200 px-3 py-2 text-sm
                 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-300"
          placeholder="例：1"
        />
        <p v-if="errors.count" class="mt-1 text-xs text-red-600">
          {{ errors.count }}
        </p>
      </div>

      <p v-if="ui.message" class="text-sm" :class="ui.type === 'success' ? 'text-green-600' : 'text-red-600'">
        {{ ui.message }}
      </p>

      <div class="mt-2 flex justify-end gap-3">
        <button
          type="button"
          class="mt-4 px-4 py-2 rounded bg-gray-100 text-gray-700 text-xs font-semibold
                 hover:bg-write-200 active:translate-y-[1px] transition"
          @click="onCancel"
        >
          キャンセル
        </button>

        <button
          type="button"
          class="mt-4 px-4 py-2 rounded bg-sky-600 text-white text-xs font-semibold
                 hover:bg-sky-700 active:translate-y-[1px] transition"
          @click="onSubmit"
        >
          保存
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { watch } from 'vue'
import { useListComposition } from '@/compositions/list.composition'
import type { ShopData } from '../../dts/shop.dts'

const props = defineProps<{ modelValue?: ShopData }>()
const emit = defineEmits<{
  'update:modelValue': [value: ShopData]
  'close': []
  'submit': []
}>()
const { form, errors, ui, setForm } = useListComposition()

watch(
  () => props.modelValue,
  (val) => setForm(val),
  { immediate: true }
)

watch(
  form,
  (val) => emit('update:modelValue', { ...val }),
  { deep: true }
)

const onSubmit = async () => {
  emit('submit')
}

const onCancel = () => {
  emit('close')
}
</script>