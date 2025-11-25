<template>
  <p>{{ name }}</p>
  <p>{{ catergory }}</p>
  <p>{{ `行った回数：${count}` }}</p>
</template>
<script lang="ts" setup>
  defineProps<{
    name: string
    catergory: string
    count: number
  }>()
</script>