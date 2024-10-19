import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  // Estados para manejar la apertura del menú y la animación de las barras
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuBackground, setMenuBackground] = useState('transparent');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Manejar el evento de scroll para cambiar el fondo del menú
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 12) {
        setMenuBackground('white');
      } else {
        setMenuBackground('transparent');
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Limpiar el evento cuando se desmonta el componente
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Verificar si el usuario ha iniciado sesión cada vez que se monte el componente
  useEffect(() => {
    const token = localStorage.getItem('googleToken') || localStorage.getItem('token');
    const email = localStorage.getItem('email');

    if (token || email) {
      setIsAuthenticated(true);  // El usuario está autenticado si existe un token o email
    } else {
      setIsAuthenticated(false); // No está autenticado si no existe ninguno
    }
  }, []); // Solo se ejecuta una vez al montar el componente (en la recarga también)

  // Función para cerrar sesión
  const handleLogout = () => {
    // Eliminar los datos de autenticación del localStorage
    localStorage.removeItem('googleToken');
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('user');

    // Actualizar el estado de autenticación
    setIsAuthenticated(false);

    // Redirigir al usuario a la página de inicio de sesión
    navigate('/login');
  };

  // Manejar el clic para abrir/cerrar el menú
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header" id="head">
      <div className="container__header">
        <div className="logo">
          <a href="#inicio">
            <img src="/static/images/Logo/vida_fit.jpeg" alt="Logo" />
          </a>
        </div>

        <div
          className={`menu ${menuOpen ? 'mostrar_menu' : ''}`}
          style={{ backgroundColor: menuBackground }}
        >
          <nav>
            <ul>
              <li><a href="/">Inicio</a></li>
              <li>
                <a href="#inicio">Calculadora</a>
                <ul>
                  <li><a href="/form">Formulario</a></li>
                  <li>
                    <a href="/imc">IMC</a>
                    <ul>
                      <li><a href="#">Predicción</a></li>
                      <li><a href="#">Magnético</a></li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li><a href="#">Sesión</a>
                <ul>
                  <li><a href="/login">Iniciar Sesión</a></li>
                  <li><a href="/login">Registrarse</a></li>
                </ul>
              </li>
              <li><a href="#">Contactos</a></li>
            </ul>
          </nav>

          <a href="/grafica" className="btn__quote">Graficas</a>
          {isAuthenticated && (
            <button className="btn__quote" onClick={handleLogout}>Cerrar Sesión</button>
          )}

          <div className="socialMedia">
            <a href="#">
              <img src="../static/images/social media/facebook.png" alt="Facebook" />
            </a>
            <a href="#">
              <img src="../static/images/social media/instagram.png" alt="Instagram" />
            </a>
            <a href="#">
              <img src="../static/images/social media/twitter.png" alt="Twitter" />
            </a>
            <a href="#">
              <img src="../static/images/social media/youtube.png" alt="YouTube" />
            </a>
          </div>
        </div>

        <div className="bars__menu" onClick={toggleMenu}>
          <span className={`line1__bars-menu ${menuOpen ? 'activeline1__bars-menu' : ''}`}></span>
          <span className={`line2__bars-menu ${menuOpen ? 'activeline2__bars-menu' : ''}`}></span>
          <span className={`line3__bars-menu ${menuOpen ? 'activeline3__bars-menu' : ''}`}></span>
        </div>
      </div>
    </header>
  );
};

export default Header;
