<template>
  <div class="shop-card">
    <div v-if="data">
      <p>{{ data.name }}</p>
      <p>{{ data.catergory }}</p>
      <p>{{ `行った回数：${data.count}` }}</p>
    </div>
    <div v-else>
      <p>{{ `データなし` }}</p>
    </div>
    
  </div>
</template>
<script lang="ts" setup>
const props = defineProps<{
  data: {
    id: number;
    name: string;
    catergory: string;
    Subcatergory: string;
    count: number;
    }
}>()

const data = props.data
</script>