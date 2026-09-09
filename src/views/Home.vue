<script setup>
import { useRouter } from 'vue-router'
import reviewerMaria from '../assets/reviewer-maria.svg'
import reviewerAhmed from '../assets/reviewer-ahmed.svg'

const router = useRouter()

const steps = [
  { title: 'Take the assessment', body: 'Answer around 30 questions covering grammar, vocabulary, reading, listening, and pronunciation. It takes about 6–8 minutes.' },
  { title: 'Discover your level', body: 'Get your CEFR English level, from A1 to C2, instantly. You’ll also see which areas you’re doing well in and where you can improve.' },
  { title: 'Choose your next step', body: 'Get a detailed report and decide what works best for you. Find a tutor, join the free community, or simply use your results to guide your learning.' },
]

const reviews = [
  { avatar: reviewerMaria, quote: 'I finally have a clear idea of my level and what I should practise next.', author: 'Maria S., B1 learner' },
  { avatar: reviewerAhmed, quote: 'The test was quick, easy to follow, and more useful than I expected.', author: 'Ahmed K., B2 learner' },
  { avatar: reviewerMaria, quote: 'It helped me focus on the exact areas I needed to improve instead of guessing.', author: 'Lena T., A2 learner' },
  { avatar: reviewerAhmed, quote: 'I used the result to choose my next tutor and it saved me a lot of time.', author: 'Daniel R., C1 learner' },
]

const faqs = [
  {
    question: 'Who is this assessment for?',
    answer: 'This assessment is for non-native English speakers who want to know where they stand and what to work on next.',
  },
  {
    question: 'What kinds of goals does it help with?',
    answer: 'Whether you’re preparing to study abroad, getting ready for IELTS or TOEFL, using English at work, or simply looking to improve, you’ll get a clear picture of your current level.',
  },
  {
    question: 'How is the assessment designed?',
    answer: 'The assessment follows the CEFR framework and is informed by real English-teaching practice. It is designed to measure the skills that matter across academic, professional, and everyday English.',
  },
]
</script>

<template>
  <div class="mx-auto max-w-md px-6 pb-16 pt-10 md:max-w-3xl md:px-10 md:pt-16">
    <!-- Intro -->
    <div class="md:text-center">
      
      <h1 class="font-display text-[2rem] leading-[1.15] font-semibold text-ink mb-4 md:text-4xl md:leading-tight">
        Know exactly where your English stands
      </h1>
      <p class="font-body text-base leading-relaxed text-ink/70 mb-4 md:mx-auto md:max-w-xl">
        Take a free English test and discover your proficiency level in minutes. No login required.
      </p>
      <div class="mb-8 md:mx-auto md:max-w-xl">
        <p class="inline-flex items-center rounded-full border border-teal/30 bg-teal/10 px-3 py-1.5 font-display text-[11px] font-semibold uppercase tracking-[0.18em] text-teal-dark">
          Want to improve?
        </p>
        <p class="mt-3 font-body text-base leading-relaxed text-ink/70 md:whitespace-nowrap">
          Find a tutor who can help you move to the next level.
        </p>
      </div>
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
      <h2 class="font-display text-[2rem] leading-[1.15] font-semibold text-ink mb-4 md:text-4xl md:leading-tight md:text-center">How it works</h2>
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
      <h2 class="font-display text-[2rem] leading-[1.15] font-semibold text-ink mb-4 md:text-4xl md:leading-tight md:text-center">FAQs</h2>
      <div class="space-y-3">
        <div
          v-for="faq in faqs"
          :key="faq.question"
          class="rounded-2xl border border-ink/10 bg-paper p-4 shadow-sm"
        >
          <p class="font-display text-[15px] font-semibold text-ink">{{ faq.question }}</p>
          <p class="mt-2 font-body text-[15px] leading-relaxed text-ink/70">{{ faq.answer }}</p>
        </div>
      </div>
    </div>

    <!-- Learner feedback -->
    <div class="mt-14 pt-10 md:mt-16 md:mx-auto md:max-w-2xl">
      <h2 class="font-display text-[2rem] leading-[1.15] font-semibold text-ink mb-4 md:text-4xl md:leading-tight md:text-center">What learners say</h2>
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
      No login required. Your results stay private.
    </p>
  </div>
</template>
