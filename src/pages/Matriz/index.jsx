import React, { Children, useEffect, useState, useContext, useRef } from 'react';
import OpenAI from 'openai';
import { useNavigate, Link } from "react-router-dom";
import { db } from "../../firebase";
import { collection, getDocs, getDoc, deleteDoc, addDoc, query, limit, startAfter, orderBy, where } from 'firebase/firestore';
import { NavBar } from "../../components/NavBar";
import { Card } from "../../components/CardMatriz";
import { useAuth } from "../../context/AuthContext";
import { ListPlaceholder } from "../../components/Skeleton/ListPlaceholder";
import { CardPlaceholder } from "../../components/Skeleton/CardPlaceholder";
import { } from "../Home/data.json";
import { Footer } from "../../components/Footer";
import Tabs from './Tabs';
import Tab from './Tab';


export function Matriz() {
  const { logout, user } = useAuth();

  const [inputValue, setInputValue] = useState('');
  const [response, setResponse] = useState('');
  const [apiResponse, setApiResponse] = useState([]); // Estado para la respuesta de la API
  const [visibility, setVisibility] = useState('public')
  const [loading, setLoading] = useState(false); // Estado para controlar la carga
  const [generationTime, setGenerationTime] = useState(0); // Tiempo de generación
  const [buttonDisabled, setButtonDisabled] = useState(false); // Estado para deshabilitar el botón
  const [possibleInputs, setPossibleInputs] = useState([]); // Lista de posibles inputs
  const [speechUrl, setSpeechUrl] = useState("");
  const [image_url, setImagen_url] = useState('')
  const [like, setLike] = useState(null)
  const [views, seViews] = useState(null)
  const [cantidadCardPlaceholder, setCantidadCardPlaceholder] = useState([1, 2, 3, 4, 5, 6])
  const [lastDoc, setLastDoc] = useState(null);
  // Obtener la fecha y hora actual
  const currentDate = new Date().toDateString();
  console.log("response", response);
  console.log("apiResponse", apiResponse);

  const handleVisibilityChange = (value) => {
    setVisibility(value);
  };
  const LimpiarInput = () => {
    setInputValue('')

  }
  const navigate = useNavigate()

  // Access the API key from .env
  const openai = new OpenAI({
    apiKey: process.env["REACT_APP_OPENAI_API_KEY"], // This is the default and can be omitted
    dangerouslyAllowBrowser: true
  });

  async function fetchResponse() {
    try {
      setLoading(true); // Establecer el estado de carga a true antes de la solicitud
      const startTime = performance.now(); // Iniciar el temporizador
      setButtonDisabled(true); // Deshabilitar el botón mientras se carga la respuesta
      // Conteo de palabras y letras en el input
      const inputCharacters = inputValue.length;

      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "Eres un asistente útil que proporciona respuestas en formato JSON con una estructura específica. Tu tarea es generar datos en un formato JSON específico sin modificar las claves de los objetos que te proporciono."
          },
          {
            role: "user",
            content: "Por favor, genera una tabla en formato JSON para una matriz de consistencia. A continuación, te proporciono un ejemplo de cómo debería ser el formato JSON, Solo cambia los valores, manteniendo intactas las claves de los objetos."
          },
          {
            role: "system",
            content: " Por ejemplo si te  doy esta informacion:  Evaluación de calidad, big data.  la primera pasa ser variable 1 y la otra varible 2 idenficialo por coma."
          },
          {
            role: "assistant",
            content: JSON.stringify({

              "problema_general": "¿En qué medida el favorece inbound marketing en la decisión de compra del cliente en la empresa Tienda MASS, Lima, 2024?",
              "problema_especifico1": " ¿En qué medida el favorece inbound marketing en la satisfacción del Cliente en la empresa Tienda MASS, Lima, 2024?",
              "problema_especifico2": " ¿En qué medida el favorece inbound marketing en la percepción de Calidad en la empresa Tienda MASS, Lima, 2024?",
              "problema_especifico3": " ¿En qué medida el favorece inbound marketing en el precio-Valor Percibido en la empresa Tienda MASS, Lima, 2024?",
              "objetivo_general": "Determinar en medida el favorece inbound marketing en la decisión de compra del cliente en la empresa Tienda MASS, Lima, 2024",
              "objetivo_especifico1": "Determinar en medida el favorece inbound marketing en la satisfacción del Cliente en la empresa Tienda MASS, Lima, 2024",
              "objetivo_especifico2": "Determinar en medida el favorece inbound marketing en la percepción de Calidad en la empresa Tienda MASS, Lima, 2024",
              "objetivo_especifico3": "Determinar en medida el favorece inbound marketing en el precio-Valor Percibido en la empresa Tienda MASS, Lima, 2024",
              "hipótesis_general": "Inbound marketing favorece efectos significativos en la decisión de compra del cliente en la empresa Tienda MASS, Lima, 2024",
              "hipótesis_especifico1": "Inbound marketing favorece efectos significativos en la satisfacción del Cliente en la empresa Tienda MASS, Lima, 2024",
              "hipótesis_especifico2": "Inbound marketing favorece efectos significativos en la percepción de Calidad en la empresa Tienda MASS, Lima, 2024",
              "hipótesis_especifico3": "Inbound marketing favorece efectos significativos en el precio-Valor Percibido  en la empresa Tienda MASS, Lima, 2024",
              "variable1": "Inbound marketing",
              "variable1_dimension1": "Atracción del público objetivo",
              "variable1_dimension1_indicador1": "número de visitantes únicos",
              "variable1_dimension1_indicador2": "Alcance en redes sociales.",
              "variable1_dimension1_indicador3": "Tasa de clics (CTR) en anuncios o publicaciones.",
              "variable1_dimension2": "Compromiso con la audiencia",
              "variable1_dimension2_indicador1": "Tiempo promedio en el sitio web.",
              "variable1_dimension2_indicador2": "Tasa de conversión de visitantes a leads",
              "variable1_dimension2_indicador3": "Cantidad y calidad de comentarios",
              "variable1_dimension3": "Fidelización y promoción",
              "variable1_dimension3_indicador1": "Tasa de retención de clientes.",
              "variable1_dimension3_indicador2": "Valor del tiempo de vida del cliente",
              "variable1_dimension3_indicador3": "Número de referencias",
              "variable2": "Decisión de compra del cliente",
              "variable2_dimension1": "satisfacción del Cliente",
              "variable2_dimension1_indicador1": "Número de estudiantes con acceso a las plataformas",
              "variable2_dimension1_indicador2": "Horas de uso semanal",
              "variable2_dimension1_indicador3": "Dispositivos disponibles",
              "variable2_dimension2": "percepción de Calidad",
              "variable2_dimension2_indicador1": "Frecuencia de uso de las plataformas",
              "variable2_dimension2_indicador2": "Satisfacción de los estudiantes con las plataformas",
              "variable2_dimension2_indicador3": "Progresos registrados por las plataformas",
              "variable2_dimension3": "precio-Valor Percibido",
              "variable2_dimension3_indicador1": "Notas mejoradas tras el uso de IA",
              "variable2_dimension3_indicador2": "Retención de conocimientos",
              "variable2_dimension3_indicador3": "Opiniones sobre aprendizaje personalizado",
              "variable2_dimension4": "Impacto Curltural",
              "variable2_dimension4_indicador1": "Nivel cultural",
              "variable2_dimension4_indicador2": "Nivel de conocimientos",
              "variable2_dimension4_indicador3": "Nivel sobre aprendizaje personalizado",
              "enfoque": "Cuantitativo",
              "tipo_de_investigación": "Aplicada",
              "nivel_de_investigación": "Correlacional",
              "diseño_de_investigación": "No experimental",
              "método_de_investigación": "Encuestas y análisis de datos",
              "población": "Clientes de Tienda MASS",
              "muestra": "400 clientes",
              "muestreo": "Aleaatorio siemple",
              "técnica": "Análisis de encuestas y métricas de plataformas",
              "instrumento": "Encuestas, entrevistas y registros de plataformas"
            }, null, 2), // Envía el objeto inicial en formato JSON
          },
          { role: "user", content: inputValue },
        ],
        model: "gpt-3.5-turbo",
      });
      const endTime = performance.now(); // Detener el temporizador
      setGenerationTime(endTime - startTime); // Calcular el tiempo transcurrido
      const response = JSON.parse(completion.choices[0].message.content);
      setApiResponse(response); // Actualiza el estado con la respuesta
      setResponse(response);

      console.log("eso es la respuesta ", response);
      if (response) {
        setResponse(response);
        store(response)
      } else {
        console.log("no tengo una respuesta ");
      }
    } catch (error) {
      console.error('Error fetching response:', error);
    } finally {
      setLoading(false); // Establecer el estado de carga a false después de la solicitud
      setButtonDisabled(false); // Habilitar el botón después de la respuesta

    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    fetchResponse();
  };


  //Calculate pages
  const [pageSize, setPageSize] = useState(6); // Estado para el número total de páginas
  const loadMoreProducts = () => {
    setPageSize(pageSize + 2); // Incrementar el número de página
    getAllMatriz()
    getMiMatriz()
  };

  // Lis data all user 
  const [allMatriz, setAllMatriz] = useState('');

  const getAllMatriz = async () => {
    try {
      const q = query(collection(db, "Matrices"), orderBy("timestamp"), where("visibility", "==", "public"), limit(pageSize), startAfter(lastDoc));
      const data = await getDocs(q);

      if (!data.empty) {
        setAllMatriz(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } else {
        console.log("No se encontraron datos.");
      }
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  // Lis data by user 
  const [MiMatriz, setMiMatriz] = useState('');
  console.log(" Mi matriz ", MiMatriz);

  const getMiMatriz = async () => {
    const q = query(collection(db, "Matrices"), limit(pageSize), where('userEmail', '==', user.email), orderBy("timestamp"));
    const data = await getDocs(q)
    console.log(data);

    setMiMatriz(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    )
  };

  //Add data
  const productsCollectionStore = collection(db, "Matrices")
  const userName = user.displayName
  const photoURL = user.photoURL
  const userEmail = user.email
  const store = async (response) => {
    console.log("Almacenando en Firebase...");
    if (response) {
      await addDoc(productsCollectionStore, {
        name: inputValue,
        visibility: visibility,
        response: response,
        timestamp: currentDate,
        userName: userName,
        photoURL: photoURL,
        userEmail: userEmail,
        like: like,
        views: views
      });
      console.log("Datos almacenados en Firebase.");
    } else {
      console.log("No hay respuesta para almacenar en Firebase.");
    }
    //  window.location.reload();
  }

  const handleRandomInput = () => {
    const randomIndex = Math.floor(Math.random() * possibleInputs.length);
    setInputValue(possibleInputs[randomIndex]);
  };

  useEffect(() => {
    setPossibleInputs([
      "Aplicación web, gestión de reservas en hoteles, Lunahuaná, Cañete, 2025",
      "Sistema de atención al cliente, mejorar proceso de ventas, tienda MASS Imperial, Cañete, 2024",
      "Desarrollo de un sistema web, gestión hotelera, Hotel D' Aros, Barranca, 2024",
      "Diseño de un sistema integral, gestión hotelera, Hostal Jusovi, Cajamarca, 2024",
      "Implementación de una plataforma web, gestión de alojamiento, hoteles de Lima Metropolitana , 2024",
      "Modelo de gestión hotelera, mejora de servicio de alojamiento, ciudad de Manta, 2025",
      "Sistema web, venta de servicios, Hotel D' Aros, Barranca, 2025",
      "Aplicación web, gestión hotelera, Hotel Sierra Norte, ciudad de Ibarra, 2024",
      "Desarrollo de un aplicativo móvil, metodología Mobile-D, gestión de reservas, Hotel Caribe, Huaral, 2024",
      "Diseño de un sistema informático, control de reservación y hospedaje, Hotel Majestic, ciudad de Esmeraldas, 2024"
    ]);

    getAllMatriz()
    getMiMatriz()
  }, [response, pageSize])


  return (
    <div className='h-full bg-zinc-200 dark:bg-slate-900'>
      <NavBar />
      <div className='wrapper '>
        <div class="mb-4">
          <div class="mt-10 md:mt-0 w-full  p-2 h-auto ">
            <h1 className='mt-10 md:mt-0 text-slate-700 dark:text-white  text-2xl font-bold text-center'>Generador de matriz de consitencia </h1>
            <p className='mt-4 md:mt-0 text-slate-700 dark:text-white  text-center'>Nuestro generador de matriz de consistencia soporta tres potentes modelos de IA para evaluar la coherencia y la importancia relativa de tus criterios, facilitando un proceso de toma de decisiones eficiente y preciso.</p>

            <form onSubmit={handleSubmit} className=' text-gray-300 rounded-xl bg-white  dark:bg-stone-900 p-1 mt-4 z-0 shadow-xl border border-slate-800  dark:border-slate-200'>
              <div class="flex flex-col md:flex-row gap-1">
                <div class="flex-1  p-2 rounded-md">
                  <textarea required type="text" rows={2} className='p-2 resize-none block  text-slate-900 dark:text-slate-50 dark:bg-stone-900 w-full  text-md   outline-none  rounded-xl ' placeholder="Ej: Inteligencia artificial , educación virtual en Universidad Nacional Cañete-2024" value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)} />
                </div>
                <div class="w-auto md:w-1/4  p-1 rounded-md ">
                  <div class="flex justify-between ">
                    <nav className=" justify-between my-1 flex w-full bg-slate-700 items-center p-1 space-x-1 rtl:space-x-reverse text-sm text-gray-600 bg-gray-500/5 rounded-xl dark:bg-slate-700 text-center ">
                      <button
                        role="tab" type="button"
                        className={`flex whitespace-nowrap justify-center items-center h-6 w-full  p-4 font-medium rounded-lg  ${visibility === 'private' ? 'dark:bg-slate-900 dark:text-slate-100 bg-slate-800 text-slate-100 ' : 'text-slate-800  hover:text-slate-800 dark:text-slate-100  dark:hover:text-slate-200'}`}
                        aria-selected={visibility === 'private' ? 'true' : 'false'}
                        onClick={() => handleVisibilityChange('private')}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg>
                        <p className='px-2'>Privado</p>
                      </button>
                      <button
                        role="tab" type="button" s
                        className={`flex whitespace-nowrap  justify-center items-center h-6 w-full  p-4 font-medium rounded-lg  ${visibility === 'public' ? 'bg-slate-800 text-slate-100 dark:bg-slate-900 dark:text-white' : 'text-slate-800  hover:text-slate-800 dark:text-slate-100  dark:hover:text-slate-200'}`}
                        aria-selected={visibility === 'public' ? 'true' : 'false'}
                        onClick={() => handleVisibilityChange('public')}
                      >

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                          <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                        <p className='px-2'>Público</p>
                      </button>
                    </nav>
                  </div>
                  <button className=' flex justify-center items-center  text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm   text-center w-full h-10  '
                    type="submit" disabled={buttonDisabled}>
                    <p className='px-4'>Generate</p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                    </svg>

                  </button>
                </div>
              </div>
            </form>

            <button
              onClick={handleRandomInput}
              className="flex items-center justify-start text-cyan-50 font-bold  rounded inline-flex text-sm   focus:outline-none  transition-transform transform hover:scale-105 active:scale-45 cursor-pointer "
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 pr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
              </svg>

              <span className='text-slate-700 dark:text-white'>Sorpréndeme</span>
            </button>


          </div>


          <div class="md:w-full p-2 text-center ">
            <div class="justify-center">
              {loading ? (
                <div className=''>
                  <ListPlaceholder />
                </div>
              ) : null}
              {response && !loading && (
                <div className='flex  justify-between  md:m-1'>
                  <div className='bg-white dark:bg-stone-900 p-4 rounded-lg shadow-lg' >

                    <div class="flex flex-wrap gap-4 justify-center">

                      <button class="flex items-center gap-2 px-4 py-2  bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg dark:bg-indigo-400 dark:hover:bg-indigo-500">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                        </svg>
                        <p>0</p>
                      </button>

                      <button class="flex items-center gap-2 px-4 py-2 bg-pink-800  hover:bg-pink-700 text-white rounded-lg dark:bg-pink-400 dark:hover:bg-pink-500 ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54" />
                        </svg>
                        <p>0</p>
                      </button>

                    </div>

                    <p className='p-1  mb-2 text-3xl text-slate-900 dark:text-slate-50 font-bold py-6' > {inputValue}</p>

                    <table class=" w-full bg-white dark:bg-stone-900 border border-gray-300 dark:border-gray-700 rounded-4xl shadow-md">
                      <thead>
                        <tr class=" text-gray-800 dark:text-gray-200">
                          <th class="py-2 px-4 border border-gray-300 dark:border-gray-600">Problema</th>
                          <th class="py-2 px-4 border border-gray-300 dark:border-gray-600">Objetivos</th>
                          <th class="py-2 px-4 border border-gray-300 dark:border-gray-600">Hipótesis</th>
                          <th class="py-2 px-4 border border-gray-300 dark:border-gray-600">Variables</th>
                          <th class="py-2 px-4 border border-gray-300 dark:border-gray-600">Dimensiones</th>
                          <th class="py-2 px-4 border border-gray-300 dark:border-gray-600 w-80">Indicadores</th>
                          <th class="py-2 px-4 border border-gray-300 dark:border-gray-600">Metodología</th>
                        </tr>
                      </thead>
                      <tbody class="text-gray-800 dark:text-gray-200 rounded-lg">
                        <tr class="">
                          <td class="py-2 px-4 border border-gray-300 dark:border-gray-600">
                            <p class="text-sm font-bold">Problema general:</p>
                            <p class="text-sm">{apiResponse.problema_general || 'No hay datos'}</p>
                          </td>
                          <td class="py-2 px-4 border border-gray-300 dark:border-gray-600">
                            <p class="text-sm font-bold">Objetivo general</p>
                            <p class="text-sm"> {apiResponse.objetivo_general || 'No hay datos'}</p>
                          </td>
                          <td class="py-2 px-4 border border-gray-300 dark:border-gray-600" >
                            <p class="text-sm font-bold">Hipótesis general</p>
                            <p class="text-sm"> {apiResponse.hipótesis_general || 'No hay datos'} </p>
                          </td>
                          <td class="py-2 px-4 border border-gray-300 dark:border-gray-600" rowspan="3">
                            <p class="text-sm font-bold">Variable 01</p>
                            <br />
                            <p class="text-sm"> {apiResponse.variable1 || 'No hay datos'}</p>
                          </td>
                          <td class="py-2 px-4 border border-gray-300 dark:border-gray-600">
                            <p class="text-sm font-bold">Dimensión 1:</p>
                            <p class="text-sm">{apiResponse.variable1_dimension1 || 'No hay datos'} </p>
                          </td>
                          <td class="py-2 px-4 border border-gray-300 dark:border-gray-600">
                            <p class="text-sm font-bold">Indicador 1:</p>
                            <p class="text-sm">{apiResponse.variable1_dimension1_indicador1 || 'No hay datos'} </p>
                            <p class="text-sm font-bold">Indicador 2:</p>
                            <p class="text-sm"> {apiResponse.variable1_dimension1_indicador2 || 'No hay datos'}</p>
                            <p class="text-sm font-bold">Indicador 3:</p>
                            <p class="text-sm">{apiResponse.variable1_dimension1_indicador3 || 'No hay datos'} </p>
                          </td>
                          <td class="py-2 px-4 border border-gray-300 dark:border-gray-600" rowspan="6">
                            <p class="text-sm font-bold">Enfoque:</p>
                            <p class="text-sm">{apiResponse.enfoque || 'No hay datos'} </p>
                            <p class="text-sm font-bold">Tipo de investigación:</p>
                            <p class="text-sm"> {apiResponse.tipo_de_investigación || 'No hay datos'} </p>
                            <p class="text-sm font-bold">Nivel de investigación:</p>
                            <p class="text-sm"> {apiResponse.nivel_de_investigación || 'No hay datos'} </p>
                            <p class="text-sm font-bold">Población:</p>
                            <p class="text-sm">  {apiResponse.población || 'No hay datos'}</p>
                            <p class="text-sm font-bold">Muestra:</p>
                            <p class="text-sm">  {apiResponse.muestra || 'No hay datos'}</p>
                            <p class="text-sm font-bold">Muestreo:</p>
                            <p class="text-sm">{apiResponse.muestreo || 'No hay datos'} </p>
                            <p class="text-sm font-bold">Instrumento:</p>
                            <p class="text-sm">{apiResponse.instrumento || 'No hay datos'} </p>
                          </td>
                        </tr>
                        <tr class="">
                          <td class="py-2 px-4 border border-gray-300 dark:border-gray-600" rowspan="2">
                            <p class="text-sm font-bold">Problema específico 1</p>
                            <p class="text-sm">{apiResponse.problema_especifico1 || 'No hay datos'} </p>
                          </td>
                          <td class="py-2 px-4 border border-gray-300 dark:border-gray-600" rowspan="2">
                            <p class="text-sm font-bold">Objetivo específico 1</p>
                            <p class="text-sm"> {apiResponse.objetivo_especifico1 || 'No hay datos'}</p>
                          </td>
                          <td class="py-2 px-4 border border-gray-300 dark:border-gray-600" rowspan="2">
                            <p class="text-sm font-bold">Hipótesis específica 1</p>
                            <p class="text-sm">  {apiResponse.hipótesis_especifico1 || 'No hay datos'}</p>
                          </td>
                          <td class="py-2 px-4 border border-gray-300 dark:border-gray-600">
                            <p class="text-sm font-bold">Dimensión 2:</p>
                            <p class="text-sm">  {apiResponse.variable1_dimension2 || 'No hay datos'} </p>
                          </td>
                          <td class="py-2 px-4 border border-gray-300 dark:border-gray-600">
                            <p class="text-sm font-bold">Indicador 1:</p>
                            <p class="text-sm">{apiResponse.variable1_dimension2_indicador1 || 'No hay datos'} </p>
                            <p class="text-sm font-bold">Indicador 2:</p>
                            <p class="text-sm">{apiResponse.variable1_dimension2_indicador2 || 'No hay datos'} </p>
                            <p class="text-sm font-bold">Indicador 3:</p>
                            <p class="text-sm"> {apiResponse.variable1_dimension2_indicador3 || 'No hay datos'}</p>
                          </td>
                        </tr>
                        <tr class="">

                          <td class="py-2 px-4 border border-gray-300 dark:border-gray-600">
                            <p class="text-sm font-bold">Dimensión 3: </p>
                            <p class="text-sm">  {apiResponse.variable1_dimension3 || 'No hay datos'} </p>
                          </td>
                          <td class="py-2 px-4 border border-gray-300 dark:border-gray-600">
                            <p class="text-sm font-bold">Indicador 1:</p>
                            <p class="text-sm">{apiResponse.variable1_dimension3_indicador1 || 'No hay datos'} </p>
                            <p class="text-sm font-bold">Indicador 2:</p>
                            <p class="text-sm">{apiResponse.variable1_dimension3_indicador2 || 'No hay datos'} </p>
                            <p class="text-sm font-bold">Indicador 3:</p>
                            <p class="text-sm"> {apiResponse.variable1_dimension3_indicador3 || 'No hay datos'}</p>
                          </td>
                        </tr>
                        <tr class="">
                          <td class="py-2 px-4 border border-gray-300 dark:border-gray-600">
                            <p class="text-sm font-bold">Problema específico 2</p>
                            <p class="text-sm"> {apiResponse.problema_especifico2 || 'No hay datos'}</p>
                          </td>
                          <td class="py-2 px-4 border border-gray-300 dark:border-gray-600">
                            <p class="text-sm font-bold">Objetivo específico 2</p>
                            <p class="text-sm">{apiResponse.objetivo_especifico2 || 'No hay datos'} </p>
                          </td>
                          <td class="py-2 px-4 border border-gray-300 dark:border-gray-600">
                            <p class="text-sm font-bold">Hipótesis específica 2</p>
                            <p class="text-sm">  {apiResponse.hipótesis_especifico2 || 'No hay datos'}</p>
                          </td>
                          <td class="py-2 px-4 border border-gray-300 dark:border-gray-600" rowspan="3">
                            <p class="text-sm font-bold">Variable 02:</p>
                            <p class="text-sm"> {apiResponse.variable2 || 'No hay datos'}</p>
                          </td>
                          <td class="py-2 px-4 border border-gray-300 dark:border-gray-600">
                            <p class="text-sm font-bold">Dimensión 1</p>
                            <p class="text-sm"> {apiResponse.variable2_dimension1 || 'No hay datos'}</p>
                          </td>
                          <td class="py-2 px-4 border border-gray-300 dark:border-gray-600">
                            <p class="text-sm font-bold">Indicador 1:</p>
                            <p class="text-sm">{apiResponse.variable2_dimension3_indicador1 || 'No hay datos'} </p>
                            <p class="text-sm font-bold">Indicador 2:</p>
                            <p class="text-sm">{apiResponse.variable2_dimension3_indicador2 || 'No hay datos'} </p>
                            <p class="text-sm font-bold">Indicador 3:</p>
                            <p class="text-sm"> {apiResponse.variable2_dimension3_indicador3 || 'No hay datos'}</p>
                          </td>
                        </tr>
                        <tr class="">
                          <td class="py-2 px-4 border border-gray-300 dark:border-gray-600" rowspan="2">
                            <p class="text-sm font-bold">Problema específico 3</p>
                            <p class="text-sm"> {apiResponse.problema_especifico3 || 'No hay datos'}</p>
                          </td>
                          <td class="py-2 px-4 border border-gray-300 dark:border-gray-600" rowspan="2">
                            <p class="text-sm font-bold">Objetivo específico 3</p>
                            <p class="text-sm"> {apiResponse.objetivo_especifico3 || 'No hay datos'} </p>
                          </td>
                          <td class="py-2 px-4 border border-gray-300 dark:border-gray-600" rowspan="2">
                            <p class="text-sm font-bold">Hipótesis específica 3</p>
                            <p class="text-sm"> {apiResponse.hipótesis_especifico3 || 'No hay datos'} </p>
                          </td>
                          <td class="py-2 px-4 border border-gray-300 dark:border-gray-600">
                            <p class="text-sm font-bold">Dimensión 2:</p>
                            <p class="text-sm">  {apiResponse.variable2_dimension2 || 'No hay datos'}</p>
                          </td>
                          <td class="py-2 px-4 border border-gray-300 dark:border-gray-600">
                            <p class="text-sm font-bold">Indicador 1:</p>
                            <p class="text-sm"> {apiResponse.variable2_dimension2_indicador1 || 'No hay datos'} </p>
                            <p class="text-sm font-bold">Indicador 2:</p>
                            <p class="text-sm">  {apiResponse.variable2_dimension2_indicador2 || 'No hay datos'} </p>
                            <p class="text-sm font-bold">Indicador 3:</p>
                            <p class="text-sm">{apiResponse.variable2_dimension2_indicador3 || 'No hay datos'} </p>
                          </td>

                        </tr>
                        <tr class="">

                          <td class="py-2 px-4 border border-gray-300 dark:border-gray-600">
                            <p class="text-sm font-bold">Dimensión 3: </p>
                            <p class="text-sm">  {apiResponse.variable2_dimension3 || 'No hay datos'} </p>
                          </td>
                          <td class="py-2 px-4 border border-gray-300 dark:border-gray-600">
                            <p class="text-sm font-bold">Indicador 1:</p>
                            <p class="text-sm">{apiResponse.variable2_dimension3_indicador1 || 'No hay datos'} </p>
                            <p class="text-sm font-bold">Indicador 2:</p>
                            <p class="text-sm">{apiResponse.variable2_dimension3_indicador2 || 'No hay datos'} </p>
                            <p class="text-sm font-bold">Indicador 3:</p>
                            <p class="text-sm"> {apiResponse.variable2_dimension3_indicador3 || 'No hay datos'}</p>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                  </div>

                </div>
              )}
            </div>

            <Tabs>
              <Tab title="Todos los ejemplos">
                <>
                  <div className='flex  justify-between  md:m-1'>
                    <h1 className='text-slate-700 hover:text-slate-900 text-lg dark:text-white dark:hover:text-slate-300 md:text-xl font-bold pointer-events-auto'>
                      Ejemplos</h1>
                    <button
                      onClick={loadMoreProducts}
                      className='text-slate-700 hover:text-slate-900 dark:text-white dark:hover:text-slate-300 md:text-xl font-bold justify-end'
                    > Mostrar más +  </button>
                  </div>
                  {allMatriz ? "" : (
                    <div className='grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 sm:z-0 ' >
                      {cantidadCardPlaceholder.map((item, id) => (
                        <CardPlaceholder key={id}></CardPlaceholder>
                      ))}
                    </div>
                  )}
                  <div className='grid xl:grid-cols-3 md:grid-cols-1 grid-cols-1 sm:z-0 '>
                    {Array.isArray(allMatriz) && allMatriz.map((product) => (
                      <Card key={product.id} product={product} />
                    ))}
                  </div>
                </>
              </Tab>

              <Tab title="Mis ejemplos">
                <>
                  <div className='flex  justify-between  md:m-1'>
                    <h1 className='text-slate-700 hover:text-slate-900 dark:text-white dark:hover:text-slate-300   md:text-2xl font-bold pointer-events-auto'>
                      Ejemplos</h1>
                    <button
                      onClick={loadMoreProducts}
                      className='text-slate-700 hover:text-slate-900 dark:text-white dark:hover:text-slate-300 md:text-2xl font-bold justify-end'
                    > Mostrar más +  </button>
                  </div>
                  {MiMatriz ? "" : (
                    <div className='grid xl:grid-cols-3 first-line:md:grid-cols-1 grid-cols-1 sm:z-0 ' >
                      {cantidadCardPlaceholder.map((item, id) => (
                        <CardPlaceholder key={id}></CardPlaceholder>
                      ))}
                    </div>
                  )}
                  <div className='grid xl:grid-cols-3 md:grid-cols-1 grid-cols-1 sm:z-0 '>
                    {Array.isArray(MiMatriz) && MiMatriz.map((product) => (
                      <Card key={product.id} product={product} />
                    ))}
                  </div>
                </>
              </Tab>

            </Tabs>

          </div>
          {/**/}

        </div>

      </div>

      <Footer></Footer>
    </div >

  );
}

