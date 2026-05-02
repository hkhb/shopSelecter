import { validateShop, sanitizeShop } from '../../app/utils/validateShop'

describe('validateShop', () => {
  it('validates correct input', () => {
    const input = {
      name: 'ラーメン太郎',
      category: 'restaurant',
      subCategory: 'noodle',
      count: 10,
    }
    const { isValid, errors } = validateShop(input)
    expect(isValid).toBe(true)
    expect(errors).toEqual({})
  })

  it('returns error for empty name', () => {
    const input = { name: '', category: 'restaurant', subCategory: 'noodle', count: 10 }
    const { isValid, errors } = validateShop(input)
    expect(isValid).toBe(false)
    expect(errors.name).toBe('店名は必須です')
  })

  it('returns error for empty category', () => {
    const input = { name: 'ラーメン太郎', category: '', subCategory: 'noodle', count: 10 }
    const { isValid, errors } = validateShop(input)
    expect(isValid).toBe(false)
    expect(errors.category).toBe('カテゴリーは必須です')
  })

  it('returns ok for empty subCategory (optional)', () => {
    const input = { name: 'ラーメン太郎', category: 'restaurant', subCategory: '', count: 10 }
    const { isValid, errors } = validateShop(input)
    expect(isValid).toBe(true)
    expect(errors).toEqual({})
  })

  it('returns error for empty count (required)', () => {
    const input = { name: 'ラーメン太郎', category: 'restaurant', subCategory: 'noodle', count: undefined }
    const { isValid, errors } = validateShop(input)
    expect(isValid).toBe(false)
    expect(errors.count).toBe('回数は必須です')
  })

  it('returns errors for empty all required fields', () => {
    const input = { name: '', category: '', subCategory: '', count: undefined }
    const { isValid, errors } = validateShop(input)
    expect(isValid).toBe(false)
    expect(errors.name).toBe('店名は必須です')
    expect(errors.category).toBe('カテゴリーは必須です')
    expect(errors.count).toBe('回数は必須です')
  })

  // 最大文字数（境界値）
  it('name at max length is ok (50)', () => {
    const input = { name: 'あ'.repeat(50), category: 'restaurant', subCategory: 'noodle', count: 1 }
    const { isValid, errors } = validateShop(input)
    expect(isValid).toBe(true)
    expect(errors).toEqual({})
  })

  it('returns error for name exceeding max length (51)', () => {
    const input = { name: 'あ'.repeat(51), category: 'restaurant', subCategory: 'noodle', count: 1 }
    const { isValid, errors } = validateShop(input)
    expect(isValid).toBe(false)
    expect(errors.name).toBe('店名は最大50文字までです')
  })

  it('category at max length is ok (30)', () => {
    const input = { name: 'ラーメン太郎', category: 'あ'.repeat(30), subCategory: 'noodle', count: 1 }
    const { isValid, errors } = validateShop(input)
    expect(isValid).toBe(true)
    expect(errors).toEqual({})
  })

  it('returns error for category exceeding max length (31)', () => {
    const input = { name: 'ラーメン太郎', category: 'あ'.repeat(31), subCategory: 'noodle', count: 1 }
    const { isValid, errors } = validateShop(input)
    expect(isValid).toBe(false)
    expect(errors.category).toBe('カテゴリーは最大30文字までです')
  })

  it('subCategory at max length is ok (30) when provided', () => {
    const input = { name: 'ラーメン太郎', category: 'restaurant', subCategory: 'あ'.repeat(30), count: 1 }
    const { isValid, errors } = validateShop(input)
    expect(isValid).toBe(true)
    expect(errors).toEqual({})
  })

  it('returns error for subCategory exceeding max length (31) when provided', () => {
    const input = { name: 'ラーメン太郎', category: 'restaurant', subCategory: 'あ'.repeat(31), count: 1 }
    const { isValid, errors } = validateShop(input)
    expect(isValid).toBe(false)
    expect(errors.subCategory).toBe('サブカテゴリーは最大30文字までです')
  })

  // 使用できない文字
  it('returns error for invalid characters in name', () => {
    const input = { name: 'Invalid@Name', category: 'restaurant', count: 1 }
    const { isValid, errors } = validateShop(input)
    expect(isValid).toBe(false)
    expect(errors.name).toBe('店名に使用できない文字が含まれています')
  })

  it('returns error for invalid characters in category', () => {
    const input = { name: 'ラーメン太郎', category: 'restaurant@', count: 1 }
    const { isValid, errors } = validateShop(input)
    expect(isValid).toBe(false)
    expect(errors.category).toBe('カテゴリーに使用できない文字が含まれています')
  })

  it('returns error for invalid characters in subCategory when provided', () => {
    const input = { name: 'ラーメン太郎', category: 'restaurant', subCategory: 'noodle@', count: 1 }
    const { isValid, errors } = validateShop(input)
    expect(isValid).toBe(false)
    expect(errors.subCategory).toBe('サブカテゴリーに使用できない文字が含まれています')
  })
})

describe('validateShop - count validation', () => {
  it('returns error for undefined count', () => {
    const input = { name: 'ラーメン太郎', category: 'restaurant', count: undefined }
    const { isValid, errors } = validateShop(input)
    expect(isValid).toBe(false)
    expect(errors.count).toBe('回数は必須です')
  })

  it('returns error for null count', () => {
    const input = { name: 'ラーメン太郎', category: 'restaurant', count: null }
    const { isValid, errors } = validateShop(input)
    expect(isValid).toBe(false)
    expect(errors.count).toBe('回数は必須です')
  })

  it('returns error for non-integer count', () => {
    const input = { name: 'ラーメン太郎', category: 'restaurant', count: 1.5 }
    const { isValid, errors } = validateShop(input)
    expect(isValid).toBe(false)
    expect(errors.count).toBe('回数は整数で入力してください')
  })

  it('returns error for negative count', () => {
    const input = { name: 'ラーメン太郎', category: 'restaurant', count: -1 }
    const { isValid, errors } = validateShop(input)
    expect(isValid).toBe(false)
    expect(errors.count).toBe('回数は0以上で入力してください')
  })

  it('returns error for count exceeding maximum', () => {
    const input = { name: 'ラーメン太郎', category: 'restaurant', count: 1000 }
    const { isValid, errors } = validateShop(input)
    expect(isValid).toBe(false)
    expect(errors.count).toBe('回数は最大999までです')
  })

  it('validates correct count', () => {
    const input = { name: 'ラーメン太郎', category: 'restaurant', count: 10 }
    const { isValid, errors } = validateShop(input)
    expect(isValid).toBe(true)
    expect(errors).toEqual({})
  })
})

describe('sanitizeShop', () => {
  it('sanitizes input by trimming whitespace and normalizing empty values', () => {
    const input = { name: ' ラーメン太郎 ', category: ' restaurant ' }
    const sanitized = sanitizeShop(input)

    expect(sanitized).toEqual({
      name: 'ラーメン太郎',
      category: 'restaurant',
      subCategory: undefined,
      count: undefined,
    })
  })
})