import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [user, setUser] = useState(null);
  const navigte = useNavigate();

  // el useEffetc se usa para verificar si el usuario ya esta logueado
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) setUser(storedUser);
  }, []);

  const handleLogin = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    navigte('/dashboard');
  }

  const hanldeLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigte('/');
  }

  return (
    <>
      <div>
        <Routes>
        <Route path='/' element={<Login onLogin={handleLogin}/>}/>
        <Route path='/register' element={<Register onLogin={handleLogin}/>}/>
        <Route path='/dashboard' element={<Dashboard user={user} onLogout={hanldeLogout}/>}/>
        </Routes>
      </div>
      
    </>
  )
}

export default App