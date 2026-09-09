import { defineStore } from 'pinia'
import { buildRandomQuestionSet, CEFR_ORDER } from '../data/questions'

const PASS_THRESHOLD = 0.7 // 70% correct within a level band to "pass" that band

export const useTestStore = defineStore('test', {
  state: () => ({
    questions: [], // populated by reset()/start() with a fresh randomized set
    currentIndex: 0,
    // answers[questionId] = { selected, correct }
    answers: {},
    result: null,
  }),

  getters: {
    total: (state) => state.questions.length,
    currentQuestion: (state) => state.questions[state.currentIndex],
    progress: (state) => state.questions.length
      ? Math.round((state.currentIndex / state.questions.length) * 100)
      : 0,
    isFirst: (state) => state.currentIndex === 0,
    isLast: (state) => state.currentIndex === state.questions.length - 1,
    answeredCurrent: (state) => {
      const q = state.questions[state.currentIndex]
      return q ? state.answers[q.id] !== undefined : false
    },
  },

  actions: {
    answerCurrent(selectedOption) {
      const q = this.questions[this.currentIndex]
      if (!q) return
      this.answers[q.id] = {
        selected: selectedOption,
        correct: selectedOption === q.correctAnswer,
      }
    },

    next() {
      if (this.currentIndex < this.questions.length - 1) {
        this.currentIndex++
      } else {
        this.finish()
      }
    },

    back() {
      if (this.currentIndex > 0) {
        this.currentIndex--
      }
    },

    finish() {
      this.result = this.calculateResult()
    },

    // Starts a brand new session: draws a fresh randomized question set
    // and clears any previous progress. Call this whenever a test begins
    // (including retakes), not just once.
    reset() {
      this.questions = buildRandomQuestionSet()
      this.currentIndex = 0
      this.answers = {}
      this.result = null
    },

    calculateResult() {
      // % correct per CEFR band, across all question types combined
      const bandStats = {}
      for (const level of CEFR_ORDER) bandStats[level] = { correct: 0, total: 0 }

      // wrong-answer tracking per category
      const categoryStats = {}

      // per-question review, for the detailed PDF report
      const review = []

      for (const q of this.questions) {
        const answer = this.answers[q.id]
        const isCorrect = !!answer?.correct

        bandStats[q.level].total++
        if (isCorrect) bandStats[q.level].correct++

        if (!categoryStats[q.category]) {
          categoryStats[q.category] = { correct: 0, total: 0 }
        }
        categoryStats[q.category].total++
        if (isCorrect) categoryStats[q.category].correct++

        review.push({
          id: q.id,
          type: q.type,
          level: q.level,
          category: q.category,
          prompt: q.type === 'ipa' ? q.word : q.question,
          selected: answer?.selected ?? null,
          correctAnswer: q.correctAnswer,
          isCorrect,
          explanation: q.explanation,
        })
      }

      // Walk bands in order; the level is the highest band that still
      // clears the threshold, stopping at the first band that doesn't.
      let level = 'A1'
      for (const band of CEFR_ORDER) {
        const stats = bandStats[band]
        const pct = stats.total > 0 ? stats.correct / stats.total : 0
        if (pct >= PASS_THRESHOLD) {
          level = band
        } else {
          break
        }
      }

      // Weakest category = lowest correct percentage (ties broken by category order below)
      const categoryOrder = ['grammar', 'vocabulary', 'reading', 'listening', 'pronunciation']
      let weakestCategory = null
      let weakestPct = Infinity
      for (const cat of categoryOrder) {
        const stats = categoryStats[cat]
        if (!stats || stats.total === 0) continue
        const pct = stats.correct / stats.total
        if (pct < weakestPct) {
          weakestPct = pct
          weakestCategory = cat
        }
      }

      return {
        level,
        bandStats,
        categoryStats,
        weakestCategory,
        review,
      }
    },
  },
})
