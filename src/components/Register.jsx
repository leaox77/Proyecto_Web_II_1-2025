import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register({ onLogin }) {
    const [form, setForm] = useState({ username: '', password: '', name: '' });
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validaciones
        if (!form.username || !form.password || !form.name) {
            alert("Todos los campos son obligatorios");
            return;
        }

        // Verificar si ya existe el usuario
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const exists = users.find(u => u.username === form.username);

        if (exists) {
            alert("El nombre de usuario ya está registrado");
            return;
        }

        // Guardar nuevo usuario
        users.push(form);
        localStorage.setItem('users', JSON.stringify(users));
        alert("Registro exitoso");

        // Login automático y redirección
        localStorage.setItem('user', JSON.stringify(form));
        onLogin(form);
        navigate('/dashboard');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Registro</h2>
            <input type="text" placeholder="Nombre completo" onChange={e => setForm({ ...form, name: e.target.value })} />
            <input type="text" placeholder="Nombre de usuario" onChange={e => setForm({ ...form, username: e.target.value })} />
            <input type="password" placeholder="Contraseña" onChange={e => setForm({ ...form, password: e.target.value })} />
            <button type="submit">Registrarse</button>
        </form>
    );
}