import '@testing-library/jest-dom'
import { vi } from 'vitest'

vi.mock('../firebase', () => ({
  db: {},
  auth: {},
  googleProvider: {}
}))
