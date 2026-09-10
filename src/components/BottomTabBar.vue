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
    name: 'library',
    label: 'Library',
    path: '/library',
    icon: 'M4 5.5A2.5 2.5 0 0 1 6.5 3H19a2 2 0 0 1 2 2v12.5A2.5 2.5 0 0 0 18.5 16H6.5A2.5 2.5 0 0 0 4 18.5v-13ZM8 7h7M8 11h7M8 15h5M4 18.5V5.5',
  },
  {
    name: 'start',
    label: 'Take a Test',
    path: '/start',
    icon: 'M9 3h6M9 3a2 2 0 0 0-2 2v1h10V5a2 2 0 0 0-2-2M7 7h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Zm3 7 2 2 4-4',
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
