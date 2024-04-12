import React, { useEffect, useState } from 'react';
import OpenAI from 'openai';
import { useNavigate, Link } from "react-router-dom";
import { db } from "../../firebase";
import { collection, getDocs, getDoc, deleteDoc, addDoc } from 'firebase/firestore';
import { NavBar } from "../../components/NavBar";
import { Card } from "../../components/Card";
import { useAuth } from "../../context/AuthContext";

export function Home() {
  const { logout, user } = useAuth();
  const [inputValue, setInputValue] = useState('');
  const [response, setResponse] = useState('');
  const [visibility, setVisibility] = useState('')
  const [loading, setLoading] = useState(false); // Estado para controlar la carga
  const [generationTime, setGenerationTime] = useState(0); // Tiempo de generación
  const [buttonDisabled, setButtonDisabled] = useState(false); // Estado para deshabilitar el botón
  const [possibleInputs, setPossibleInputs] = useState([]); // Lista de posibles inputs

  const handleVisibilityChange = (e) => {
    // Cambiar el estado de visibilidad basado en el radio seleccionado
    setVisibility(e.target.value === 'public');
  };
  // Obtener la fecha y hora actual
  const currentDate = new Date();

  const navigate = useNavigate()

  // const   // Access the API key from .env
  const openai = new OpenAI({
    apiKey: process.env["REACT_APP_OPENAI_API_KEY"], // This is the default and can be omitted
    dangerouslyAllowBrowser: true
  });

  async function fetchResponse() {
    try {
      setLoading(true); // Establecer el estado de carga a true antes de la solicitud
      const startTime = performance.now(); // Iniciar el temporizador
      setButtonDisabled(true); // Deshabilitar el botón mientras se carga la respuesta

      const completion = await openai.chat.completions.create({
        messages: [
          { role: "system", content: "Generar una tabla en html (solo tabla) de una matriz de consistencia teniendo el Problema general y específicos, Objetivo General y específicos,Hipótesis General y específicos, Variables y dimensiones ,Metodología y dentro de metodología considerar ,Nivel, tipo, método, diseño y población ,  es una matriz de consistencia y identificar y buscar y rellenar del siguiente titulo de investigación : Análisis del impacto del turismo comunitario en el desarrollo socioeconómico:" },
          { role: "user", content: inputValue }
        ],
        model: "gpt-3.5-turbo",
      });
      const endTime = performance.now(); // Detener el temporizador
      setGenerationTime(endTime - startTime); // Calcular el tiempo transcurrido
      setResponse(completion.choices[0].message.content);
      const respuesta = completion.choices[0].message.content
      console.log(respuesta);
      // Verifica si hay una respuesta antes de llamar a store()
      if (respuesta) {
        setResponse(respuesta);
        store(respuesta); // Llamar a store después de obtener la respuesta exitosa
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
    console.log("Enviando solicitud...");
    await fetchResponse();
    console.log("Solicitud enviada.");

  };

  const [products, setProducts] = useState('');
  const productsCollection = collection(db, "products")
  const getProducts = async () => {
    const data = await getDocs(productsCollection)
    //console.log("hola", data.docs);
    setProducts(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    )
    console.log(" test", products);
  }

  const productsCollectionStore = collection(db, "products")
  const userName = user.displayName
  const photoURL = user.photoURL
  const userEmail = user.email

  const store = async (respuesta) => {
    console.log("Almacenando en Firebase...");
    console.log(respuesta);
    // Verifica si hay una respuesta antes de almacenar
    if (respuesta) {
      await addDoc(productsCollectionStore, {
        name: inputValue,
        visibility: visibility,
        response: respuesta,
        timestamp: currentDate.toISOString(),
        userName: userName,
        photoURL: photoURL,
        userEmail: userEmail
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
    // Define una lista de posibles inputs
    setPossibleInputs([
      "Análisis del impacto del turismo comunitario en el desarrollo socioeconómico: Un estudio de caso en [ubicación específica]",
      "Exploración de las percepciones de los turistas extranjeros sobre la sostenibilidad en destinos emergentes",
      "Estrategias de marketing experiencial para impulsar el turismo cultural en ciudades históricas",
      "El papel de la tecnología en la mejora de la experiencia turística: Una revisión de aplicaciones móviles y realidad aumentada",
      "Desarrollo de un plan de gestión de crisis para destinos turísticos frente a desastres naturales y pandemias: Experiencias del COVID-19",
      // Agrega más inputs según sea necesario
    ]);
    getProducts()
  }, [])


  return (
    <div>
      <NavBar />
      <div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-4">
        <div class="justify-center">

          <form onSubmit={handleSubmit}>
            <div className='mt-4 bg-clip-border rounded-xl bg-white text-gray-700 shadow-md drop-shadow-2xl mb-4'  >
              <div class="flex">
                <div class=" relative w-3/4">
                  <textarea type="text" rows={6} className='focus:outline-none  resize-none block w-full p-4 ps-10 text-sm pl-9  border-none rounded-xl ' placeholder="Ingrese su titulo: Exp¿¿." value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)} />
                </div>
                <div class="relative w-1/4 text-center">
                  <p className='text-gray-500 '> Visibility</p>
                  <input type="radio" name="hs-default-radio"
                    value="private"
                    onChange={handleVisibilityChange}
                    id="private-radio"
                    checked={!visibility}
                    class="shrink-0  border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" />
                  <label for="hs-default-radio" class="text-sm text-gray-500  dark:text-gray-400">Private</label>

                  <input type="radio" name="hs-default-radio"
                    onChange={handleVisibilityChange}
                    value="public"
                    id="private-radio"
                    checked={visibility} class="shrink-0  border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" />
                  <label for="hs-checked-radio" class="text-sm text-gray-500  dark:text-gray-400">Public</label>
                </div>
              </div>

              <div className='p-3 relative bottom-0 left-0'>

                <div class="absolute bottom-0 right-0 ">
                  <button className='m-3 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-4 text-center  '
                    type="submit" disabled={buttonDisabled}>Generate

                  </button>
                </div>
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-2" disabled>
                  Basic
                </button>
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" disabled>
                  Expert
                </button>
              </div>
            </div>
          </form>
          <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-1 rounded inline-flex items-center text-sm" onClick={handleRandomInput}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 pr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
            </svg>
            <span>Sorpréndeme</span>
          </button>
          {loading ? (
            <div className=''>
            <button type="button" class="py-2 mb-2 px-4 flex justify-center items-center  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg max-w-full">
              <svg width="20" height="20" fill="currentColor" class="mr-2 animate-spin" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z">
                </path>
              </svg>
              loading
            </button>
          </div>
          ) : null}
        
          {response && !loading && (
            <div className='flex flex-col bg-gray-200 rounded-lg p-4 m-2'>
              <div className="w-full rounded overflow-hidden shadow-lg">
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">{inputValue}</div>
                  <div dangerouslySetInnerHTML={{ __html: response }} />
                  <p>Tiempo de generación: {generationTime.toFixed(2)} milisegundos</p>
                </div>
              </div>
            </div>
          )}


        </div>
      </div>
      <div className=' flex justify-center items-center'>
        <p className='text-xl '>Esplore</p>
      </div>

      <div className=' grid xl:grid-cols-2 md:grid-cols-1 grid-cols-1  '>
        {Array.isArray(products) && products.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>

    </div>

  );
}

