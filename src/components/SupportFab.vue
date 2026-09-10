<script setup>
const supportEmail = 'ait.academy@yahoo.com'
const subject = encodeURIComponent('CEFR Assessment Support')
const body = encodeURIComponent('Hello, I need help with the CEFR Assessment app.\n\n')

const mailto = `mailto:${supportEmail}?subject=${subject}&body=${body}`
</script>

<template>
  <a
    :href="mailto"
    aria-label="Contact support"
    title="Contact support"
    class="fixed bottom-[calc(5rem+env(safe-area-inset-bottom))] right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-teal text-paper shadow-lg transition-transform hover:scale-105 active:scale-95 md:bottom-6"
  >
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2Z" />
      <path d="m22 6-10 7L2 6" />
    </svg>
  </a>
</template>