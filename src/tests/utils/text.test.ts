import { describe, it, expect } from 'vitest'
import { capitalizeFirstLetter, toTitleCase } from '../../utils/text'

describe('Text Utility Functions', () => {
  describe('capitalizeFirstLetter', () => {
    it('ควรเปลี่ยนตัวอักษรแรกเป็นตัวพิมพ์ใหญ่', () => {
      expect(capitalizeFirstLetter('hello')).toBe('Hello')
      expect(capitalizeFirstLetter('world')).toBe('World')
    })

    it('ควรคืนค่าสตริงว่างถ้าอินพุตว่าง', () => {
      expect(capitalizeFirstLetter('')).toBe('')
    })

    it('ไม่ควรเปลี่ยนแปลงสตริงที่มีตัวพิมพ์ใหญ่อยู่แล้ว', () => {
      expect(capitalizeFirstLetter('Hello')).toBe('Hello')
    })

    it('ควรเปลี่ยนตัวอักษรที่เหลือเป็นตัวพิมพ์เล็ก', () => {
      expect(capitalizeFirstLetter('hELLO')).toBe('Hello')
    })
  })

  describe('toTitleCase', () => {
    it('ควรเปลี่ยนข้อความให้เป็นรูปแบบ Title Case', () => {
      expect(toTitleCase('hello world')).toBe('Hello World')
      expect(toTitleCase('this is a test')).toBe('This Is A Test')
    })

    it('ควรจัดการกับข้อความที่มีหลายช่องว่างได้', () => {
      expect(toTitleCase('  multiple   spaces   ')).toBe('Multiple Spaces')
    })

    it('ควรคืนค่าสตริงว่างถ้าอินพุตว่าง', () => {
      expect(toTitleCase('')).toBe('')
    })

    it('ควรจัดการกับข้อความที่มีตัวพิมพ์ใหญ่ผสมอยู่แล้ว', () => {
      expect(toTitleCase('miXEd CaSe TeXT')).toBe('Mixed Case Text')
    })
  })
})
