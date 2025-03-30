import { Routes, Route } from 'react-router-dom';
import './App.css';
import Auth from './components/HomePage/Auth';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Login and Register/login';
import Register from './components/Login and Register/register';
import NavigationMenu from './components/NavigationMenu';
import WorksheetPage from './components/WorkSheet/WorksheetPage';
import CategoriesDisplay from './components/Categories/catecories';

function App() {
  return (
    <AuthProvider>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<NavigationMenu />} />
        <Route path="/categories" element={<CategoriesDisplay></CategoriesDisplay>} />
        <Route path="/my-paintings" element={<WorksheetPage/>} />

        <Route 
  path="/worksheets/:categoryId" 
  element={<WorksheetPage />} 
/>

        <Route path="/" element={<Auth />} />
      </Routes>

    </AuthProvider>
  );
}

export default App;
