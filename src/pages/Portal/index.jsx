import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import { NavBar } from "../../components/NavBar";
import "../../index.css";
import { Footer } from "../../components/Footer/";
import { Link } from "react-router-dom";
import PlanetImg from "../../asset/images/planet.png";
import PlanetOverlayImg from "../../asset/images/planet-overlay.svg";
import PlanetTagImg01 from "../../asset/images/planet-tag-01.png";
import PlanetTagImg02 from "../../asset/images/planet-tag-02.png";
import PlanetTagImg03 from "../../asset/images/planet-tag-03.png";
import PlanetTagImg04 from "../../asset/images/planet-tag-04.png";

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
    <div className="h-full bg-gradient-to-b from-slate-300 from-10% via-white via-60% to-slate-200 to-90%  dark:bg-gradient-to-r dark:from-slate-900 dark:from-10% dark:via-cyan-900 dark:to-slate-900">
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
      <section className="relative before:absolute before:inset-0 before:-z-20 before:bg-gray-900">
  <div className="mx-auto max-w-6xl px-4 sm:px-6">
    <div className="py-12 md:py-20">
      {/* Section header */}
      <div className="mx-auto max-w-3xl pb-16 text-center md:pb-20">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-slate-200 md:text-4xl">
          Haz de la investigación un camino más fácil.
        </h2>
      </div>
      {/* Planet */}
      <div className="pb-16 md:pb-20" data-aos="zoom-y-out">
        <div className="text-center hidden md:block">
          <div className="relative inline-flex rounded-full before:absolute before:inset-0 before:-z-10 before:scale-[.85] before:animate-[pulse_4s_cubic-bezier(.4,0,.6,1)_infinite] before:bg-gradient-to-b before:from-blue-900 before:to-sky-700/50 before:blur-3xl after:absolute after:inset-0 after:rounded-[inherit] after:[background:radial-gradient(closest-side,theme(colors.blue.500),transparent)]">
            <img
              className="rounded-full w-lg bg-gray-900"
              src={PlanetImg}
              width={400}
              height={400}
              alt="Planet"
            />
            <div className="pointer-events-none" aria-hidden="true">
              <img
                className="absolute -right-64 -top-20 z-10 max-w-none"
                src={PlanetOverlayImg}
                width={789}
                height={755}
                alt="Planet decoration"
              />
              <div>
                <img
                  className="absolute -left-28 top-16 z-10 animate-[float_4s_ease-in-out_infinite_both] opacity-80 transition-opacity duration-500"
                  src={PlanetTagImg01}
                  width={253}
                  height={56}
                  alt="Tag 01"
                />
                <img
                  className="absolute left-56 top-7 z-10 animate-[float_4s_ease-in-out_infinite_1s_both] opacity-30 transition-opacity duration-500"
                  src={PlanetTagImg02}
                  width={241}
                  height={56}
                  alt="Tag 02"
                />
                <img
                  className="absolute -left-20 bottom-24 z-10 animate-[float_4s_ease-in-out_infinite_2s_both] opacity-25 transition-opacity duration-500"
                  src={PlanetTagImg03}
                  width={243}
                  height={56}
                  alt="Tag 03"
                />
                <img
                  className="absolute bottom-32 left-64 z-10 animate-[float_4s_ease-in-out_infinite_3s_both] opacity-80 transition-opacity duration-500"
                  src={PlanetTagImg04}
                  width={251}
                  height={56}
                  alt="Tag 04"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Grid */}
      <div className="grid gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Tarjeta 1 */}
        <article className="relative p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="absolute inset-0 bg-gray-200 dark:bg-gray-900 opacity-50 rounded-lg"></div>
          <div className="relative z-10">
            <h3 className="mb-2 flex items-center space-x-2 font-medium text-gray-900 dark:text-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="fill-blue-500">
                <path d="M1 1h14v14H1z" />
              </svg>
              <span>Generador de Matriz de Consistencia</span>
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-400">Crea una matriz de consistencia para ayudar en la planificación y ejecución de proyectos.</p>
          </div>
        </article>

        {/* Tarjeta 2 */}
        <article className="relative p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="absolute inset-0 bg-gray-200 dark:bg-gray-900 opacity-50 rounded-lg"></div>
          <div className="relative z-10">
            <h3 className="mb-2 flex items-center space-x-2 font-medium text-gray-900 dark:text-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="fill-blue-500">
                <path d="M1 1h14v14H1z" />
              </svg>
              <span>Generador de Operacionación de Variables</span>
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-400">Genera y opera variables de manera eficiente para facilitar cálculos.</p>
          </div>
        </article>

        {/* Tarjeta 3 */}
        <article className="relative p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="absolute inset-0 bg-gray-200 dark:bg-gray-900 opacity-50 rounded-lg"></div>
          <div className="relative z-10">
            <h3 className="mb-2 flex items-center space-x-2 font-medium text-gray-900 dark:text-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="fill-blue-500">
                <path d="M1 1h14v14H1z" />
              </svg>
              <span>Parafraseador</span>
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-400">Reescribe texto para mejorar la claridad y la expresión.</p>
          </div>
        </article>

        {/* Tarjeta 4 */}
        <article className="relative p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="absolute inset-0 bg-gray-200 dark:bg-gray-900 opacity-50 rounded-lg"></div>
          <div className="relative z-10">
            <h3 className="mb-2 flex items-center space-x-2 font-medium text-gray-900 dark:text-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="fill-blue-500">
                <path d="M1 1h14v14H1z" />
              </svg>
              <span>Resumidor</span>
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-400">Resume textos largos para extraer los puntos más importantes.</p>
          </div>
        </article>

        {/* Tarjeta 5 */}
        <article className="relative p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="absolute inset-0 bg-gray-200 dark:bg-gray-900 opacity-50 rounded-lg"></div>
          <div className="relative z-10">
            <h3 className="mb-2 flex items-center space-x-2 font-medium text-gray-900 dark:text-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="fill-blue-500">
                <path d="M1 1h14v14H1z" />
              </svg>
              <span>Buscador de Artículos</span>
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-400">Encuentra artículos relevantes en tu área de interés.</p>
          </div>
        </article>

        {/* Tarjeta 6 */}
        <article className="relative p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="absolute inset-0 bg-gray-200 dark:bg-gray-900 opacity-50 rounded-lg"></div>
          <div className="relative z-10">
            <h3 className="mb-2 flex items-center space-x-2 font-medium text-gray-900 dark:text-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="fill-blue-500">
                <path d="M1 1h14v14H1z" />
              </svg>
              <span>Generador de Tesis</span>
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-400">Crea propuestas de tesis de manera rápida y eficiente.</p>
          </div>
        </article>

        {/* Tarjeta 7 */}
        <article className="relative p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="absolute inset-0 bg-gray-200 dark:bg-gray-900 opacity-50 rounded-lg"></div>
          <div className="relative z-10">
            <h3 className="mb-2 flex items-center space-x-2 font-medium text-gray-900 dark:text-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="fill-blue-500">
                <path d="M1 1h14v14H1z" />
              </svg>
              <span>Evaluador de Fuentes</span>
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-400">Evalúa la credibilidad de las fuentes de información.</p>
          </div>
        </article>

        {/* Tarjeta 8 */}
        <article className="relative p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="absolute inset-0 bg-gray-200 dark:bg-gray-900 opacity-50 rounded-lg"></div>
          <div className="relative z-10">
            <h3 className="mb-2 flex items-center space-x-2 font-medium text-gray-900 dark:text-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="fill-blue-500">
                <path d="M1 1h14v14H1z" />
              </svg>
              <span>Conector de Investigación</span>
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-400">Conecta diferentes áreas de investigación para un enfoque más integral.</p>
          </div>
        </article>
      </div>
    </div>
  </div>
</section>

      <Footer />
    </div>

  );
}
