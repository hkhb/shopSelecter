<template>
  <div 
    class="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50"
    @click="onClose"
  >
    <div
      class="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative animate-fadeIn"
      @click.stop
    >
      <!-- タイトル -->
      <p
        v-if="message"
        class="text-lg font-semibold text-gray-700 mb-4"
      >
        {{ message }}
      </p>

      <!-- ダイナミックコンポーネント -->
      <component
        v-if="component"
        :is="component"
        v-bind="payload"
      />

      <!-- ボタンエリア -->
      <div class="mt-6 flex justify-end">
        <button 
          @click="onClose"
          class="px-4 py-2 rounded-md bg-gray-100 text-gray-700 text-sm 
                 shadow-sm border border-gray-200
                 hover:bg-gray-200 active:translate-y-[1px] transition"
        >
          閉じる
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { closeModal } from 'jenesius-vue-modal'

const props = defineProps<{
  message?: string
  component?: any
  payload?: Record<string, any>
}>()

const onClose = async () => {
  await closeModal()
}
</script>

<style>
/* フェードインアニメーション */
@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.97); }
  to { opacity: 1; transform: scale(1); }
}

.animate-fadeIn {
  animation: fadeIn 0.15s ease-out;
}
</style>