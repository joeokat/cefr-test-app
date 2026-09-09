import { jsPDF } from 'jspdf'
import { CEFR_ORDER, CEFR_DESCRIPTIONS, CEFR_RECOMMENDATIONS } from '../data/questions'

const CATEGORY_LABELS = {
  grammar: 'Grammar',
  vocabulary: 'Vocabulary',
  reading: 'Reading comprehension',
  listening: 'Listening',
  pronunciation: 'Phonetic awareness',
}

const LEVEL_NAMES = {
  A1: 'Beginner',
  A2: 'Elementary',
  B1: 'Intermediate',
  B2: 'Upper Intermediate',
  C1: 'Advanced',
  C2: 'Proficient',
}

const MARGIN_X = 56
const PAGE_BOTTOM = 780
const teal = [47, 93, 80]
const ink = [32, 36, 43]
const grey = [110, 110, 110]
const green = [47, 122, 82]
const clay = [176, 71, 46]

/**
 * Builds the detailed report as a PDF and triggers a browser download.
 * `result` is the object produced by useTestStore().calculateResult().
 */
export function downloadDetailedReport(result) {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' })
  let y = 64

  function ensureSpace(neededHeight) {
    if (y + neededHeight > PAGE_BOTTOM) {
      doc.addPage()
      y = 64
    }
  }

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(20)
  doc.setTextColor(...teal)
  doc.text('Your English Level Report', MARGIN_X, y)
  y += 34

  doc.setFontSize(32)
  doc.setTextColor(...ink)
  doc.text(`${result.level} — ${LEVEL_NAMES[result.level]}`, MARGIN_X, y)
  y += 26

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(11)
  doc.setTextColor(...grey)
  const description = doc.splitTextToSize(CEFR_DESCRIPTIONS[result.level], 480)
  doc.text(description, MARGIN_X, y)
  y += description.length * 14 + 20

  // Band-by-band breakdown
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(13)
  doc.setTextColor(...ink)
  doc.text('Performance by CEFR band', MARGIN_X, y)
  y += 20

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(11)
  for (const band of CEFR_ORDER) {
    const stats = result.bandStats[band]
    const pct = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : null
    const line = pct === null
      ? `${band}: no questions at this level`
      : `${band}: ${stats.correct}/${stats.total} correct (${pct}%)`
    doc.setTextColor(...(band === result.level ? teal : grey))
    doc.text(line, MARGIN_X, y)
    y += 16
  }
  y += 14

  // Category breakdown
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(13)
  doc.setTextColor(...ink)
  doc.text('Performance by skill area', MARGIN_X, y)
  y += 20

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(11)
  for (const [cat, label] of Object.entries(CATEGORY_LABELS)) {
    const stats = result.categoryStats[cat]
    if (!stats || stats.total === 0) continue
    const pct = Math.round((stats.correct / stats.total) * 100)
    doc.setTextColor(...(cat === result.weakestCategory ? clay : grey))
    doc.text(`${label}: ${stats.correct}/${stats.total} correct (${pct}%)`, MARGIN_X, y)
    y += 16
  }
  y += 14

  // Recommendation
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(13)
  doc.setTextColor(...ink)
  doc.text('What to do next', MARGIN_X, y)
  y += 20

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(11)
  doc.setTextColor(...grey)
  const recommendation = doc.splitTextToSize(CEFR_RECOMMENDATIONS[result.level], 480)
  doc.text(recommendation, MARGIN_X, y)
  y += recommendation.length * 14 + 30

  // Question-by-question review
  doc.addPage()
  y = 64
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(16)
  doc.setTextColor(...teal)
  doc.text('Question-by-question review', MARGIN_X, y)
  y += 30

  result.review.forEach((item, index) => {
    const promptLines = doc.splitTextToSize(`${index + 1}. ${item.prompt}`, 480)
    const explanationLines = item.explanation ? doc.splitTextToSize(item.explanation, 470) : []
    const blockHeight = 16 + promptLines.length * 14 + 16 + (item.isCorrect ? 0 : 16) + explanationLines.length * 13 + 18
    ensureSpace(blockHeight)

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(11)
    doc.setTextColor(...ink)
    doc.text(promptLines, MARGIN_X, y)
    y += promptLines.length * 14 + 4

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    if (item.isCorrect) {
      doc.setTextColor(...green)
      doc.text(`\u2713 Your answer: ${item.selected ?? '(skipped)'} — correct`, MARGIN_X, y)
      y += 16
    } else {
      doc.setTextColor(...clay)
      doc.text(`\u2717 Your answer: ${item.selected ?? '(skipped)'}`, MARGIN_X, y)
      y += 14
      doc.setTextColor(...green)
      doc.text(`Correct answer: ${item.correctAnswer}`, MARGIN_X, y)
      y += 16
    }

    if (explanationLines.length) {
      doc.setFont('helvetica', 'italic')
      doc.setFontSize(9.5)
      doc.setTextColor(...grey)
      doc.text(explanationLines, MARGIN_X, y)
      y += explanationLines.length * 13
    }

    y += 18
  })

  // Footer note on the last page
  ensureSpace(30)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.setTextColor(160, 160, 160)
  doc.text('This is a self-assessment, not a certified exam result.', MARGIN_X, PAGE_BOTTOM)

  doc.save(`english-level-report-${result.level}.pdf`)
}
