export const blobToFile = (blob: Blob, fileName: string): File => {
  return new File([blob], fileName, {
    lastModified: Date.now(),
    type: blob.type,
  })
}

export const urlToFile = async (url: string, fileName: string): Promise<File> => {
  const response = await fetch(url)
  const blob = await response.blob()
  return blobToFile(blob, fileName)
}

export const urlToText = async (url: string): Promise<string> => {
  const response = await fetch(url)
  return response.text()
}

export const isFileData = (data: unknown): boolean => {
  return Array.isArray(data) && data[0] instanceof File
}

export const downloadBlob = (blob: Blob, fileName: string): void => {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = fileName
  link.click()
  URL.revokeObjectURL(url)
}
