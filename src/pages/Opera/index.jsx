import React, { Children, useEffect, useState, useContext } from 'react';
import OpenAI from 'openai';
import { useNavigate, Link } from "react-router-dom";
import { db } from "../../firebase";
import { collection, getDocs, getDoc, deleteDoc, addDoc, query, limit, startAfter, orderBy, where } from 'firebase/firestore';
import { NavBar } from "../../components/NavBar";
import { Card } from "../../components/CardOpera";
import { useAuth } from "../../context/AuthContext";
import { Modal } from "../../components/Modal";
import { NavLink } from 'react-router-dom';
import { ListPlaceholder } from "../../components/Skeleton/ListPlaceholder";
import { CardPlaceholder } from "../../components/Skeleton/CardPlaceholder";
import { } from "../Home/data.json";
import { Footer } from "../../components/Footer";
import Tabs from './Tabs';
import Tab from './Tab';


export function Opera() {
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
  const [cantidadCardPlaceholder, setCantidadCardPlaceholder] = useState([1, 2, 3, 4])
  const [lastDoc, setLastDoc] = useState(null);
  // Obtener la fecha y hora actual
  const currentDate = new Date().toDateString();;

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
      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "Eres un asistente útil que proporciona respuestas en formato JSON con una estructura específica. Tu tarea es generar datos en un formato JSON específico sin modificar las claves de los objetos que te proporciono."
          },
          {
            role: "user",
            content: "Por favor, genera una tabla en formato JSON para una Operacionalización de las variables utilizando los siguientes nombres clave: 'Variables', 'Definición operacional', 'Dimensiones', 'Indicadores', 'Ítems o fórmula', 'Instrumento y escala de medición'. A continuación, te proporciono un ejemplo de cómo debería ser el formato JSON, Solo cambia los valores, manteniendo intactas las claves de los objetos."
          },
          {
            role: "assistant",
            content: JSON.stringify({
              "variables": [
                {
                  "nombre": "Satisfacción Laboral",
                  "definicion_operacional": "Grado en que los empleados se sienten satisfechos con su trabajo.",
                  "dimensiones": [
                    {
                      "nombre": "Satisfacción Intrínseca",
                      "indicadores": [
                        {
                          "nombre": "Nivel de satisfacción con tareas del puesto",
                          "items_formula": "Preguntas sobre disfrute de tareas y realización personal (1-5)",
                          "instrumento_escala": "Cuestionario de satisfacción laboral. Escala Likert (1-5)"
                        }
                      ]
                    },
                    {
                      "nombre": "Satisfacción Extrínseca",
                      "indicadores": [
                        {
                          "nombre": "Satisfacción con el salario y condiciones",
                          "items_formula": "Preguntas sobre satisfacción con salario, ambiente y beneficios (1-5)",
                          "instrumento_escala": "Cuestionario de satisfacción laboral. Escala Likert (1-5)"
                        }
                      ]
                    }
                  ]
                },
                {
                  "nombre": "Productividad",
                  "definicion_operacional": "Rendimiento del empleado en la realización de tareas laborales.",
                  "dimensiones": [
                    {
                      "nombre": "Eficiencia",
                      "indicadores": [
                        {
                          "nombre": "Tareas realizadas en tiempo y forma",
                          "items_formula": "Medición de cantidad de tareas completadas por semana.",
                          "instrumento_escala": "Registro de tareas completadas. Escala numérica"
                        }
                      ]
                    },
                    {
                      "nombre": "Eficacia",
                      "indicadores": [
                        {
                          "nombre": "Calidad del trabajo realizado",
                          "items_formula": "Evaluación del supervisor sobre la calidad de trabajo (1-5)",
                          "instrumento_escala": "Evaluación del desempeño del supervisor. Escala Likert (1-5)"
                        }
                      ]
                    }
                  ]
                },
                {
                  "nombre": "Motivación Laboral",
                  "definicion_operacional": "Nivel de compromiso y energía con la que un empleado desempeña sus funciones.",
                  "dimensiones": [
                    {
                      "nombre": "Motivación Intrínseca",
                      "indicadores": [
                        {
                          "nombre": "Interés en el desarrollo profesional y personal",
                          "items_formula": "Preguntas sobre el deseo de crecer en el trabajo (1-5)",
                          "instrumento_escala": "Cuestionario de motivación laboral. Escala Likert (1-5)"
                        }
                      ]
                    },
                    {
                      "nombre": "Motivación Extrínseca",
                      "indicadores": [
                        {
                          "nombre": "Incentivos económicos y reconocimiento externo",
                          "items_formula": "Preguntas sobre la importancia del salario y reconocimiento (1-5)",
                          "instrumento_escala": "Cuestionario de motivación laboral. Escala Likert (1-5)"
                        }
                      ]
                    }
                  ]
                }
              ]
            }, null, 2), // Envía el objeto inicial en formato JSON
          },
          { role: "user", content: inputValue },
        ],
        model: "gpt-3.5-turbo",
      });
      const endTime = performance.now(); // Detener el temporizador
      setGenerationTime(endTime - startTime); // Calcular el tiempo transcurrido
      const response = JSON.parse(completion.choices[0].message.content);
      setApiResponse(response.variables); // Actualiza el estado con la respuesta
      setResponse(response.variables);
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
    const q = query(collection(db, "OperaVariables"), orderBy("timestamp"), limit(pageSize), startAfter(lastDoc));
    const data = await getDocs(q)
    setAllProducts(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    )
  };
  // Lis data by user 
  const [myProduct, setMyProduct] = useState('');
  const getMyProducts = async () => {
    const q = query(collection(db, "OperaVariables"), limit(pageSize), where('userEmail', '==', user.email), orderBy("timestamp"));
    const data = await getDocs(q)
    console.log(data);

    setMyProduct(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    )
  };

  //Add data
  const productsCollectionStore = collection(db, "OperaVariables")
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
      "Implementación de un sistema basado en inteligencia artificial para la personalización de itinerarios turísticos en tiempo real",
      "Desarrollo y evaluación de una plataforma de gestión de datos turísticos usando blockchain para la transparencia y seguridad en el sector",
      "Optimización de la logística turística mediante el uso de algoritmos de optimización y sistemas de información geográfica (SIG)",
      "Impacto de las tecnologías de realidad virtual en la promoción de destinos turísticos: Un análisis comparativo",
      "Análisis de la eficacia de los sistemas de gestión de reservas en línea y su influencia en la satisfacción del cliente en el turismo"
    ]);
    getAllProducts();

    getMyProducts();
    TitleStatus();
  }, [response, pageSize])

  const TitleStatus = () => {
    const originalTitle = document.title;

    // Función para cambiar el título cuando se cambia la visibilidad
    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = "¡🐝No te vayas no puedo vivir sin tiii... 😭💔!";
      } else {
        document.title = originalTitle;
      }
    };

    // Agregamos el evento de cambio de visibilidad
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Limpiamos el evento cuando el componente se desmonta
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.title = originalTitle; // Restauramos el título original
    };
  }


  const [cards, setCards] = useState([]);


  return (
    <div className='bg-zinc-200 dark:bg-slate-600'>
      <NavBar />
      <div className='m-4'>
        <div class="md:flex mb-4">
          <div class="mt-10 md:mt-0 w-full md:w-1/4 p-2 h-auto  md:h-screen">
            <p className='mt-10 md:mt-0 text-slate-700 dark:text-white font-bold text-center'>Describe your variables </p>
            <form onSubmit={handleSubmit} className='  rounded-xl p-1 mt-4 z-0'>
              <textarea required type="text" rows={4} className='p-4  resize-none block bg-zinc-300 dark:bg-zinc-800 w-full p-4 ps-10 text-sm pl-9  text-slate-700 dark:text-white border  dark:border-slate-400 rounded-xl placeholder-slate-700 dark:placeholder-slate-300' placeholder="Ej: Your variable 1 y Variable 02." value={inputValue}
                onChange={(e) => setInputValue(e.target.value)} />
              <div class="flex justify-center ">
                <nav className=" my-1 flex overflow-x-auto bg-slate-600 items-center p-1 space-x-1 rtl:space-x-reverse text-sm text-gray-600 bg-gray-500/5 rounded-xl dark:bg-slate-700">
                  <button
                    role="tab" type="button"
                    className={`flex whitespace-nowrap items-center h-8 px-5 font-medium rounded-lg outline-none focus:ring-2 focus:ring-salte-900 focus:ring-inset ${visibility === 'private' ? 'bg-slate-900 text-white' : 'text-slate-100  hover:text-slate-200'}`}
                    aria-selected={visibility === 'private' ? 'true' : 'false'}
                    onClick={() => handleVisibilityChange('private')}
                  > Privado
                  </button>

                  <button
                    role="tab" type="button"
                    className={`flex whitespace-nowrap items-center h-8 px-5 font-medium rounded-lg outline-none focus:ring-2 focus:ring-salte-900 focus:ring-inset ${visibility === 'public' ? 'bg-slate-900 text-white' : 'text-slate-100  hover:text-slate-200'}`}
                    aria-selected={visibility === 'public' ? 'true' : 'false'}
                    onClick={() => handleVisibilityChange('public')}
                  >Público
                  </button>
                </nav>
              </div>
              <button className=' text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm   text-center w-full h-10  '
                type="submit" disabled={buttonDisabled}>Generate
              </button>
            </form>
            <button
              onClick={handleRandomInput}
              className="flex items-center justify-start text-cyan-50 font-bold  rounded inline-flex text-sm   focus:outline-none  transition-transform transform hover:scale-105 active:scale-95 cursor-pointer "
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 pr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
              </svg>
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className='text-slate-700 dark:text-white'>Sorpréndeme</span>
            </button>

            <div className=""
              onClick={LimpiarInput}
            ><span className='text-sm text-slate-700 dark:text-white'>Limpiar</span>
            </div>
          </div>


          <div class="md:w-full p-2 text-center ">
            <div class="justify-center">
              {loading ? (
                <div className=''>
                  <ListPlaceholder />
                </div>
              ) : null}
              {response && !loading && (
                <table className="min-w-full border-collapse border border-gray-300 text-center mt-4 rounded-lg shadow-lg bg-white dark:bg-gray-800">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-gray-700">
                      <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-800 dark:text-gray-200">
                        Variable
                      </th>
                      <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-800 dark:text-gray-200">
                        Definición Operacional
                      </th>
                      <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-800 dark:text-gray-200">
                        Dimensión
                      </th>
                      <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-800 dark:text-gray-200">
                        Indicador
                      </th>
                      <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-800 dark:text-gray-200">
                        Ítems o Fórmula
                      </th>
                      <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-800 dark:text-gray-200">
                        Instrumento y Escala
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {apiResponse.map((variable, variableIndex) =>
                      variable.dimensiones.map((dimension, dimensionIndex) =>
                        dimension.indicadores.map((indicador, indicadorIndex) => (
                          <tr
                            key={`${variableIndex}-${dimensionIndex}-${indicadorIndex}`}
                            className="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-800 dark:even:bg-gray-700"
                          >
                            {dimensionIndex === 0 && indicadorIndex === 0 ? (
                              <td
                                className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-900 dark:text-gray-100"
                                rowSpan={variable.dimensiones.reduce(
                                  (total, dim) => total + dim.indicadores.length,
                                  0
                                )}
                              >
                                {variable.nombre}
                              </td>
                            ) : null}
                            {dimensionIndex === 0 && indicadorIndex === 0 ? (
                              <td
                                className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-900 dark:text-gray-100"
                                rowSpan={variable.dimensiones.reduce(
                                  (total, dim) => total + dim.indicadores.length,
                                  0
                                )}
                              >
                                {variable.definicion_operacional}
                              </td>
                            ) : null}
                            {indicadorIndex === 0 ? (
                              <td
                                className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-900 dark:text-gray-100"
                                rowSpan={dimension.indicadores.length}
                              >
                                {dimension.nombre}
                              </td>
                            ) : null}
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-900 dark:text-gray-100">
                              {indicador.nombre}
                            </td>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-900 dark:text-gray-100">
                              {indicador.items_formula}
                            </td>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-900 dark:text-gray-100">
                              {indicador.instrumento_escala}
                            </td>
                          </tr>
                        ))
                      )
                    )}
                  </tbody>
                </table>
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
                    <div className='grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 sm:z-0 ' >
                      {cantidadCardPlaceholder.map((item, id) => (
                        <CardPlaceholder key={id}></CardPlaceholder>
                      ))}
                    </div>
                  )}
                  <div className='grid xl:grid-cols-3 md:grid-cols-1 grid-cols-1 sm:z-0 '>
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

        </div>

      </div>

      <Footer></Footer>
    </div>

  );
}

