<template>
  <div class="min-h-screen bg-gradient-to-b from-sky-50 to-white flex items-center justify-center p-6">
    <div class="grid gap-5 grid-cols-1 sm:grid-cols-2 w-full max-w-lg">
      <button
        v-for="menu in menus"
        :key="menu.id"
        @click="handleClick(menu.link)"
        class="flex items-center justify-center
               px-10 py-16 rounded-xl bg-white shadow-md
               border border-sky-100 hover:border-sky-300
               hover:shadow-xl hover:-translate-y-1 active:translate-y-0.5
               transition-all duration-200
               text-2xl font-semibold tracking-wide text-sky-800
               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
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