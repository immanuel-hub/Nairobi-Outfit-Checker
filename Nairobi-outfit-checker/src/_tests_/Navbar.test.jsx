import { describe, it, expect, afterEach, vi } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Navbar from '../components/Navbar'

vi.mock('../contexts/AuthContext', () => ({
  useAuth: () => ({ user: { displayName: 'Test', photoURL: null }, logOut: vi.fn() })
}))

afterEach(cleanup)

describe('Navbar', () => {
  it('renders the app title', () => {
    render(<MemoryRouter><Navbar /></MemoryRouter>)
    expect(screen.getByText('Nairobi Outfit Checker')).toBeTruthy()
  })

  it('renders the Home link', () => {
    render(<MemoryRouter><Navbar /></MemoryRouter>)
    expect(screen.getByText('Home')).toBeTruthy()
  })

  it('renders the About link', () => {
    render(<MemoryRouter><Navbar /></MemoryRouter>)
    expect(screen.getByText('About')).toBeTruthy()
  })
})
