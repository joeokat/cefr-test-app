# Free English Level Test (CEFR)

A standalone Vue 3 web app: a free English proficiency test that gives a
CEFR level (A1–C2) plus personalized recommendations, a paid detailed PDF
report, and routes into either a tutor directory or a free WhatsApp
community. Fully responsive — top nav on desktop/tablet, native-feeling
bottom tab bar on mobile.

No login, no database — state resets on refresh. The one exception is the
payment step, which calls out to Paystack (see below).

## Run it locally

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
```

Output goes to `dist/` — deploy that folder anywhere that serves static
files (Vercel, Netlify, GitHub Pages, etc.).

## Before you launch: things to configure

**1. Paystack key** — in `src/components/PaywallModal.vue`, near the top:

```js
const PAYSTACK_PUBLIC_KEY = 'pk_test_your_public_key_here'
```

Swap in your real Paystack **public** key (test key while developing,
live key at launch). Card and Mobile Money are both enabled via the
`channels` option in the same file.

**Pricing:** the UI always displays **$0.99**. The actual charge happens
in **GHS** (the only currency currently enabled on your Paystack account),
converted from $0.99 at a **live exchange rate** fetched in
`src/utils/currency.js` — see that file for the API used and the offline
fallback rate. If you later enable more currencies on your Paystack
account and want to charge learners in their own currency instead of
always converting to GHS, that's a bigger change (country detection +
a currency-routing step) — flag it and I can build that in.

> **Payment verification caveat:** this checkout runs entirely in the
> browser (no backend), matching the app's overall "no backend" design —
> but it also means the payment success callback isn't verified
> server-side. Fine for a $0.99 report at MVP stage, but before this
> scales meaningfully, put a small serverless function between the
> payment and the download to verify the transaction with Paystack's API
> using your *secret* key — never put the secret key in frontend code.

**2. Contact links** — in `src/views/Results.vue` and `src/data/tutors.js`:

```js
// Results.vue
const COMMUNITY_WHATSAPP_LINK = 'https://chat.whatsapp.com/your-invite-code'

// data/tutors.js — one whatsappNumber per tutor
whatsappNumber: '233000000000',
```

**3. Tutor profiles** — `src/data/tutors.js` has your own profile
(`id: 'you'`) plus one placeholder. Fill in real names, bios, ratings,
student counts, and reviews, or remove the placeholder if you're the only
tutor for now. See the comment at the top of that file for why reviews
are curated (added by you) rather than submitted live by learners — this
app has no backend to store or moderate them.

**4. Audio files** — `public/audio/clip-41.mp3` through `clip-50.mp3` are
real speech, generated with a local text-to-speech engine (standard
Received Pronunciation voice) rather than a personal recording, so
pronunciation stays consistent across every clip. See
`public/audio/README.md`. If you'd rather have a warmer, human-recorded
voice, each clip's exact script is stored as `transcript` in
`src/data/questions.js` (search `type: 'audio'`) so you can re-record
from the same text.

## Question bank

There are **60 questions total** (40 text, 10 audio, 10 IPA) in
`src/data/questions.js`. Every time someone starts the test,
`buildRandomQuestionSet()` draws a fresh, randomized 30-question test
(20 text + 5 audio + 5 IPA) from that pool — stratified by CEFR level, so
the difficulty curve stays consistent even though the specific questions
differ from one learner (or retake) to the next. Add more questions by
adding objects to `textQuestions` / `audioQuestions` / `ipaQuestions` in
that file — no scoring code needs to change.

## Project structure

```
src/
  data/
    questions.js            60-question pool + random-sampling logic
    tutors.js                 tutor directory data
  stores/test.js              Pinia store: session state, scoring, review
  utils/
    generateReport.js          builds the paid PDF report (jsPDF)
    currency.js                 live USD→GHS conversion for Paystack
  router/index.js             routes, guards, nav-hide on /test
  views/
    Home.vue                  overview: two paths (test / tutors)
    Start.vue                  test intro — the old hero, now its own page
    Test.vue                    the quiz, with an exit control
    Results.vue                  level reveal, equal-weight CTAs
    Tutors.vue                    tutor directory list
    TutorProfile.vue                single tutor profile + reviews
  components/
    NavBar.vue                 desktop/tablet top nav (hidden on mobile)
    BottomTabBar.vue            mobile bottom tab bar (hidden on desktop)
    CefrScale.vue                reusable A1–C2 scale visual
    TestProgress.vue              segmented progress bar
    StarRating.vue                 star rating display
    PaywallModal.vue                blurred payment modal (Paystack Inline)
    questions/                      one component per question type
```

## Design notes

Palette and type choices are documented as CSS custom properties and
Tailwind theme tokens in `tailwind.config.js` and `src/style.css` — the
CEFR band colors (`--band-a1` through `--band-c2`) are reused across the
scale visual, the test progress bar, and the results reveal so the level
system is the app's one consistent visual thread.

Responsive breakpoint is Tailwind's default `md` (768px): below it, the
bottom tab bar is the primary navigation (native-app feel); at or above
it, the top nav bar takes over and page containers widen accordingly.
