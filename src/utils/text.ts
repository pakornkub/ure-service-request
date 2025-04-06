export const capitalizeFirstLetter = (text: string): string => {
  if (!text) return ''
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}

export const toTitleCase = (text: string): string => {
  if (!text) return ''
  return text.trim().split(/\s+/)
    .map(word => capitalizeFirstLetter(word))
    .join(' ')
}
