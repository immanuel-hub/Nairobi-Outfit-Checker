import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import WeatherCard from '../components/WeatherCard'

afterEach(cleanup)

const mockWeather = {
  neighbourhood: 'CBD',
  avgTemp: 23,
  top: 'Long sleeve shirt',
  bottom: 'Jeans',
  extras: 'Light jacket for later',
  isRainy: false
}

describe('WeatherCard', () => {
  it('renders neighbourhood name', () => {
    render(<WeatherCard weather={mockWeather} />)
    expect(screen.getByText('CBD')).toBeTruthy()
  })

  it('renders average temperature', () => {
    render(<WeatherCard weather={mockWeather} />)
    expect(screen.getByText('23°C')).toBeTruthy()
  })

  it('renders outfit labels', () => {
    render(<WeatherCard weather={mockWeather} />)
    expect(screen.getByText('Top:')).toBeTruthy()
    expect(screen.getByText('Bottom:')).toBeTruthy()
    expect(screen.getByText('Extras:')).toBeTruthy()
  })

  it('renders outfit values', () => {
    render(<WeatherCard weather={mockWeather} />)
    expect(screen.getByText('Long sleeve shirt')).toBeTruthy()
    expect(screen.getByText('Jeans')).toBeTruthy()
    expect(screen.getByText('Light jacket for later')).toBeTruthy()
  })

  it('does not show rain warning when not rainy', () => {
    render(<WeatherCard weather={mockWeather} />)
    expect(screen.queryByText(/Rain likely/)).toBeNull()
  })

  it('shows rain warning when isRainy is true', () => {
    render(<WeatherCard weather={{ ...mockWeather, isRainy: true }} />)
    expect(screen.getByText('Rain likely - carry umbrella!')).toBeTruthy()
  })
})
