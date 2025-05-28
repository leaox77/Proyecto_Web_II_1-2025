import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import './App.css'
import video from "./Video/bg.mp4"


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
      <div className='main'>
          <video loop muted autoPlay>
              <source  src={video} type='video/mp4'/>
          </video>
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
