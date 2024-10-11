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
    setTimeout(() => navigate('/encuesta'), 2000); // Navegar después de 2 segundos
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setResponses((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-800 transition-all duration-300">
      <NavBar />
      <div className="flex flex-1">
        <SideBar />
        <main className="flex-1 p-4 md:p-6">
          <div className="bg-white dark:bg-gray-700 shadow-lg border p-6 rounded-lg">
            <div className='flex justify-between mb-4'>
              <p className="font-semibold text-xl text-gray-900 dark:text-gray-200">Customer Satisfaction Survey</p>
              <Link to="/surveys">
                <button className='bg-blue-500 text-white px-4 py-2 rounded flex items-center'>
                  <FaList />
                  <p className="text-base ml-2">List Surveys</p>
                </button>
              </Link>
            </div>

            {error && <p className="text-red-500 mb-4">{error}</p>}
            {submitted && <p className="text-green-500 mb-4">Gracias por su encuesta.</p>}

            <form onSubmit={storeSurvey}>
              <div className="grid grid-cols-1 gap-4">

                {/* Pregunta 1 */}
                <div>
                  <label className="block text-gray-700 dark:text-gray-300">1. ¿Cómo calificaría la calidad de nuestro servicio?</label>
                  <select name="question1" value={responses.question1} onChange={handleChange} className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-600 dark:text-white">
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
                  <label className="block text-gray-700 dark:text-gray-300">2. ¿Cómo evalúa la atención al cliente?</label>
                  <select name="question2" value={responses.question2} onChange={handleChange} className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-600 dark:text-white">
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
                  <label className="block text-gray-700 dark:text-gray-300">3. ¿Qué tan satisfecho está con la rapidez del servicio?</label>
                  <select name="question3" value={responses.question3} onChange={handleChange} className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-600 dark:text-white">
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
                  <label className="block text-gray-700 dark:text-gray-300">4. ¿Cómo evalúa la facilidad para contactar con nosotros?</label>
                  <select name="question4" value={responses.question4} onChange={handleChange} className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-600 dark:text-white">
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
                  <label className="block text-gray-700 dark:text-gray-300">5. ¿Qué tan probable es que recomiende nuestros servicios?</label>
                  <select name="question5" value={responses.question5} onChange={handleChange} className="w-full p-2 border rounded bg-gray-100 dark:bg-gray-600 dark:text-white">
                    <option value="">Seleccionar</option>
                    <option value="1">1 - Muy improbable</option>
                    <option value="2">2 - Improbable</option>
                    <option value="3">3 - Neutral</option>
                    <option value="4">4 - Probable</option>
                    <option value="5">5 - Muy probable</option>
                  </select>
                </div>

                <div className="col-span-2 text-right">
                  <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition-all">
                    Submit Survey
                  </button>
                </div>
              </div>
            </form>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
