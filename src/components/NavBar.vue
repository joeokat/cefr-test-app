<script setup>
const openCommunity = () => {
  const message = encodeURIComponent(
    'Hello, I’m interested in becoming a tutor on the ESL Platform. I’d like to teach English and offer lessons based on my areas of expertise. Please send me the requirements and next steps for creating my tutor profile.'
  )

  window.location.href = `https://wa.me/233546062058?text=${message}`
}
</script>

<template>
  <header class="sticky top-0 z-30 hidden border-b border-line bg-paper/90 backdrop-blur md:block">
    <nav class="mx-auto flex max-w-5xl items-center justify-between px-8 py-4">
      <router-link to="/" class="font-display text-lg font-semibold text-ink">
        ESL <span class="text-teal">Assessment</span>
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
          to="/library"
          class="font-body text-sm font-medium text-ink/70 transition-colors hover:text-teal"
          active-class="text-teal"
        >
          Library
        </router-link>

        <router-link
          to="/start"
          class="font-body text-sm font-medium text-ink/70 transition-colors hover:text-teal"
          active-class="text-teal"
        >
          Take a Free Test
        </router-link>
        
        <router-link
          to="/tutors"
          class="font-body text-sm font-medium text-ink/70 transition-colors hover:text-teal"
          active-class="text-teal"
        >
          Find a Tutor
        </router-link>
      </div>

      <div class="hidden md:block">
        <button
          type="button"
          class="rounded-full bg-teal px-4 py-2 font-body text-sm font-semibold text-paper transition-transform active:scale-95"
          @click="openCommunity"
        >
          Become a Tutor
        </button>
      </div>
    </nav>
  </header>
</template>
