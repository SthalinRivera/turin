import React, { useState, useEffect } from 'react';
import { NavBar } from "../../../components/NavBar";
import { SideBar } from "../../../components/SideBar";
import { Footer } from "../../../components/Footer";
import { db } from "../../../firebase";
import { collection, doc, setDoc, getDoc, addDoc } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaList } from "react-icons/fa";

export function EditEncuesta() {
  const [questions, setQuestions] = useState({
    question1: '¿Cómo calificaría la calidad de nuestro servicio?',
    question2: '¿Cómo evalúa la atención al cliente?',
    question3: '¿Qué tan satisfecho está con la rapidez del servicio?',
    question4: '¿Cómo evalúa la facilidad para contactar con nosotros?',
    question5: '¿Qué tan probable es que recomiende nuestros servicios?'
  });

  const [options, setOptions] = useState({
    options1: ['1 - Muy insatisfecho', '2 - Insatisfecho', '3 - Neutral', '4 - Satisfecho', '5 - Muy satisfecho'],
    options2: ['1 - Muy insatisfecho', '2 - Insatisfecho', '3 - Neutral', '4 - Satisfecho', '5 - Muy satisfecho'],
    options3: ['1 - Muy insatisfecho', '2 - Insatisfecho', '3 - Neutral', '4 - Satisfecho', '5 - Muy satisfecho'],
    options4: ['1 - Muy insatisfecho', '2 - Insatisfecho', '3 - Neutral', '4 - Satisfecho', '5 - Muy satisfecho'],
    options5: ['1 - Muy improbable', '2 - Improbable', '3 - Neutro', '4 - Probable', '5 - Muy probable']
  });

  const [responses, setResponses] = useState({
    response1: '',
    response2: '',
    response3: '',
    response4: '',
    response5: ''
  });

  const navigate = useNavigate();
  const surveysCollection = collection(db, "customer_satisfaction_surveys");

  // Obtener preguntas y opciones de Firebase
  useEffect(() => {
    const fetchQuestions = async () => {
      const docRef = doc(db, "survey_questions", "questions");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.questions && data.options) {
          setQuestions(data.questions);
          setOptions(data.options);
        } else {
          console.log("Estructura de datos inesperada:", data);
        }
      } else {
        console.log("No existe el documento");
      }
    };
    fetchQuestions();
  }, []);

  // Guardar preguntas y opciones en Firebase
  const saveToFirebase = async (data) => {
    const docRef = doc(db, "survey_questions", "questions");
    await setDoc(docRef, data, { merge: true });
  };

  // Manejar cambios en las preguntas y guardar en Firebase
  const handleQuestionChange = (e) => {
    const { name, value } = e.target;
    const updatedQuestions = { ...questions, [name]: value };
    setQuestions(updatedQuestions);
    saveToFirebase({ questions: updatedQuestions, options }); // Guardar junto con las opciones
  };

  // Manejar cambios en las opciones y guardar en Firebase
  const handleOptionChange = (e, index, optionKey) => {
    const { value } = e.target;
    const updatedOptions = { ...options };
    updatedOptions[optionKey][index] = value; // Actualiza la opción específica
    setOptions(updatedOptions);
    saveToFirebase({ questions, options: updatedOptions }); // Guardar junto con las preguntas
  };

  // Manejar cambios en las respuestas
  const handleResponseChange = (e) => {
    const { name, value } = e.target;
    const updatedResponses = { ...responses, [name]: value };
    setResponses(updatedResponses);
  };

  // Guardar respuestas de la encuesta
  const storeSurvey = async (e) => {
    e.preventDefault();
    try {
      // Guarda las respuestas con un timestamp único
      await addDoc(surveysCollection, {
        ...responses,
        timestamp: new Date(),
      });
      navigate('/encuesta');
    } catch (error) {
      console.error("Error guardando respuestas:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex flex-1">
        <SideBar />
        <main className="flex-1 p-4 md:p-6 bg-gray-100">
          <div className="">
            <div className='bg-white shadow-lg border p-6 rounded-lg'>
              <div className='flex justify-between mb-4'>
                <p className="font-semibold text-xl">Modificar Encuesta de Satisfacción del Cliente</p>
                <Link to="/surveys">
                  <button className='button bg-blue-500 text-white px-4 py-2 rounded flex items-center'>
                    <FaList />
                    <p className="text-base ml-2">Listar Encuestas</p>
                  </button>
                </Link>
              </div>

              <form onSubmit={storeSurvey}>
                <div className="grid grid-cols-1 gap-4">

                  {/* Pregunta 1 */}
                  <div>
                    <div className='flex items-center'>
                      <label className="block text-gray-700">1:</label>
                      <input
                        type="text"
                        name="question1"
                        value={questions.question1}
                        onChange={handleQuestionChange}
                        className="w-full p-2 focus:outline-none  rounded"
                      />
                    </div>

                    {/* Edición de las opciones */}
                    {options.options1.map((option, index) => (
                      <input
                        key={index}
                        type="text"
                        value={option}
                        onChange={(e) => handleOptionChange(e, index, 'options1')}
                        className="w-full p-2 border rounded mt-1"
                      />
                    ))}

          
                  </div>

                  {/* Repite el patrón para las demás preguntas y respuestas */}
                  {/* Pregunta 2 */}
                  <div>
                    <div className='flex items-center'>
                      <label className="block text-gray-700">2:</label>
                      <input
                        type="text"
                        name="question2"
                        value={questions.question2}
                        onChange={handleQuestionChange}
                        className="w-full p-2 focus:outline-none rounded"
                      />
                    </div>

                    {options.options2.map((option, index) => (
                      <input
                        key={index}
                        type="text"
                        value={option}
                        onChange={(e) => handleOptionChange(e, index, 'options2')}
                        className="w-full p-2 border rounded mt-1"
                      />
                    ))}
                  </div>

                  {/* Repite para las demás preguntas (Pregunta 3, 4, 5) */}
                  
                  {/* Botón de enviar */}
                  <div className="text-center">
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Guardar Respuestas</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
