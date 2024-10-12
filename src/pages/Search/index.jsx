import React, { useState } from 'react';
import { useAuth } from "../../context/AuthContext";
import OpenAI from 'openai';

import { NavBar } from "../../components/NavBar";
import toast, { Toaster } from 'react-hot-toast';
import "../../index.css";
import { db } from "../../firebase";
import { collection, getDocs, getDoc, deleteDoc, addDoc, query, limit, startAfter, orderBy, where } from 'firebase/firestore';

import { ListSearch } from "../../components/Skeleton/ListSearch";

import { Footer } from "../../components/Footer/";
// Access the API key from .env
const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const Search = () => {
  const [query, setQuery] = useState('');
  const [resultados, setResultados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [resumen, setResumen] = useState('');
  const { logout, user } = useAuth();
  const notify = () => toast.success('Guardado en favoritos!')
  const [saved, setSaved] = useState(false); // Estado para controlar si se ha guardado

  // Función para mejorar la consulta con OpenAI
  const mejorarConsultaConOpenAI = async (pregunta) => {
    const prompt = `Convierte la siguiente pregunta en una consulta de búsqueda académica en palabras claves: "${pregunta}"`;
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "Vas a convertir en palalbras claves para  buscar en un revista y solo quiero palabrasclaves separado con comas."
        },

        { role: "user", content: prompt },
      ],
      model: "gpt-3.5-turbo",
    }); return completion.choices[0].message.content.trim();
  };

  // Función para buscar en la API de CrossRef usando el DOI o consulta mejorada con fetch
  const buscarEnCrossRef = async (consulta) => {
    const url = `https://api.crossref.org/works?query=${consulta}`;
    try {
      const response = await fetch(url);
      console.log('Respuesta de la API:', response);
      const data = await response.json();
      return data.message.items; // Resultados de búsqueda
    } catch (error) {
      console.error('Error buscando en CrossRef:', error);
      return [];
    }
  };
  const handleQuestionClick = (question) => {
    setQuery(question);
    handleBuscar();
  };
  // Función para generar resumen del artículo usando OpenAI
  const generarResumen = async (textoArticulo) => {
    const prompt = `Resume el siguiente texto: ${textoArticulo}`;
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "Eres un asistente útil que va a buscar revistas cientificas."
        },

        { role: "user", content: prompt },
      ],
      model: "gpt-3.5-turbo",
    }); return completion.choices[0].message.content.trim();
  };
  // Función para limpiar etiquetas HTML
  const limpiarTexto = (texto) => {
    if (!texto) {
      return 'Resumen no disponible.'; // Devuelve un mensaje predeterminado si no hay texto
    }
    return texto.replace(/<[^>]*>/g, ''); // Eliminar todas las etiquetas HTML
  };
  // Función principal para manejar la búsqueda
  const handleBuscar = async () => {
    setLoading(true);
    setResumen('');
    // Mejorar la consulta con OpenAI
    const consultaMejorada = await mejorarConsultaConOpenAI(query);
    console.log('Consulta mejorada:', consultaMejorada);

    // Buscar resultados en CrossRef
    const resultadosBusqueda = await buscarEnCrossRef(consultaMejorada);
    setResultados(resultadosBusqueda);
    setLoading(false);
  };

  // Función para manejar el guardado del que me importa
  const handleSaveFirebase = async (abstract, title, url) => {

    console.log('Datos recibidos:', { abstract, title, url }); // Agrega esta línea para depurar

    const userEmail = user.email
    // Validaciones básicas para asegurarse de que los datos no estén vacíos
    if (!title || !url) {
      console.error('Error: Todos los campos son obligatorios');
      return; // Detiene la ejecución si algún campo está vacío
    }

    try {
      // Agregar datos a la colección "journals"
      const journalRef = collection(db, "journals");

      // Añadir el documento a Firebase
      const docRef = await addDoc(journalRef, {
        title: title,
        abstract: abstract,
        url: url,
        timestamp: new Date(), // Opción adicional: agregar la fecha de creación
        userEmail: user.email

      });
      // Cambia el estado a true si el documento se guardó exitosamente
      setSaved(true);
      notify()
      // Log para confirmar que el documento fue añadido exitosamente
      console.log('Documento guardado con ID:', docRef.id);
    } catch (error) {
      // Log en caso de error durante la operación
      console.error('Error al guardar el documento:', error);
    }
  };

  // Función para manejar la generación de resúmenes de un artículo
  const handleGenerarResumen = async (texto) => {
    const resumenGenerado = await generarResumen(texto);
    setResumen(resumenGenerado);
  };
  return (
    <div className='bg-zinc-200 dark:bg-slate-900 '>
      <NavBar />
      <div className=" min-h-screen  container mx-auto p-6  rounded-lg transition-colors duration-300">
        <h1 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2 text-center">
          La plataforma de investigación más rápida de la historia
        </h1>
        <p className='text-sm  text-gray-900 dark:text-gray-100 mb-6 text-center'>Herramientas de IA todo en uno para estudiantes e investigadores.</p>
        <div className="relative w-full mb-4">
          <input
            type="text"
            placeholder="Buscar o pregunta sobre temas de su interés..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border border-gray-300 dark:border-gray-700 p-3 pr-10 rounded-lg w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          />
          <button
            onClick={handleBuscar}
            className={`absolute right-2 top-1/2 transform -translate-y-1/2 py-2 px-3 rounded-lg text-white font-semibold ${loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium'
              } transition-colors duration-300 shadow-lg`}
            disabled={loading}
          >
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
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </button>
        </div>
        {/* Carga de contenido */}
        {loading ? (
          <div className='md:w-1/2'>
            <ListSearch />
          </div>
        ) : (
          resultados.length === 0 && (
            <div className="container mx-auto p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Intente preguntar o buscar:</h2>
              </div>
              {/* Lista de preguntas */}
              <ul className="list-disc pl-5">
                {/* Ejemplos de preguntas */}
                <li>
                  <a href="#" onClick={() => handleQuestionClick("¿Cómo afecta el cambio climático a la biodiversidad?")} className="hover:underline text-sm">
                    ¿Cómo afecta el cambio climático a la biodiversidad?
                  </a>
                </li>
                <li>
                  <a href="#" onClick={() => handleQuestionClick("¿Por qué los pacientes mayores de Covid son más susceptibles a sufrir complicaciones graves?")} className="hover:underline text-sm">
                    ¿Por qué los pacientes mayores de Covid son más susceptibles a sufrir complicaciones graves?
                  </a>
                </li>
                <li>
                  <a href="#" onClick={() => handleQuestionClick("¿Cómo afectan las redes sociales al proceso de selección universitaria?")} className="hover:underline text-sm">
                    ¿Cómo afectan las redes sociales al proceso de selección universitaria?
                  </a>
                </li>
                <li>
                  <a href="#" onClick={() => handleQuestionClick("¿Cuáles son las teorías interesantes sobre la materia oscura y la energía oscura?")} className="hover:underline text-sm">
                    ¿Cuáles son las teorías interesantes sobre la materia oscura y la energía oscura?
                  </a>
                </li>
                <li>
                  <a href="#" onClick={() => handleQuestionClick("¿Cuál es la importancia del álgebra de dimensiones superiores?")} className="hover:underline text-sm">
                    ¿Cuál es la importancia del álgebra de dimensiones superiores?
                  </a>
                </li>
                <li>
                  <a href="#" onClick={() => handleQuestionClick("Herramientas populares")} className="hover:underline text-sm">
                    Herramientas populares
                  </a>
                </li>
              </ul>
            </div>
          )
        )}

        {/* Contenedor de dos columnas cuando hay resultados y resumen */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {resultados.length > 0 && (
            <div className='bg-white dark:bg-gray-800 p-2 rounded-lg'>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4 text-center"> 20 Articulos encontrados:</h2>
              <ul className="space-y-4">
                {resultados.map((item, index) => (
                  <li key={index} className="p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 
                 ease-in-out">
                    <div className='flex items-center w-full justify-start'>
                      <p className='text-sm text-slate-800 italic dark:text-slate-200 mr-2'>Journal Article</p>
                      <a href={item.URL} className='text-slate-800 font-bold dark:text-slate-200 flex'>DOI
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 ml-1" >
                          <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                        </svg>
                      </a>
                    </div>
                    <a
                      href={item.URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                    >
                      {item.title[0]}
                    </a>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">{limpiarTexto(item.abstract) || 'Resumen no disponible.'}</p>
                    <div className='flex items-center'>
                      <button
                        onClick={() => handleGenerarResumen(item.abstract || 'Sin resumen disponible')}
                        className="mt-3 py-1 px-2 bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800  text-white rounded-lg shadow-md transition-colors duration-300 flex mr-1 "
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-2">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                        </svg>
                        Resumir
                      </button>
                      <button
                        onClick={() => handleSaveFirebase(item.abstract || 'Sin resumen disponible', item.title[0], item.URL)}
                        className={`mt-3 py-1 px-2 transition-colors duration-300 flex rounded-lg shadow-md 
        ${saved ? 'bg-gradient-to-br from-blue-400 to-green-600 text-white' : 'bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 text-white'}
      `}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                        </svg>
                      </button>
                      <Toaster />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Resumen Flotante */}
          {resumen ? (
            <div className="fixed bottom-6 right-6 max-w-xl w-full p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-colors duration-300 border border-gray-200 dark:border-gray-700">
              <div aria-label="header" class="flex items-center space-x-2 dark:text-slate-200 text-slate-900">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-8 h-8 shrink-0"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M13 3l0 7l6 0l-8 11l0 -7l-6 0l8 -11"></path>
                </svg>
                <div class="space-y-0.5 flex-1">
                  <h3
                    class="font-medium text-lg tracking-tight dark:text-slate-200 text-slate-900 leading-tight">
                    AI Power Analytics
                  </h3>
                  <p class="text-sm font-normal dark:text-slate-200 text-slate-900 leading-none">
                    Resumen generado
                  </p>
                </div>
                <a onClick={() => setResumen('')}
                  class="inline-flex items-center shrink-0 justify-center w-8 h-8 rounded-full text-white bg-gray-900 focus:outline-none"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>

                </a>
              </div>

              <p className="text-gray-700 dark:text-gray-300">{resumen}</p>

            </div>
          ) : (
            <div className="">

            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>

  );
};
