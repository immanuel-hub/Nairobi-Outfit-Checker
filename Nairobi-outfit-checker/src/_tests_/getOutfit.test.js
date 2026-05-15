import { describe, it, expect } from 'vitest'
import { getOutfit, getTimeOfDay } from '../pages/Home'

describe('getOutfit', () => {
  it('returns hot outfit at 30 degrees and above', () => {
    const result = getOutfit(32, 0, 0, 14)
    expect(result.top).toBe('T-shirt')
    expect(result.bottom).toBe('Shorts')
  })

  it('returns warm outfit between 25 and 29 degrees', () => {
    const result = getOutfit(27, 0, 0, 14)
    expect(result.top).toBe('Light T-shirt')
    expect(result.bottom).toBe('Jeans or chinos')
  })

  it('returns mild outfit between 20 and 24 degrees in afternoon', () => {
    const result = getOutfit(22, 0, 0, 14)
    expect(result.top).toBe('Long sleeve shirt')
    expect(result.bottom).toBe('Jeans')
  })

  it('returns cold outfit below 20 degrees', () => {
    const result = getOutfit(15, 0, 0, 14)
    expect(result.top).toBe('Sweater or hoodie')
    expect(result.bottom).toBe('Warm trousers')
  })

  it('flags isRainy when rain is 50 percent or more', () => {
    const result = getOutfit(25, 60, 0, 14)
    expect(result.isRainy).toBe(true)
  })

  it('does not flag isRainy when rain is below 50 percent', () => {
    const result = getOutfit(25, 30, 0, 14)
    expect(result.isRainy).toBe(false)
  })

  it('includes umbrella in extras when rainy', () => {
    const result = getOutfit(27, 70, 0, 14)
    expect(result.extras).toContain('Umbrella')
  })

  it('suggests jacket in morning for mild temp', () => {
    const result = getOutfit(22, 0, 0, 7)
    expect(result.top).toBe('Light jacket')
  })
})

describe('getTimeOfDay', () => {
  it('returns Morning for hour 7', () => {
    expect(getTimeOfDay(7)).toBe('Morning')
  })

  it('returns Afternoon for hour 14', () => {
    expect(getTimeOfDay(14)).toBe('Afternoon')
  })

  it('returns Evening for hour 19', () => {
    expect(getTimeOfDay(19)).toBe('Evening')
  })

  it('returns Night for hour 2', () => {
    expect(getTimeOfDay(2)).toBe('Night')
  })
})
