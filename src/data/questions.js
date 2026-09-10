// Question bank for the CEFR English Level Test — 60 questions total,
// covering three types (text, audio, ipa). Each test session draws a
// randomized subset via buildRandomQuestionSet() below, so different
// learners (or a retake) see a different mix of questions while the
// level-scoring logic in stores/test.js still gets a consistent number
// of questions per CEFR band to work with.
//
// Every question carries an `explanation` field — used in the paid PDF
// report's question-by-question review to explain the correct answer.

export const CEFR_ORDER = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']

// ---------------------------------------------------------------------
// TEXT — 40 questions (grammar, vocabulary, reading)
// ---------------------------------------------------------------------
const textQuestions = [
  // ---------- A1 (8 candidates) ----------
  { id: 1, type: 'text', level: 'A1', category: 'grammar', question: "Choose the correct word: 'She ___ a teacher.'", passage: null, options: ['is', 'are', 'am', 'be'], correctAnswer: 'is', explanation: "'She' takes 'is' in the simple present of 'to be'." },
  { id: 2, type: 'text', level: 'A1', category: 'vocabulary', question: "What do you call the meal you eat in the morning?", passage: null, options: ['Breakfast', 'Dinner', 'Lunch', 'Supper'], correctAnswer: 'Breakfast', explanation: "'Breakfast' is the meal eaten in the morning." },
  { id: 3, type: 'text', level: 'A1', category: 'grammar', question: "Choose the correct word: 'They ___ from Ghana.'", passage: null, options: ['are', 'is', 'am', 'be'], correctAnswer: 'are', explanation: "'They' takes 'are' in the simple present of 'to be'." },
  { id: 4, type: 'text', level: 'A1', category: 'vocabulary', question: "Which word means the opposite of 'big'?", passage: null, options: ['Small', 'Tall', 'Long', 'Heavy'], correctAnswer: 'Small', explanation: "'Small' is the opposite of 'big'." },
  { id: 21, type: 'text', level: 'A1', category: 'grammar', question: "Choose the correct word: 'We ___ students.'", passage: null, options: ['are', 'is', 'am', 'be'], correctAnswer: 'are', explanation: "'We' takes 'are' in the simple present of 'to be'." },
  { id: 22, type: 'text', level: 'A1', category: 'vocabulary', question: "What do you call the place where you buy food?", passage: null, options: ['Market', 'School', 'Hospital', 'Bank'], correctAnswer: 'Market', explanation: "A 'market' is a place where you buy food." },
  { id: 23, type: 'text', level: 'A1', category: 'grammar', question: "Choose the correct word: 'I ___ hungry.'", passage: null, options: ['am', 'is', 'are', 'be'], correctAnswer: 'am', explanation: "'I' takes 'am' in the simple present of 'to be'." },
  { id: 24, type: 'text', level: 'A1', category: 'vocabulary', question: "Which word means the opposite of 'happy'?", passage: null, options: ['Sad', 'Angry', 'Tired', 'Loud'], correctAnswer: 'Sad', explanation: "'Sad' is the opposite of 'happy'." },

  // ---------- A2 (8 candidates) ----------
  { id: 5, type: 'text', level: 'A2', category: 'grammar', question: "Choose the correct sentence.", passage: null, options: ['She goes to work every day.', 'She go to work every day.', 'She going to work every day.', 'She gone to work every day.'], correctAnswer: 'She goes to work every day.', explanation: "Third-person singular ('she') takes an -s ending in the simple present: 'goes'." },
  { id: 6, type: 'text', level: 'A2', category: 'reading', question: "According to the passage, what time does the shop open?", passage: "The new shop on Market Street opens at 8 in the morning and closes at 6 in the evening, Monday to Saturday. It is closed on Sundays.", options: ['8 in the morning', '6 in the evening', '9 in the morning', 'It is always closed'], correctAnswer: '8 in the morning', explanation: "The passage states the shop opens at 8 in the morning." },
  { id: 7, type: 'text', level: 'A2', category: 'vocabulary', question: "Which word best completes: 'Can you ___ me the salt, please?'", passage: null, options: ['pass', 'carry', 'bring back', 'push'], correctAnswer: 'pass', explanation: "'Pass' is the natural word for handing something to someone nearby." },
  { id: 8, type: 'text', level: 'A2', category: 'grammar', question: "Choose the correct past tense: 'Yesterday, I ___ to the market.'", passage: null, options: ['went', 'go', 'goes', 'going'], correctAnswer: 'went', explanation: "'Went' is the simple past tense of 'go'." },
  { id: 25, type: 'text', level: 'A2', category: 'grammar', question: "Choose the correct sentence.", passage: null, options: ['He plays football every weekend.', 'He play football every weekend.', 'He playing football every weekend.', 'He played football every weekend now.'], correctAnswer: 'He plays football every weekend.', explanation: "Third-person singular ('he') takes an -s ending in the simple present: 'plays'." },
  { id: 26, type: 'text', level: 'A2', category: 'reading', question: "What time does the library close on Saturdays?", passage: "The library opens at 9am and closes at 5pm on weekdays. On Saturdays it closes at 1pm. It is closed on Sundays.", options: ['1pm', '5pm', '9am', 'It is closed'], correctAnswer: '1pm', explanation: "The passage states the library closes at 1pm on Saturdays." },
  { id: 27, type: 'text', level: 'A2', category: 'vocabulary', question: "Which word best completes: 'Please ___ down, the film is starting.'", passage: null, options: ['sit', 'stand', 'walk', 'run'], correctAnswer: 'sit', explanation: "'Sit down' is the natural instruction before a film starts." },
  { id: 28, type: 'text', level: 'A2', category: 'grammar', question: "Choose the correct past tense: 'Last week, she ___ a letter.'", passage: null, options: ['wrote', 'write', 'writes', 'writing'], correctAnswer: 'wrote', explanation: "'Wrote' is the simple past tense of 'write'." },

  // ---------- B1 (8 candidates) ----------
  { id: 9, type: 'text', level: 'B1', category: 'grammar', question: "Choose the correct sentence.", passage: null, options: ['If it rains tomorrow, we will stay home.', 'If it rains tomorrow, we stay home.', 'If it will rain tomorrow, we will stay home.', 'If it rain tomorrow, we will stay home.'], correctAnswer: 'If it rains tomorrow, we will stay home.', explanation: "First conditional: present tense after 'if', 'will' in the main clause." },
  { id: 10, type: 'text', level: 'B1', category: 'reading', question: "What is the main reason the company is hiring more staff?", passage: "Due to a sharp rise in online orders over the past three months, the company has decided to hire ten new staff members to help manage deliveries and customer support during the busy season.", options: ['A rise in online orders', 'Staff members resigned', 'The company is moving offices', 'Customers complained about delivery times'], correctAnswer: 'A rise in online orders', explanation: "The passage gives the rise in online orders as the reason for hiring." },
  { id: 11, type: 'text', level: 'B1', category: 'vocabulary', question: "'Postpone' most nearly means:", passage: null, options: ['Delay', 'Cancel', 'Announce', 'Approve'], correctAnswer: 'Delay', explanation: "'Postpone' means to delay something to a later time." },
  { id: 12, type: 'text', level: 'B1', category: 'grammar', question: "Choose the correct sentence.", passage: null, options: ['I have been working here for three years.', 'I am working here for three years.', 'I work here since three years.', 'I have work here for three years.'], correctAnswer: 'I have been working here for three years.', explanation: "Present perfect continuous ('have been working') fits an action that started in the past and continues now." },
  { id: 29, type: 'text', level: 'B1', category: 'grammar', question: "Choose the correct sentence.", passage: null, options: ['If I have time, I will call you.', 'If I will have time, I call you.', 'If I had time, I call you.', 'If I have time, I called you tomorrow.'], correctAnswer: 'If I have time, I will call you.', explanation: "First conditional: present tense after 'if', 'will' in the main clause." },
  { id: 30, type: 'text', level: 'B1', category: 'reading', question: "Why has the library extended its hours?", passage: "The library has extended its opening hours during exam season, staying open until midnight instead of the usual 8pm, to give students more time to study.", options: ['To give students more time to study', 'Because it was too crowded', 'Because of new staff', 'To save money'], correctAnswer: 'To give students more time to study', explanation: "The passage states the hours were extended to give students more time to study." },
  { id: 31, type: 'text', level: 'B1', category: 'vocabulary', question: "'Reluctant' most nearly means:", passage: null, options: ['Unwilling', 'Eager', 'Confident', 'Curious'], correctAnswer: 'Unwilling', explanation: "'Reluctant' means unwilling or hesitant to do something." },
  { id: 32, type: 'text', level: 'B1', category: 'grammar', question: "Choose the correct sentence.", passage: null, options: ['She has lived here since 2019.', 'She lives here since 2019.', 'She living here since 2019.', 'She live here since 2019.'], correctAnswer: 'She has lived here since 2019.', explanation: "Present perfect ('has lived') fits an action continuing since a fixed point in the past ('since 2019')." },

  // ---------- B2 (8 candidates) ----------
  { id: 13, type: 'text', level: 'B2', category: 'grammar', question: "Choose the correct sentence.", passage: null, options: ['Had I known about the meeting, I would have attended.', 'If I would have known about the meeting, I would attend.', 'Had I know about the meeting, I would have attended.', 'I had known about the meeting, I would attend.'], correctAnswer: 'Had I known about the meeting, I would have attended.', explanation: "Inverted third conditional: 'Had I known...' expresses an unreal past condition." },
  { id: 14, type: 'text', level: 'B2', category: 'reading', question: "What can be inferred about the author's opinion of remote work?", passage: "While remote work offers undeniable flexibility, it is not without cost: many employees report feeling isolated, and the boundary between personal time and work has, for some, all but disappeared.", options: ['The author sees both benefits and drawbacks', 'The author is entirely against remote work', 'The author thinks remote work has no downsides', 'The author does not mention any drawbacks'], correctAnswer: 'The author sees both benefits and drawbacks', explanation: "The passage names both a benefit (flexibility) and a cost (isolation) — a balanced view." },
  { id: 15, type: 'text', level: 'B2', category: 'vocabulary', question: "Which word best fits: 'Her argument was ___ ; no one could find a flaw in it.'", passage: null, options: ['flawless', 'flawed', 'vague', 'biased'], correctAnswer: 'flawless', explanation: "'Flawless' means without any flaws, matching 'no one could find a flaw'." },
  { id: 16, type: 'text', level: 'B2', category: 'grammar', question: "Choose the correct sentence.", passage: null, options: ['The report, which was submitted late, was rejected.', 'The report, which was submitted late, rejected.', 'The report, was submitted late, was rejected.', 'The report which submitted late was rejected.'], correctAnswer: 'The report, which was submitted late, was rejected.', explanation: "A non-restrictive relative clause ('which was submitted late') sits in commas without breaking the main clause." },
  { id: 33, type: 'text', level: 'B2', category: 'grammar', question: "Choose the correct sentence.", passage: null, options: ['Were I to accept the offer, I would need to relocate.', 'If I was to accept the offer, I would need to relocate.', 'Was I accept the offer, I would need to relocate.', 'If I accept the offer, I would needed to relocate.'], correctAnswer: 'Were I to accept the offer, I would need to relocate.', explanation: "'Were I to...' is an inverted conditional expressing a hypothetical." },
  { id: 34, type: 'text', level: 'B2', category: 'reading', question: "What is the main criticism of the plan?", passage: "Critics of the plan argue that, while well-intentioned, it fails to address the root cause of the delays, focusing instead on symptoms that are easier to fix.", options: ['It addresses symptoms rather than the root cause', 'It is too expensive', 'It has no clear goals', 'It was poorly written'], correctAnswer: 'It addresses symptoms rather than the root cause', explanation: "The passage says the plan focuses on symptoms instead of the root cause." },
  { id: 35, type: 'text', level: 'B2', category: 'vocabulary', question: "Which word best fits: 'The evidence was ___ ; it left no room for doubt.'", passage: null, options: ['conclusive', 'ambiguous', 'circumstantial', 'irrelevant'], correctAnswer: 'conclusive', explanation: "'Conclusive' means leaving no room for doubt." },
  { id: 36, type: 'text', level: 'B2', category: 'grammar', question: "Choose the correct sentence.", passage: null, options: ['The proposal, which had been revised twice, was finally approved.', 'The proposal, which had been revised twice, finally approved.', 'The proposal, was revised twice, was finally approved.', 'The proposal which revised twice was finally approved.'], correctAnswer: 'The proposal, which had been revised twice, was finally approved.', explanation: "A non-restrictive relative clause needs commas around it and a complete main clause." },

  // ---------- C1 (6 candidates) ----------
  { id: 17, type: 'text', level: 'C1', category: 'reading', question: "What is the passage's main criticism of the policy?", passage: "Proponents argue the policy will reduce costs, yet they consistently understate the administrative burden it places on small businesses, many of which lack the resources to comply within the proposed timeline.", options: ['It underestimates the burden on small businesses', 'It will not reduce costs at all', 'It has no timeline for compliance', 'It only affects large businesses'], correctAnswer: 'It underestimates the burden on small businesses', explanation: "The passage says proponents 'understate the administrative burden' — that is, underestimate it." },
  { id: 18, type: 'text', level: 'C1', category: 'vocabulary', question: "'Ubiquitous' most nearly means:", passage: null, options: ['Present everywhere', 'Rare', 'Outdated', 'Controversial'], correctAnswer: 'Present everywhere', explanation: "'Ubiquitous' means present or found everywhere." },
  { id: 19, type: 'text', level: 'C1', category: 'grammar', question: "Choose the correct sentence.", passage: null, options: ['Not only did she finish the project early, but she also exceeded expectations.', 'Not only she finished the project early, but she also exceeded expectations.', 'Not only did she finished the project early, but also she exceeded expectations.', 'Not only she did finish the project early, but she also exceeded expectations.'], correctAnswer: 'Not only did she finish the project early, but she also exceeded expectations.', explanation: "Negative inversion after 'Not only' requires auxiliary-subject inversion: 'did she finish'." },
  { id: 37, type: 'text', level: 'C1', category: 'reading', question: "What does the author suggest about the study's conclusions?", passage: "While the study's findings are compelling, its small sample size means the conclusions should be treated as preliminary rather than definitive.", options: ['They should be treated as preliminary', 'They are completely reliable', 'They are irrelevant', 'They contradict earlier research'], correctAnswer: 'They should be treated as preliminary', explanation: "The passage says the conclusions 'should be treated as preliminary rather than definitive'." },
  { id: 38, type: 'text', level: 'C1', category: 'vocabulary', question: "'Meticulous' most nearly means:", passage: null, options: ['Extremely careful and precise', 'Careless', 'Fast', 'Confident'], correctAnswer: 'Extremely careful and precise', explanation: "'Meticulous' means extremely careful and precise about detail." },
  { id: 39, type: 'text', level: 'C1', category: 'grammar', question: "Choose the correct sentence.", passage: null, options: ['Rarely have I seen such dedication.', 'Rarely I have seen such dedication.', 'Rarely did I have seen such dedication.', 'Rarely I saw such dedication ever.'], correctAnswer: 'Rarely have I seen such dedication.', explanation: "Negative inversion after 'Rarely' requires auxiliary-subject inversion: 'have I seen'." },

  // ---------- C2 (2 candidates) ----------
  { id: 20, type: 'text', level: 'C2', category: 'reading', question: "The author's tone in the passage is best described as:", passage: "One might be forgiven for assuming that consensus, once reached, is immovable; history, however, delights in proving otherwise, and the confidence of one generation frequently becomes the embarrassment of the next.", options: ['Wry and reflective', 'Angry and dismissive', 'Neutral and clinical', 'Enthusiastic and celebratory'], correctAnswer: 'Wry and reflective', explanation: "The passage treats human overconfidence with light irony rather than anger — wry and reflective." },
  { id: 40, type: 'text', level: 'C2', category: 'reading', question: "The passage suggests that each generation tends to:", passage: "It is a peculiar feature of progress that each generation is convinced it has, at last, arrived at the truth its predecessors merely groped toward.", options: ['Believe it has found the final truth', 'Reject all previous ideas', 'Ignore the future', 'Agree entirely with earlier generations'], correctAnswer: 'Believe it has found the final truth', explanation: "The passage says each generation is 'convinced it has... arrived at the truth' — it believes it has found the final truth." },
]

// How many text questions to draw from each level per test session (totals 20)
const TEXT_QUOTA = { A1: 4, A2: 4, B1: 4, B2: 4, C1: 3, C2: 1 }

// ---------------------------------------------------------------------
// AUDIO — 10 listening questions. `transcript` is the exact script used
// to generate the clip (see public/audio/README.md) — kept here so any
// clip can be regenerated or edited without hunting for the original text.
// ---------------------------------------------------------------------
const audioQuestions = [
  { id: 41, type: 'audio', level: 'A2', category: 'listening', audioUrl: '/audio/clip-41.mp3', transcript: "The meeting starts at nine thirty tomorrow morning, not nine o'clock, so please don't be late.", question: "What time does the speaker say the meeting starts?", options: ['9:30', '9:00', '10:30', '10:00'], correctAnswer: '9:30', explanation: "The speaker says the meeting starts at nine thirty (9:30), not nine o'clock." },
  { id: 42, type: 'audio', level: 'B1', category: 'listening', audioUrl: '/audio/clip-42.mp3', transcript: "I'm sorry, I'll be a few minutes late. The traffic on the main road is terrible today.", question: "Why does the speaker say she will be late?", options: ['Traffic on the main road', 'She woke up late', 'Her car broke down', 'A family emergency'], correctAnswer: 'Traffic on the main road', explanation: "The speaker blames traffic on the main road for being late." },
  { id: 43, type: 'audio', level: 'B1', category: 'listening', audioUrl: '/audio/clip-43.mp3', transcript: "I'd like the grilled fish with rice, please, and a glass of orange juice.", question: "What does the speaker order at the restaurant?", options: ['Grilled fish and rice', 'Jollof rice and chicken', 'Fried yam and stew', 'Waakye and salad'], correctAnswer: 'Grilled fish and rice', explanation: "The speaker asks for the grilled fish with rice." },
  { id: 44, type: 'audio', level: 'B2', category: 'listening', audioUrl: '/audio/clip-44.mp3', transcript: "Hello, I'm calling because my order arrived two days late, and nobody told me why.", question: "What is the main complaint the caller makes?", options: ['Their order arrived late', 'Their order was wrong', 'They were overcharged', 'The staff were rude'], correctAnswer: 'Their order arrived late', explanation: "The caller's complaint is that the order arrived two days late." },
  { id: 45, type: 'audio', level: 'C1', category: 'listening', audioUrl: '/audio/clip-45.mp3', transcript: "The new policy has some real benefits, but I do have a few concerns about how quickly it's being rolled out.", question: "What does the speaker imply about the new policy?", options: ['She has reservations despite supporting it overall', 'She is completely opposed to it', 'She has no opinion on it', 'She thinks it will fail immediately'], correctAnswer: 'She has reservations despite supporting it overall', explanation: "The speaker names benefits but also raises concerns — reservations despite overall support." },
  { id: 46, type: 'audio', level: 'A1', category: 'listening', audioUrl: '/audio/clip-46.mp3', transcript: "My name is Ama. I am ten years old. I live in Accra.", question: "How old is Ama?", options: ['10', '9', '11', '12'], correctAnswer: '10', explanation: "Ama says she is ten years old." },
  { id: 47, type: 'audio', level: 'A2', category: 'listening', audioUrl: '/audio/clip-47.mp3', transcript: "The bus leaves at half past two from the main station.", question: "What time does the bus leave?", options: ['Half past two', 'Two o\u2019clock', 'Quarter past two', 'Half past three'], correctAnswer: 'Half past two', explanation: "The speaker says the bus leaves at half past two." },
  { id: 48, type: 'audio', level: 'B1', category: 'listening', audioUrl: '/audio/clip-48.mp3', transcript: "We visited three countries last summer: Ghana, Togo, and Benin.", question: "How many countries did they visit?", options: ['3', '2', '4', '5'], correctAnswer: '3', explanation: "The speaker names three countries: Ghana, Togo, and Benin." },
  { id: 49, type: 'audio', level: 'B2', category: 'listening', audioUrl: '/audio/clip-49.mp3', transcript: "Even though the report was thorough, the board felt it lacked clear recommendations for next steps.", question: "What did the board feel was missing from the report?", options: ['Clear recommendations for next steps', 'Enough detail', 'A summary', 'Numbers'], correctAnswer: 'Clear recommendations for next steps', explanation: "The speaker says the board felt the report lacked clear recommendations for next steps." },
  { id: 50, type: 'audio', level: 'C2', category: 'listening', audioUrl: '/audio/clip-50.mp3', transcript: "One could argue the decision was inevitable, yet at the time it seemed anything but certain.", question: "What does the speaker suggest about the decision?", options: ['It seemed uncertain at the time', 'It was obviously correct', 'Nobody discussed it', 'It happened very quickly'], correctAnswer: 'It seemed uncertain at the time', explanation: "The speaker says the decision 'seemed anything but certain' at the time — it seemed uncertain." },
]

// Which levels to draw an audio question from each session (totals 5).
// A1 and C2 stay out of the default quota (short listening sections skew
// toward the middle of the scale) but remain in the pool for future use.
const AUDIO_QUOTA = { A2: 1, B1: 2, B2: 1, C1: 1 }

// ---------------------------------------------------------------------
// IPA — 10 pronunciation/phonetic-awareness questions
// ---------------------------------------------------------------------
const ipaQuestions = [
  { id: 51, type: 'ipa', level: 'A2', category: 'pronunciation', word: 'cat', options: ['/k\u00e6t/', '/ke\u026at/', '/k\u0251\u02d0t/', '/k\u028ct/'], correctAnswer: '/k\u00e6t/', explanation: "'Cat' has a short 'a' sound: /k\u00e6t/." },
  { id: 52, type: 'ipa', level: 'B1', category: 'pronunciation', word: 'thought', options: ['/\u03b8\u0254\u02d0t/', '/t\u0254\u02d0t/', '/\u03b8\u0254\u02d0k/', '/s\u0254\u02d0t/'], correctAnswer: '/\u03b8\u0254\u02d0t/', explanation: "'Thought' starts with the 'th' sound /\u03b8/ and rhymes with 'caught': /\u03b8\u0254\u02d0t/." },
  { id: 53, type: 'ipa', level: 'B1', category: 'pronunciation', word: 'right', options: ['/ra\u026at/', '/r\u026at/', '/li\u02d0t/', '/la\u026at/'], correctAnswer: '/ra\u026at/', explanation: "'Right' has a diphthong /a\u026a/ and a silent 'gh': /ra\u026at/." },
  { id: 54, type: 'ipa', level: 'B2', category: 'pronunciation', word: 'chair', options: ['/t\u0283e\u0259/', '/\u0283e\u0259/', '/ke\u0259/', '/t\u0283\u026a\u0259/'], correctAnswer: '/t\u0283e\u0259/', explanation: "'Chair' starts with the 'ch' sound /t\u0283/: /t\u0283e\u0259/." },
  { id: 55, type: 'ipa', level: 'C1', category: 'pronunciation', word: 'measure', options: ['/\u02c8me\u0292\u0259/', '/\u02c8mesj\u0259/', '/\u02c8me\u026a\u0292\u0259/', '/\u02c8me\u0283\u0259/'], correctAnswer: '/\u02c8me\u0292\u0259/', explanation: "'Measure' has the 'zh' sound /\u0292/ in its second syllable: /\u02c8me\u0292\u0259/." },
  { id: 56, type: 'ipa', level: 'A1', category: 'pronunciation', word: 'dog', options: ['/d\u0252g/', '/d\u0254\u02d0g/', '/d\u028cg/', '/d\u00e6g/'], correctAnswer: '/d\u0252g/', explanation: "'Dog' has the short 'o' sound: /d\u0252g/." },
  { id: 57, type: 'ipa', level: 'A2', category: 'pronunciation', word: 'book', options: ['/b\u028ak/', '/bu\u02d0k/', '/b\u0252k/', '/b\u028ck/'], correctAnswer: '/b\u028ak/', explanation: "'Book' has the short 'oo' sound /\u028a/, not the long one: /b\u028ak/." },
  { id: 58, type: 'ipa', level: 'B2', category: 'pronunciation', word: 'island', options: ['/\u02c8a\u026al\u0259nd/', '/\u02c8\u026azl\u0259nd/', '/\u02c8a\u026asl\u0259nd/', '/\u02c8a\u026al\u00e6nd/'], correctAnswer: '/\u02c8a\u026al\u0259nd/', explanation: "'Island' has a silent 's': /\u02c8a\u026al\u0259nd/." },
  { id: 59, type: 'ipa', level: 'C1', category: 'pronunciation', word: 'colonel', options: ['/\u02c8k\u025c\u02d0nl/', '/k\u0259\u02c8l\u0252n\u0259l/', '/\u02c8k\u0252l\u0259nl/', '/\u02c8ko\u028al\u0259nl/'], correctAnswer: '/\u02c8k\u025c\u02d0nl/', explanation: "'Colonel' is pronounced /\u02c8k\u025c\u02d0nl/ — very differently from how it's spelled." },
  { id: 60, type: 'ipa', level: 'C2', category: 'pronunciation', word: 'epitome', options: ['/\u026a\u02c8p\u026at\u0259mi/', '/\u02cc\u025bp\u026a\u02c8to\u028am/', '/\u02c8\u025bp\u026at\u0259\u028am/', '/\u026a\u02c8p\u026atomi/'], correctAnswer: '/\u026a\u02c8p\u026at\u0259mi/', explanation: "'Epitome' stresses the second syllable and ends in an 'ee' sound: /\u026a\u02c8p\u026at\u0259mi/." },
]

// Which levels to draw an IPA question from each session (totals 5).
// A1 and C2 stay out of the default quota, same reasoning as audio above.
const IPA_QUOTA = { A2: 1, B1: 2, B2: 1, C1: 1 }

function shuffle(array) {
  const copy = [...array]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

function sampleByLevel(pool, quota) {
  const result = []
  for (const [level, count] of Object.entries(quota)) {
    const candidates = pool.filter((q) => q.level === level)
    result.push(...shuffle(candidates).slice(0, count))
  }
  return result
}

/**
 * Draws a fresh, randomized 30-question test (20 text + 5 audio + 5 ipa)
 * from the 60-question pool, respecting the per-level quotas above so
 * every learner gets the same difficulty curve even though the specific
 * questions differ session to session.
 */
export function buildRandomQuestionSet() {
  const text = sampleByLevel(textQuestions, TEXT_QUOTA)
  const audio = sampleByLevel(audioQuestions, AUDIO_QUOTA)
  const ipa = sampleByLevel(ipaQuestions, IPA_QUOTA)
  return shuffle([...text, ...audio, ...ipa])
}

export const CEFR_DESCRIPTIONS = {
  A1: "You can understand and use simple, everyday phrases. Basic greetings and introductions are comfortable, but longer conversations are still difficult.",
  A2: "You can manage short, routine exchanges about shopping, directions, and simple work tasks. Describing experiences or opinions in detail is the next step.",
  B1: "You can manage everyday conversations and simple work topics, and you can make yourself understood while travelling. Longer or more nuanced discussions are your next challenge.",
  B2: "You can follow most conversations, express your opinions clearly, and use English for work or study. More subtle meaning and idiomatic language are the areas to keep developing.",
  C1: "You can use English flexibly for work, study, and social situations, and understand demanding texts and implied meaning.",
  C2: "You can understand almost everything you read or hear and express yourself precisely in complex situations. Your English is close to native level.",
}

export const CEFR_RECOMMENDATIONS = {
  A1: "Start with the foundations. Review the simple present and simple past, then build your everyday vocabulary with a little practice each day.",
  A2: "You have a useful foundation already. Keep adding verb tenses and vocabulary, and practise short conversations aloud so the language becomes more automatic.",
  B1: "You are ready to connect ideas in longer sentences and read a wider range of texts. If you are preparing for IELTS or TOEFL, this is a good time to begin structured practice.",
  B2: "Your next step is greater accuracy and control. Pay attention to idioms, tone, and formal language, and use focused IELTS, TOEFL, or workplace-English practice.",
  C1: "You are communicating effectively. To move forward, work on precision, natural phrasing, and the level of formality you use in different situations.",
  C2: "Your English is highly advanced. Keep it strong by refining specialist vocabulary in your field and reading or listening to a wide range of demanding material.",
}
