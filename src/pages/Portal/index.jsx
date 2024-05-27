import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import { NavBar } from "../../components/NavBar";
import { Modal } from "../../components/Modal";
import "../../index.css";

import illustration_intro from "../../asset/images/illustration-intro.svg";
import { Footer } from "../../components/Footer/";
import { Link } from "react-router-dom";

export function Portal() {
  const { logout, user } = useAuth();

  console.log(user);
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error.message);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
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
    <>

    <div className="bg-white h-screen dark:bg-zinc-900 bg-fondo-portal  ">
      <div className="bg-gradient-to-l from-current via-slate-800 via-100% to-slate-800 h-screen opacity-90">

      <NavBar />
      <div class="">
<div className="w-full px-4 bg-black z-50"></div>

        <div class="relative isolate px-2 pt-4 lg:px-8">
          <div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
            <div class="text-center">
              <h1 class="text-4xl font-bold tracking-tight text-slate-800 dark:text-slate-300 sm:text-6xl  mb-4 " ref={inputRef} > Con nuestra app puedes <span className="mx-2 bg-gradient-to-r from-rose-600 to-indigo-600 bg-clip-text text-transparent">{placeholderText}</span>  facil y gratis </h1>

              <div class="p-1">
                {user ? (<Link to="/home">
                  <button class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl py-4 px-8 rounded-full inline-flex items-center">
                    <span className=" md:block" >Get Started </span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                    </svg>
                  </button>
                </Link>) : (
                  <Link to="/login">
                    <button class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl py-4 px-8 rounded-full inline-flex items-center">
                      <span className=" md:block"> Get Started  </span>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                      </svg>
                    </button>
                  </Link>
                )}
              </div>

              <p class="mt-6 text-lg leading-8 text-gray-200">Empieza una nueva aventura de investigación soporta con Inteligencia Artificial.</p>
            </div>
          </div>
        </div>

      </div >
   
    </div>  
    </div>
     <Footer>
      </Footer>
    </>
  );
}
