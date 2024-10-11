import React, { useState } from 'react';
import OpenAI from 'openai';

export function Teste() {
  const [inputValue, setInputValue] = useState('');
  const [apiResponse, setApiResponse] = useState([]); // Estado para la respuesta de la API
console.log(apiResponse);

  // Access the API key from .env
  const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  async function fetchResponse() {
    try {
      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "Eres un asistente útil ."
          },
       
          { role: "user", content: inputValue },
        ],
        model: "gpt-3.5-turbo",
      });
      const response = JSON.parse(completion.choices[0].message.content);
      setApiResponse(response.variables); // Actualiza el estado con la respuesta
    } catch (error) {
      console.error('Error fetching response:', error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetchResponse(); // Asegúrate de que fetchResponse sea una función asíncrona
  };

  return (
    <div className="text-slate-900 dark:text-slate-100">
      <form onSubmit={handleSubmit} className="rounded-xl p-1 mt-4 z-0">
        <textarea
          required
          rows={4}
          className="p-4 resize-none block bg-zinc-300 dark:bg-zinc-800 w-full text-sm text-slate-700 dark:text-white border dark:border-slate-400 rounded-xl placeholder-slate-700 dark:placeholder-slate-300"
          placeholder="Ej: Your variable 1 y Variable 02."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <div className="flex justify-center">
          <nav className="my-1 flex overflow-x-auto bg-slate-600 items-center p-1 space-x-1 rtl:space-x-reverse text-sm text-gray-600 bg-gray-500/5 rounded-xl dark:bg-slate-700"></nav>
        </div>
        <button
          className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm text-center w-full h-10"
          type="submit"
        >
          Generate
        </button>
      </form>

      <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Matriz de Operacionalización de Variables</h1>
    	{apiResponse}
    </div>
    </div>
  );
}
