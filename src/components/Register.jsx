/*export default function Register({ onLogin }) {
    return <div>hola</div>
}*/

import React, { useState, useEffect } from "react";
//import "./Register.css"; 

const colors = {
  primary: "#CCFFCC",
  secondary: "#003300",
  accent: "#00CC00",
  highlight: "#00FF00",
  background: "#006600",
};

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    username: "",
    password: ""
  });

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("users");
    if (stored) {
      setUsers(JSON.parse(stored));
    }
  }, []);

  const handleRegister = (e) => {
    e.preventDefault();

    const exists = users.find((u) => u.username === form.username);
    if (exists) {
      alert("Ese nombre de usuario ya está en uso.");
      return;
    }

    const newUsers = [...users, form];
    setUsers(newUsers);
    localStorage.setItem("users", JSON.stringify(newUsers));
    alert("Registro exitoso!");

    setForm({ name: "", username: "", password: "" });
  };

  return (
    <>
    <form onSubmit={handleRegister} style={{ backgroundColor: colors.background, padding: '2rem' }}>
      <h2 style={{ color: colors.primary}}>Registro</h2>
      <input style={{ backgroundColor: colors.secondary, color: 'white'}}
        type="text"
        placeholder="Nombre completo"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />
      <input style={{ backgroundColor: colors.secondary, color: 'white'}}
        type="text"
        placeholder="Nombre de usuario"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
        required
      />
      <input style={{ backgroundColor: colors.secondary, color: 'white'}}
        type="password"
        placeholder="Contraseña"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        required
      />
      <button type="submit" style={{ backgroundColor: colors.highlight, color: 'black' }}>Registrarse</button>
    </form>

     <button onClick={() => navigate('/')} style={{ backgroundColor: colors.accent, color: 'black'}}>Volver</button>

    </>
  );
}
