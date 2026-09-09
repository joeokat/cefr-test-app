<script setup>
import { useRouter } from 'vue-router'
import { useTestStore } from '../stores/test'
import CefrScale from '../components/CefrScale.vue'

const router = useRouter()
const store = useTestStore()

function startTest() {
  store.reset()
  router.push({ name: 'test' })
}
</script>

<template>
  <div class="mx-auto max-w-md px-6 py-12 md:max-w-4xl md:px-10 md:py-20">
    <div class="md:grid md:grid-cols-2 md:items-center md:gap-16">
      <div>
        <p class="font-body text-sm font-medium text-teal-dark mb-3">A1 → C2, in one sitting</p>
        <h1 class="font-display text-[2.1rem] leading-[1.15] font-semibold text-ink mb-4 md:text-4xl">
          Find out your English level, no sign-up required
        </h1>
        <p class="font-body text-base leading-relaxed text-ink/70 mb-8">
          Take a quick, CEFR assessment covering grammar, vocabulary, reading, listening, and pronunciation to find out your level, then get a personalised plan for what to work on next.
        </p>

        <button
          type="button"
          class="w-full rounded-card bg-teal py-4 font-display text-base font-semibold text-paper shadow-sm transition-transform active:scale-[0.98] md:w-auto md:px-10"
          @click="startTest"
        >
          Start test
        </button>
        <p class="mt-3 font-body text-sm text-ink/50 md:mt-4">About 30 questions, roughly 5–8 minutes</p>
      </div>

      <div class="mt-12 md:mt-0">
        <CefrScale />
      </div>
    </div>
  </div>
</template>
