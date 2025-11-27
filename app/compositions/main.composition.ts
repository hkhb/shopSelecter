import { openModal } from 'jenesius-vue-modal';
import Modal from '../pages/components/Modal.vue';
import Shop from '../pages/components/Shop.vue';

export interface MenuItem {
  id : number;
  name: string;
  link: string;
}
export interface ShopData {
  id: number;
  name: string;
  catergory: string;
  Subcatergory: string;
  count: number;
}

export function useMainComposition() {
  const menus: MenuItem[] = [
    { id: 1, name: 'ランダム', link: '/random' },
    { id: 2, name: 'リスト', link: '/list' },
    { id: 3, name: '一周', link: '/round' },
    { id: 4, name: '設定', link: '/setting' },
  ];
  const showresult = (component, data: any, message?: string) => {
    openModal(Modal, {
      message: message,
      component: component,
      payload: { data }
    })
  }

  const handleClick = async (link: string) => {
    if(['/random', '/round'].includes(link)) {
      // const data = await $fetch(`/api/${link}`)
      const data = { id: 1, name: 'Sample Data', catergory: 'restaurant', Subcatergory: 'ra-men', count: 1 } // Mock data;
      const component = Shop
      showresult(component, data)
     }
    if('/list' === link) {
      navigateTo(link)
      }
    else if('/setting' === link) {    
      openModal(Modal, {
        message: "準備中"
      })
    }
  }
  return { menus, handleClick };
  
}