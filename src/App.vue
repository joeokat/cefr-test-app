<script setup>
import { useRoute } from 'vue-router'
import NavBar from './components/NavBar.vue'
import BottomTabBar from './components/BottomTabBar.vue'
import SupportFab from './components/SupportFab.vue'

const route = useRoute()
</script>

<template>
  <div class="min-h-screen bg-paper">
    <NavBar v-if="!route.meta.hideNav" />
    <div :class="!route.meta.hideNav ? 'pb-20 md:pb-0' : ''">
      <router-view />
    </div>
    <BottomTabBar v-if="!route.meta.hideNav" />
    <SupportFab />
  </div>
</template>
