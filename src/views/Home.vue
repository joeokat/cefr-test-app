<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const steps = [
  { title: 'Take the test', body: 'About 30 questions covering grammar, vocabulary, reading, listening, and pronunciation, roughly 8–10 minutes.' },
  { title: 'Get your level', body: "See your CEFR level (A1–C2) right away, plus which area to focus on first." },
  { title: 'Get your next step', body: 'Download a detailed report, book a tutor, or join the free community. Whatever fits where you are.' },
]

const reviews = [
  { avatar: 'https://i.pravatar.cc/96?img=47', quote: 'I finally have a clear idea of my level and what I should practise next.', author: 'Maria S., B1 learner' },
  { avatar: 'https://i.pravatar.cc/96?img=12', quote: 'The test was quick, easy to follow, and more useful than I expected.', author: 'Ahmed K., B2 learner' },
]
</script>

<template>
  <div class="mx-auto max-w-md px-6 pb-16 pt-10 md:max-w-3xl md:px-10 md:pt-16">
    <!-- Intro -->
    <div class="md:text-center">
      
      <h1 class="font-display text-[2rem] leading-[1.15] font-semibold text-ink mb-4 md:text-4xl md:leading-tight">
        Know exactly where your English stands
      </h1>
      <p class="font-body text-base leading-relaxed text-ink/70 mb-8 md:mx-auto md:max-w-xl">
        A free English Level assessment, and a directory of real tutors if you want to go further. No login required.
      </p>
    </div>

    <!-- Two equal paths -->
    <div class="grid gap-4 md:grid-cols-2 md:gap-6">
      <button
        type="button"
        class="w-full rounded-card border-2 border-teal bg-teal px-5 py-4 font-display text-base font-semibold text-paper shadow-sm transition-transform active:scale-[0.98]"
        @click="router.push('/start')"
      >
        Take a free test
      </button>
      <button
        type="button"
        class="w-full rounded-card border-2 border-teal px-5 py-4 font-display text-base font-semibold text-teal-dark transition-colors hover:bg-teal/10 active:scale-[0.98]"
        @click="router.push('/tutors')"
      >
        Book a tutor
      </button>
    </div>

    <!-- How it works -->
    <div class="mt-14 pt-10 md:mt-16">
      <h2 class="font-display text-base font-semibold text-ink mb-6 md:text-center">How it works</h2>
      <ol class="flex flex-col gap-6 md:grid md:grid-cols-3 md:gap-8">
        <li v-for="(step, i) in steps" :key="step.title" class="flex gap-4 md:flex-col md:items-center md:text-center md:gap-3">
          <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal/15 font-display text-sm font-semibold text-teal-dark">
            {{ i + 1 }}
          </span>
          <div>
            <p class="font-display text-[15px] font-semibold text-ink">{{ step.title }}</p>
            <p class="font-body text-sm leading-relaxed text-ink/70 mt-0.5">{{ step.body }}</p>
          </div>
        </li>
      </ol>
    </div>

    <!-- Who this is for -->
    <div class="mt-14 pt-10 md:mt-16 md:mx-auto md:max-w-2xl">
      <h2 class="font-display text-base font-semibold text-ink mb-3">Who this is for</h2>
      <p class="font-body text-[15px] leading-relaxed text-ink/70 mb-4">
        Non-native English speakers who want to know exactly where they stand — whether you're preparing to study abroad, getting ready for IELTS or TOEFL, using English at work, or just want to improve.
      </p>
      <p class="font-body text-[15px] leading-relaxed text-ink/70">
        This test comes out of an active English-teaching community — the same questions and standards used with real students, made free for anyone to try.
      </p>
    </div>

    <!-- Learner feedback -->
    <div class="mt-14 pt-10 md:mt-16 md:mx-auto md:max-w-2xl">
      <h2 class="font-display text-base font-semibold text-ink mb-5">What learners say</h2>
      <div class="flex flex-col gap-4">
        <blockquote
          v-for="review in reviews"
          :key="review.author"
          class="flex gap-3"
        >
          <img
            :src="review.avatar"
            :alt="`${review.author} avatar`"
            class="h-9 w-9 shrink-0 rounded-full object-cover"
          />
          <div>
            <p class="font-body text-[15px] leading-relaxed text-ink/80">“{{ review.quote }}”</p>
            <cite class="mt-2 block font-body text-xs font-medium not-italic text-ink/50">{{ review.author }}</cite>
          </div>
        </blockquote>
      </div>
    </div>

    <p class="mt-14 text-center font-body text-xs text-ink/40 md:mt-16">
      No login. No data saved. Just your result.
    </p>
  </div>
</template>
