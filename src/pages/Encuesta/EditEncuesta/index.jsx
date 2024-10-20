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
    question1: '',
    question2: '',
    question3: '',
    question4: '',
    question5: ''
  });

  const [options, setOptions] = useState([]); // Inicializar como un array vacío

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
      try {
        const docRef = doc(db, "survey_questions", "questions");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.questions) {
            setQuestions(data.questions);
          }
          // Asegúrate de que options sea un array
          if (Array.isArray(data.options)) {
            setOptions(data.options);
          } else {
            setOptions([]); // Si no es un array, inicializa como vacío
          }
        } else {
          console.log("No existe el documento");
        }
      } catch (error) {
        console.error("Error obteniendo preguntas:", error);
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
    saveToFirebase({ questions: updatedQuestions, options });
  };

  // Manejar cambios en las opciones y guardar en Firebase
  const handleOptionChange = (e, index) => {
    const { value } = e.target;
    const updatedOptions = [...options];
    updatedOptions[index] = value; // Actualiza la opción específica
    setOptions(updatedOptions);
    saveToFirebase({ questions, options: updatedOptions }); // Guarda cambios en Firebase
  };

  // Agregar una nueva opción
  const handleAddOption = () => {
    setOptions([...options, '']); // Agrega un campo vacío para la nueva opción
  };

  // Eliminar una opción
  const handleRemoveOption = (index) => {
    const updatedOptions = options.filter((_, i) => i !== index);
    setOptions(updatedOptions);
    saveToFirebase({ questions, options: updatedOptions }); // Guarda cambios en Firebase
  };

  // Guardar respuestas de la encuesta
  const storeSurvey = async (e) => {
    e.preventDefault();
    try {
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

                {/* Muestra las preguntas y permite editarlas */}
                {Object.keys(questions).map((key, index) => (
                  <div key={index}>
                    <div className='flex items-center'>
                      <label className="block text-gray-700">{index + 1}:</label>
                      <input
                        type="text"
                        name={key}
                        value={questions[key]}
                        onChange={handleQuestionChange}
                        className="w-full p-2 focus:outline-none rounded border  mt-1"
                      />
                    </div>
                  </div>
                ))}

                {/* Muestra las opciones para editar en un solo lugar */}
                <div>
                  <label className="block text-gray-700">Opciones:</label>
                  {options.map((option, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => handleOptionChange(e, index)}
                        className="w-full p-2 border rounded mt-1"
                      />
                      <button 
                        type="button" 
                        onClick={() => handleRemoveOption(index)}
                        className="ml-2 text-red-500 hover:text-red-700"
                      >
                        Eliminar
                      </button>
                    </div>
                  ))}
                  <button 
                    type="button" 
                    onClick={handleAddOption} 
                    className="mt-2 bg-green-500 text-white px-4 py-2 rounded"
                  >
                    Agregar Opción
                  </button>
                </div>

                {/* Botón de enviar */}
                <div className="text-center">
                  <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Guardar Respuestas</button>
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
