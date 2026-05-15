import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import HistoryCard from '../components/HistoryCard'

afterEach(cleanup)

const mockItem = {
  id: 'abc123',
  neighbourhood: 'Karen',
  date: 'Monday, 13 May 2026',
  tempHigh: 26,
  tempLow: 17,
  isRainy: false,
  time: '13/05/2026, 09:00:00'
}

describe('HistoryCard', () => {
  it('renders neighbourhood name', () => {
    render(<HistoryCard item={mockItem} />)
    expect(screen.getByText('Karen')).toBeTruthy()
  })

  it('renders high temp', () => {
    render(<HistoryCard item={mockItem} />)
    expect(screen.getByText('26°C')).toBeTruthy()
  })

  it('renders low temp', () => {
    render(<HistoryCard item={mockItem} />)
    expect(screen.getByText(/17°C/)).toBeTruthy()
  })

  it('does not show rain tag when not rainy', () => {
    render(<HistoryCard item={mockItem} />)
    expect(screen.queryByText('Rain')).toBeNull()
  })

  it('shows rain tag when isRainy is true', () => {
    render(<HistoryCard item={{ ...mockItem, isRainy: true }} />)
    expect(screen.getByText('Rain')).toBeTruthy()
  })
})
