<template>
  <div v-for ="item in lists" :key="item.id">
    <Shop v-bind="item"/>
  </div>
</template>
<script lang="ts" setup>
  import Shop from './components/Shop.vue'
  import { useListComposition } from '../compositions/list.composition'
  const { lists } = useListComposition()
  console.log(lists)
</script>