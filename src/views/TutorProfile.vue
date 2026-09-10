<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getTutorById } from '../data/tutors'
import StarRating from '../components/StarRating.vue'

const route = useRoute()
const router = useRouter()

const tutor = computed(() => getTutorById(route.params.id))

if (!tutor.value) {
  router.replace({ name: 'tutors' })
}

const bookingLink = computed(() => {
  if (!tutor.value) return '#'
  const message = encodeURIComponent(
    `Hi ${tutor.value.name}, I'd like to book English lessons with you.`
  )
  return `https://wa.me/${tutor.value.whatsappNumber}?text=${message}`
})

const messageLink = computed(() => {
  if (!tutor.value) return '#'
  const message = encodeURIComponent(
    `Hi ${tutor.value.name}, I have a question about your English lessons.`
  )
  return `https://wa.me/${tutor.value.whatsappNumber}?text=${message}`
})

const visibleReviews = computed(() => {
  if (!tutor.value) return []
  const reviewLimit = tutor.value.reviewCount > 10 ? 8 : tutor.value.reviewCount
  return tutor.value.reviews.slice(0, reviewLimit)
})
</script>

<template>
  <div v-if="tutor" class="mx-auto max-w-md px-6 py-10 md:max-w-2xl md:px-10 md:py-14">
    <button
      type="button"
      class="mb-6 font-body text-sm text-ink/50"
      @click="router.push({ name: 'tutors' })"
    >
      ← All tutors
    </button>

    <div class="flex items-center gap-4">
      <div class="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-teal/15 font-display text-2xl font-semibold text-teal-dark">
        {{ tutor.initials }}
      </div>
      <div>
        <div class="flex flex-wrap items-center gap-2">
          <h1 class="font-display text-xl font-semibold text-ink">{{ tutor.name }}</h1>
          <span
            v-if="tutor.verified"
            title="Verified tutor"
            aria-label="Verified tutor"
            class="inline-flex items-center justify-center rounded-full bg-emerald-100 p-1 text-emerald-700"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" class="h-3 w-3" aria-hidden="true">
              <path d="M10 1.5a8.5 8.5 0 1 1 0 17 8.5 8.5 0 0 1 0-17Zm4.18 5.56-5.2 5.2-2.3-2.3-1.2 1.2 3.5 3.5 6.4-6.4-1.2-1.2Z"/>
            </svg>
          </span>
        </div>
        <p class="font-body text-sm text-ink/60">{{ tutor.role }}</p>
        <div class="mt-1">
          <StarRating :rating="tutor.rating" />
        </div>
      </div>
    </div>

    <div class="mt-6 grid grid-cols-2 gap-3">
      <div class="rounded-card border border-line bg-white/60 p-4 text-center">
        <p class="font-display text-xl font-semibold text-ink">{{ tutor.studentsTaught }}</p>
        <p class="font-body text-xs text-ink/60">students taught</p>
      </div>
      <div class="rounded-card border border-line bg-white/60 p-4 text-center">
        <p class="font-display text-xl font-semibold text-ink">{{ tutor.yearsTeaching }}</p>
        <p class="font-body text-xs text-ink/60">years teaching</p>
      </div>
    </div>

    <p class="mt-6 font-body text-[15px] leading-relaxed text-ink/80">{{ tutor.bio }}</p>

    <div class="mt-6 flex flex-wrap gap-2">
      <span
        v-for="specialty in tutor.specialties"
        :key="specialty"
        class="rounded-full border border-teal/30 bg-teal/10 px-3 py-1 font-body text-xs font-medium text-teal-dark"
      >
        {{ specialty }}
      </span>
    </div>

    <a
      :href="bookingLink"
      target="_blank"
      rel="noopener"
      class="mt-8 block w-full rounded-card bg-teal py-4 text-center font-display text-base font-semibold text-paper shadow-sm transition-transform active:scale-[0.98]"
    >
      Book a Lesson
    </a>

    <a
      :href="messageLink"
      target="_blank"
      rel="noopener"
      class="mt-3 block w-full rounded-card border border-teal bg-transparent py-4 text-center font-display text-base font-semibold text-teal-dark transition-colors hover:bg-teal/10 active:scale-[0.98]"
    >
      Message {{ tutor.name }}
    </a>

    <div class="mt-10 border-t border-line pt-6">
      <h2 class="font-display text-base font-semibold text-ink mb-4">
        Reviews {{ tutor.reviewCount ? `(${tutor.reviewCount})` : '' }}
      </h2>
      <div v-if="visibleReviews.length" class="flex flex-col gap-4">
        <div v-for="(review, i) in visibleReviews" :key="i" class="rounded-card border border-line bg-white/60 p-4">
          <div class="flex items-center justify-between mb-1">
            <p class="font-body text-sm font-medium text-ink">{{ review.author }}</p>
            <StarRating :rating="review.rating" :show-value="false" />
          </div>
          <p class="font-body text-sm leading-relaxed text-ink/70">{{ review.comment }}</p>
        </div>
      </div>
      <p v-else class="font-body text-sm text-ink/50">No reviews yet.</p>
    </div>
  </div>
</template>
