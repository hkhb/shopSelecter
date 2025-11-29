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

      <div class="flex flex-col gap-1">
        <label class="text-xs font-medium text-gray-600">
          店名
        </label>
        <input
          v-model="form.name"
          type="text"
          class="w-full rounded-md border border-slate-200 px-3 py-2 text-sm
                 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-300"
          placeholder="例：ラーメン太郎"
          required
        />
      </div>

      <div class="flex flex-col gap-1">
        <label class="text-xs font-medium text-gray-600">
          カテゴリ
        </label>
        <input
          v-model="form.catergory"
          type="text"
          class="w-full rounded-md border border-slate-200 px-3 py-2 text-sm
                 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-300"
          placeholder="例：restaurant / cafe / bar"
        />
      </div>

      <div class="flex flex-col gap-1">
        <label class="text-xs font-medium text-gray-600">
          サブカテゴリ
        </label>
        <input
          v-model="form.Subcatergory"
          type="text"
          class="w-full rounded-md border border-slate-200 px-3 py-2 text-sm
                 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-teal-300"
          placeholder="例：ra-men / izakaya など"
        />
      </div>

      <div class="flex flex-col gap-1">
        <label class="text-xs font-medium text-gray-600">
          行った回数
        </label>
        <input
          v-model.number="form.count"
          type="number"
          min="0"
          class="w-full rounded-md border border-slate-200 px-3 py-2 text-sm
                 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-300"
          placeholder="例：1"
        />
      </div>

      <div class="mt-2 flex justify-end gap-3">
        <button
          type="button"
          class="rounded-md border border-slate-200 px-4 py-2 text-xs font-medium text-gray-600
                 hover:bg-slate-50"
          @click="onCancel"
        >
          キャンセル
        </button>
        <button
          type="submit"
          class="rounded-md bg-sky-500 px-4 py-2 text-xs font-semibold text-white
                 hover:bg-sky-600 active:translate-y-[1px] transition"
        >
          保存する
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, watch } from 'vue'
import { closeModal } from 'jenesius-vue-modal'

type ShopFormData = {
  id?: number
  name: string
  catergory: string
  Subcatergory: string
  count: number
}

const props = defineProps<{
  data?: {
    id: number;
    name: string;
    catergory: string;
    Subcatergory: string;
    count: number;
  }
}>()

const emit = defineEmits<{
  (e: 'submit', payload: ShopFormData): void
  (e: 'cancel'): void
}>()

const form = reactive<ShopFormData>({
  id: props.data?.id,
  name: props.data?.name ?? '',
  catergory: props.data?.catergory ?? '',
  Subcatergory: props.data?.Subcatergory ?? '',
  count: props.data?.count ?? 0,
})

watch(
  () => props.data,
  (val) => {
    if (!val) return
    form.id = val.id
    form.name = val.name
    form.catergory = val.catergory
    form.Subcatergory = val.Subcatergory
    form.count = val.count
  },
  { immediate: false }
)

const onSubmit = () => {
  emit('submit', { ...form })
}

const onCancel = async () => {
  await closeModal()
}
</script>