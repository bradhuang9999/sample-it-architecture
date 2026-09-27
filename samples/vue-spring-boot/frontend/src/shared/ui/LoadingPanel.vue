<script setup lang="ts">
withDefaults(defineProps<{
  message?: string
}>(), {
  message: '資料載入中…'
})
</script>

<template>
  <div class="py-5 text-center text-secondary" role="status">
    <div class="spinner-border spinner-border-sm me-2" aria-hidden="true"></div>
    {{ message }}
  </div>
</template>
