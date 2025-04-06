import { isFileData } from './file'

export const serializeData = (data: any): any => {
  if (typeof data !== 'object') {
    return data
  }
  if (isFileData(data)) {
    return data[0]
  }
  return JSON.stringify(data)
}

export const removeDuplicateObjects = <T>(array: T[], ...keys: (keyof T)[]): T[] => {
  return array.filter((obj, index) => array.findIndex((item) => keys.every((key) => item[key] === obj[key])) === index)
}

export const removeDuplicates = <T>(array: T[]): T[] => {
  return Array.from(new Set(array))
}

export const groupBy = <T>(array: T[], key: keyof T): Record<string, T[]> => {
  return array.reduce((result, item) => {
    const groupKey = String(item[key])
    if (!result[groupKey]) {
      result[groupKey] = []
    }
    result[groupKey].push(item)
    return result
  }, {} as Record<string, T[]>)
}

export const sortBy = <T>(array: T[], key: keyof T, order: 'asc' | 'desc' = 'asc'): T[] => {
  return [...array].sort((a, b) => {
    if (a[key] < b[key]) return order === 'asc' ? -1 : 1
    if (a[key] > b[key]) return order === 'asc' ? 1 : -1
    return 0
  })
}
