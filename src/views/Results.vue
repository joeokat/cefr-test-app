<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTestStore } from '../stores/test'
import CefrScale from '../components/CefrScale.vue'
import PaywallModal from '../components/PaywallModal.vue'
import { CEFR_DESCRIPTIONS, CEFR_RECOMMENDATIONS } from '../data/questions'
import { downloadDetailedReport } from '../utils/generateReport'

// --- Configurable contact link: swap for your real community invite ---
const COMMUNITY_WHATSAPP_LINK = 'https://chat.whatsapp.com/your-invite-code' // configure: your community invite link
// ----------------------------------------------------------------------

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

    <p class="mt-8 font-body text-[15px] leading-relaxed text-ink/80 md:mx-auto md:max-w-xl md:text-center">
      {{ CEFR_DESCRIPTIONS[level] }}
    </p>

    <div class="mt-6 grid gap-6 md:grid-cols-2">
      <div v-if="weakCategoryLabel" class="rounded-card border border-line bg-white/60 p-5">
        <p class="font-display text-sm font-semibold text-ink mb-1">Where to focus first</p>
        <p class="font-body text-[15px] leading-relaxed text-ink/70">
          Your strongest areas are solid — <span class="font-medium text-ink">{{ weakCategoryLabel }}</span> is where you'd benefit most from focused practice right now.
        </p>
      </div>

      <div class="rounded-card bg-teal/10 p-5">
        <p class="font-display text-sm font-semibold text-teal-dark mb-1">What to do next</p>
        <p class="font-body text-[15px] leading-relaxed text-ink/80">
          {{ CEFR_RECOMMENDATIONS[level] }}
        </p>
      </div>
    </div>

    <!-- CTAs: three equal-weight options -->
    <div class="mt-8 grid gap-4 md:grid-cols-3">
      <button
        type="button"
        class="rounded-card border-2 border-ink/15 bg-white/60 px-5 py-4 text-center font-display text-base font-semibold text-ink transition-transform active:scale-[0.98]"
        @click="openPaywall"
      >
        Download detailed report
        <span class="mt-1 block font-body text-xs font-normal text-ink/50">$0.99</span>
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
        class="rounded-card border-2 border-gold bg-gold/10 px-5 py-4 text-center font-display text-base font-semibold text-gold-dark transition-transform active:scale-[0.98]"
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
