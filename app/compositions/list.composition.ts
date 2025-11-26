import { ref, onBeforeMount } from "vue";

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

  const handleClick = async () => {}

  return { lists, handleClick }
}