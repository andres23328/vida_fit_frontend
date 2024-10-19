const calcularCaloriasQuemadas = (usuario) => {
    // Lógica simplificada para calcular calorías quemadas
    const MET = obtenerMET(usuario.nivel_actividad); // Convertir el nivel de actividad a MET
    const caloriasPorHora = MET * 70; // Ejemplo: 70 kg es el peso promedio
    const horasEjercitadas = usuario.frecuencia_ejercicios; // Frecuencia de ejercicios por semana
    return caloriasPorHora * horasEjercitadas;
};

const obtenerMET = (nivel_actividad) => {
    switch (nivel_actividad) {
        case 'Bajo':
            return 3.5; // MET para bajo
        case 'Moderado':
            return 6; // MET para moderado
        case 'Alto':
            return 8; // MET para alto
        default:
            return 1; // Sedentario
    }
};


// src/components/Estadisticas.js
import React, { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import axios from 'axios';

const Estadisticas = ({ userId }) => {
    const [estadisticas, setEstadisticas] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEstadisticas = async () => {
            try {
                const response = await axios.get(`/api/estadisticas/${userId}`);
                setEstadisticas(response.data);
            } catch (error) {
                console.error('Error al obtener estadísticas:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEstadisticas();
    }, [userId]);

    if (loading) {
        return <div>Cargando estadísticas...</div>;
    }

    if (!estadisticas) {
        return <div>No se encontraron estadísticas.</div>;
    }

    const { imc, calorias_quemadas, progreso_peso } = estadisticas;

    // Datos para el gráfico de IMC
    const imcData = {
        labels: ['IMC'],
        datasets: [
            {
                label: 'IMC',
                data: [imc],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
            },
        ],
    };

    // Datos para el gráfico de calorías quemadas
    const caloriasData = {
        labels: ['Calorías Quemadas'],
        datasets: [
            {
                label: 'Calorías',
                data: [calorias_quemadas],
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 2,
            },
        ],
    };

    // Datos para el gráfico de progreso de peso
    const progresoPesoData = {
        labels: Array.from({ length: progreso_peso.length }, (_, i) => `Semana ${i + 1}`),
        datasets: [
            {
                label: 'Progreso de Peso',
                data: progreso_peso,
                fill: false,
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 2,
                tension: 0.1,
            },
        ],
    };

    return (
        <div className="estadisticas-container">
            <h2>Estadísticas del Usuario</h2>
            <div className="chart">
                <h3>IMC</h3>
                <Bar data={imcData} options={{ responsive: true }} />
            </div>
            <div className="chart">
                <h3>Calorías Quemadas</h3>
                <Bar data={caloriasData} options={{ responsive: true }} />
            </div>
            <div className="chart">
                <h3>Progreso de Peso</h3>
                <Line data={progresoPesoData} options={{ responsive: true }} />
            </div>
        </div>
    );
};

export default Estadisticas;
