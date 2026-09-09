<script setup>
defineProps({
  question: { type: Object, required: true },
  selected: { type: String, default: null },
})
const emit = defineEmits(['select'])
</script>

<template>
  <div>
    <div
      v-if="question.passage"
      class="mb-6 rounded-card border border-line bg-white/60 p-5 font-body text-[15px] leading-relaxed text-ink/80"
    >
      {{ question.passage }}
    </div>

    <h2 class="font-display text-xl font-semibold leading-snug text-ink mb-6">
      {{ question.question }}
    </h2>

    <div class="flex flex-col gap-3">
      <button
        v-for="option in question.options"
        :key="option"
        type="button"
        class="w-full rounded-card border px-4 py-3 text-left font-body text-[15px] transition-colors"
        :class="selected === option
          ? 'border-teal bg-teal/10 text-teal-dark font-medium'
          : 'border-line bg-white/50 text-ink hover:border-teal/50'"
        @click="emit('select', option)"
      >
        {{ option }}
      </button>
    </div>
  </div>
</template>
