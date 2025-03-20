
import './App.css'
import Auth from './Auth'
import { AuthProvider } from './context/AuthContext'

function App() {

  return (
    <AuthProvider>
    < Auth />
  </AuthProvider>
  )
}

export default App
