import React, { useState, useEffect } from 'react';
import OpenAI from 'openai';
import { NavBar } from '../../components/NavBar';
import { Footer } from "../../components/Footer";
import { ListSearch } from "../../components/Skeleton/ListSearch";
import ReactMarkdown from 'react-markdown';
export function Tesis() {
  const [inputValue, setInputValue] = useState('');
  const [apiResponse, setApiResponse] = useState(''); // Estado para la respuesta de la primera API
  const [apiResponseMetodologia, setApiResponseMetodologia] = useState(''); // Estado para la respuesta de la segunda API
  const [apiResponseOperaVariables, setApiResponseOperaVariables] = useState(''); // Estado para la respuesta de la segunda API
  const [textCrossRef, setTextCrossRef] = useState("");
  const [textMetodologia, setTextMetodologia] = useState("");
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  // Acceso a la API de OpenAI usando la clave del entorno
  const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  // Función para obtener la respuesta de la primera API

  async function fetchResponsePG() {
    try {
      setLoading(true);
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `
              Eres un asistente útil especializado en la formulación de problemas de investigación. 
              Tu tarea es ayudar a formular problemas generales y específicos, así como objetivos generales y específicos, a partir de variables y dimensiones proporcionadas.
              
              **Tareas que debes realizar:**
              1. Generar un **problema general** (PG) usando la estructura proporcionada.
              2. Generar **tres problemas específicos** (PE1, PE2, PE3) basados en las dimensiones de la variable.
              3. Generar un **objetivo general** (OG) utilizando las variables proporcionadas.
              4. Generar **tres objetivos específicos** (OE1, OE2, OE3) que correspondan a las dimensiones de la variable.
              5. Generar un **hipótesis general** (HG) utilizando las variables proporcionadas.
              6. Generar **tres hipótesis específicos** (HE1, HE2, HE3) que correspondan a las dimensiones de la variable.
  
              Asegúrate de seguir las siguientes estructuras de formulación para generar estos problemas y objetivos y solo mostrar eso direecto.
  
              **Estructura para el Problema General (PG):**
              - EI + V + C + VP + Po + Pl + Pt = PG
              Donde:
              - **EI**: Expresión inicial (ej. "¿De qué manera…?, ¿En qué medida…?, ¿Cómo se relaciona...?, ¿Qué influencia tiene…?, ¿Cuál es el efecto…?, entre otros").
              - **V**: variable (descriptiva, correlacional: variable 1 (V1); explicativa: variable independiente (VI))
              - **C**: Conector (como "con", "en").
              - **VP**: Variable problema.
              - **Po**: Población.
              - **Pl**: Lugar.
              - **Pt**: Periodo de tiempo.

              **Estructura para los Problemas Específicos (PE1, PE2, PE3):**
              - EI + D + C + VP + Po + Pl + Pt = PE
              Donde:
              - **EI**: Expresión inicial (ej. "¿De qué manera…?, ¿En qué medida…?, ¿Cómo se relaciona...?, ¿Qué influencia tiene…?, ¿Cuál es el efecto…?, entre otros").
              - **D**: Dimensión de la variable independiente (VI).
              - **C**: Conector (relación, asociación, influencia, incidencia).
              - **VP**: Variable problema (VD).
              - **Po**: Población.
              - **Pl**: Lugar.
              - **Pt**: Periodo de tiempo.
              
              **Estructura para el Objetivo General (OG):**
              - Ve + C + V + VP + Po + Pl + Pt = OG
              Donde:
              - **Ve**: Verbo (ej. "Establecer", "Determinar", "Evaluar").
              - **C**: Conector (relación, asociación, influencia, mejora, entre otros).
              - **V**: Variable.
              - **VP**: Variable problema.
              - **Po**: Población.
              - **Pl**: Lugar.
              - **Pt**: Periodo de tiempo.
              
              **Estructura para los Objetivos Específicos (OE1, OE2, OE3):**
              - Ve + C + D + VP + Po + Pl + Pt = OE
              Donde:
              - **Ve**: Verbo (ej. "Establecer", "Determinar", "Evaluar").
              - **C**: Conector.
              - **D**: Dimensión de la variable independiente (VI).
              - **VP**: Variable problema (VD).
              - **Po**: Población.
              - **Pl**: Lugar.
              - **Pt**: Periodo de tiempo.
  
              **Estructura para el Objetivo General (HG):**
              - V + C + VP + Po + Pl + Pt = HG
              Donde:
              - **V**: variable 1 (V1)
              - **C**: Conector (relación, asociación, influencia, mejora, entre otros).
              - **VP**: variable problema (variable 2 (V2); variable dependiente (VD)).
              - **Po**: Población.
              - **Pl**: Lugar.
              - **Pt**: Periodo de tiempo.
              
              **Estructura para los hipótesis específicas (HE1, HE2, HE3):**
              - D + C + VP + Po + Pl + Pt = HE
              Donde:
              - **D**: dimensión de variable 1 (V1)
              - **C**:  conector (se relaciona, se asocia, se correlaciona)
              - **VP**: variable problema (variable 2 (V2)).
              - **Po**: Población.
              - **Pl**: Lugar-empresas, grupo de empresas, sector.
              - **Pt**: Periodo de tiempo.
              
              Una vez que hayas recibido la variable y las dimensiones proporcionadas, genera el problema general, los tres problemas específicos, el objetivo general , los tres objetivos específicos, el hipótesis general y los tres hipótesis específicos.
            `,
          },
          {
            role: "user",
            content: `A continuación te paso las variables y dimensiones necesarias para generar los problemas y objetivos. Usa las estructuras que te proporcioné para organizar la respuesta:
            ${inputValue} 
            `,
          },
        ],
      });
      setLoading(false);
      const response = completion.choices[0].message.content; // Obtener el contenido de la respuesta
      setApiResponse(response); // Guardar la respuesta en el estado
      fetchResponseMetodologia(response)
    } catch (error) {
      console.error("Error fetching response:", error);
    }
  }
  async function fetchResponseMetodologia(response) {
    try {
      setLoading2(true);
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            "role": "system",
            "content": `
              Eres un asistente útil especializado en metodología de investigación. 
              Tu tarea es ayudar a definir cada componente clave de un estudio investigativo, incluyendo Enfoque de investigación, Tipo de investigación, Diseño de investigación, Tipos de diseño experimental, Nivel de investigación, Población, Muestra y Muestreo, utilizando las estructuras proporcionadas.
              
              **Tareas que debes realizar:**
              1. Generar **Enfoque de investigación** (EI) usando la estructura proporcionada.
              2. Generar **Tipo de investigación** (TI) usando la estructura proporcionada.
              3. Generar **Diseño de investigación** (DI) usando la estructura proporcionada.
              4. Generar **Tipos de diseño experimental** (TDI) usando la estructura proporcionada.
              5. Generar **Nivel de investigación** (NI) usando la estructura proporcionada.
              6. Generar **Población** (P) usando la estructura proporcionada.
              7. Generar **Muestra** (M) usando la estructura proporcionada.
              8. Generar **Muestreo** (MT) usando la estructura proporcionada.
        
              **Enfoque de investigación (EI):**
              Según el propósito del estudio, se pueden clasificar en dos tipos: investigación básica (o pura) y aplicada. 
        
              Ejemplo: "La investigación básica busca ampliar el conocimiento teórico, como lo expone Sánchez y Velarde (2019), quien afirma que 'la ciencia básica es la ciencia que se lleva a cabo sin fines prácticos inmediatos, sino para incrementar el conocimiento de los principios fundamentales de la realidad' (p. 4)." 
        
              Por otro lado, "la investigación aplicada se centra en la solución de problemas concretos, como señala Baena (2017): 'la investigación aplicada destina sus esfuerzos a resolver las necesidades que se plantean en la sociedad' (p. 18)."
        
              **Tipo de investigación (TI):**
              Se refiere a la clasificación del estudio según su naturaleza y propósito. Puede ser cualitativa, cuantitativa o mixta.
        
              Ejemplo: "Una investigación cualitativa podría explorar las experiencias de los turistas en un destino alternativo, mientras que una cuantitativa podría medir la satisfacción del turista a través de encuestas numéricas."
        
              **Diseño de investigación (DI):**
              Es el plan o estrategia general para llevar a cabo la investigación. Los diseños pueden ser experimentales, cuasi-experimentales, correlacionales, descriptivos, etc.
        
              Ejemplo: "Un diseño experimental podría involucrar la manipulación de variables, como el impacto de un nuevo sistema de inteligencia artificial en la experiencia del turista."
        
              **Tipos de diseño experimental (TDI):**
              Incluyen diseño completamente al azar, diseño de bloques, y diseño factorial, entre otros.
        
              Ejemplo: "Un diseño factorial permitiría investigar el efecto de múltiples variables, como diferentes estrategias de marketing y la implementación de tecnología, en la satisfacción del turista."
        
              **Nivel de investigación (NI):**
              Puede clasificarse en exploratorio, descriptivo, correlacional o explicativo.
        
              Ejemplo: "Un estudio exploratorio podría investigar nuevas tendencias en turismo alternativo, mientras que un estudio explicativo podría analizar por qué ciertas tecnologías mejoran la satisfacción del turista."
        
              **Población (P):**
              Es el conjunto total de individuos o elementos que comparten características relevantes para el estudio.
        
              Ejemplo: "La población del estudio podría ser todos los turistas que visitan Cañete durante el año 2024."
        
              **Muestra (M):**
              Es un subconjunto representativo de la población seleccionada para el estudio.
        
              Ejemplo: "La muestra podría consistir en 200 turistas seleccionados aleatoriamente que visitaron Cañete durante un mes específico."
        
              **Muestreo (MT):**
              Se refiere a la técnica utilizada para seleccionar la muestra de la población.
        
              Ejemplo: "Se podría utilizar el muestreo aleatorio simple, donde cada turista tiene la misma probabilidad de ser seleccionado para participar en la investigación."
            `
          },
          {
            "role": "user",
            "content": `A continuación te paso los problemas, objetivos y hipótesis. Usa las estructuras que te proporcioné para organizar la respuesta con refencias si o si.:
            ${response} 
            `
          },
        ],
      });
      setLoading2(false);
      const responseMetodologia = completion.choices[0].message.content; // Obtener el contenido de la respuesta
      setApiResponseMetodologia(responseMetodologia); // Guardar la respuesta en el estado
      fetchResponseOperalizacionVaribles();

    } catch (error) {
      console.error("Error fetching response:", error);
    }
  }
  async function fetchResponseOperalizacionVaribles() {
    try {
      setLoading3(true); // Establecer el estado de carga a true antes de la solicitud
      console.log("sigo aka ", inputValue);

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

      const response = JSON.parse(completion.choices[0].message.content);

      setApiResponseOperaVariables(response.variables);
      console.log('llgeu hasta aqui asi que vas en  buen camino');

      buscarEnCrossRef()
    } catch (error) {
      console.error('Error fetching response:', error);
    } finally {
      setLoading3(false); // Establecer el estado de carga a false después de la solicitud
    }
  }

  // Lista de sugerencias (puedes obtener esto de una API o de otro lugar)
  const allSuggestions = [
    "Implementación de inteligencia artificial para la optimización de procesos logísticos en empresas de Cañete, 2024",
    "Desarrollo de un sistema web para la gestión académica en universidades de Latinoamérica, 2024",
    "Aplicación web para la automatización de tareas administrativas en pequeñas empresas, 2024",
    "Uso de inteligencia artificial para la detección temprana de enfermedades en el sector salud, 204",
    "Diseño de un sistema web para el control de inventarios en empresas comerciales, 2024",
    "Integración de aplicaciones web en el proceso de enseñanza a distancia en tiempos de pandemia, 2020",
    "Desarrollo de un sistema de recomendación basado en inteligencia artificial para plataformas de e-commerce, 2024",
    "Aplicación web para la gestión de proyectos de desarrollo de software en startups tecnológicas, 2024",
    "Impacto de la inteligencia artificial en la optimización de procesos productivos en la industria manufacturera, 2024",
    "Implementación de sistemas web para mejorar la interacción entre usuarios y proveedores de servicios educativos, 2024"
  ];

  // Maneja el cambio en el input
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    // Filtra las sugerencias basadas en el valor del input
    if (value) {
      const filteredSuggestions = allSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  // Maneja la selección de una sugerencia
  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    setSuggestions([]);
  };

  // Función para buscar en la API de CrossRef usando el DOI o consulta mejorada con fetch
  async function buscarEnCrossRef() {
    console.log("Este valor se envia a crossref", inputValue);

    const url = `https://api.crossref.org/works?query=${inputValue}`;
    try {
      const responseFromCrossRef = await fetch(url);
      console.log('Respuesta de la API:', responseFromCrossRef);
      const data = await responseFromCrossRef.json();
      setTextCrossRef(data.message.items)
      console.log(data.message.items);
    } catch (error) {
      console.error('Error buscando en CrossRef:', error);
      return [];
    }
  };
  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetchResponsePG(); // Inicia la cadena de llamadas a la API
  };

  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen flex flex-col">
      <NavBar />
      <div className="mt-[80px] md:mt-2 flex-grow flex justify-center items-start m-2">


        <div className="max-w-3xl min-h-screen w-full bg-white dark:bg-gray-800 p-8 shadow-lg rounded-lg border border-gray-300 dark:border-gray-700">
          {/* Formulario de entrada */}
          <div className=''>
            <h1 className=" text-lg font-bold text-gray-900 dark:text-gray-100 mb-2 text-center">
              Define tu planteamiento y metodología de tu tesis con un solo click
            </h1>
            <p className='text-sm  text-gray-900 dark:text-gray-100 mb-6 text-center'>Define rápidamente el planteamiento y la metodología de tu tesis con un solo clic, optimizando tu tiempo y esfuerzo exclusivo para estudiantes e investigadores.</p>
          </div>
          <form onSubmit={handleSubmit} className="mb-6">
            <label
              className="mx-auto relative min-w-sm max-w-2xl flex flex-col md:flex-row items-center justify-center border py-2 px-2 rounded-2xl gap-2 shadow-2xl focus-within:border-gray-300 bg-white border-gray-300 dark:bg-gray-900 dark:border-gray-700"
              htmlFor="search-bar"
            >
              <div className="relative w-full md:w-auto flex-grow">
                <input
                  id="search-bar"
                  required
                  onChange={(e) => {
                    setInputValue(e.target.value); // Actualiza el valor del input
                    handleInputChange(e); // Llama a la función handleInputChange para realizar otras acciones
                  }}
                  value={inputValue}
                  placeholder="Ej: Describe el problema o pregunta."
                  className="px-6 py-2 w-full rounded-md outline-none bg-white text-black dark:bg-gray-900 dark:text-white  dark:border-gray-700"
                />

                {/* Lista de sugerencias */}
                {suggestions.length > 0 && (
                  <ul className="absolute left-0 right-0 mt-2 bg-white border border-gray-300 dark:bg-gray-800 dark:border-gray-600 rounded-md shadow-lg z-10">
                    {suggestions.map((suggestion, index) => (
                      <li
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="px-6 py-2 cursor-pointer  text-slate-900 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                      >
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Botón */}
              <button
                type="submit"
                className="w-full md:w-auto px-6 py-3  text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none   active:scale-95 duration-100 rounded-xl transition-all disabled:opacity-70"
              >
                <div className="relative">
                  <div className="flex items-center justify-center h-3 w-3 absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 transition-all">
                    <svg
                      className="opacity-0 animate-spin w-full h-full"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  </div>
                  <div className="flex items-center transition-all opacity-1">
                    <span className="text-sm font-semibold whitespace-nowrap truncate mx-auto">
                      Generate
                    </span>
                  </div>
                </div>
              </button>
            </label>


          </form>




          {loading && (
            <div className='w-full'>
              <ListSearch />
            </div>
          )}
          {/* Contenedor de la respuesta */}
          {apiResponse && (
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md border border-gray-300 dark:border-gray-600 mb-2">
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-1 text-center">
                Planteamiento de una investigación.
              </h1>
              <div className=" max-w-full ">
                <pre className="font-serif text-lg text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                  <ReactMarkdown>{apiResponse}</ReactMarkdown>
                </pre>
              </div>
            </div>
          )}
          {loading2 && (
            <div className='w-full'>
              <ListSearch />
            </div>
          )}
          {apiResponseMetodologia && (
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md border border-gray-300 dark:border-gray-600 mb-2">
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-1 text-center">
                Metodología de la Investigación
              </h1>
              <div className=" max-w-full ">
                <pre className="font-serif text-lg text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                  <ReactMarkdown>{apiResponseMetodologia}</ReactMarkdown>
                </pre>
              </div>
            </div>
          )}
          <div class=" p-6 mb-2 overflow-y-auto h-auto">
            {loading3 ? (
              <div className=''>
                <ListSearch />
              </div>
            ) : null}
            {apiResponseOperaVariables && !loading3 && (
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-1 text-center">
                  Operacionalización de las variables
                </h1>
                <table className="min-w-full border-collapse border border-gray-300 text-center mt-4 rounded-lg shadow-lg bg-white dark:bg-gray-800">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-gray-700">
                      <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-800 dark:text-gray-200">
                        Variables
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
                    {apiResponseOperaVariables.map((variable, variableIndex) =>
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
              </div>
            )}

          </div>
          {textCrossRef.length > 0 && (
            <div className='bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md border border-gray-300 dark:border-gray-600 mb-2'>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-1 text-center"> 20 Articulos encontrados:</h2>
              <ul className="">
                {textCrossRef.map((item, index) => (
                  <li key={index} className="p-1 
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

                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>


  );
}
