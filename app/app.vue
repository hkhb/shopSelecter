<template>
  <div>
    <NuxtRouteAnnouncer />
    <Main />
    <WidgetContainerModal />
  </div>
</template>
<script lang="ts" setup>
  import Main from './pages/index.vue'
  import { container as WidgetContainerModal } from 'jenesius-vue-modal';
</script>

