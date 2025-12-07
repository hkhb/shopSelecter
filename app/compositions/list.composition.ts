import { onBeforeMount } from 'vue'
import { useShopStore } from '~/stores/list.store'
import { openModal } from 'jenesius-vue-modal'
import Modal from '../pages/components/Modal.vue'
import ShopForm from '~/pages/components/ShopForm.vue'
import type { ShopData } from '~/dts/shop.dts'

export function useListComposition() {
  const shopStore = useShopStore()

  const items = computed(() => shopStore.items)

  onBeforeMount(() => {
    shopStore.fetchShops()
  })

  const handleClick = (data?: ShopData) => {
    const message = data ? '編集' : '新規作成'
    const component = ShopForm

    openModal(Modal, {
      message,
      component,
      payload: { data },
    })
  }

  return { items, handleClick }
}