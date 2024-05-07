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

    return () => {}; // No es necesario limpiar el intervalo aquí, ya que se hace dentro del efecto
  }, []);
  return (
    <div className=" bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-700 via-slate-800 to-slate-900">
      <NavBar />

      <div class="">
        <div class="relative isolate px-6 pt-6 lg:px-8">

          <div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
            <div class="text-center">
              <h1 class="text-4xl font-bold tracking-tight text-slate-300 sm:text-6xl  mb-4">IA: Facilitando cada paso de tu investigación </h1>


              <div class="flex items-center space-x-1 bg-slate-600  translate-y-px rounded-full shadow-lg hover:shadow-xl  ">
                <div class="flex bg-slate-600   p-4 w-full space-x-1 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 text-white">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                  </svg>
                  <input ref={inputRef} class="bg-slate-600  w-full focus:outline-none  resize-none" type="text" placeholder={placeholderText}/>
                </div>
              
                <div class="p-1">
                  {user? (  <Link to="/home">
                    <button class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl py-2 px-6 rounded-full inline-flex items-center">
                      <span>Generate </span>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                      </svg>
                    </button>
                  </Link>):(
                        <Link to="/login">
                    <button class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl py-2 px-6 rounded-full inline-flex items-center">
                      <span>Generate </span>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                      </svg>
                    </button>
                  </Link>
                  )}
              

                </div>
              </div>
              <p class="mt-6 text-lg leading-8 text-gray-600">Empieza una nueva aventura de investigación soporta con Inteligencia Artificial.</p>
              <div class=" mt-6 relative ">

              </div>
            </div>
          </div>
        </div>
        <header>
          <section class="wrapper grid gap-8 justify-items-center items-center pb-12 md:grid-cols-2 md:py-24">

            <img src={illustration_intro} class="w-full max-w-lg md:order-1" />

            <article class="text-center space-y-6 md:text-left md:space-y-8">

              <h1 class="text-4xl font-bold text-very-dark-blue md:text-5xl">Bring everyone together to build better products.
              </h1>

              <p class="text-dark-grayish-blue">Manage makes it simple for software teams to plan day-to-day tasks while keeping the larger team goals in view.
              </p>



              <a href="#" class="button mx-auto shadow-xl shadow-bright-red/30 md:mx-0">Get Started</a>

            </article>

          </section>

        </header>


        <main>

          <section class="wrapper text-center py-24 grid gap-12 md:grid-cols-2 md:text-left">

            <article>

              <h2 class="text-3xl font-bold text-very-dark-blue mb-6 md:text-4xl">What’s different about Manage?
              </h2>

              <p class="text-dark-grayish-blue">Manage provides all the functionality your team needs, without the complexity. Our software is tailor-made for modern digital product teams.</p>

            </article>

            <div class="grid gap-12">

              <article class="space-y-4 md:space-y-6">

                <p class="bg-very-pale-red rounded-l-full font-bold flex items-center md:bg-transparent">
                  <span class="bg-bright-red text-white px-6 rounded-full py-2">
                    01
                  </span>
                  <span class="flex-1 p-2">
                    Track company-wide progress
                  </span>
                </p>

                <p class="text-dark-grayish-blue text-left">See how your day-to-day tasks fit into the wider vision. Go from tracking progress at the milestone level all the way done to the smallest of details. Never lose sight of the bigger picture again.</p>

              </article>

              <article class="space-y-4 md:space-y-6">

                <p class="bg-very-pale-red rounded-l-full font-bold flex items-center md:bg-transparent">
                  <span class="bg-bright-red text-white px-6 rounded-full py-2">
                    02
                  </span>
                  <span class="flex-1 p-2">
                    Advanced built-in reports
                  </span>
                </p>

                <p class="text-dark-grayish-blue text-left">Set internal delivery estimates and track progress toward company goals. Our customisable dashboard helps you build out the reports you need to keep key stakeholders informed.

                </p>

              </article>

              <article class="space-y-4 md:space-y-6">

                <p class="bg-very-pale-red rounded-l-full font-bold flex items-center md:bg-transparent">
                  <span class="bg-bright-red text-white px-6 rounded-full py-2">
                    03
                  </span>
                  <span class="flex-1 p-2">
                    Everything you need in one place
                  </span>
                </p>

                <p class="text-dark-grayish-blue text-left">Stop jumping from one service to another to communicate, store files, track tasks and share documents. Manage offers an all-in-one team productivity solution.

                </p>

              </article>


            </div>

          </section>



        </main>

        <Footer>
        </Footer>

      </div >

    </div>
  );
}
