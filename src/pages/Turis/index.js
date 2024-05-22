import React, { useEffect, useState } from 'react';
import OpenAI from "openai";
import { NavBar } from "../../components/NavBar";
import { ListPlaceholder } from "../../components/Skeleton/ListPlaceholder";
import toast, { Toaster } from 'react-hot-toast';

import {  Footer} from "../../components/Footer";
import MarkdownIt from 'markdown-it';

class MarkdownRenderer extends React.Component {
  constructor(props) {
    super(props);
    this.md = new MarkdownIt();
  }

  render() {
    const { content } = this.props;
    const html = this.md.render(content);

    return (
      <p className='text-base text-[10px] md:text-sm text-left overflow-y-auto md:min-h-[460px] p-2' dangerouslySetInnerHTML={{ __html: html }} />
    );  
  }
}

export function Turis() {
  const { GoogleGenerativeAI } = require("@google/generative-ai");
  const [inputText, setInputText] = useState("");
  const [tipoText, setTipoText] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false); // Estado para controlar la carga
  const [selectedButton, setSelectedButton] = useState(""); // Nuevo estado para almacenar el botón seleccionado
  const notify = () => toast.success('Copied!')
  const [clikCopy, setClikCopy] = useState(""); // Nuevo estado para almacenar el botón seleccionado

  const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
  console.log(tipoText);
  const run = async () => {
    setLoading(true)
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = " " + tipoText + " " + inputText;
    console.log(prompt);
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    setResponse(text)
    

    if (text) {
      setLoading(false)
    }
    console.log(text);
  }

  // Función para contar letras en el input
  const countLetters = (text) => {
    return text.length;
  };
  // Copiar 
  const copyToClipboard = () => {
    navigator.clipboard.writeText(response)
      .then(() => {
        notify()
        setClikCopy("OK")
        console.log('Text copied to clipboard');
      })
      .catch((error) => {
        console.error('Error copying text to clipboard: ', error);
      });
  };


  return (
    <div className="h-screen dark:bg-slate-900">
      <NavBar />
      <div className="wrapper">
        <div className=''>
          <p className='mt-[80px] md:mt-4 text-center text-lg md:text-[35px] font-bold dark:text-slate-200'>Parafraseador </p>
          <p className='text-center text-sm md:text-lg dark:text-slate-200 mt-4'>Más de 5000 caracteres para parafrasear online utilizando nuestra plataforma Traviweb</p>
        </div>
        <div className=' mt-4 bg-slate-100  shadow-lg dark:bg-gray-700 p-2 rounded-lg'>
          <div className=''>
            <div class="flex gap-1 flex-wrap justify-start md:pt-4  max-w-full ">
              <button value="normal" onClick={(e) => { setTipoText(e.target.value); setSelectedButton("normal"); }} className={`hover:bg-gradient-to-br from-purple-600 to-blue-500  hover:text-white  text-sm md:font-bold px-1  md:px-3 md:py-1 md:me-2 md:mb-2 rounded dark:text-slate-100  ${selectedButton === "normal" ? 'bg-purple-900 text-slate-100' : ''}`}>Normal</button>

              <button
                value="intermedio"
                onClick={(e) => {
                  setTipoText(e.target.value);
                  setSelectedButton("intermedio");
                }}
                className={`hover:bg-gradient-to-br from-purple-600 to-blue-500  hover:text-white  text-sm md:font-bold px-1  md:px-3 md:py-1 md:me-2 md:mb-2 rounded dark:text-slate-100 ${selectedButton === "intermedio" ? 'bg-gradient-to-br from-purple-600 to-blue-500 text-slate-50' : ''}`}
              >
                Intermedio
              </button>

              <button
                value="corto"
                onClick={(e) => {
                  setTipoText(e.target.value);
                  setSelectedButton("corto");
                }}
                className={`hover:bg-gradient-to-br from-purple-600 to-blue-500  hover:text-white  text-sm md:font-bold px-1  md:px-3 md:py-1 md:me-2 md:mb-2 rounded dark:text-slate-100 ${selectedButton === "corto" ? 'bg-gradient-to-br from-purple-600 to-blue-500 text-slate-50' : ''}`}
              >
                Corto            </button>
              <button
                value="academico"
                onClick={(e) => {
                  setTipoText(e.target.value);
                  setSelectedButton("academico");
                }}
                className={`hover:bg-gradient-to-br from-purple-600 to-blue-500  hover:text-white text-sm md:font-bold px-1  md:px-3 md:py-1 md:me-2 md:mb-2 rounded  dark:text-slate-100 ${selectedButton === "academico" ? 'bg-gradient-to-br from-purple-600 to-blue-500 text-white' : ''}`}
              >

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 inline-flex mr-1">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                </svg> Académico

              </button>
              <button
                value="Inteligente"
                onClick={(e) => {
                  setTipoText(e.target.value);
                  setSelectedButton("Inteligente");
                }}
                className={`hover:bg-gradient-to-br from-purple-600 to-blue-500  hover:text-white text-sm md:font-bold px-1  md:px-3 md:py-1 md:me-2 md:mb-2 rounded dark:text-slate-100 ${selectedButton === "Inteligente" ? 'bg-gradient-to-br from-purple-600 to-blue-500 text-white' : ''}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 inline-flex mr-1">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                </svg>

                Inteligente
              </button>
              <button value="Creativo"
                onClick={(e) => {
                  setTipoText(e.target.value);
                  setSelectedButton("Creativo");
                }}
                className={`hover:bg-gradient-to-br from-purple-600 to-blue-500  hover:text-white text-sm md:font-bold px-1  md:px-3 md:py-1 md:me-2 md:mb-2 rounded dark:text-slate-100 ${selectedButton === "Creativo" ? 'bg-gradient-to-br from-purple-600 to-blue-500 text-white' : ''}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 inline-flex mr-1">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42" />
                </svg>

                Creativo
              </button>

            </div>
          </div>
          <div class="md:flex  md:mt-0 mb-4  ">
            <div class=" w-full md:w-1/2  h-auto ">
              <div className=''>
                <textarea id="message" value={inputText} onChange={(e) => setInputText(e.target.value)}  class="min-h-[100px] md:min-h-[460px] block mt-2 p-2.5 w-full text-[10px] md:text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your text here maximum 5,000 characters..."></textarea>
                <button type="button" onClick={run} class="mt-4 w-full text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-br hover:from-purple-700 hover:to-blue-500 hover:text-white  focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Parafrasear

                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 inline-flex ml-3">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                  </svg>

                </button>
                <p className="text-xs text-gray-500 mt-1">{countLetters(inputText)} caracteres</p>

              </div>
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
                  <p className='mx-4 mt-2 dark:text-slate-100 text-sm md:text-lg '>"Aquí se presentará el texto parafraseado"</p>
                ) : ""}

                {response && !loading && (
                  <div className='flex flex-col'>
                    <div className=''>
                      <div class="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ">
                   
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
      <Footer></Footer>
    </div>
  );
}
