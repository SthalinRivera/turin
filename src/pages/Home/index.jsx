import React, { Children, useEffect, useState, useContext } from 'react';
import OpenAI from 'openai';
import { useNavigate, Link } from "react-router-dom";
import { db } from "../../firebase";
import { collection, getDocs, getDoc, deleteDoc, addDoc, query, limit, startAfter, orderBy, where } from 'firebase/firestore';
import { NavBar } from "../../components/NavBar";
import { Card } from "../../components/Card";
import { useAuth } from "../../context/AuthContext";
import { Modal } from "../../components/Modal";
import { NavLink } from 'react-router-dom';
import { ListPlaceholder } from "../../components/Skeleton/ListPlaceholder";
import { CardPlaceholder } from "../../components/Skeleton/CardPlaceholder";
import { } from "../Home/data.json";
import { Footer } from "../../components/Footer";
import Tabs from './Tabs';
import Tab from './Tab';


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
  const [image_url, setImagen_url] = useState('')
  const [like, setLike] = useState(null)
  const [views, seViews] = useState(null)
  const [cantidadCardPlaceholder, setCantidadCardPlaceholder] = useState([1, 2, 3, 4])
  const [lastDoc, setLastDoc] = useState(null);
  // Obtener la fecha y hora actual
  const currentDate = new Date().toDateString();;

  const handleVisibilityChange = (e) => {
    // Cambiar el estado de visibilidad basado en el radio seleccionado
    setVisibility(e.target.value === 'public');
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
      const response = completion.choices[0].message.content
      console.log(response);
      // Verifica si hay una respuesta antes de llamar a store()
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
  async function generateImge() {
    try {
      const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: inputValue,
        n: 1,
        size: "1024x1024",
      });
      const image_url = response.data[0].url;
      setImagen_url(image_url)
      console.log(image_url);
      if (image_url) {
        store(image_url)
      }
    } catch (error) {
      console.error('Ocurrio este error', error);

    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    fetchResponse();
  };


  //Calculate pages
  const [pageSize, setPageSize] = useState(4); // Estado para el número total de páginas
  const loadMoreProducts = () => {
    setPageSize(pageSize + 2); // Incrementar el número de página
    getAllProducts()
    getMyProducts()
  };

  // Lis data all user 
  const [allProducts, setAllProducts] = useState('');
  const getAllProducts = async () => {
    const q = query(collection(db, "products"), orderBy("timestamp"), limit(pageSize), startAfter(lastDoc));
    const data = await getDocs(q)
    setAllProducts(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    )
  };
  // Lis data by user 
  const [myProduct, setMyProduct] = useState('');
  const getMyProducts = async () => {
    const q = query(collection(db, "products"), limit(pageSize), where('userEmail', '==', user.email), orderBy("timestamp"));
    const data = await getDocs(q)
    setMyProduct(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    )
  };

  //Add data
  const productsCollectionStore = collection(db, "products")
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
      "Análisis del impacto del turismo comunitario en el desarrollo socioeconómico: Un estudio de caso en [ubicación específica]",
      "Exploración de las percepciones de los turistas extranjeros sobre la sostenibilidad en destinos emergentes",
      "Estrategias de marketing experiencial para impulsar el turismo cultural en ciudades históricas",
      "El papel de la tecnología en la mejora de la experiencia turística: Una revisión de aplicaciones móviles y realidad aumentada",
      "Desarrollo de un plan de gestión de crisis para destinos turísticos frente a desastres naturales y pandemias: Experiencias del COVID-19",
      // Agrega más inputs según sea necesario
    ]);
    getAllProducts();
    getMyProducts();
  }, [response, pageSize])

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
    } catch (error) {
      console.error("Error generating speech:", error);
    }
    setLoading(false);
  };
  const [cards, setCards] = useState([]);

  return (
    <div className='bg-zinc-200 dark:bg-slate-600'>
      <NavBar />
      <div className='m-4'>
        <div class="md:flex mb-4">
          <div class="mt-10 md:mt-0 w-full md:w-1/4 p-2 h-auto  md:h-screen">
            <p className='mt-10 md:mt-0 text-slate-700 dark:text-white font-bold text-center'>Describe your variables </p>
            <form onSubmit={handleSubmit} className='  rounded-xl p-1 mt-4 z-0'>
              <textarea required type="text" rows={4} className='p-4  resize-none block bg-zinc-300 dark:bg-zinc-800 w-full p-4 ps-10 text-sm pl-9  text-slate-700 dark:text-white border  dark:border-slate-400 rounded-xl placeholder-slate-700 dark:placeholder-slate-300' placeholder="Ej:Implemtacion de plan de marketing en proceso de ventas del Travi Sac ." value={inputValue}
                onChange={(e) => setInputValue(e.target.value)} />
              <p className='text-slate-700 dark:text-white text-center font-bold mt-2 '>Visibilidad</p>
              <input type="radio" name="hs-default-radio"
                value="private"
                onChange={handleVisibilityChange}
                id="private-radio"
                checked={!visibility}
                className="m-2" />
              <label for="hs-default-radio" class="text-sm text-slate-700 dark:text-white">Privado</label>
              <input type="radio" name="hs-default-radio"
                onChange={handleVisibilityChange}
                value="public"
                id="private-radio"
                checked={visibility} className="m-2" />
              <label for="hs-checked-radio" class="text-sm text-slate-700 dark:text-white">Público</label>
              <div class="  text-gray-100 dark:text-gray-400 py-2 px-2 inline-flex items-center" onClick={LimpiarInput}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
                <span className='text-sm ml-2 text-slate-700 dark:text-white'  >Limpiar</span>
              </div>
              <button className=' text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm   text-center w-full h-10  '
                type="submit" disabled={buttonDisabled}>Generate
              </button>
            </form>
            <div class=" text-cyan-50 font-bold py-1 px-1 rounded inline-flex items-center justify-start text-sm" onClick={handleRandomInput}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 pr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
              </svg>
              <span className='text-slate-700 dark:text-white'>Sorpréndeme</span>
            </div>
          </div>

          <div class="md:w-1/2 p-2 text-center ">

            <div class="justify-center">
              {loading ? (
                <div className=''>
                  <button type="button" class="py-2 mb-2 px-4 flex justify-center items-center  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg max-w-full">
                    <svg width="20" height="20" fill="currentColor" class="mr-2 animate-spin" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                      <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z">
                      </path>
                    </svg>
                    loading
                  </button>
                  <ListPlaceholder></ListPlaceholder>
                </div>
              ) : null}

              {response && !loading && (
                <div className='flex flex-col bg-gray-200 rounded-lg p-4 m-2'>
                  <div className="w-full rounded overflow-hidden shadow-lg">
                    <div className="px-6 py-4">
                      <div className="font-bold text-xl mb-2">{inputValue}</div>
                      <div dangerouslySetInnerHTML={{ __html: response }} />
                      <p className='mt-6 text-slate-700 dark:text-white'>Tiempo de generación: {generationTime.toFixed(2)} milisegundos</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <Tabs>
              <Tab title="All Showcase">
                <>
                  <div className='flex  justify-between  md:m-1'>
                    <h1 className='text-slate-700 hover:text-slate-900 dark:text-white dark:hover:text-slate-300 md:text-xl font-bold pointer-events-auto'>
                      Showcase</h1>
                    <button
                      onClick={loadMoreProducts}
                      className='text-slate-700 hover:text-slate-900 dark:text-white dark:hover:text-slate-300 md:text-xl font-bold justify-end'
                    > Show more +  </button>
                  </div>
                  {allProducts ? "" : (
                    <div className='grid xl:grid-cols-2 md:grid-cols-1 grid-cols-1 sm:z-0 ' >
                      {cantidadCardPlaceholder.map((item, id) => (
                        <CardPlaceholder key={id}></CardPlaceholder>
                      ))}
                    </div>
                  )}
                  <div className='grid xl:grid-cols-2 md:grid-cols-1 grid-cols-1 sm:z-0 '>
                    {Array.isArray(allProducts) && allProducts.map((product) => (
                      <Card key={product.id} product={product} />
                    ))}
                  </div>
                </>
              </Tab>

              <Tab title="My Showcase">
                <>
                  <div className='flex  justify-between  md:m-1'>
                    <h1 className='text-slate-700 hover:text-slate-900 dark:text-white dark:hover:text-slate-300  md:text-2xl font-bold pointer-events-auto'>
                      Showcase</h1>
                    <button
                      onClick={loadMoreProducts}
                      className='text-slate-700 hover:text-slate-900 dark:text-white dark:hover:text-slate-300 md:text-2xl font-bold justify-end'
                    > Show more +  </button>
                  </div>
                  {myProduct ? "" : (
                    <div className='grid xl:grid-cols-2 md:grid-cols-1 grid-cols-1 sm:z-0 ' >
                      {cantidadCardPlaceholder.map((item, id) => (
                        <CardPlaceholder key={id}></CardPlaceholder>
                      ))}
                    </div>
                  )}
                  <div className='grid xl:grid-cols-2 md:grid-cols-1 grid-cols-1 sm:z-0 '>
                    {Array.isArray(myProduct) && myProduct.map((product) => (
                      <Card key={product.id} product={product} />
                    ))}
                  </div>
                </>
              </Tab>

            </Tabs>

          </div>
          {/**/}
          <div class="md:w-1/4 p-2 text-center text-sm ">
            <p className=' font-bold italic text-slate-700 dark:text-white '>Selecciona un Shorcase</p>
          </div>
        </div>

      </div>

      <Footer></Footer>
    </div>

  );
}

