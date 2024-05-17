import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import { NavBar } from "../../components/NavBar";
import { Modal } from "../../components/Modal";
import "../../index.css";
import fondo from '../../asset/images/fondo.png'
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
    'Un animal con ojos claros y blanco',
    'Un río que fluye en silencio',
    'Una flor que crece en el desierto',
    // Agrega más frases aquí según sea necesario
  ];
  const inputRef = useRef(null);

  useEffect(() => {
    const animateText = (text, index) => {
      if (index < text.length) {
        setTimeout(() => {
          setPlaceholderText(prevText => prevText + text[index]);
          animateText(text, index + 1);
        }, 100); // Ajusta la velocidad de escritura aquí
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
    <div className="bg-white h-screen dark:bg-zinc-900">
      <NavBar />
      <div class="">
        <div class="relative isolate px-2 pt-4 lg:px-8">
          <div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
            <div class="text-center">
              <h1 class="text-4xl font-bold tracking-tight text-slate-800 dark:text-slate-300 sm:text-6xl  mb-4 ">IA: Facilitando cada paso de tu investigación </h1>
              <div class="flex items-center space-x-1 bg-slate-300  dark:bg-slate-600 translate-y-px rounded-lg md:rounded-full shadow-lg hover:shadow-xl  ">
                <div class="flex bg-slate-300  dark:bg-slate-600  p-4 w-full space-x-1 rounded-lg md:rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 text-slate-900 dark:text-white ">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                  </svg>
                  <input ref={inputRef} class="bg-slate-300  dark:bg-slate-600 placeholder:text-slate-500 dark:placeholder:text-slate-300  w-full focus:outline-none  resize-none text-[10px] md:text-sm" type="text" placeholder={placeholderText} />
                </div>
                <div class="p-1">
                  {user ? (<Link to="/home">
                    <button class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl py-2 px-6 rounded-full inline-flex items-center">
                      <span className="hidden md:block" >Generate </span>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                      </svg>
                    </button>
                  </Link>) : (
                    <Link to="/login">
                      <button class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl py-2 px-6 rounded-full inline-flex items-center">
                        <span className="hidden md:block"> Generate </span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                        </svg>
                      </button>
                    </Link>
                  )}
                </div>
              </div>
              <p class="mt-6 text-lg leading-8 text-gray-600">Empieza una nueva aventura de investigación soporta con Inteligencia Artificial.</p>
            </div>
          </div>
        </div>
        <Footer>
        </Footer>
      </div >

    </div>
  );
}
