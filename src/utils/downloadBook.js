export function downloadBook(book) {
  if (!book.downloadUrl) return false

  const link = document.createElement('a')
  link.href = book.downloadUrl
  link.download = book.downloadName || `${book.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.pdf`
  document.body.appendChild(link)
  link.click()
  link.remove()
  return true
}