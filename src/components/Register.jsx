import { useState } from "react";
import styles from "./../Css/Register.module.css"
import { Link } from "react-router-dom";

export default function Register({onLogin}) {
    const colors = {
        primary: "#f51",
        secondary: "#232528",
        inputs:"#EAF6FF",
        background: "#fefae0",
    };

    const [form,setForm] = useState({
        username: "",
        password: "",
        name: "",
        email: "",
    });

    const [error,setError] = useState("");

    const handleChange = (e) =>{
        setForm(
            {
                ...form,
                [e.target.name]: e.target.value,

            }
        );
    };

    const handleSubmit = (e) =>{
        e.preventDefault();
        setError("");

        const { username , password, name ,email } = form;
        if(!username || !password || !name || !email){
            setError("Todos los campos son obligatorios");
            return;
        }

        const emailValidar = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailValidar.test(email)){
            setError("El correo electrónico no es válido");
            return;
        }

        const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
        const userExists = storedUsers.some((user) => user.username.toLowerCase() === username.toLowerCase());

        if(userExists){
            setError("El nombre de usuario ya está registrado");
            return;
        }

        const newUsers = [...storedUsers, form];
        localStorage.setItem("users", JSON.stringify(newUsers));

        if(onLogin) onLogin(form);
}
    return (
        <div className={styles.container}>
            <form style={{ bacgkround: colors.background  }} onSubmit={handleSubmit} >
            <h2>Register</h2>
                    <label style={{color:colors.primary}}>Full Name<input value={form.name} name="name" type="text" style={{color:colors.inputs}} onChange={handleChange}/></label>
                    <label style={{color:colors.primary}}>Email<input value={form.email} name="email"  type="email" style={{color:colors.inputs}} onChange={handleChange}/></label>
                    <label style={{color:colors.primary}}>Username<input value={form.username} name="username" type="text" style={{color:colors.inputs}} onChange={handleChange} /></label>
                    <label style={{color:colors.primary}}>Password<input value={form.password} name="password" type="password"  style={{color:colors.inputs}} onChange={handleChange}/></label>
                    
                    {error &&  <p style={{ color:"red" }}>{error}</p> }

                    <button type="submit" style={{color:colors.secondary}}>Register</button>
                    <p>¿Ya tienes una cuenta? <Link to="/">Inicia Sesion</Link></p>
            </form>
        </div>
    )
}