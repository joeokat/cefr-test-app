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
  <div class="mx-auto max-w-md px-6 py-10 md:max-w-4xl md:px-10 md:py-14">
    <h1 class="font-display text-2xl font-semibold text-ink mb-2">Find a tutor</h1>
    <p class="font-body text-[15px] leading-relaxed text-ink/70 mb-8 md:max-w-xl">
      Every tutor here teaches from the same standards used in the test you just took. Pick a profile to see reviews, specialties, and how to book.
    </p>

    <div class="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-5">
      <button
        v-for="tutor in tutors"
        :key="tutor.id"
        type="button"
        class="flex items-center gap-4 rounded-card border border-line bg-white/60 p-4 text-left transition-colors hover:border-teal/50"
        @click="openProfile(tutor.id)"
      >
        <div class="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-teal/15 font-display text-lg font-semibold text-teal-dark">
          {{ tutor.initials }}
        </div>
        <div class="min-w-0 flex-1">
          <p class="font-display text-base font-semibold text-ink truncate">{{ tutor.name }}</p>
          <p class="font-body text-sm text-ink/60 truncate">{{ tutor.role }}</p>
          <div class="mt-1 flex items-center gap-3">
            <StarRating :rating="tutor.rating" />
            <span class="font-body text-xs text-ink/50">{{ tutor.studentsTaught }} students taught</span>
          </div>
        </div>
      </button>
    </div>
  </div>
</template>
