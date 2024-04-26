import React, { useEffect, useState } from 'react';
import OpenAI from "openai";
import { NavBar } from "../../components/NavBar";

export function Gemini() {
  const { GoogleGenerativeAI } = require("@google/generative-ai");
  const [inputText, setInputText] = useState("generar una tabla de causa y efecto del amor");
  const [response, setResponse] = useState("");
  // Access your API key as an environment variable (see "Set up your API key" above)
  const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

  const run = async () => {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = inputText;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    setResponse(text)
    console.log(text);
  }


  return (
    <div className="h-full">

      <NavBar />
      <div className="wrapper">

        <h1 className='text-slate-800 text-2xl font-bold p-4 text-center'> Gemini google</h1>
        <div className='bg-slate-100 shadow-lg p-4 rounded-lg'>
          <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Imgresar un texto</label>
          <textarea id="message" value={inputText}
            onChange={(e) => setInputText(e.target.value)} rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
          <button type="button" onClick={run} class="mt-4 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Generate text </button>
          
        </div>
        <div className='bg-slate-100 shadow-lg rounded-lg p-4 mt-4'>
               <div dangerouslySetInnerHTML={{ __html: response }} />
        </div>
   

      </div>
    </div>
  );
}
