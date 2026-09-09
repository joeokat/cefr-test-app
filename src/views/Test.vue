<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTestStore } from '../stores/test'
import TestProgress from '../components/TestProgress.vue'
import TextQuestion from '../components/questions/TextQuestion.vue'
import AudioQuestion from '../components/questions/AudioQuestion.vue'
import IpaQuestion from '../components/questions/IpaQuestion.vue'

const router = useRouter()
const store = useTestStore()

const question = computed(() => store.currentQuestion)
const selected = computed(() => store.answers[question.value?.id]?.selected ?? null)

const componentMap = {
  text: TextQuestion,
  audio: AudioQuestion,
  ipa: IpaQuestion,
}
const currentComponent = computed(() => componentMap[question.value?.type])

function select(option) {
  store.answerCurrent(option)
}

function handleNext() {
  if (store.isLast) {
    store.finish()
    router.push({ name: 'results' })
  } else {
    store.next()
  }
}

// Exit control — progress would otherwise be trapped until completion
const showExitConfirm = ref(false)

function confirmExit() {
  store.reset()
  router.push({ name: 'home' })
}
</script>

<template>
  <div v-if="question" class="mx-auto flex min-h-screen max-w-md flex-col px-6 py-8 md:max-w-xl md:py-12">
    <div class="mb-2 flex items-center justify-between">
      <button
        type="button"
        class="-ml-2 flex h-9 w-9 items-center justify-center rounded-full text-ink/40 transition-colors hover:bg-line/50 hover:text-ink/70"
        aria-label="Exit test"
        @click="showExitConfirm = true"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
      </button>
    </div>

    <TestProgress :current="store.currentIndex" :total="store.total" />

    <div class="flex-1 mt-8">
      <component :is="currentComponent" :question="question" :selected="selected" @select="select" />
    </div>

    <div class="mt-8 flex gap-3">
      <button
        v-if="!store.isFirst"
        type="button"
        class="rounded-card border border-line px-5 py-3 font-body text-sm font-medium text-ink/70 transition-colors hover:border-teal/50"
        @click="store.back()"
      >
        Back
      </button>
      <button
        type="button"
        class="flex-1 rounded-card bg-teal py-3 font-display text-base font-semibold text-paper shadow-sm transition-all disabled:cursor-not-allowed disabled:opacity-40"
        :disabled="!store.answeredCurrent"
        @click="handleNext"
      >
        {{ store.isLast ? 'See my result' : 'Next' }}
      </button>
    </div>

    <!-- Exit confirmation -->
    <Teleport to="body">
      <div v-if="showExitConfirm" class="fixed inset-0 z-50 flex items-center justify-center px-6">
        <div class="absolute inset-0 bg-ink/40 backdrop-blur-sm" @click="showExitConfirm = false" />
        <div class="relative w-full max-w-sm rounded-card bg-paper p-6 shadow-xl">
          <h2 class="font-display text-lg font-semibold text-ink mb-2">Exit the test?</h2>
          <p class="font-body text-sm leading-relaxed text-ink/70 mb-6">
            Your progress on this attempt will be lost — you'll need to start again from question 1.
          </p>
          <div class="flex gap-3">
            <button
              type="button"
              class="flex-1 rounded-card border border-line py-3 font-body text-sm font-medium text-ink/70"
              @click="showExitConfirm = false"
            >
              Keep going
            </button>
            <button
              type="button"
              class="flex-1 rounded-card bg-clay py-3 font-body text-sm font-semibold text-paper"
              @click="confirmExit"
            >
              Exit test
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>
