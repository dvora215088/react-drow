import { Routes, Route } from 'react-router-dom';
import './App.css';
import Auth from './Auth';
import { AuthProvider } from './context/AuthContext';
import Login from './login';
import Register from './register';
import NavigationMenu from './dashboard';
import CategoriesDisplay from './catecories';

function App() {
  return (
    <AuthProvider>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<NavigationMenu />} />
        <Route path="/categories" element={<CategoriesDisplay></CategoriesDisplay>} />


        <Route path="/" element={<Auth />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
