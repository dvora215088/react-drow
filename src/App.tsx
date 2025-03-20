import { Routes, Route } from 'react-router-dom';
import './App.css';
import Auth from './Auth';
import { AuthProvider } from './context/AuthContext';
import Login from './login';
import Register from './register';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/" element={<Auth />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
