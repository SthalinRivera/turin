
import { useState } from "react";
import OpenAI from 'openai';
import * as FaIcons from 'react-icons/fa';
import { NavBar } from "../../components/NavBar";
import categorias from './preguntas';

export function Preguntas() {

  const [va01Input, setVa01Input] = useState(""); // Renamed the state variable
  const [va02Input, setVa02Input] = useState(""); // Renamed the state variable
  const [result, setResult] = useState("");
  const [textHistory, setTextHistory] = useState([]); // State variable to store entered text
  const [enfoqueInvestigacion, setEnfoqueInvestigacion] = useState("");
  const [tipoInvestigacion, setTipoInvestigacion] = useState("");
  const [disenoInvestigacion, setDisenoInvestigacion] = useState("");
  const [tiposDisenoExperimental, setTiposDisenoExperimental] = useState("");
  const [tiposDisenoNoExperimental, setTiposDisenoNoExperimental] = useState("");
  const [nivelInvestigacion, setNivelInvestigacion] = useState("");
  const [showTiposDisenoExperimental, setShowTiposDisenoExperimental] = useState(false); // Estado para controlar la visibilidad
  const [showTiposDisenoNoExperimental, setShowTiposDisenoNoExperimental] = useState(false); // Estado para controlar la visibilidad
  const [pregunta, setPregunta] = useState(""); // Preguntas perzonalizado
  const [isLoading, setIsLoading] = useState(false);
  const surpriseValues = [
    { va01: 'Aplicación móvil', va02: 'Mejorar proceso de ventas', enfoqueInvestigacion: 'Cuantitativo', tipoInvestigacion: 'Aplicada o Tecnológica', disenoInvestigacion: 'Experimental', tiposDisenoExperimental: 'Preexperimental', tiposDisenoNoExperimental: '', nivelInvestigacion: 'Explicativo', pregunta: '¿Cuál fue la motivación para la realización de la investigación?' },

    // Agrega más valores sorpresa según sea necesario
  ];

  const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });
  const handleSurpriseClick = () => {
    // Seleccionamos un valor sorpresa al azar de la lista
    const randomIndex = Math.floor(Math.random() * surpriseValues.length);
    const randomValue = surpriseValues[randomIndex];
    // Access the API key from .env


    // Establecemos los valores sorpresa en los campos de entrada
    setVa01Input(randomValue.va01);
    setVa02Input(randomValue.va02);
    setEnfoqueInvestigacion(randomValue.enfoqueInvestigacion);
    setTipoInvestigacion(randomValue.tipoInvestigacion);
    setDisenoInvestigacion(randomValue.disenoInvestigacion);
    setTiposDisenoExperimental(randomValue.tiposDisenoExperimental);
    setTiposDisenoNoExperimental(randomValue.tiposDisenoNoExperimental);
    setNivelInvestigacion(randomValue.nivelInvestigacion);
    setPregunta(randomValue.pregunta);
  };
  const limpiarClick = () => {
    setPregunta("");
    setIsLoading(false);
  };
  async function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true); // Mostrar el spinner mientras se carga
    try {
      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "Eres un asistente útil que proporciona respuestas"
          },
          {
            role: "user",
            content: "Por favor, responde a las preguntas como si fueras un tesista que está sustentando su tesis."
          },
          {
            role: "assistant",
            content: "Por ejemplo: En mi investigación, según estudios realizados, se encontró esto..."
          },
          {
            role: "user",
            content: `
              Variable 01: ${va01Input}, 
              Variable 02: ${va02Input}, 
              Enfoque: ${enfoqueInvestigacion}, 
              Tipo: ${tipoInvestigacion}, 
              Diseño: ${disenoInvestigacion}, 
              Tipos de Diseño Experimental: ${tiposDisenoExperimental}, 
              Tipos de Diseño No Experimental: ${tiposDisenoNoExperimental}, 
              Nivel: ${nivelInvestigacion}, 
              Pregunta: ${pregunta}`
          },
        ],
        model: "gpt-3.5-turbo",
      });

      const response = completion.choices[0].message.content;
      setResult(response); // Actualiza el estado con la respuesta
    } catch (error) {
      console.error('Error fetching response:', error);

    } finally {
      setIsLoading(false); // Ocultar el spinner después de cargar
    }
  }




  return (

    <div className='bg-zinc-200 dark:bg-slate-900'>
      <NavBar />
      <div className="min-h-screen text-white">
        <div className="container mx-auto p-4">
          <div className="flex justify-center items-center">
            <div className="relative text-center">
              <div className="mt-[80px] md:mt-4 ">
                <h1 className='mt-10 md:mt-0 text-slate-700 dark:text-white  text-lg font-bold text-center'>Generar preguntas y respuestas con IA </h1>
                <p className="mx-5 mt-2 text-slate-800 dark:text-slate-100">
                  Nuestra aplicación utiliza inteligencia artificial para generar respuestas y preguntas comunes relacionadas con tesis académicas. ¿Quieres ensayar ahora?
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 mt-6">
            {/* Formulario */}
            <div className="lg:w-1/3">
              <div className="dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h5 className="text-center text-lg font-semibold mb-4 text-slate-800 dark:text-slate-100">Ingresar algunos datos para generar tus respuestas</h5>
                <form onSubmit={onSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-800 dark:text-slate-100">Variable Independiente o Variable 01</label>
                      <input
                        type="text"
                        name="va01"
                        className="w-full p-2 mt-1 text-slate-800 dark:text-slate-100  bg-gray-300 dark:bg-gray-600 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                        placeholder=" "
                        value={va01Input}
                        onChange={(e) => setVa01Input(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-800 dark:text-slate-100">Variable Dependiente o Variable 02</label>
                      <input
                        type="text"
                        className="w-full p-2 mt-1 text-slate-800 dark:text-slate-100  bg-gray-300 dark:bg-gray-600  rounded-lg focus:ring-purple-500 focus:border-purple-500"
                        placeholder=" "
                        value={va02Input}
                        onChange={(e) => setVa02Input(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-800 dark:text-slate-100">Enfoque de investigación</label>
                      <select
                        className="w-full p-2 text-slate-800 dark:text-slate-100  bg-gray-300 dark:bg-gray-600  rounded-lg focus:ring-purple-500 focus:border-purple-500"
                        value={enfoqueInvestigacion}
                        onChange={(e) => setEnfoqueInvestigacion(e.target.value)}
                      >
                        <option value="">Seleccionar</option>
                        <option value="Cualitativo">Cualitativo</option>
                        <option value="Cuantitativo">Cuantitativo</option>
                        <option value="Mixto">Mixto</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-800 dark:text-slate-100">Tipo de investigación</label>
                      <select
                        className="w-full p-2 text-slate-800 dark:text-slate-100  bg-gray-300 dark:bg-gray-600  rounded-lg focus:ring-purple-500 focus:border-purple-500"
                        value={tipoInvestigacion}
                        onChange={(e) => setTipoInvestigacion(e.target.value)}
                      >
                        <option value="">Seleccionar</option>
                        <option value="Básica o Pura">Básica o Pura</option>
                        <option value="Aplicada o Tecnológica">Aplicada o Tecnológica</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-800 dark:text-slate-100">Diseño de investigación</label>
                      <select
                        className="w-full p-2 text-slate-800 dark:text-slate-100  bg-gray-300 dark:bg-gray-600  rounded-lg focus:ring-purple-500 focus:border-purple-500"
                        value={disenoInvestigacion}
                        onChange={(e) => {
                          setDisenoInvestigacion(e.target.value);
                          setShowTiposDisenoExperimental(e.target.value === "Experimental");
                          setShowTiposDisenoNoExperimental(e.target.value === "No experimental");
                        }}
                      >
                        <option value="">Seleccionar</option>
                        <option value="Experimental">Experimental</option>
                        <option value="No experimental">No experimental</option>
                      </select>
                    </div>
                    {showTiposDisenoExperimental && (
                      <div>
                        <label className="block text-sm font-medium text-slate-800 dark:text-slate-100">Tipos de diseño experimental</label>
                        <select
                          className="w-full p-2 text-slate-800 dark:text-slate-100  bg-gray-300 dark:bg-gray-600  rounded-lg focus:ring-purple-500 focus:border-purple-500"
                          value={tiposDisenoExperimental}
                          onChange={(e) => setTiposDisenoExperimental(e.target.value)}
                        >
                          <option value="">Seleccionar</option>
                          <option value="Preexperimental">Preexperimental</option>
                          <option value="Cuasiexperimental">Cuasiexperimental</option>
                          <option value="Experimento puro">Experimento puro</option>
                        </select>
                      </div>
                    )}
                    {showTiposDisenoNoExperimental && (
                      <div>
                        <label className="block text-sm font-medium text-slate-800 dark:text-slate-100">Tipos de diseño no experimental</label>
                        <select
                          className="w-full p-2 text-slate-800 dark:text-slate-100  bg-gray-300 dark:bg-gray-600  rounded-lg focus:ring-purple-500 focus:border-purple-500"
                          value={tiposDisenoNoExperimental}
                          onChange={(e) => setTiposDisenoNoExperimental(e.target.value)}
                        >
                          <option value="">Seleccionar</option>
                          <option value="Tranversal">Tranversal</option>
                          <option value="Longitudinal">Longitudinal</option>
                        </select>
                      </div>
                    )}
                    <div>
                      <label className="block text-sm font-medium text-slate-800 dark:text-slate-100">Nivel de investigación</label>
                      <select
                        className="w-full p-2 text-slate-800 dark:text-slate-100  bg-gray-300 dark:bg-gray-600  rounded-lg focus:ring-purple-500 focus:border-purple-500"
                        value={nivelInvestigacion}
                        onChange={(e) => setNivelInvestigacion(e.target.value)}
                      >
                        <option value="">Seleccionar</option>
                        <option value="Explicativo">Explicativo</option>
                        <option value="Correlacional">Correlacional</option>
                        <option value="Descriptivo">Descriptivo</option>
                        <option value="Exploratorio">Exploratorio</option>
                      </select>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* Datos ingresados y área de generación de IA */}
            <div className="lg:w-2/3 space-y-6">
              <div className="dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h5 className="text-lg font-semibold mb-4 text-slate-800 dark:text-slate-100">Datos ingresados</h5>
                <div className="text-sm text-slate-800 dark:text-slate-100 ">
                  <p>Variable 01: {va01Input}</p>
                  <p>Variable 02: {va02Input}</p>
                  <p>Enfoque de investigación: {enfoqueInvestigacion}</p>
                  <p>Tipo de investigación: {tipoInvestigacion}</p>
                  <p>Diseño de investigación: {disenoInvestigacion}</p>
                  <p>Tipos de diseño experimental: {tiposDisenoExperimental}</p>
                  <p>Tipos de diseño no experimental: {tiposDisenoNoExperimental}</p>
                  <p>Nivel de investigación: {nivelInvestigacion}</p>
                </div>
              </div>

              <div className="dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h5 className="text-lg font-semibold mb-4 text-slate-800 dark:text-slate-100">Ingrese su pregunta personalizada</h5>
                <form onSubmit={onSubmit}>
                  <textarea
                    rows="4"
                    className="w-full p-3 bg-slate-100 dark:bg-gray-600 rounded-lg focus:ring-purple-500 focus:border-purple-500 text-slate-800 dark:text-slate-200"
                    placeholder="Escribe tu pregunta..."
                    value={pregunta}
                    onChange={(e) => setPregunta(e.target.value)}
                  />
                  <div className="mt-4 space-y-3">
                    <input
                      type="submit"
                      className="w-full py-2 bg-purple-600 rounded-lg text-white hover:bg-purple-700 cursor-pointer"
                      value="Generar respuesta con IA"
                    />
                    <button
                      type="button"
                      className="w-full py-2 text-purple-400 hover:underline"
                      onClick={handleSurpriseClick}
                    >
                      <FaIcons.FaStarHalfAlt size="20px" className="inline-block mr-2" /> Sorpréndeme
                    </button>

                    <div className="bg-slate-100 dark:bg-gray-600 p-4 rounded-lg mt-4">
                      {isLoading ? (
                        <div className="flex justify-center">
                          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-8 w-8"></div>
                        </div>
                      ) : result ? (
                        <div>
                          <h5 className="text-lg font-semibold  text-slate-800 dark:text-slate-100">Respuesta generada:</h5>
                          <p className="text-slate-800 dark:text-slate-100">{result}</p>
                        </div>
                      ) : (
                        <p className="text-slate-800 dark:text-slate-100">No hay respuesta generada todavía.</p>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Preguntas de Investigación</h1>
            {categorias.map((categoria, index) => (
              <div key={index} className="mb-1">
                <h2 className="text-2xl font-semibold mb-4">{categoria.nombre}</h2>
                <ul className="list-disc list-inside space-y-0">
                  {categoria.preguntas.map((pregunta, idx) => (
                    <li key={idx} className="ml-4">{pregunta}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>

  );
}
