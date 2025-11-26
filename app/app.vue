<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <WidgetContainerModal />
  </div>
</template>
<script lang="ts" setup>
  import { container as WidgetContainerModal } from 'jenesius-vue-modal';
</script>

