import React from 'react';
import { useNavigate } from 'react-router-dom';

function IMCPage({ imc }) {
    const navigate = useNavigate();

    const handleRecommendations = () => {
        navigate('/login'); // Redirige a la página de inicio de sesión directamente
    };

    return (
        <div className='imc'>
            <h1>Tu Índice de Masa Corporal (IMC) es: {imc}</h1>
            <button onClick={handleRecommendations}>
                Obtener Recomendaciones
            </button>
        </div>
    );
}

export default IMCPage;
