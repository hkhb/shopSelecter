import { openModal } from "jenesius-vue-modal";
import Modal from '../pages/components/Modal.vue';
import { ref, onBeforeMount } from "vue";
import ShopForm from "~/pages/components/ShopForm.vue";

export interface ShopData {
  id: number;
  name: string;
  catergory: string;
  Subcatergory: string;
  count: number;
}

export function useListComposition() {
  const lists = ref<ShopData[]>([
    { 
      id: 1,
      name: 'Sample Data',
      catergory: 'restaurant',
      Subcatergory: 'ra-men',
      count: 1
    }
  ])

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