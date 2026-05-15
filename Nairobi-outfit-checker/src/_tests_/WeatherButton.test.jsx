import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import WeatherButton from '../components/WeatherButton'

afterEach(cleanup)

describe('WeatherButton', () => {
  it('renders the button text', () => {
    render(<WeatherButton onClick={() => {}} loading={false} />)
    expect(screen.getByText('Check Nairobi Weather')).toBeTruthy()
  })

  it('shows Loading... when loading is true', () => {
    render(<WeatherButton onClick={() => {}} loading={true} />)
    expect(screen.getByText('Loading...')).toBeTruthy()
  })

  it('is disabled when loading', () => {
    render(<WeatherButton onClick={() => {}} loading={true} />)
    expect(screen.getByRole('button').disabled).toBe(true)
  })

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup()
    let clicked = false
    render(<WeatherButton onClick={() => { clicked = true }} loading={false} />)
    await user.click(screen.getByRole('button'))
    expect(clicked).toBe(true)
  })
})
