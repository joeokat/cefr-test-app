<script setup>
import { useRouter } from 'vue-router'
import { tutors } from '../data/tutors'
import StarRating from '../components/StarRating.vue'

const router = useRouter()

function openProfile(id) {
  router.push({ name: 'tutor-profile', params: { id } })
}
</script>

<template>
  <div class="mx-auto max-w-6xl px-6 py-10 md:px-10 md:py-14">
    <section class="mb-8 rounded-[28px] border border-line bg-white/70 p-6 shadow-sm md:p-8">
      <div class="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div class="md:max-w-2xl">
          <h1 class="font-display text-3xl font-semibold text-ink md:text-5xl">
            Online English instructors &amp; teachers for private classes
          </h1>
          <p class="mt-4 max-w-xl text-sm leading-relaxed text-ink/70 md:text-base">
            Looking for an online English tutor? Explore a curated list of experienced instructors who can help with Reading, speaking, business communication and IELTS & TOEFL preparation.
          </p>
        </div>

        <div class="grid grid-cols-3 gap-3 text-left md:w-[320px]">
          <div class="rounded-card border border-line bg-paper p-3">
            <p class="text-[10px] uppercase tracking-[0.12em] text-ink/50">Teachers</p>
            <p class="mt-2 font-display text-xl font-semibold text-ink">100+</p>
          </div>
          <div class="rounded-card border border-line bg-paper p-3">
            <p class="text-[10px] uppercase tracking-[0.12em] text-ink/50">Avg rating</p>
            <p class="mt-2 font-display text-xl font-semibold text-ink">4.7</p>
          </div>
          <div class="rounded-card border border-line bg-paper p-3">
            <p class="text-[10px] uppercase tracking-[0.12em] text-ink/50">Students</p>
            <p class="mt-2 font-display text-xl font-semibold text-ink">10k+</p>
          </div>
        </div>
      </div>
    </section>

    <div class="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div class="flex flex-wrap gap-2">
        <span class="rounded-full border border-line bg-white px-3 py-1.5 text-xs font-medium text-ink/70">English</span>
        <span class="rounded-full border border-line bg-white px-3 py-1.5 text-xs font-medium text-ink/70">Speaking</span>
        <span class="rounded-full border border-line bg-white px-3 py-1.5 text-xs font-medium text-ink/70">IELTS</span>
        <span class="rounded-full border border-line bg-white px-3 py-1.5 text-xs font-medium text-ink/70">TOEFL</span>
        <span class="rounded-full border border-line bg-white px-3 py-1.5 text-xs font-medium text-ink/70">Business English</span>
      </div>

      <!-- <div class="rounded-full border border-teal/30 bg-teal/10 px-3 py-1.5 text-xs font-medium text-teal-dark">
        Free tutor replacement • Risk-free booking
      </div> -->
    </div>

    <div class="grid grid-cols-1 gap-5 md:grid-cols-2 xl:mx-auto xl:max-w-5xl xl:grid-cols-3 xl:gap-6">
      <article
        v-for="tutor in tutors"
        :key="tutor.id"
        class="overflow-hidden rounded-[24px] border border-line bg-white/80 shadow-sm transition-all hover:-translate-y-0.5 hover:border-teal/40 hover:shadow-md"
      >
        <div class="border-b border-line bg-paper/70 p-5">
          <div class="flex items-start justify-between gap-3">
            <div class="flex items-center gap-3">
              <div class="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-teal/15 font-display text-lg font-semibold text-teal-dark">
                {{ tutor.initials }}
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <h2 class="font-display text-xl font-semibold text-ink">{{ tutor.name }}</h2>
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
                <p class="text-sm text-ink/60">{{ tutor.role }}</p>
              </div>
            </div>

            <span class="rounded-full bg-teal/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-teal-dark">
              {{ tutor.badge || 'Professional' }}
            </span>
          </div>

          <div class="mt-4 flex flex-wrap items-center gap-3 text-xs text-ink/60">
            <div class="flex items-center gap-1.5">
              <StarRating :rating="tutor.rating" />
            </div>
            <span>{{ tutor.reviewCount > 10 ? 8 : tutor.reviewCount }} reviews</span>
            <span>{{ tutor.studentsTaught }} students</span>
          </div>
        </div>

        <div class="space-y-4 p-5">
          <div class="flex items-center justify-between gap-3 rounded-card border border-line bg-paper px-3 py-2 text-xs text-ink/70">
            <span class="font-medium text-ink/50">Languages</span>
            <span class="text-right text-ink/70">{{ tutor.languages }}</span>
          </div>

          <div class="flex items-center justify-between gap-3 rounded-card border border-line bg-paper px-3 py-2 text-xs text-ink/70">
            <span class="font-medium text-ink/50">Country</span>
            <span class="text-right text-ink/70">{{ tutor.country }}</span>
          </div>

          <div class="flex items-center justify-between gap-3 rounded-card border border-line bg-paper px-3 py-2 text-xs text-ink/70">
            <span class="font-medium text-ink/50">Price</span>
            <span class="font-semibold text-ink">{{ tutor.price }} / {{ tutor.lessonLength }}</span>
          </div>

          <div class="flex items-center justify-between gap-3 rounded-card border border-line bg-paper px-3 py-2 text-xs text-ink/70">
            <span class="font-medium text-ink/50">Availability</span>
            <span>{{ tutor.availability }}</span>
          </div>

          <p class="text-[15px] leading-relaxed text-ink/75">
            {{ tutor.bio }}
          </p>

          <div class="flex flex-wrap gap-2">
            <span
              v-for="specialty in tutor.specialties"
              :key="specialty"
              class="rounded-full border border-teal/20 bg-teal/5 px-2.5 py-1 text-[11px] font-medium text-teal-dark"
            >
              {{ specialty }}
            </span>
          </div>

          <div class="flex items-center justify-between gap-4 border-t border-line pt-4">
            <div>
              <p class="text-[10px] uppercase tracking-[0.12em] text-ink/50">From</p>
              <p class="mt-1 font-display text-lg font-semibold text-ink">{{ tutor.price }}</p>
            </div>

            <button
              type="button"
              class="rounded-card bg-teal px-4 py-2.5 font-display text-sm font-semibold text-paper transition-transform active:scale-[0.98]"
              @click="openProfile(tutor.id)"
            >
              Learn more
            </button>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>
