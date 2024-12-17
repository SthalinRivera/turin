import React, { useEffect, useState } from 'react';
import OpenAI from 'openai';
import { NavBar } from '../../components/NavBar';
import { ListPlaceholder } from '../../components/Skeleton/ListPlaceholder';
import toast, { Toaster } from 'react-hot-toast';
import { Alert } from '../../components/Alert';
import { Footer } from '../../components/Footer';
import MarkdownIt from 'markdown-it';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { db } from "../../firebase";
import { collection, getDocs, getDoc, deleteDoc, addDoc, query, limit, startAfter, orderBy, where } from 'firebase/firestore';
import Anthropic from "@anthropic-ai/sdk";
import { useAuth } from "../../context/AuthContext";
// Markdown Renderer
class MarkdownRenderer extends React.Component {
  constructor(props) {
    super(props);
    this.md = new MarkdownIt();
  }

  render() {
    const { content } = this.props;
    const html = this.md.render(content);

    return (
      <p
        className="text-base text-[10px] md:text-sm text-left overflow-y-auto md:min-h-[460px] p-2"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }
}

// Main Component
export function Resumir() {
  const { logout, user } = useAuth();
  const [inputText, setInputText] = useState('');
  const [tipoText, setTipoText] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedButton, setSelectedButton] = useState('');
  const [error, setError] = useState('');
  const [selectedModel, setSelectedModel] = useState('gpt-3.5-turbo');
  const [usedModel, setUsedModel] = useState(''); // Nuevo estado para el modelo usado
  const notify = () => toast.success('Copied!');
  const [generationTime, setGenerationTime] = useState(0); // Tiempo de generación
  const [clikCopy, setClikCopy] = useState(""); // Nuevo estado para almacenar el botón seleccionado
  const handleModelChange = (model) => setSelectedModel(model);
  // Obtener la fecha y hora actual
  const currentDate = new Date().toDateString();
  const handleRun = async () => {
    if (!inputText.trim()) {
      setError('Please enter some text before Resumir.');
      return;
    }
    if (inputText.length > 5000) {
      setError('Text should not exceed 5000 characters.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      let result;
      const startTime = performance.now(); // Iniciar el temporizador
      // Conteo de palabras y letras en el input
      if (selectedModel === 'gemini-flash') {

        // Lógica para Gemini Flash
        const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const prompt = `Resumir de forma ${tipoText} el siguiente texto: ${inputText}`;
        const response = await model.generateContent(prompt);
        result = response.response.text();
      } else if (selectedModel === 'gpt-3.5-turbo') {
        // Lógica para GPT-4.5 Turbo
        // Access the API key from .env
        const openai = new OpenAI({
          apiKey: process.env["REACT_APP_OPENAI_API_KEY"], // This is the default and can be omitted
          dangerouslyAllowBrowser: true
        });

        const completion = await openai.chat.completions.create({
          messages: [
            { role: 'system', content: `Resumir de forma: ${tipoText}` },
            { role: 'user', content: inputText },
          ],
          model: 'gpt-3.5-turbo',
        });
        result = completion.choices[0].message.content || '';

      } else if (selectedModel === 'claude-3.5-sonnet-20241022') {
        // Lógica para Claude 3.5 Sonnet
        const anthropic = new Anthropic({
          apiKey: process.env.REACT_APP_ANTHROPIC_API_KEY,
          dangerouslyAllowBrowser: true,
        });
        const msg = await anthropic.messages.create({
          model: 'claude-3-5-sonnet-20241022',
          max_tokens: 1000,
          temperature: 0,
          system: `Resumir de forma: ${tipoText}`,
          messages: [{ role: 'user', content: inputText }],
        });
        result = msg?.content?.[0]?.text || '';
      }
      const endTime = performance.now(); // Detener el temporizador
      const responseTime = ((endTime - startTime) / 1000).toFixed(2); // Calcular el tiempo en segundos

      if (result) {
        const inputCharacters = inputText.length;
        const outputCharacters = result.length;
        await storeReports(inputCharacters, outputCharacters, responseTime, result);
      }
      setResponse(result || 'No se pudo generar una respuesta.');
      setUsedModel(selectedModel); // Guarda el modelo usado
    } catch (error) {
      console.error('Error:', error);
      setResponse('Ocurrió un error al generar el resumen.');
    } finally {
      setLoading(false);
    }
  };
  //Add data
  const reportsCollectionStore = collection(db, "reportsModels")
  const storeReports = async (inputCharacters, outputCharacters, responseTime, result) => {
    console.log("Almacenando en reports...");

    if (result) {
      await addDoc(reportsCollectionStore, {
        inputCharacters,
        outputCharacters,
        responseTime,
        timestamp: new Date().toISOString(),
        userEmail: user?.email || 'unknown', // Guardar el correo del usuario
        usedModel: selectedModel, // Guardar el modelo usado
      });
      console.log("Datos almacenados en reports.");
    } else {
      console.log("No hay respuesta para almacenar en reports.");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(response).then(() => {
      notify();
    });
  };
  const getIconForType = (type) => {
    const icons = {
      Inteligente: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 inline-flex mr-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
          />
        </svg>
      ),
      Academico: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 inline-flex mr-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
          />
        </svg>
      ),
      Creativo: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 inline-flex mr-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42"
          />
        </svg>
      ),
    };

    return icons[type] || null;
  };

  return (
    <div className="h-full dbg-zinc-200 dark:bg-slate-900">
      <NavBar />
      <div className="wrapper mb-12">
        <div className="mt-[80px] md:mt-4">
          <p className="mt-[80px] md:mt-4 text-center text-lg md:text-[35px] font-bold dark:text-slate-200">
            Resumidor
          </p>
          <p className="text-center text-sm md:text-lg dark:text-slate-200 mt-4">
            Más de 5000 caracteres para resumir online utilizando nuestra app Traviweb
          </p>
        </div>
        {error && <Alert message={error} />}
        <div className="mt-4 bg-slate-100 shadow-lg dark:bg-gray-700 p-2 rounded-lg">
          {/* Model Selector */}
          <div>
            <label
              htmlFor="model-select"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Selecciona el modelo de IA:
            </label>
            <select
              id="model-select"
              className="block w-full mt-2 p-2.5 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              value={selectedModel}
              onChange={(e) => handleModelChange(e.target.value)}
            >
              <option value="gpt-3.5-turbo">GPT 3.5-Turbo (OpenAI)</option>
              <option value="gemini-flash">Gemini Flash (Google)</option>
              <option value="claude-3.5-sonnet-20241022">Claude 3.5 (Anthropic)</option>
            </select>
          </div>
          {/* Buttons */}
          <div className="flex gap-1 flex-wrap justify-start md:pt-4 max-w-full">
            {['normal', 'intermedio', 'corto', 'Academico', 'Inteligente', 'Creativo'].map((type) => {
              const icon = getIconForType(type);
              return (
                <button
                  key={type}
                  value={type}
                  onClick={(e) => {
                    setTipoText(e.target.value);
                    setSelectedButton(type);
                  }}
                  className={`hover:bg-gradient-to-br from-purple-600 to-blue-500 hover:text-white text-sm md:font-bold px-3 py-1 mb-2 rounded dark:text-slate-100 ${selectedButton === type
                    ? 'bg-gradient-to-br from-purple-600 to-blue-500 text-white'
                    : ''
                    }`}
                >
                  {icon}
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              );
            })}
          </div>
          <div class="md:flex  md:mt-0 mb-4  ">
            <div class=" w-full md:w-1/2  h-auto ">
              {/* Text Area */}
              <textarea
                id="input-text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="min-h-[100px] md:min-h-[460px] block mt-2 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Write your text here (maximum 5,000 characters)..."
              />
              {/* Buttons */}
              <button
                type="button"
                onClick={handleRun}
                className="mt-4 w-full text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-br hover:from-purple-700 hover:to-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                {loading ? 'Processing...' : 'Resumir'}

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 inline-flex ml-3">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                </svg>

              </button>
            </div>
            <div class="md:w-1/2 pl-2 text-center ">
              <div class="justify-center">
                {loading ? (
                  <div className=''>

                    <ListPlaceholder>

                    </ListPlaceholder>
                  </div>
                ) : (
                  <>

                  </>
                )}

                {!response && !loading ? (
                  <p className='mx-4 mt-2 dark:text-slate-100 text-sm md:text-lg '>"Aquí se presentará el texto resumido"</p>
                ) : ""}

                {response && !loading && (
                  <div className='flex flex-col'>
                    <div className=''>
                      <div class="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ">
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                          <strong>Modelo utilizado:</strong> {usedModel || 'N/A'}
                        </p>
                        <MarkdownRenderer content={response} />
                      </div>

                      <Toaster />
                      <button onClick={copyToClipboard} className={`bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center mt-4 mr-1 ${clikCopy === "OK" ? 'bg-gradient-to-br from-purple-600 to-blue-500 text-white' : ''}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z" />
                        </svg>
                      </button>


                    </div>
                  </div>
                )}

              </div>

            </div>
          </div>
        </div>

      </div>
      <Footer />
      <Toaster />
    </div>
  );
}