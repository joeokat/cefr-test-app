<script setup>
import { ref, watch } from 'vue'
import { getGhsChargeAmount } from '../utils/currency'

// --- Configurable: your real Paystack public key. Test keys start with
// pk_test_, live keys with pk_live_. Get this from your Paystack dashboard.
const PAYSTACK_PUBLIC_KEY = 'pk_live_f218d9c58e0a074d6a4212a2aa7a5dcdef4e7024'

const props = defineProps({
  open: { type: Boolean, default: false },
  title: { type: String, default: 'your purchase' },
  price: { type: String, default: '$0.99' },
})
const emit = defineEmits(['close', 'success'])

const email = ref('')
const error = ref('')
const isProcessing = ref(false)
const isLoadingRate = ref(true)
const charge = ref(null) // { ghsAmount, pesewas, displayUsd }
let rateRequestId = 0

// Recalculate whenever the modal opens or a different product price is selected.
watch([() => props.open, () => props.price], async ([isOpen, price]) => {
  const requestId = ++rateRequestId

  if (!isOpen) {
    charge.value = null
    isLoadingRate.value = false
    return
  }

  charge.value = null
  isLoadingRate.value = true
  const nextCharge = await getGhsChargeAmount(Number.parseFloat(price.replace('$', '')))
  if (requestId !== rateRequestId) return
  charge.value = nextCharge
  isLoadingRate.value = false
})

function validateEmail(value) {
  return /^\S+@\S+\.\S+$/.test(value)
}

function pay() {
  error.value = ''
  if (!validateEmail(email.value)) {
    error.value = 'Enter a valid email — your receipt goes here.'
    return
  }
  if (typeof window.PaystackPop === 'undefined') {
    error.value = "Payment couldn't load. Check your connection and try again."
    return
  }
  if (!charge.value) {
    error.value = 'Still preparing your payment — try again in a moment.'
    return
  }

  isProcessing.value = true
  const handler = window.PaystackPop.setup({
    key: PAYSTACK_PUBLIC_KEY,
    email: email.value,
    amount: charge.value.pesewas, // Paystack takes GHS amounts in pesewas
    currency: 'GHS',
    channels: ['card', 'mobile_money'],
    callback: function () {
      isProcessing.value = false
      emit('success')
    },
    onClose: function () {
      isProcessing.value = false
    },
  })
  handler.openIframe()
}
</script>

<template>
  <Teleport to="body">
    <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center px-6">
      <div class="absolute inset-0 bg-ink/40 backdrop-blur-sm" @click="emit('close')" />

      <div class="relative w-full max-w-sm rounded-card bg-paper p-6 shadow-xl">
        <button
          type="button"
          class="absolute right-4 top-4 font-body text-sm text-ink/40"
          aria-label="Close"
          @click="emit('close')"
        >
          ✕
        </button>

        <h2 class="font-display text-lg font-semibold text-ink mb-2">Unlock {{ props.title }}</h2>
        <p class="font-body text-sm leading-relaxed text-ink/70 mb-5">
          Complete your payment to download this ebook as a PDF.
        </p>

        <div class="mb-4 rounded-card border border-line bg-white/60 p-4 text-center">
          <span v-if="isLoadingRate" class="font-body text-sm text-ink/50">Loading price…</span>
          <template v-else-if="charge">
            <span class="font-display text-2xl font-bold text-teal-dark">{{ charge.displayUsd }}</span>
          </template>
        </div>

        <label class="mb-1 block font-body text-sm font-medium text-ink/70">Email for your receipt</label>
        <input
          v-model="email"
          type="email"
          placeholder="you@example.com"
          class="mb-2 w-full rounded-card border border-line bg-white px-4 py-3 font-body text-sm text-ink outline-none focus:border-teal"
        />
        <p v-if="error" class="mb-2 font-body text-sm text-clay">{{ error }}</p>

        <button
          type="button"
          class="w-full rounded-card bg-teal py-3 font-display text-base font-semibold text-paper shadow-sm transition-transform active:scale-[0.98] disabled:opacity-50"
          :disabled="isProcessing || isLoadingRate"
          @click="pay"
        >
          {{ isProcessing ? 'Opening payment…' : 'Pay with Momo or Card' }}
        </button>

        <p class="mt-3 text-center font-body text-xs text-ink/40">Secure payment via Paystack</p>
      </div>
    </div>
  </Teleport>
</template>
