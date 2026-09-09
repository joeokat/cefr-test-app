<script setup>
const props = defineProps({
  rating: { type: Number, required: true }, // e.g. 4.8
  showValue: { type: Boolean, default: true },
})
</script>

<template>
  <div class="flex items-center gap-1.5">
    <div class="flex text-gold" aria-hidden="true">
      <template v-for="i in 5" :key="i">
        <span v-if="rating >= i - 0.25">★</span>
        <span v-else class="text-line">★</span>
      </template>
    </div>
    <span v-if="showValue" class="font-body text-sm text-ink/60">{{ rating.toFixed(1) }}</span>
  </div>
</template>
