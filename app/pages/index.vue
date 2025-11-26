<template>
  <div class="min-h-screen flex items-center justify-center p-6">
    <div class="grid gap-4 sm:grid-cols-2 w-full max-w-md">
      <button
        v-for="menu in menus"
        :key="menu.id"
        @click="handleClick(menu.link)"
        class="flex items-center justify-center
         px-10 py-20 rounded-xl bg-white/70 dark:bg-neutral-800 backdrop-blur
         border border-white/40 dark:border-neutral-700 shadow-md hover:shadow-lg
         hover:-translate-y-1 active:translate-y-1 transition
         text-2xl font-bold tracking-wide
         text-gray-800 dark:text-neutral-200
         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
      >
        {{ menu.name }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMainComposition } from '../compositions/main.composition'
const { menus, handleClick } = useMainComposition()
</script>