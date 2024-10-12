import { useState } from "react";
import { Link } from "react-router-dom";

export function Banner({ showBanner }) {
  return (
    <div
      id="marketing-banner"
      className="fixed z-50 flex flex-col md:flex-row justify-between w-[calc(100%-2rem)] p-4 -translate-x-1/2 bg-gradient-to-br from-green-900 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 rounded-lg shadow-sm lg:max-w-7xl left-1/2 top-20 dark:bg-gray-700 dark:border-gray-600"
    >
      <div className="flex flex-col items-start mb-3 me-4 md:items-center md:flex-row md:mb-0">
        <a
          href="https://flowbite.com/"
          className="flex items-center mb-2 border-gray-200 md:pe-4 md:me-4 md:border-e md:mb-0 dark:border-gray-600"
        >
          <span className="self-center text-lg font-semibold whitespace-nowrap dark:text-white mr-6">
            Encuesta de Satisfacción
          </span>
        </a>
        <p className="flex items-center text-sm font-normal text-gray-500 dark:text-slate-100">
          Ayúdanos a mejorar, ¡completa nuestra encuesta!
        </p>
      </div>
      <div className="flex items-center flex-shrink-0">
        <Link className="text-slate-900 dark:text-slate-100" to={"/survey"}>
          <button
            type="button"
            className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mr-8"
          >
            Participa Ahora
          </button>
        </Link>
        <button
          onClick={showBanner}
          data-dismiss-target="#marketing-banner"
          type="button"
          className="flex-shrink-0 inline-flex justify-center w-7 h-7 items-center text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Cerrar banner</span>
        </button>
      </div>
    </div>
  );
}
