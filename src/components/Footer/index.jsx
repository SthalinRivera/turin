
import { useAuth } from "../../context/AuthContext";
import { NavBar } from "../NavBar";
import React, { useEffect, useRef, useState } from 'react';
import { Link } from "react-router-dom";
import icono from '../../asset/images/logo.png'; // Asegúrate de que la ruta sea correcta

export function Footer() {
  ;


  return (
    <>
      <footer>
        <div class="dark:bg-slate-900 bg-slate-100 py-4 dark:text-gray-400  text-slate-700">
          <div class="container mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">

              <div class="my-4">
                <a href="/" class="block w-56 mb-4 flex items-center">
                  <img src={icono} alt="Icono" class="mr-2 w-6 h-6" />
                  <p class="text-2xl font-bold">TraviAI</p>
                </a>
                <p class="text-justify">
                  Travi te ayudará en tus investigaciones académicas de manera más innovadora que nunca. ¡Mejora tu descripción y únete a nuestra plataforma en línea hoy mismo!
                </p>
              </div>


              <div class="my-4">
                <h2 class="inline-block text-2xl pb-4 mb-4 border-b-4 border-blue-600">Contacto</h2> <br />
                <a href="https://www.facebook.com/adlersthalin.riveracenteno/" class="inline-flex items-center justify-center h-8 w-8 border border-gray-100 rounded-full mr-1 hover:text-blue-400 hover:border-blue-400">
                  <svg class="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                    <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path>
                  </svg>
                </a>
                <a href="#" class="inline-flex items-center justify-center h-8 w-8 border border-gray-100 rounded-full mr-1 hover:text-blue-400 hover:border-blue-400">
                  <svg class="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path>
                  </svg>
                </a>
                <a href="https://github.com/SthalinRivera" class="inline-flex items-center justify-center h-8 w-8 border border-gray-100 rounded-full mr-1 hover:text-blue-400 hover:border-blue-400">
                  <svg class="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
                    <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.4 25.8 58.9 0 96.9-56.7 104.3-112.9 110.5 9.1 7.9 17.3 23.3 17.3 47.5v70.5c0 6.5 4.6 14.4 17.3 12.1C426.2 457.8 496 362.9 496 252 496 113.3 383.9 8 244.8 8z"></path>
                  </svg>
                </a>
              </div>


              <div class="my-4">
                <h2 class="inline-block text-2xl pb-4 mb-4 border-b-4 border-blue-600">Recursos</h2>
                <ul class="list-none">
                  <Link to={'/text-to-image'} className="block py-1 text-lg text-blue-400 hover:text-blue-600">Text to image </Link>
                  <Link to={'/encuesta/new-encuesta'} className="block py-1 text-lg text-blue-400 hover:text-blue-600">Encuesta</Link>
                </ul>
              </div>
            </div>
          </div>

        </div>
        <div class="dark:bg-slate-800 bg-slate-200 py-4 text-slate-800 dark:text-gray-100">
          <div class="container mx-auto px-4">
            <div class="-mx-4 flex flex-wrap justify-between">
              <div class="px-4 w-full text-center sm:w-auto sm:text-left">
                Copyright © 2024

                TraviAI 2.0 . All Rights Reserved.
              </div>
              <div class="px-4 w-full text-center sm:w-auto sm:text-left">
                Made with ❤️ by  Sthalin Rivera
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
