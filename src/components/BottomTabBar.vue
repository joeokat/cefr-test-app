<script setup>
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const tabs = [
  {
    name: 'home',
    label: 'Home',
    path: '/',
    icon: 'M3 11.5 12 4l9 7.5M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9',
  },
  {
    name: 'start',
    label: 'Test',
    path: '/start',
    icon: 'M9 4h6M9 4a2 2 0 0 0-2 2v1.2c0 .5-.2 1-.5 1.4L4 12.5c-1 1.3-.7 3.2.8 4L11 20a2 2 0 0 0 2 0l6.2-3.5c1.5-.8 1.8-2.7.8-4l-2.5-3.9a2.4 2.4 0 0 1-.5-1.4V6a2 2 0 0 0-2-2M9 4a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2',
  },
  {
    name: 'tutors',
    label: 'Tutors',
    path: '/tutors',
    icon: 'M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM4 21v-1a7 7 0 0 1 14 0v1',
  },
]

function isActive(tab) {
  if (tab.path === '/') return route.path === '/'
  return route.path.startsWith(tab.path)
}
</script>

<template>
  <nav class="fixed inset-x-0 bottom-0 z-30 flex border-t border-line bg-paper/95 backdrop-blur md:hidden">
    <button
      v-for="tab in tabs"
      :key="tab.name"
      type="button"
      class="flex flex-1 flex-col items-center gap-1 py-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))]"
      :class="isActive(tab) ? 'text-teal' : 'text-ink/50'"
      @click="router.push(tab.path)"
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" :stroke="isActive(tab) ? 'currentColor' : 'currentColor'" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path :d="tab.icon" />
      </svg>
      <span class="font-body text-[11px] font-medium">{{ tab.label }}</span>
    </button>
  </nav>
</template>
