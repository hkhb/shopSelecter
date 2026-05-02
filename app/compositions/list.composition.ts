import { onBeforeMount, reactive, computed } from 'vue'
import { useShopStore } from '~/stores/list.store'
import { openModal } from 'jenesius-vue-modal'
import Modal from '../components/modal.vue'
import ShopForm from '~/components/ShopForm.vue'
import type { ShopData } from '~/dts/shop.dts'
import { validateShop, sanitizeShop } from '@/utils/validateShop'

export function useListComposition() {
  const shopStore = useShopStore()

  const form = reactive<ShopData>({
    id: undefined,
    name: '',
    category: '',
    subCategory: '',
    count: 0,
  })

  const ui = reactive<{ message: string; type: 'success' | 'error' | '' }>({
    message: '',
    type: '',
  })

  const errors = reactive<{ name?: string; category?: string; subCategory?: string; count? :string}>({})

  const setForm = (data?: ShopData) => {
    form.id = data?.id ?? undefined
    form.name = data?.name ?? ''
    form.category = data?.category ?? ''
    form.subCategory = data?.subCategory ?? ''
    form.count = data?.count ?? 0
    ui.message = ''
    ui.type = ''
    errors.name = undefined
    errors.category = undefined
    errors.subCategory = undefined
    errors.count = undefined
  }

  const submit = async () => {
    ui.message = ''
    ui.type = ''

    const { isValid, errors: validationErrors } = validateShop(form)
    if (!isValid) {
      ui.message = '入力内容を確認してください'
      ui.type = 'error'
      Object.assign(errors, validationErrors)
      return false
    }

    const sanitizedForm = sanitizeShop(form)

    try {
      if (!sanitizedForm.id) {
        await shopStore.createShop({
          name: sanitizedForm.name!,
          category: sanitizedForm.category!,
          subCategory: sanitizedForm.subCategory,
          count: sanitizedForm.count,
        })
      } else {
        await shopStore.updateShop({
          id: Number(sanitizedForm.id),
          name: sanitizedForm.name!,
          category: sanitizedForm.category!,
          subCategory: sanitizedForm.subCategory,
          count: sanitizedForm.count,
        } as ShopData)
      }
      ui.message = '保存しました'
      ui.type = 'success'
      return true
    } catch (e: any) {
      ui.message = e?.message ?? '保存に失敗しました'
      ui.type = 'error'
      return false
    }
  }

  const items = computed(() =>
    shopStore.items.filter(item => item.id !== 0)
  )

  const handleClick = (data?: ShopData) => {
    const message = data ? '編集' : '新規作成'
    const component = ShopForm

    openModal(Modal, {
      message,
      component,
      payload: { data },
    })
  }

  return { form, errors, ui, fetch: shopStore.fetchShops, setForm, submit, items, handleClick }
}