export const formatNumberWithCommas = (num: number | null | undefined, decimalPlaces: number = 2): string | null => {
  if (num == null) return null
  return num.toLocaleString('en', { minimumFractionDigits: decimalPlaces, maximumFractionDigits: decimalPlaces })
}

export const roundNumber = (num: number | string | null | undefined, decimalPlaces: number = 2): number => {
  if (num == null) return 0
  const factor = Math.pow(10, decimalPlaces)
  return Math.round(parseFloat(num.toString()) * factor) / factor
}

export const sumColumn = (rows: Record<string, number | string>[], columnName: string, decimalPlaces: number = 2): number | string => {
  const total = rows.reduce((sum, row) => sum + (parseFloat(row[columnName]?.toString() || '0') || 0), 0)
  return total ? roundNumber(total, decimalPlaces) : '-'
}

export const sumMultipleColumns = (array: Record<string, number | string>[]): Record<string, number | string> => {
  return array.reduce((totals, currentRow) => {
    Object.entries(currentRow).forEach(([key, value]) => {
      totals[key] = (parseFloat(totals[key]?.toString() || '0') || 0) + (parseFloat(value.toString() || '0') || 0)
    })
    return totals
  }, {} as Record<string, number>)
}
