// app/compositions/main.composition.ts
import { openModal } from 'jenesius-vue-modal'
import Modal from '../pages/components/Modal.vue'
import Shop from '../pages/components/Shop.vue'
import { useMainStore } from '~/stores/main.store'
import type { ShopData } from '~/dts/shop.dts'

export interface MenuItem {
  id: number
  name: string
  link: string
}

export function useMainComposition() {
  const mainStore = useMainStore()

  const menus: MenuItem[] = [
    { id: 1, name: 'ランダム', link: '/random' },
    { id: 2, name: 'リスト', link: '/list' },
    { id: 3, name: '一周',   link: '/round' },
    { id: 4, name: '設定',   link: '/setting' },
  ]

  const showresult = (component: any, data: ShopData, message?: string) => {
    openModal(Modal, {
      message,
      component,
      payload: { data },
    })
  }

  const handleClick = async (link: string) => {
    // ランダム / 一周 → API 叩いて結果を store に保存しつつモーダル表示
    if (link === '/random') {
      const data = await mainStore.fetchRandom()
      showresult(Shop, data, 'ランダムに選んだお店')
      return
    }

    if (link === '/round') {
      const data = await mainStore.fetchRound()
      showresult(Shop, data, '周回候補のお店')
      return
    }

    // リスト画面へ遷移
    if (link === '/list') {
      navigateTo(link)
      return
    }

    // 設定（とりあえず準備中モーダル）
    if (link === '/setting') {
      openModal(Modal, {
        message: '準備中',
      })
    }
  }

  return { menus, handleClick }
}