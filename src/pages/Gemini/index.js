import React, { useEffect, useState } from 'react';
import OpenAI from "openai";
import { NavBar } from "../../components/NavBar";
import {ListPlaceholder  } from "../../components/Skeleton/ListPlaceholder";

export function Gemini() {
  const { GoogleGenerativeAI } = require("@google/generative-ai");
  const [inputText, setInputText] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false); // Estado para controlar la carga
  // Access your API key as an environment variable (see "Set up your API key" above)
  const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

  const run = async () => {
    setLoading(true)
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = inputText;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    setResponse(text)
    if (text) {
      setLoading(false)
    }
    console.log(text);
  }


  return (
    <div className="h-full">
      <NavBar />
      <div className="wrapper">
        <div class="md:flex mt-20 md:mt-0 mb-4">
          <div class=" w-full md:w-1/4 p-2 h-auto   md:h-screen">

            <div className='bg-slate-100 shadow-lg p-4 rounded-lg'>
              <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Imgresar un texto</label>
              <textarea id="message" value={inputText}
                onChange={(e) => setInputText(e.target.value)} rows="2" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
              <button type="button" onClick={run} class="mt-4 w-full text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Generate text </button>

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
                      <div className="font-bold text-xl mb-2">{inputText}</div>
                      <div dangerouslySetInnerHTML={{ __html: response }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>
          {/**/}
          <div class="md:w-1/4 p-2 text-center text-sm ">
            <p className='text-black font-bold'>Selecciona un Shorcase</p>
          </div>
        </div>


        <h1 className='text-slate-800 text-2xl font-bold p-4 text-center'> Gemini google</h1>




      </div>
    </div>
  );
}
