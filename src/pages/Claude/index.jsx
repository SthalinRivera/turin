import React, { useState } from "react";
import Anthropic from "@anthropic-ai/sdk";
import { NavBar } from "../../components/NavBar";
import { Footer } from "../../components/Footer";
import "../../index.css";

export function Claude() {
  const [inputValue, setInputValue] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]); // Estado para el historial de chat

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleGenerateSummary = async () => {
    if (!inputValue.trim()) {
      alert("Por favor, ingrese un texto para buscar o resumir.");
      return;
    }

    console.log("Input recibido:", inputValue);

    // Añadir el mensaje del usuario al historial
    setChatHistory((prev) => [...prev, { sender: "user", message: inputValue }]);

    setLoading(true);

    try {
      const anthropic = new Anthropic({
        apiKey: process.env.REACT_APP_ANTHROPIC_API_KEY,
        dangerouslyAllowBrowser: true,
      });

      const msg = await anthropic.messages.create({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 1000,
        temperature: 0,
        system: "Eres  un asiste o chatbot",
        messages: [
          {
            role: "user",
            content: inputValue,
          },
        ],
      });

      const generatedResponse = msg?.content?.[0]?.text || "No se pudo generar una respuesta.";
      setResponse(generatedResponse);

      // Añadir la respuesta del bot al historial
      setChatHistory((prev) => [...prev, { sender: "bot", message: generatedResponse }]);
    } catch (error) {
      console.error("Error al comunicarse con la API de Anthropic:", error);

      if (error.response) {
        console.error("Detalles del error (response):", error.response.data);
      } else if (error.request) {
        console.error("Detalles del error (request):", error.request);
      }

      const errorMessage = "Ocurrió un error al generar el resumen.";
      setResponse(errorMessage);

      // Añadir el mensaje de error al historial
      setChatHistory((prev) => [...prev, { sender: "bot", message: errorMessage }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-zinc-200 dark:bg-slate-900">
      <NavBar />
      <div className="min-h-screen container mx-auto p-6 rounded-lg transition-colors duration-300">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 mb-6 text-center">
          Buscar Revistas y Generar Resumen
        </h1>

        {/* Historial de chat */}
        <div className="w-full md:w-3/4 mx-auto bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md h-96 overflow-y-auto flex flex-col-reverse">
          {/* Historial de mensajes */}
          {chatHistory.map((chat, index) => (
            <div
              key={index}
              className={`flex mb-4 ${chat.sender === "user" ? "justify-end" : "justify-start"
                }`}
            >
              <div
                className={`px-4 py-2 rounded-lg shadow-md ${chat.sender === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                  }`}
              >
                {chat.message}
              </div>
            </div>
          ))}

          {/* Formulario flotante */}
          <div className="fixed bottom-0 w-full md:w-3/4 mx-auto left-1/2 transform -translate-x-1/2 bg-gray-50 rounded-lg dark:bg-gray-700 z-50 shadow-lg p-2">
            <form className="flex items-center">
              <input
                id="chat"
                rows="1"
                placeholder="Escribe tu consulta aquí..."
                value={inputValue}
                onChange={handleInputChange}
                className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              ></input>
              <button
                type="submit"
                onClick={handleGenerateSummary}
                disabled={loading}
                className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
              >
                <svg
                  className="w-6 h-6 rotate-90"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                </svg>
                {loading ? "Generando..." : "Enviar"}
              </button>
            </form>
          </div>
        </div>




      </div>
      <Footer />
    </div>
  );
}
