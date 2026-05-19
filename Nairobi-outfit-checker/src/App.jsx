
import { Routes, Route } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import Login from './pages/login'
import './App.css'

function AppContent() {
  const { user } = useAuth()

  if (!user) {
    return <Login />
  }

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/"      element={<Home />}  />
        {/* About page route - shows app information */}
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
