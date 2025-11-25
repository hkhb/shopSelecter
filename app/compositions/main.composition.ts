import { openModal } from 'jenesius-vue-modal';
import Shop from '../pages/components/shop.vue';

export interface MenuItem {
  id : number;
  name: string;
  link: string;
}

export function useMainComposition() {
  const menus: MenuItem[] = [
    { id: 1, name: 'ランダム', link: '/random' },
    { id: 2, name: 'リスト', link: '/list' },
    { id: 3, name: '一周', link: '/round' },
    { id: 4, name: '設定', link: '/setting' },
  ];
  const showresult = (constant, data) => {
    openModal(constant, { data })
  }

  const handleClick = async (link: string) => {
    if(['/random', '/round'].includes(link)) {
      // const data = await $fetch(`/api/${link}`)
      const data = { id: 1, name: 'Sample Data', catergory: 'restaurant', Subcatergory: 'ra-men', count: 1 } // Mock data;
      const constant = Shop
      showresult(constant, data)
     }
    if('/list' === link) {
      
      }
    else if('/setting' === link) {    
      // navigateTo(link)
    }
  }
  return { menus, handleClick };
  
}