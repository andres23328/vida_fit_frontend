import React, { useState, useEffect } from 'react';
import './static/css/estilos.css';
import { useNavigate } from 'react-router-dom';

function Form({ onSubmit }) {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [peso, setPeso] = useState('');
    const [estatura, setEstatura] = useState('');
    const [fecha_nacimiento, setFecha_nacimiento] = useState('');
    const [genero, setGenero] = useState('Masculino'); // Valor por defecto
    const [nivel_actividad, setNivelActividad] = useState('Bajo'); // Valor por defecto
    const [objetivo, setObjetivo] = useState('');
    const [frecuencia_ejercicios, setFrecuenciaEjercicios] = useState('nada');
    const [isAuth, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('googleToken') || localStorage.getItem('token');
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const storedEmail = localStorage.getItem('email');
    
        console.log('Token:', token);
        console.log('Stored User:', storedUser);
        console.log('Stored Email:', storedEmail);
    
        // Establecer el correo si existe en 'user' o en 'email'
        const email = storedUser?.email || storedEmail;
    
        if (token || email) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
            console.log('No autenticado, redirigiendo a login');
            navigate('/login');
        }
    }, [navigate]);
    
    

    // Recuperar el correo de localStorage cuando el componente se monta
    useEffect(() => {
        // Intenta recuperar el correo desde 'user' o 'email'
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const storedEmail = localStorage.getItem('email'); // Obtener directamente del localStorage

        if (storedUser && storedUser.email) {
            setCorreo(storedUser.email);
            if (storedUser.family_name && storedUser.given_name) {
                setNombre(storedUser.given_name);
                setApellido(storedUser.family_name);
            } 
        } else if (storedEmail) {
            setCorreo(storedEmail); // Establece el correo recuperado desde 'email'
        }

        // Verificar si ya se recargó la página
        const hasReloaded = sessionStorage.getItem('hasReloaded');
        if (!hasReloaded) {
            sessionStorage.setItem('hasReloaded', 'true');
            window.location.reload();  // Recargar la página solo una vez
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Nivel de actividad:', nivel_actividad);
        console.log('frecuencia ejercicios:', frecuencia_ejercicios);
        console.log('correo:', correo);
        const userData = { nombre, apellido, correo, peso, estatura, fecha_nacimiento, genero, nivel_actividad, objetivo, frecuencia_ejercicios };
        onSubmit(userData);
    };

    if (!isAuth) return null;


    return (
        <form className='for' onSubmit={handleSubmit}>
            <label htmlFor="nombre">Nombre</label>
            <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
            <label htmlFor="apellido">Apellido</label>
            <input type="text" placeholder="Apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} required />
            <label htmlFor="correo">Correo</label>
            <input 
                type="email" 
                placeholder="Correo" 
                value={correo} 
                readOnly // Hacer que este campo sea de solo lectura
                required 
            />
            <label htmlFor="peso">Peso (kg)</label>
            <input type="number" placeholder="Peso (kg)" value={peso} onChange={(e) => setPeso(e.target.value)} required />
            <label htmlFor="estatura">Estatura (cm)</label>
            <input type="number" placeholder="Estatura (cm)" value={estatura} onChange={(e) => setEstatura(e.target.value)} required />
            <label htmlFor="fecha_nacimiento">Fecha de Nacimiento</label>
            <input type="date" placeholder="Edad" value={fecha_nacimiento} onChange={(e) => setFecha_nacimiento(e.target.value)} required />
            <label htmlFor="genero">Género</label>
            <select value={genero} onChange={(e) => setGenero(e.target.value)}>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="Otro">Otro</option>
            </select>
            <label htmlFor="nivel_actividad">Nivel de Actividad</label>
            <select value={nivel_actividad} onChange={(e) => setNivelActividad(e.target.value)}>
                <option value="Bajo">Bajo</option>
                <option value="Moderado">Moderado</option>
                <option value="Alto">Alto</option>
            </select>
            <label htmlFor="objetivo">Objetivo</label>
            <input type="text" placeholder="Objetivo" value={objetivo} onChange={(e) => setObjetivo(e.target.value)} />
            <label htmlFor="frecuencia_ejercicios">Frecuencia de Ejercicios</label>
            <select value={frecuencia_ejercicios} onChange={(e) => setFrecuenciaEjercicios(e.target.value)}>
                <option value="nada">nada</option>
                <option value="poco ejercicio">poco ejercicio</option>
                <option value="casi siempre">casi siempre</option>
            </select>
            <button type="submit">Registrar</button>
        </form>
    );
}

export default Form;
