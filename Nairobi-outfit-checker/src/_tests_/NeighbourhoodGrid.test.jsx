import { describe, it, expect, afterEach, vi } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NeighbourhoodGrid from '../components/NeighbourhoodGrid'

afterEach(cleanup)

describe('NeighbourhoodGrid', () => {
  it('renders all 8 neighbourhoods', () => {
    render(<NeighbourhoodGrid onSelect={() => {}} loadingArea={null} selected={null} />)
    expect(screen.getByText('CBD')).toBeTruthy()
    expect(screen.getByText('Westlands')).toBeTruthy()
    expect(screen.getAllByText('Karen').length).toBeGreaterThan(0)
    expect(screen.getByText('Eastlands')).toBeTruthy()
    expect(screen.getByText('Kasarani')).toBeTruthy()
    expect(screen.getByText('Kilimani')).toBeTruthy()
    expect(screen.getByText('Langata')).toBeTruthy()
    expect(screen.getByText('Thika Road')).toBeTruthy()
  })

  it('calls onSelect with correct neighbourhood when clicked', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    render(<NeighbourhoodGrid onSelect={onSelect} loadingArea={null} selected={null} />)
    await user.click(screen.getAllByText('Karen')[0])
    expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ name: 'Karen' }))
  })

  it('only disables the loading neighbourhood button', () => {
    render(<NeighbourhoodGrid onSelect={() => {}} loadingArea="CBD" selected="CBD" />)
    const buttons = screen.getAllByRole('button')
    const disabledButtons = buttons.filter(btn => btn.disabled)
    expect(disabledButtons.length).toBe(1)
  })

  it('marks selected neighbourhood as active', () => {
    render(<NeighbourhoodGrid onSelect={() => {}} loadingArea={null} selected="Westlands" />)
    const buttons = screen.getAllByRole('button')
    const active = buttons.find(btn => btn.classList.contains('active'))
    expect(active).toBeTruthy()
  })
})
