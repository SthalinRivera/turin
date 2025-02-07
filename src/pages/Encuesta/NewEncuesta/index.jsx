import React, { useState } from 'react';
import { NavBar } from "../../../components/NavBar";
import { SideBar } from "../../../components/SideBar";
import { Footer } from "../../../components/Footer";
import { db } from "../../../firebase";
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaList } from "react-icons/fa";

export function NewEncuesta() {
  const [responses, setResponses] = useState({
    question1: '',
    question2: '',
    question3: '',
    question4: '',
    question5: ''
  });

  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  // Guardar respuestas en Firebase
  const surveysCollection = collection(db, "customer_satisfaction_surveys");
  const storeSurvey = async (e) => {
    e.preventDefault();

    // Validaciones
    if (Object.values(responses).some(response => response === '')) {
      setError('Por favor, responde todas las preguntas.');
      return;
    }

    await addDoc(surveysCollection, responses);
    setSubmitted(true);
    setError('');
    setTimeout(() => navigate('/encuesta/end-encuesta'), 10); // Navegar después de 2 segundos
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setResponses((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-slate-900 transition-all duration-300">
      <NavBar />
      <div className="flex flex-1">

        <main className="flex-1 p-4 md:p-6">
          <div className="bg-white dark:bg-slate-800 shadow-lg  p-6 rounded-lg bg-white dark:bg-slate-800 rounded shadow-md w-full md:max-w-lg mx-auto mt-[80px] md:mt-4">

            {error && <p className="text-red-500 mb-4">{error}</p>}
            {submitted && <p className="text-green-500 mb-4">Gracias por su encuesta.</p>}

            <form onSubmit={storeSurvey} className="flex flex-col items-center justify-center p-4 ">
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Encuesta de Satisfacción</h2>
              <div className="w-full space-y-4">
                {/* Pregunta 1 */}
                <div>
                  <label className="block text-gray-700 dark:text-gray-300">1. ¿Qué tan intuitiva y fácil de usar encontró la interfaz de la aplicación y sus funcionalidades principales?</label>
                  <select name="question1" value={responses.question1} onChange={handleChange} className="w-full p-2 border rounded bg-gray-100 dark:bg-slate-800 dark:text-white">
                    <option value="">Seleccionar</option>
                    <option value="1">1 - Muy insatisfecho</option>
                    <option value="2">2 - Insatisfecho</option>
                    <option value="3">3 - Neutral</option>
                    <option value="4">4 - Satisfecho</option>
                    <option value="5">5 - Muy satisfecho</option>
                  </select>
                </div>

                {/* Pregunta 2 */}
                <div>
                  <label className="block text-gray-700 dark:text-gray-300">2. ¿En qué medida considera que la aplicación ha facilitado su proceso de investigación científica, como la redacción o análisis de datos?</label>
                  <select name="question2" value={responses.question2} onChange={handleChange} className="w-full p-2 border rounded bg-gray-100 dark:bg-slate-800 dark:text-white">
                    <option value="">Seleccionar</option>
                    <option value="1">1 - Muy insatisfecho</option>
                    <option value="2">2 - Insatisfecho</option>
                    <option value="3">3 - Neutral</option>
                    <option value="4">4 - Satisfecho</option>
                    <option value="5">5 - Muy satisfecho</option>
                  </select>
                </div>

                {/* Pregunta 3 */}
                <div>
                  <label className="block text-gray-700 dark:text-gray-300">3. ¿En qué medida considera que la aplicación ha mejorado su flujo de trabajo en áreas clave como la generación de texto, análisis de datos, gestión de referencias y organización de ideas?</label>
                  <select name="question3" value={responses.question3} onChange={handleChange} className="w-full p-2 border rounded bg-gray-100 dark:bg-slate-800 dark:text-white">
                    <option value="">Seleccionar</option>
                    <option value="1">1 - Muy insatisfecho</option>
                    <option value="2">2 - Insatisfecho</option>
                    <option value="3">3 - Neutral</option>
                    <option value="4">4 - Satisfecho</option>
                    <option value="5">5 - Muy satisfecho</option>
                  </select>
                </div>

                {/* Pregunta 4 */}
                <div>
                  <label className="block text-gray-700 dark:text-gray-300">4. ¿Qué tan satisfecho está con la rapidez y precisión de las respuestas generadas por las APIs de OpenAI y Gemini en la aplicación?</label>
                  <select name="question4" value={responses.question4} onChange={handleChange} className="w-full p-2 border rounded bg-gray-100 dark:bg-slate-800 dark:text-white">
                    <option value="">Seleccionar</option>
                    <option value="1">1 - Muy insatisfecho</option>
                    <option value="2">2 - Insatisfecho</option>
                    <option value="3">3 - Neutral</option>
                    <option value="4">4 - Satisfecho</option>
                    <option value="5">5 - Muy satisfecho</option>
                  </select>
                </div>

                {/* Pregunta 5 */}
                <div>
                  <label className="block text-gray-700 dark:text-gray-300">5. ¿Cómo calificaría el impacto de la aplicación en la calidad de su investigación o en la eficiencia de su trabajo?</label>
                  <select name="question5" value={responses.question5} onChange={handleChange} className="w-full p-2 border rounded bg-gray-100 dark:bg-slate-800 dark:text-white">
                    <option value="">Seleccionar</option>
                    <option value="1">1 - Muy insatisfecho</option>
                    <option value="2">2 - Insatisfech</option>
                    <option value="3">3 - Neutral</option>
                    <option value="4">4 - Satisfecho</option>
                    <option value="5">5 - Muy satisfecho</option>
                  </select>
                </div>
              </div>

              <div className="text-right mt-4">
                <button type="submit" className="flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                  </svg>
                  <span>Enviar encuesta</span>
                </button>
              </div>
            </form>


          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
