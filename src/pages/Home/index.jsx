import React, { useEffect, useState } from 'react';
import OpenAI from 'openai';
import { useNavigate, Link } from "react-router-dom";
import { db } from "../../firebase";
import { collection, getDocs, getDoc, deleteDoc, addDoc } from 'firebase/firestore';
import { NavBar } from "../../components/NavBar";
import { Card } from "../../components/Card";
import { useAuth } from "../../context/AuthContext";
import { Modal } from "../../components/Modal";
import { NavLink } from 'react-router-dom';
import { } from "../Home/data.json";
export function Home() {
  const { logout, user } = useAuth();
  const [inputValue, setInputValue] = useState('');
  const [response, setResponse] = useState('');
  const [visibility, setVisibility] = useState('public')
  const [loading, setLoading] = useState(false); // Estado para controlar la carga
  const [generationTime, setGenerationTime] = useState(0); // Tiempo de generación
  const [buttonDisabled, setButtonDisabled] = useState(false); // Estado para deshabilitar el botón
  const [possibleInputs, setPossibleInputs] = useState([]); // Lista de posibles inputs
  const [speechUrl, setSpeechUrl] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('hola  gil en que estas ');

  const openModal = (content) => {
    setModalContent(content);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleVisibilityChange = (e) => {
    // Cambiar el estado de visibilidad basado en el radio seleccionado
    setVisibility(e.target.value === 'public');
  };
  // Obtener la fecha y hora actual
  const currentDate = new Date();
  const LimpiarInput = () => {
    setInputValue('')
  }
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
        generateSpeech(respuesta)
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
  const store = async (respuesta, url) => {
    console.log("Almacenando en Firebase...");
    console.log(respuesta);
    console.log(" soy el audio ", url);
    console.log("hola aqui estou viendo donde me imprimo");
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
  const timestamp = Date.now();
  console.log('aqui estoy timestatn');
  console.log(timestamp);
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
    getProducts();
    fetchData()
  }, [])

  const generateSpeech = async (respuesta) => {
    setLoading(true);
    try {
      const mp3 = await openai.audio.speech.create({
        model: "tts-1",
        voice: "alloy",
        input: respuesta,
      });
      const blob = new Blob([await mp3.arrayBuffer()], { type: "audio/mp3" });
      const url = URL.createObjectURL(blob);
      setSpeechUrl(url);
      store(url);
    } catch (error) {
      console.error("Error generating speech:", error);
    }
    setLoading(false);
  };
  const [cards, setCards] = useState([]);


  const fetchData = async () => {
    try {
      const response = await fetch('data.json'); // Fetch data from the local JSON file
      console.log("no encuentro data");
      const data = await response.json();
      setCards(data); // Update state with fetched data
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  return (
    <div className='bg-slate-600 h-full'>
      <NavBar />
      <div className='w-full '>
        <div className='  ' >
          <div class=" mx-auto max-w-2xl py-32 sm:py-48 lg:py-4  ">
            <div class="justify-center">
              <p className='text-xl text-center font-bold text-slate-50'>Ingrese su título y explore con IA </p>
              <form onSubmit={handleSubmit} className=' bg-slate-900 rounded-xl p-1 mt-4 z-0'>
                <div className='mt-4 bg-clip-border rounded-xl  shadow-sm drop-shadow-sm mb-4 0'  >
                  <div class="flex">
                    <div class="relative w-3/4">
                      <textarea type="text" rows={6} className='focus:outline-none  resize-none block bg-slate-900 w-full p-4 ps-10 text-sm pl-9  text-white border-none rounded-xl ' placeholder="Ej:Implemtacion de plan de marketing en proceso de ventas del Travi Sac ." value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)} />
                    </div>
                    <div class=" w-1/4  ">
                      <p className='text-gray-500 text-center '> Visibilidad</p>
                      <input type="radio" name="hs-default-radio"
                        value="private"
                        onChange={handleVisibilityChange}
                        id="private-radio"
                        checked={!visibility}
                        className="m-2" />
                      <label for="hs-default-radio" class="text-sm text-gray-500  dark:text-gray-400">Privado</label>

                      <input type="radio" name="hs-default-radio"
                        onChange={handleVisibilityChange}
                        value="public"
                        id="private-radio"
                        checked={visibility} className="m-2" />
                      <label for="hs-checked-radio" class="text-sm text-gray-500  dark:text-gray-400">Público</label>
                      <div className='items-center justify-center'>


                        <div class="  text-gray-500 dark:text-gray-400 py-2 px-2 inline-flex items-center" onClick={LimpiarInput}>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                          </svg>
                          <span className='text-sm ml-2' >Limpiar</span>
                        </div></div>
                    </div>
                  </div>

                  <div className='p-3 relative bottom-0 left-0'>

                    <div class="absolute bottom-0 right-0 ">
                      <button className='m-3 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-4 text-center  '
                        type="submit" disabled={buttonDisabled}>Generate

                      </button>
                    </div>
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mr-2" disabled>
                      Basic
                    </button>
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md" disabled>
                      Expert
                    </button>
                  </div>
                </div>
              </form>
              <div class="  text-cyan-50 font-bold py-1 px-1 rounded inline-flex items-center text-sm" onClick={handleRandomInput}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 pr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                </svg>
                <span>Sorpréndeme</span>
              </div>
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
                      {speechUrl && (
                        <audio controls>
                          <source src={speechUrl} type="audio/mp3" />
                          Your browser does not support the audio element.
                        </audio>
                      )}
                    </div>
                  </div>
                </div>
              )}


            </div>
          </div>

          <div className="">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold  rounded" onClick={() => openModal('me llegas al pinchu')}>
              Abrir Modal
            </button>
            {modalOpen && <Modal onClose={closeModal} content={modalContent} />}
          </div>

          <div>
            {cards.map(card => (
              <div key={card.id} className="card">
                <img src={card.imageUrl} alt={card.title} />
                <div className="card-body">
                  <h2>{card.title}</h2>
                  <p>{card.description}</p>
                </div>
              </div>
            ))}

          </div>



          <div className='mb-4 p-4'>
            <p className='text-2xl text-white font-bold '> Treding</p>
          </div>

          <div className='grid xl:grid-cols-2 md:grid-cols-1 grid-cols-1 sm:z-0 '>
            {Array.isArray(products) && products.map((product) => (
              <Card key={product.id} product={product} />
            ))}

          </div>



        </div>

      </div>
    </div>

  );
}

