export function getPreview(content: string, wordCount = 12): string {
  const words = content.trim().split(/\s+/)
  if (words.length <= wordCount) return content
  return words.slice(0, wordCount).join(' ') + '...'
}

export function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
