import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const mockUsers = [
    { username: 'juan', password: '1234', name: 'Juan Perez' },
];

export default function Login({ onLogin }) {
    const [form, setForm] =  useState({ username: '', password: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
/*
        const user = mockUsers.find(u => u.username === form.username && u.password === form.password);
        if (user) {
            onLogin(user);
        }
        else {
            alert('credenciales incorrectas');
        }
        */
        const stored = localStorage.getItem("users");
    const users = stored ? JSON.parse(stored) : [];

    const user = users.find(
      (u) => u.username === form.username && u.password === form.password
    );

    if (user) {
      alert(`Bienvenido, ${user.name}`);
      if (onLogin) onLogin(user); // si se usa autenticación global
    } else {
      alert("Credenciales incorrectas");
    }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Iniciar Sesion</h2>
            <input type="text" placeholder='Nombre de Usuario' onChange={e => setForm({...form, username: e.target.value})} />
            <input type="password" placeholder='Contraseña' onChange={e => setForm({...form, password: e.target.value})}/>
            <button type="submit">Iniciar</button>
            <p>No tienes cuenta? <Link to='/register'>Registrate</Link></p>
        </form>
    );
}