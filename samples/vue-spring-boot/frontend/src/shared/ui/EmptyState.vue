<script setup lang="ts">
withDefaults(defineProps<{
  message?: string
}>(), {
  message: '目前沒有資料。'
})
</script>

<template>
  <div class="empty-state text-secondary text-center py-4">
    {{ message }}
  </div>
</template>
