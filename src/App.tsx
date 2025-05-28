import { HashRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Auth from './components/HomePage/Auth';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Login and Register/login';
import Register from './components/Login and Register/register';
import NavigationMenu from './components/NavigationMenu';
import WorksheetPage from './components/WorkSheet/WorksheetPage';
import CategoriesDisplay from './components/Categories/catecories';
import FileUpload from './components/uploadFile/FileUpload';
import AiImageModal from './components/AiImageModal';
import { FavoriteProvider } from './context/FavoriteContext';
import FavoriteWorksheets from './components/WorkSheet/FavoriteWorksheets';

function App() {
  return (
    <AuthProvider>
      <FavoriteProvider>
        <HashRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<NavigationMenu />} />
            <Route path="/categories" element={<CategoriesDisplay />} />
            <Route path="/my-paintings" element={<WorksheetPage />} />
            <Route path="/upload-painting" element={<FileUpload />} />
            <Route path="/ai-creation" element={<AiImageModal />} />
            <Route path="/favorites" element={<FavoriteWorksheets />} />
            <Route path="/worksheets/:categoryId" element={<WorksheetPage />} />
            <Route path="/" element={<Auth />} />
          </Routes>
        </HashRouter>
      </FavoriteProvider>
    </AuthProvider>
  );
}

export default App;
