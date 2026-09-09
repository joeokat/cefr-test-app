import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Start from '../views/Start.vue'
import Test from '../views/Test.vue'
import Results from '../views/Results.vue'
import Tutors from '../views/Tutors.vue'
import TutorProfile from '../views/TutorProfile.vue'
import { useTestStore } from '../stores/test'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/start', name: 'start', component: Start },
    // nav hidden during the test itself to keep it distraction-free;
    // Test.vue has its own exit control instead
    { path: '/test', name: 'test', component: Test, meta: { hideNav: true } },
    { path: '/results', name: 'results', component: Results },
    { path: '/tutors', name: 'tutors', component: Tutors },
    { path: '/tutors/:id', name: 'tutor-profile', component: TutorProfile },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

router.beforeEach((to) => {
  const store = useTestStore()

  // Can't land on /results without a completed test.
  if (to.name === 'results' && !store.result) {
    return { name: 'home' }
  }

  // Landing on /test directly (e.g. a refresh) with no active session —
  // start one automatically rather than showing a broken page.
  if (to.name === 'test' && store.questions.length === 0) {
    store.reset()
  }

  return true
})

export default router
