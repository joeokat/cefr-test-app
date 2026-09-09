<script setup>
defineProps({
  question: { type: Object, required: true },
  selected: { type: String, default: null },
})
const emit = defineEmits(['select'])
</script>

<template>
  <div>
    <p class="mb-2 text-center font-body text-sm uppercase tracking-wide text-ink/50">Which is the correct pronunciation symbol for:</p>
    <p class="mb-8 text-center font-display text-4xl font-semibold text-ink">{{ question.word }}</p>

    <div class="grid grid-cols-2 gap-3">
      <button
        v-for="option in question.options"
        :key="option"
        type="button"
        class="rounded-card border px-4 py-5 text-center font-display text-lg transition-colors"
        :class="selected === option
          ? 'border-teal bg-teal/10 text-teal-dark font-semibold'
          : 'border-line bg-white/50 text-ink hover:border-teal/50'"
        @click="emit('select', option)"
      >
        {{ option }}
      </button>
    </div>
  </div>
</template>
