<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTestStore } from '../stores/test'
import CefrScale from '../components/CefrScale.vue'
import PaywallModal from '../components/PaywallModal.vue'
import { CEFR_DESCRIPTIONS, CEFR_RECOMMENDATIONS } from '../data/questions'
import { downloadDetailedReport } from '../utils/generateReport'
import { TEST_TIME_LIMIT_SECONDS } from '../stores/test'

const COMMUNITY_WHATSAPP_LINK = 'https://whatsapp.com/channel/0029Vb75A7r2UPBPBwWrh93v'

const LEVEL_NAMES = {
  A1: 'Beginner',
  A2: 'Elementary',
  B1: 'Intermediate',
  B2: 'Upper Intermediate',
  C1: 'Advanced',
  C2: 'Proficient',
}

const CATEGORY_LABELS = {
  grammar: 'grammar',
  vocabulary: 'vocabulary',
  reading: 'reading comprehension',
  listening: 'listening',
  pronunciation: 'phonetic awareness',
}

const router = useRouter()
const store = useTestStore()

if (!store.result) {
  router.replace({ name: 'home' })
}

const result = computed(() => store.result)
const level = computed(() => result.value?.level)
const weakCategoryLabel = computed(() => CATEGORY_LABELS[result.value?.weakestCategory] ?? null)
const weakCategoryPercentage = computed(() => {
  const stats = result.value?.categoryStats?.[result.value?.weakestCategory]
  return stats?.total ? Math.round((stats.correct / stats.total) * 100) : 0
})
const formatDuration = (seconds) => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}m ${String(remainingSeconds).padStart(2, '0')}s`
}
const timeTaken = computed(() => formatDuration(result.value?.elapsedSeconds ?? 0))
const timeLimitExceededBy = computed(() => Math.max(0, (result.value?.elapsedSeconds ?? 0) - TEST_TIME_LIMIT_SECONDS))

const categoryPerformance = computed(() => Object.entries(CATEGORY_LABELS)
  .map(([category, label]) => {
    const stats = result.value?.categoryStats?.[category]
    return {
      category,
      label,
      percentage: stats?.total ? Math.round((stats.correct / stats.total) * 100) : 0,
    }
  })
  .filter((item) => result.value?.categoryStats?.[item.category]?.total))

const weakCategoryFeedback = computed(() => {
  const feedback = {
    grammar: 'Your grammar is the best place to begin. Review the sentence patterns you missed and practise using them in short, everyday examples.',
    vocabulary: 'Your vocabulary is the best place to begin. Choose a small group of useful words each week and use them in your own sentences.',
    reading: 'Reading is the best place to begin. Read short texts regularly, underline unfamiliar ideas, and explain the main point in your own words.',
    listening: 'Listening is the best place to begin. Use short English clips, listen twice, and write down the words or phrases you hear clearly.',
    pronunciation: 'Pronunciation is the best place to begin. Practise the sounds you missed slowly, then use them in short words and sentences.',
  }
  return feedback[result.value?.weakestCategory] ?? 'You have a good starting point. Keep practising regularly and build from the areas that felt most difficult.'
})

const showPaywall = ref(false)
const reportUnlocked = ref(false)

function openPaywall() {
  if (reportUnlocked.value) {
    downloadDetailedReport(result.value)
    return
  }
  showPaywall.value = true
}

function onPaymentSuccess() {
  reportUnlocked.value = true
  showPaywall.value = false
  downloadDetailedReport(result.value)
}

function retake() {
  store.reset()
  router.push({ name: 'test' })
}
</script>

<template>
  <div v-if="result" class="mx-auto flex min-h-screen max-w-md flex-col px-6 py-12 md:max-w-2xl md:py-16">
    <p class="text-center font-body text-sm font-medium text-teal-dark mb-2">Your result</p>
    <h1 class="text-center font-display text-5xl font-bold text-ink mb-1">{{ level }}</h1>
    <p class="text-center font-display text-lg font-medium text-ink/60 mb-8">{{ LEVEL_NAMES[level] }}</p>

    <CefrScale :active-level="level" />

    <div class="mt-8 rounded-card border border-line bg-white/60 p-5">
      <div class="flex items-center justify-between gap-4">
        <div>
          <p class="font-display text-sm font-semibold text-ink">Test timing</p>
          <p class="mt-1 font-body text-sm text-ink/60">Use this to track and improve your answering speed.</p>
        </div>
        <p class="font-display text-lg font-semibold text-teal-dark">{{ timeTaken }}</p>
      </div>
      <p v-if="timeLimitExceededBy" class="mt-3 font-body text-sm text-clay">
        You exceeded the 8-minute target by {{ formatDuration(timeLimitExceededBy) }}.
      </p>
      <p v-else class="mt-3 font-body text-sm text-ink/70">
        Completed within the 8-minute target.
      </p>
    </div>

    <p class="mt-8 font-body text-[15px] leading-relaxed text-ink/80 md:mx-auto md:max-w-xl md:text-center">
      {{ CEFR_DESCRIPTIONS[level] }}
    </p>

    <div class="mt-6 grid gap-6 md:grid-cols-2">
      <div v-if="weakCategoryLabel" class="rounded-card border border-line bg-white/60 p-5">
        <p class="font-display text-sm font-semibold text-ink mb-1">Where to focus first</p>
        <p class="font-body text-[15px] leading-relaxed text-ink/70">
          Your <span class="font-medium text-ink">{{ weakCategoryLabel }}</span> score was {{ weakCategoryPercentage }}%. {{ weakCategoryFeedback }}
        </p>
      </div>

      <div class="rounded-card bg-teal/10 p-5">
        <p class="font-display text-sm font-semibold text-teal-dark mb-1">What to do next</p>
        <p class="font-body text-[15px] leading-relaxed text-ink/80">
          {{ CEFR_RECOMMENDATIONS[level] }}
        </p>
      </div>
    </div>

    <section v-if="weakCategoryLabel" class="mt-6 rounded-card border border-line bg-white/60 p-5">
      <div class="flex items-center justify-between gap-4">
        <div>
          <p class="font-display text-sm font-semibold text-ink">Quick performance summary</p>
          <p class="mt-1 font-body text-sm text-ink/60">Here is a quick look at how you performed in each area.</p>
        </div>
      </div>

      <div class="mt-5 space-y-4">
        <div v-for="item in categoryPerformance" :key="item.category">
          <div class="mb-1 flex items-center justify-between gap-4 text-sm">
            <span :class="item.category === result.weakestCategory ? 'font-semibold text-ink' : 'text-ink/70'">
              {{ item.label }}{{ item.category === result.weakestCategory ? ' (focus area)' : '' }}
            </span>
            <span class="font-display font-semibold text-teal-dark">{{ item.percentage }}%</span>
          </div>
          <div class="h-2 overflow-hidden rounded-full bg-line" aria-hidden="true">
            <div
              class="h-full rounded-full bg-teal"
              :class="item.category === result.weakestCategory ? 'bg-clay' : 'bg-teal'"
              :style="{ width: `${item.percentage}%` }"
            ></div>
          </div>
        </div>
      </div>
      <p class="mt-3 font-body text-xs leading-relaxed text-ink/50">
        This is a quick snapshot. Unlock the full report to see every area, question, and explanation.
      </p>
    </section>

    <!-- CTAs: three equal-weight options -->
    <div class="mt-8 grid gap-4 md:grid-cols-3">
      <button
        type="button"
        class="w-full rounded-card border-2 border-teal px-5 py-4 text-center font-display text-base font-semibold text-teal-dark transition-colors hover:bg-teal/10 active:scale-[0.98]"
        @click="openPaywall"
      >
        Download detailed report for $0.99
      </button>
      <router-link
        :to="{ name: 'tutors' }"
        class="rounded-card border-2 border-teal bg-teal px-5 py-4 text-center font-display text-base font-semibold text-paper shadow-sm transition-transform active:scale-[0.98]"
      >
        Get 1-on-1 private tutoring
      </router-link>
      <a
        :href="COMMUNITY_WHATSAPP_LINK"
        target="_blank"
        rel="noopener"
        class="w-full rounded-card border-2 border-teal px-5 py-4 text-center font-display text-base font-semibold text-teal-dark transition-colors hover:bg-teal/10 active:scale-[0.98]"
      >
        Join the free English community
      </a>
    </div>

    <button
      type="button"
      class="mt-8 text-center font-body text-sm text-ink/50 underline underline-offset-4"
      @click="retake"
    >
      Retake the test
    </button>

    <PaywallModal :open="showPaywall" @close="showPaywall = false" @success="onPaymentSuccess" />
  </div>
</template>
