<script setup>
defineProps({
  current: { type: Number, required: true }, // 0-indexed
  total: { type: Number, required: true },
})
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-2">
      <span class="font-body text-sm text-ink/60">Question {{ current + 1 }} of {{ total }}</span>
      <span class="font-body text-sm text-ink/60">{{ Math.round(((current) / total) * 100) }}%</span>
    </div>
    <div class="flex h-2 w-full gap-1">
      <div
        v-for="i in total"
        :key="i"
        class="flex-1 rounded-full transition-colors duration-200"
        :class="i - 1 <= current ? 'bg-teal' : 'bg-line'"
      />
    </div>
  </div>
</template>
