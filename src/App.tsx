import { Routes, Route } from 'react-router-dom';
import './App.css';
import Auth from './Auth';
import { AuthProvider } from './context/AuthContext';
import Login from './login';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Auth />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
