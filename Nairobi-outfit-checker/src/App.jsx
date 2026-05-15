// App.jsx
// Root component that sets up the entire application structure
// Handles authentication routing and provides main app layout

// Import React Router for navigation between pages
import { Routes, Route } from 'react-router-dom'
// Import authentication context and hook
import { AuthProvider, useAuth } from './contexts/AuthContext'
// Import all page and component files
import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import Login from './pages/login'
// Import CSS styles for the entire application
import './App.css'

// AppContent component handles the main application logic
// This component is separate from App so it can use the useAuth hook
function AppContent() {
  // Get current user from authentication context
  const { user } = useAuth()

  // If no user is signed in, show login page
  if (!user) {
    return <Login />
  }

  // If user is signed in, show the main application
  return (
    <div>
      {/* Navigation bar shown on all pages */}
      <Navbar />
      {/* React Router setup for different pages */}
      <Routes>
        {/* Home page route - shows weather checker */}
        <Route path="/"      element={<Home />}  />
        {/* About page route - shows app information */}
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  )
}

// Main App component that wraps everything with authentication provider
function App() {
  return (
    // AuthProvider makes authentication state available to all child components
    <AuthProvider>
      {/* AppContent contains the actual app logic */}
      <AppContent />
    </AuthProvider>
  )
}

// Export App component as default export for use in main.jsx
export default App
