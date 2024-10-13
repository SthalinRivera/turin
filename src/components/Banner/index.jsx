import { useState } from "react";
import { Link } from "react-router-dom";

export function Banner({ showBanner }) {
  return (
    <div
      id="marketing-banner"
      className="fixed z-50 flex flex-col md:flex-row justify-between w-full md:w-1/2 p-4 -translate-x-1/2 bg-gradient-to-br from-green-900 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 rounded-lg shadow-sm lg:max-w-7xl left-1/2 top-20 dark:bg-gray-700 dark:border-gray-600"
    >
      <div className="flex flex-col md:flex-row items-start md:items-center mb-3 md:mb-0">
        <a
          href="https://flowbite.com/"
          className="flex items-center mb-2 md:pe-4 md:me-4 md:border-e dark:border-gray-600"
        >
          <span className="text-lg font-semibold whitespace-nowrap text-white">
            Encuesta de Satisfacción
          </span>
        </a>
        <p className="text-sm font-normal text-slate-100 p-2">
          Ayúdanos a mejorar, ¡completa nuestra encuesta!
        </p>
      </div>

      <div className="flex items-center mt-4 md:mt-0 space-x-4">
        <Link className="text-slate-900 dark:text-slate-100" to={"/survey"}>
          <button
            type="button"
            className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Participa Ahora
          </button>
        </Link>

        {/* Botón de cerrar en la esquina superior derecha */}
        <button
          onClick={showBanner}
          data-dismiss-target="#marketing-banner"
          type="button"
          className="absolute top-2 right-2 flex-shrink-0 inline-flex justify-center w-7 h-7 items-center text-slate-100 hover:bg-rose-800 hover:text-slate-200 rounded-lg text-sm p-1.5 "
        >
          <svg
            className="w-3 h-3" aria-hidden="true"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path  stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"  strokeWidth="2"    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
          </svg>
          <span className="sr-only">Cerrar banner</span>
        </button>
      </div>
    </div>

  );
}
