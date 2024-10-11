import React, { useState } from 'react';
import { Configuration, OpenAIApi } from 'openai';
import OpenAI from 'openai';

import { NavBar } from "../../components/NavBar";
import { Modal } from "../../components/Modal";
import { Banner } from "../../components/Banner";
import "../../index.css";

import illustration_intro from "../../asset/images/illustration-intro.svg";
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

  // Función para mejorar la consulta con OpenAI
  const mejorarConsultaConOpenAI = async (pregunta) => {
    const prompt = `Convierte la siguiente pregunta en una consulta de búsqueda académica formal: "${pregunta}"`;
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

  // Función para manejar la generación de resúmenes de un artículo
  const handleGenerarResumen = async (texto) => {
    const resumenGenerado = await generarResumen(texto);
    setResumen(resumenGenerado);
  };

  return (
    <div className='bg-zinc-200 dark:bg-slate-900 '>
      <NavBar />
      <div className=" min-h-screen  container mx-auto p-6  rounded-lg transition-colors duration-300">
  <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 mb-6 text-center">
    Buscar Revistas y Generar Resumen
  </h1>

  <input
    type="text"
    placeholder="Ingresa DOI o tema"
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    className="border border-gray-300 dark:border-gray-700 p-3 rounded-lg w-full mb-6 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
  />

  <button
    onClick={handleBuscar}
    className={`w-full py-3 rounded-lg text-white font-semibold ${
      loading
        ? 'bg-gray-400 cursor-not-allowed'
        : 'bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800'
    } transition-colors duration-300 shadow-lg`}
    disabled={loading}
  >
    {loading ? 'Buscando...' : 'Buscar'}
  </button>

  {/* Contenedor de dos columnas cuando hay resultados y resumen */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
    {resultados.length > 0 && (
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Resultados:</h2>
        <ul className="space-y-4">
          {resultados.map((item, index) => (
            <li key={index} className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg transition-transform duration-200 hover:scale-105">
              <a
                href={item.URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg text-blue-600 dark:text-blue-400 hover:underline font-semibold"
              >
                {item.title[0]}
              </a>
              <p className="mt-2 text-gray-600 dark:text-gray-300">{limpiarTexto(item.abstract) || 'Resumen no disponible.'}</p>
              <button
                onClick={() => handleGenerarResumen(item.abstract || 'Sin resumen disponible')}
                className="mt-3 py-2 px-4 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-md font-medium transition-colors duration-300"
              >
                Generar Resumen
              </button>
            </li>
          ))}
        </ul>
      </div>
    )}

    {resumen && (
      <div className="mt-6 lg:mt-0 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg transition-colors duration-300">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Resumen Generado:</h2>
        <p className="text-gray-700 dark:text-gray-300">{resumen}</p>
      </div>
    )}
  </div>
</div>

      <Footer />
    </div>

  );
};
