import './App.css'
import ProductCard from './components/productCard'
import AdminPage from './pages/admin/adminPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/home/homePage';

function App() {
  

  return (
    <BrowserRouter>
    <Routes path="/">
    <Route path="admin/*" element={<AdminPage/>}/>
    <Route path="/*" element={<HomePage/>}/>
    </Routes>
    </BrowserRouter>
 
  )
}

export default App
