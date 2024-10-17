import React from 'react';
import { NavBar } from "../../../components/NavBar";
import { SideBar } from "../../../components/SideBar";
import { Footer } from "../../../components/Footer";
import { useNavigate } from "react-router-dom";

export function EndEncuesta() {
  const navigate = useNavigate();

  const handleReturnHome = () => {
    navigate('/'); // Cambia esto por la ruta de inicio de tu aplicación
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-800 transition-all duration-300">
      <NavBar />
      <div className="flex flex-1">
        <main className="flex-1 p-4 md:p-6">
          <div className="bg-white dark:bg-slate-900 shadow-lg p-6 rounded-lg text-center flex flex-col items-center">
            <p className="text-green-500 dark:text-green-200 mb-4 text-4xl font-semibold">
              ¡Gracias por participar en nuestra encuesta!
            </p>
            <p className="text-gray-600 dark:text-gray-200 mb-4">
              Su opinión es muy valiosa para nosotros y nos ayuda a mejorar continuamente.
            </p>
            <button
              onClick={handleReturnHome}
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
              </svg>
              <span>Regresar al portal</span>
            </button>
          </div>

        </main>
      </div>
      <Footer />
    </div>
  );
}
