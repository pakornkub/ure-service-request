import { describe, it, expect } from 'vitest'
import {
  formatNumberWithCommas,
  roundNumber,
  sumColumn,
  sumMultipleColumns
} from '../../utils/number'

describe('Number Utility Functions', () => {
  describe('formatNumberWithCommas', () => {
    it('ควรจัดรูปแบบตัวเลขด้วยจุลภาคและทศนิยมที่กำหนด', () => {
      expect(formatNumberWithCommas(1234567.89)).toBe('1,234,567.89')
      expect(formatNumberWithCommas(1234.5678, 3)).toBe('1,234.568')
    })

    it('ควรคืนค่า null เมื่อรับค่า null หรือ undefined', () => {
      expect(formatNumberWithCommas(null)).toBeNull()
      expect(formatNumberWithCommas(undefined)).toBeNull()
    })
  })

  describe('roundNumber', () => {
    it('ควรปัดเศษตัวเลขตามจำนวนทศนิยมที่กำหนด', () => {
      expect(roundNumber(1.2345, 2)).toBe(1.23)
      expect(roundNumber(1.2345, 3)).toBe(1.235)
    })

    it('ควรจัดการกับค่า string ได้', () => {
      expect(roundNumber('1.2345', 2)).toBe(1.23)
    })

    it('ควรคืนค่า 0 เมื่อรับค่า null หรือ undefined', () => {
      expect(roundNumber(null)).toBe(0)
      expect(roundNumber(undefined)).toBe(0)
    })
  })

  describe('sumColumn', () => {
    const testData = [
      { value: 10 },
      { value: 20 },
      { value: 30 }
    ]

    it('ควรรวมค่าในคอลัมน์ที่ระบุ', () => {
      expect(sumColumn(testData, 'value')).toBe(60)
    })

    it('ควรคืนค่า "-" เมื่อผลรวมเป็น 0', () => {
      expect(sumColumn([], 'value')).toBe('-')
    })

    it('ควรปัดเศษผลลัพธ์ตามจำนวนทศนิยมที่กำหนด', () => {
      const dataWithDecimals = [
        { value: 1.1 },
        { value: 2.2 },
        { value: 3.3 }
      ]
      expect(sumColumn(dataWithDecimals, 'value', 1)).toBe(6.6)
    })
  })

  describe('sumMultipleColumns', () => {
    const testData = [
      { a: 1, b: 2, c: 3 },
      { a: 4, b: 5, c: 6 },
      { a: 7, b: 8, c: 9 }
    ]

    it('ควรรวมค่าในหลายคอลัมน์พร้อมกัน', () => {
      const result = sumMultipleColumns(testData)
      expect(result).toEqual({ a: 12, b: 15, c: 18 })
    })

    it('ควรจัดการกับค่าที่ไม่ใช่ตัวเลขได้', () => {
      const dataWithNonNumbers: Record<string, number | string>[] = [
        { a: 1, b: '2', c: 3 },
        { a: '4', b: 5, c: '6' },
        { a: 7, b: '8', c: 9 }
      ]
      const result = sumMultipleColumns(dataWithNonNumbers)
      expect(result).toEqual({ a: 12, b: 15, c: 18 })
    })

    it('ควรคืนค่าเป็นออบเจ็กต์ว่างเมื่อรับอาร์เรย์ว่าง', () => {
      expect(sumMultipleColumns([])).toEqual({})
    })
  })
})
