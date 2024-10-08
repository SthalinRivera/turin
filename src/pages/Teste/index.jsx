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
      <table className="min-w-full border-collapse border border-gray-300 text-center mt-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Variable</th>
            <th className="border border-gray-300 px-4 py-2">Definición Operacional</th>
            <th className="border border-gray-300 px-4 py-2">Dimensión</th>
            <th className="border border-gray-300 px-4 py-2">Indicador</th>
            <th className="border border-gray-300 px-4 py-2">Ítems o Fórmula</th>
            <th className="border border-gray-300 px-4 py-2">Instrumento y Escala</th>
          </tr>
        </thead>
        <tbody>
          {apiResponse.map((variable, variableIndex) =>
            variable.dimensiones.map((dimension, dimensionIndex) =>
              dimension.indicadores.map((indicador, indicadorIndex) => (
                <tr key={`${variableIndex}-${dimensionIndex}-${indicadorIndex}`}>
                  {dimensionIndex === 0 && indicadorIndex === 0 ? (
                    <td
                      className="border border-gray-300 px-4 py-2"
                      rowSpan={variable.dimensiones.reduce((total, dim) => total + dim.indicadores.length, 0)}
                    >
                      {variable.nombre}
                    </td>
                  ) : null}
                  {dimensionIndex === 0 && indicadorIndex === 0 ? (
                    <td
                      className="border border-gray-300 px-4 py-2"
                      rowSpan={variable.dimensiones.reduce((total, dim) => total + dim.indicadores.length, 0)}
                    >
                      {variable.definicion_operacional}
                    </td>
                  ) : null}
                  {indicadorIndex === 0 ? (
                    <td
                      className="border border-gray-300 px-4 py-2"
                      rowSpan={dimension.indicadores.length}
                    >
                      {dimension.nombre}
                    </td>
                  ) : null}
                  <td className="border border-gray-300 px-4 py-2">
                    {indicador.nombre}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {indicador.items_formula}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {indicador.instrumento_escala}
                  </td>
                </tr>
              ))
            )
          )}
        </tbody>
      </table>
    </div>
    </div>
  );
}
