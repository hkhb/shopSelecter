import { openModal } from 'jenesius-vue-modal';
import Modal from '../pages/components/Modal.vue';
import Shop from '../pages/components/Shop.vue';

export interface ShopData {
  id: number;
  name: string;
  catergory: string;
  Subcatergory: string;
  count: number;
}

export function useListComposition() {
  const lists: ShopData = { id: 1, name: 'Sample Data', catergory: 'restaurant', Subcatergory: 'ra-men', count: 1 }

  const handleClick = async () => {
    
    }
    return { lists, handleClick };
  }