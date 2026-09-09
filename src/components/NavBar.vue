<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <header class="sticky top-0 z-30 hidden border-b border-line bg-paper/90 backdrop-blur md:block">
    <nav class="mx-auto flex max-w-5xl items-center justify-between px-8 py-4">
      <router-link to="/" class="font-display text-lg font-semibold text-ink">
        CEFR<span class="text-teal">Level</span>
      </router-link>
      <div class="flex items-center gap-6">
        <router-link
          to="/"
          class="font-body text-sm font-medium text-ink/70 transition-colors hover:text-teal"
          active-class="text-teal"
          exact-active-class="text-teal"
        >
          Home
        </router-link>
        <router-link
          to="/tutors"
          class="font-body text-sm font-medium text-ink/70 transition-colors hover:text-teal"
          active-class="text-teal"
        >
          Find a Tutor
        </router-link>
        <button
          type="button"
          class="rounded-full bg-teal px-4 py-2 font-body text-sm font-semibold text-paper transition-transform active:scale-95"
          @click="router.push('/start')"
        >
          Take a Free Test
        </button>
      </div>
    </nav>
  </header>
</template>
