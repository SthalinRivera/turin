import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import { NavBar } from "../../components/NavBar";
import "../../index.css";
import { Footer } from "../../components/Footer/";
import { Link } from "react-router-dom";

export function Portal() {
  const { logout, user } = useAuth();
  const [placeholderText, setPlaceholderText] = useState('');



  const phrases = [
    'Resumir',
    'Aprender',
    'Parafrasear',
    'Estudiar',
    // Agrega más frases aquí según sea necesario
  ];
  const inputRef = useRef(null);

  useEffect(() => {
    const animateText = (text, index) => {
      if (index < text.length) {
        setTimeout(() => {
          setPlaceholderText(prevText => prevText + text[index]);
          animateText(text, index + 1);
        }, 200); // Ajusta la velocidad de escritura aquí
      } else {
        setTimeout(() => {
          setPlaceholderText('');
          setTimeout(() => {
            startNewAnimation();
          }, 1000); // Espera 1 segundo antes de comenzar la próxima oración
        }, 1000); // Espera 1 segundo después de completar la oración
      }
    };

    const startNewAnimation = () => {
      const randomPhraseIndex = Math.floor(Math.random() * phrases.length);
      const selectedPhrase = phrases[randomPhraseIndex];
      animateText(selectedPhrase, 0);
    };

    startNewAnimation(); // Inicia la primera animación

    return () => { }; // No es necesario limpiar el intervalo aquí, ya que se hace dentro del efecto
  }, []);


  return (
    <div className="h-full bg-zinc-200 dark:bg-slate-900">
    <NavBar />
    
    <div className="z-0 flex items-center justify-center min-h-screen py-12">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-xl sm:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6">
          Con nuestra app puedes{" "} <br />
          <span className="mx-2 bg-gradient-to-r from-rose-600 to-indigo-600 bg-clip-text text-transparent">
            {placeholderText}
          </span>{" "}
          fácil y gratis
        </h1>
  
        <p className="text-lg leading-8 text-gray-600 dark:text-gray-400 mb-10">
          Empieza una nueva aventura de investigación soportada con Inteligencia
          Artificial.
        </p>
  
        <div className="p-1">
          {user ? (
            <Link to="/home">
              <button className="transition-all duration-300 ease-in-out text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl py-4 px-8 rounded-full inline-flex items-center shadow-lg hover:shadow-xl">
                <span className="mr-3">Get Started</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                  />
                </svg>
              </button>
            </Link>
          ) : (
            <Link to="/login">
              <button className="transition-all duration-300 ease-in-out text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl py-4 px-8 rounded-full inline-flex items-center shadow-lg hover:shadow-xl">
                <span className="mr-3">Get Started</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                  />
                </svg>
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  
    <Footer />
  </div>
  
  );
}
