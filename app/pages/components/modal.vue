<template>
  <div class="modal-overlay" @click="onClose">
    <div class="modal" @click.stop>
      <p class="modal-message" v-if="message">{{ message }}</p>
        <component
          v-if="component"
          :is="component"
          v-bind="payload"
        />
      <button class="modal-close-button" @click="onClose">閉じる</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
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

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(233, 237, 180, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 90%;
  text-align: center;
}
.modal-message {
  margin-bottom: 20px;
  font-size: 16px;
  color: #333;
}
.modal-close-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}
.modal-close-button:hover {
  background-color: #0056b3;
}
</style>