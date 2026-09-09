<script setup>
import { ref } from 'vue'

const props = defineProps({
  question: { type: Object, required: true },
  selected: { type: String, default: null },
})
const emit = defineEmits(['select'])

const audioEl = ref(null)
const isPlaying = ref(false)

function togglePlay() {
  if (!audioEl.value) return
  if (isPlaying.value) {
    audioEl.value.pause()
  } else {
    audioEl.value.currentTime = 0
    audioEl.value.play()
  }
}
</script>

<template>
  <div>
    <div class="mb-6 flex flex-col items-center rounded-card border border-line bg-white/60 p-6">
      <audio
        ref="audioEl"
        :src="question.audioUrl"
        @play="isPlaying = true"
        @pause="isPlaying = false"
        @ended="isPlaying = false"
      />
      <button
        type="button"
        class="flex h-16 w-16 items-center justify-center rounded-full bg-teal text-paper shadow-sm transition-transform active:scale-95"
        :aria-label="isPlaying ? 'Pause audio' : 'Play audio'"
        @click="togglePlay"
      >
        <svg v-if="!isPlaying" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
        <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M6 5h4v14H6zM14 5h4v14h-4z"/></svg>
      </button>
      <p class="mt-3 font-body text-sm text-ink/60">{{ isPlaying ? 'Playing…' : 'Tap to listen. You can replay it as many times as you like.' }}</p>
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
