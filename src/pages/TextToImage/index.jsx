import React, { useState } from 'react';
import OpenAI from "openai";  // Importar el cliente de OpenAI
import { Footer } from "../../components/Footer/";
import { NavBar } from "../../components/NavBar";
// Inicializar la instancia de OpenAI con la clave API desde las variables de entorno
const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // Solo para pruebas locales, no recomendado para producción
});

export const TextToImage = () => {
  const [query, setQuery] = useState('');
  const [imageUrls, setImageUrls] = useState([]); // Cambia a un array para manejar múltiples imágenes

  const [loading, setLoading] = useState(false);

  // Función para manejar la generación de la imagen
  const handleGenerarImage = async () => {
    if (!query) return;

    setLoading(true);

    try {
      // Usar el cliente de OpenAI para generar la imagen
      const response = await openai.images.generate({
        prompt: query, // El texto que el usuario ha ingresado
        n: 2,          // Número de imágenes a generar
        size: "1024x1024", // Tamaño de la imagen
      });

      const urls = response.data.map(image => image.url); // Obtener URLs de las imágenes generadas
      setImageUrls(urls); // Guardar las URLs en el estado
    } catch (error) {
      console.error('Error al generar la imagen:', error);
    }

    setLoading(false);
  };

  return (
    <div className='bg-gradient-to-br from-blue-500 to-purple-600 dark:from-gray-800 dark:to-gray-900 '>
      <NavBar />
      <div className="min-h-screen  max-w-lg items-center justify-center container mx-auto p-6  mt-[80px] md:mt-4 rounded-lg transition-colors duration-300">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 mb-6 text-center">
          Generar texto a imagen
        </h1>
        <div className="relative  mb-4">
          <input
            type="text"
            placeholder="Text to image"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border border-gray-300 dark:border-gray-700 p-3 pr-10 rounded-lg w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          />
          <button
            onClick={handleGenerarImage}
            className={`absolute flex right-2 top-1/2 transform -translate-y-1/2 py-2 px-3 rounded-lg text-white font-semibold ${loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium'
              } transition-colors duration-300 shadow-lg`}
            disabled={loading}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
            </svg>
            <span className='hidden sm:block'>Generate</span>
          </button>
        </div>

      
        {/* Mostrar el esqueleto y las imágenes generadas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {loading ? (
            <>
              {/* Esqueleto de carga */}
              <div class="flex items-center justify-center w-full h-64 bg-gray-300 rounded  dark:bg-gray-700 animate-pulse">
            <svg class="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
              <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
            </svg>
          </div>
          <div class="flex items-center justify-center w-full h-64  bg-gray-300 rounded  dark:bg-gray-700 animate-pulse">
            <svg class="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
              <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
            </svg>
          </div>
            </>
          ) : (
            imageUrls.map((url, index) => (
              <img key={index} src={url} alt={`Imagen generada ${index + 1}`} className="w-full h-64 rounded-lg shadow-lg" />
            ))
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};
