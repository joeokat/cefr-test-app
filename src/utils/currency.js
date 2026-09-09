const USD_PRICE = 0.99
// Fallback rate used only if the live rate can't be fetched (e.g. offline).
// Update this occasionally so the fallback doesn't drift too far from reality.
const FALLBACK_USD_TO_GHS = 15.5

// Free, no-key exchange rate API. If this endpoint ever changes or goes
// away, swap in another provider here — the rest of the app only calls
// getGhsChargeAmount() below and doesn't care where the rate comes from.
const RATE_API = 'https://open.er-api.com/v6/latest/USD'

let cachedRate = null

async function fetchUsdToGhsRate() {
  if (cachedRate) return cachedRate
  try {
    const res = await fetch(RATE_API)
    const data = await res.json()
    const rate = data?.rates?.GHS
    if (typeof rate === 'number' && rate > 0) {
      cachedRate = rate
      return rate
    }
  } catch {
    // network error, API down, etc. — fall through to fallback rate
  }
  return FALLBACK_USD_TO_GHS
}

/**
 * Returns the amount to charge via Paystack for the $0.99 report,
 * converted to GHS (Paystack's only currency enabled on this account)
 * at the current live exchange rate. Amount is in whole pesewas
 * (GHS's smallest unit) as Paystack's API expects, plus the GHS amount
 * as a display string.
 */
export async function getGhsChargeAmount() {
  const rate = await fetchUsdToGhsRate()
  const ghsAmount = Math.round(USD_PRICE * rate * 100) / 100 // round to 2dp
  return {
    ghsAmount,
    pesewas: Math.round(ghsAmount * 100),
    displayUsd: `$${USD_PRICE.toFixed(2)}`,
  }
}
