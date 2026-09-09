<script setup>
defineProps({
  // optional: highlight one band (used on the results page)
  activeLevel: { type: String, default: null },
})

const bands = [
  { level: 'A1', color: 'var(--band-a1)' },
  { level: 'A2', color: 'var(--band-a2)' },
  { level: 'B1', color: 'var(--band-b1)' },
  { level: 'B2', color: 'var(--band-b2)' },
  { level: 'C1', color: 'var(--band-c1)' },
  { level: 'C2', color: 'var(--band-c2)' },
]
</script>

<template>
  <div class="w-full">
    <div class="flex h-3 w-full overflow-hidden rounded-full">
      <div
        v-for="band in bands"
        :key="band.level"
        class="flex-1 transition-opacity duration-300"
        :style="{ backgroundColor: band.color, opacity: activeLevel && activeLevel !== band.level ? 0.25 : 1 }"
      />
    </div>
    <div class="mt-2 flex w-full justify-between">
      <span
        v-for="band in bands"
        :key="band.level"
        class="font-display text-sm font-semibold transition-opacity duration-300"
        :style="{ color: band.color, opacity: activeLevel && activeLevel !== band.level ? 0.4 : 1 }"
      >
        {{ band.level }}
      </span>
    </div>
  </div>
</template>
