<template>
  <div class="w-full max-w-md mx-auto">
    <form
      class="shop-card flex flex-col gap-4 rounded-xl border border-slate-100 
             bg-white shadow-sm px-5 py-4 
             hover:shadow-md hover:-translate-y-0.5 
             transition-transform duration-150
             m-3"
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
          class="w-full rounded-md border border-slate-200 px-3 py-2 text-sm
                 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-300"
          placeholder="例：1"
        />
      </div>

      <div class="mt-2 flex justify-end gap-3">
        <button
          v-if="!isCreateMode"
          type="button"
          class="mt-4 px-4 py-2 rounded bg-gray-100 text-gray-700 text-xs font-semibold
                 hover:bg-write-200 active:translate-y-[1px] transition"
          @click="onDelete"
        >
          削除
        </button>

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
import { reactive, watch, computed } from 'vue'
import { closeModal } from 'jenesius-vue-modal'
import { useShopStore } from '~/stores/list.store'
import type { ShopData } from '../../dts/shop.dts'

const shopStore = useShopStore()

const props = defineProps<{
  data?: ShopData
}>()

// 作成モードか編集モードか（リアクティブに）
const isCreateMode = computed(() => !props.data?.id)

// フォーム本体
const form = reactive<ShopData>({
  id: props.data?.id,
  name: props.data?.name ?? '',
  category: props.data?.category ?? '',
  subCategory: props.data?.subCategory ?? '',
  count: props.data?.count ?? 0,
})

// バリデーションエラー用
const errors = reactive<{
  name?: string
  category?: string
  subCategory?: string
}>({})

// props 変更時にフォームを同期（編集時用）
watch(
  () => props.data,
  (val) => {
    if (!val) return
    form.id = val.id
    form.name = val.name
    form.category = val.category
    form.subCategory = val.subCategory
    form.count = val.count
  },
  { immediate: false }
)

const resetForm = () => {
  form.id = undefined
  form.name = ''
  form.category = ''
  form.subCategory = ''
  form.count = 0
  errors.name = undefined
  errors.category = undefined
  errors.subCategory = undefined
}

const onSubmit = async () => {
  errors.name = undefined
  errors.category = undefined
  errors.subCategory = undefined

  if (!form.name?.trim()) {
    errors.name = '店名は必須です'
  }
  if (!form.category?.trim()) {
    errors.category = 'カテゴリーは必須です'
  }
  if (!isValidLambdaString(form.name)) {
    errors.name = '店名に使用できない文字が含まれています'
  }
  if (!isValidLambdaString(form.category)) {
    errors.category = 'カテゴリーに使用できない文字が含まれています'
  }
  if (!isValidLambdaString(form.subCategory)) {
    errors.category = 'サブカテゴリーに使用できない文字が含まれています'
  }

  if (errors.name || errors.category) {
    console.log('Validation error:', { ...errors })
    return
  }

  try {
    if (isCreateMode.value) {
      await shopStore.createShop(form)
    } else {
      await shopStore.updateShop(form)
    }
    console.log('Form submitted:', form)
    resetForm()
    closeModal()
  } catch (err) {
    console.error('Error submitting form:', err)
  }
}

//フォームのバリデーションチェック
// Lambda の string でエラーになりそうな文字を弾く
const isValidLambdaString = (value: string | undefined | null) => {
  if (!value) return true

  // 制御文字（NULL〜US）を禁止
  if (/[\u0000-\u001F]/.test(value)) {
    return false
  }

  // 絵文字などのピクトグラムを禁止（ES2020 以降）
  if (/\p{Extended_Pictographic}/u.test(value)) {
    return false
  }

  // 必要なら長さ制限などもここで
  if (value.length > 100) {
    return false
  }

  return true
}

const onCancel = () => {
  console.log('Form cancelled')
  resetForm()
  closeModal()
}

const onDelete = async () => {
  if (form.id == null) return
  try {
    await shopStore.deleteShop(form.id)
  } finally {
    resetForm()
    closeModal()
  }
}
</script>