import React, { useState, useEffect } from 'react';
import OpenAI from 'openai';
import { NavBar } from '../../components/NavBar';
import { Footer } from "../../components/Footer";
import { ListSearch } from "../../components/Skeleton/ListSearch";
import ReactMarkdown from 'react-markdown';
export function Tesis() {
  const [inputValue, setInputValue] = useState('Inteligencia artificial y turismo alterno en cañete 2024');
  const [apiResponse, setApiResponse] = useState(''); // Estado para la respuesta de la primera API
  const [apiResponseMetodologia, setApiResponseMetodologia] = useState(''); // Estado para la respuesta de la segunda API
  const [textCrossRef, setTextCrossRef] = useState("");
  const [textMetodologia, setTextMetodologia] = useState("");
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);
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
      buscarEnCrossRef()
    } catch (error) {
      console.error("Error fetching response:", error);
    }
  }

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
    <div className="bg-zinc-200 dark:bg-slate-900 min-h-screen flex flex-col">
      <NavBar />
      <div className="mt-[80px] md:mt-2 flex-grow flex justify-center items-start m-2">
        <div className="max-w-3xl w-full bg-white dark:bg-gray-800 p-8 shadow-lg rounded-lg border border-gray-300 dark:border-gray-700">
          {/* Formulario de entrada */}
          <form onSubmit={handleSubmit} className="mb-6">
            <textarea
              required
              rows={2}
              className="w-full p-2 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg resize-none shadow-sm"
              placeholder="Ej: Describe el problema o pregunta."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button
              className="w-full mt-1 py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-lg shadow-lg font-semibold hover:bg-gradient-to-l focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-purple-800 transition-all"
              type="submit"
            >
              Generate
            </button>
          </form>
          {loading && (
            <div className='w-full'>
              <ListSearch />
            </div>
          )}
          {/* Contenedor de la respuesta */}
          {apiResponse && (
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md border border-gray-300 dark:border-gray-600 mb-2">
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
              <div className=" max-w-full ">
                <pre className="font-serif text-lg text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                  <ReactMarkdown>{apiResponseMetodologia}</ReactMarkdown>
                </pre>
              </div>
            </div>
          )}

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
