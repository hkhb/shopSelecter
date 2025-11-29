import { useShopStore } from '~/stores/list.store';
import { openModal } from "jenesius-vue-modal";
import Modal from '../pages/components/Modal.vue';
import { ref, onBeforeMount } from "vue";
import ShopForm from "~/pages/components/ShopForm.vue";
import type { ShopData } from "~/dts/shop.dts";

export function useListComposition() {

  const shopStore = useShopStore();
  callOnce(() => shopStore.fetchShops())
  const lists = shopStore.items

  const handleClick = async (data?:ShopData) => {
    console.log("handleClick", data)
    const message = data? "編集" : "新規作成"
    const component = ShopForm
    openModal(Modal, {
          message: message,
          component: component,
          payload: { data }
        })
  }

  return { lists, handleClick }
}