import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { db } from "../../../firebase";
import { NavBar } from "../../../components/NavBar";
import { Footer } from "../../../components/Footer";
import { SideBar } from "../../../components/SideBar";
import { FaPlusCircle, FaRedo } from "react-icons/fa";
import { Pie } from "react-chartjs-2"; // Usando sólo el gráfico Pie
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

export function ReportsSatisfactionUsers() {
  const [reports, setReports] = useState([]);
  const [surveys, setSurveys] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [pieData, setPieData] = useState({}); // Para gráficos de pastel
  const [questions, setQuestions] = useState({
    question1: '',
    question2: '',
    question3: '',
    question4: '',
    question5: ''
  });

  const [options, setOptions] = useState([]); // Inicializar como un array vacío


  // Función para obtener las encuestas desde Firebase
  const fetchSurveys = async () => {
    try {
      const surveysCollection = collection(db, "customer_satisfaction_surveys");
      const surveySnapshot = await getDocs(surveysCollection);
      const surveyList = surveySnapshot.docs.map((doc) => doc.data());
      setSurveys(surveyList);
      generateChartData(surveyList); // Generar datos para el gráfico
    } catch (error) {
      console.error("Error al obtener las encuestas:", error);
    }
  };

  // Función para obtener las preguntas y opciones desde Firebase
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

  // Función para generar los datos del gráfico de pastel
  const generateChartData = (surveyList) => {
    const optionMapping = {
      1: 'Muy Insatisfecho',
      2: 'Insatisfecho',
      3: 'Neutral',
      4: 'Satisfecho',
      5: 'Muy Satisfecho'
    };

    const pieChartData = {};
    Object.keys(questions).forEach((qKey) => {
      const responseCounts = surveyList.reduce((counts, survey) => {
        const response = survey[qKey];
        counts[response] = (counts[response] || 0) + 1;
        return counts;
      }, {});

      console.log('responseCounts for', qKey, responseCounts);

      // Filtrar solo las opciones que tienen respuestas
      const filteredLabels = Object.keys(responseCounts)
        .map((responseKey) => optionMapping[responseKey]) // Mapear el número al texto correspondiente
        .filter(label => label !== undefined); // Eliminar undefined si hay claves que no coinciden

      const filteredData = filteredLabels.map(label => {
        const responseKey = Object.keys(optionMapping).find(key => optionMapping[key] === label);
        return responseCounts[responseKey];
      });

      console.log('revisar que labels', filteredLabels);
      console.log('filteredData', filteredData);

      pieChartData[qKey] = {
        labels: filteredLabels, // Usa solo las etiquetas que tienen respuestas
        datasets: [
          {
            label: questions[qKey], // Usa el texto real de la pregunta
            data: filteredData, // Solo los datos correspondientes a las etiquetas filtradas
            backgroundColor: [
              'rgba(255, 99, 132, 0.9)',
              'rgba(54, 162, 235, 0.9)',
              'rgba(255, 206, 86, 0.9)',
              'rgba(75, 192, 192, 0.9)',
              'rgba(153, 102, 255, 0.6)',
            ],
            borderWidth: 1,
          },
        ],
      };
    });

    setPieData(pieChartData);
  };

  // Función para refrescar los datos al presionar el botón
  const refreshData = async () => {
    await fetchSurveys();
    await fetchQuestions();
  };
  useEffect(() => {
    refreshData();

  }, []);

  useEffect(() => {
    if (surveys.length > 0 && Object.keys(questions).length > 0 && options.length > 0) {
      generateChartData(surveys); // Genera los datos del gráfico solo cuando todos los datos están disponibles
    }
  }, [surveys, questions, options]); // Dependencias que determinan cuando generar el gráfico
  const questionOrder = ['question1', 'question2', 'question3', 'question4', 'question5'];

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-800 text-black dark:text-white">
      <NavBar />
      <div className="flex flex-1">
        <SideBar />
        <main className="flex-1 p-2 md:p-6 bg-gray-100 dark:bg-slate-800 max-w-full">
          <div className="bg-white dark:bg-slate-900 shadow-lg p-2 md:p-4 rounded-lg font-sans">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-base sm:text-lg md:text-xl font-bold">Reporte de satisfacción de usuarios</h1>
              <button onClick={refreshData} className="text-xs sm:text-sm md:text-base px-2 sm:px-3 py-1 sm:py-2 rounded hover:bg-blue-700 transition flex items-center">
                <FaRedo />
                <p className="ml-1 sm:ml-2">Actualizar</p>
              </button>
            </div>

            <hr className="my-2 md:my-4 border-gray-300 dark:border-gray-600" />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-4 sm:mt-8">
              {questionOrder.map((qKey) => (
                <div key={qKey}>
                  {pieData[qKey] && options.length > 0 && (
                    <Pie
                      data={pieData[qKey]}
                      options={{
                        responsive: true,
                        plugins: {
                          legend: {
                            position: 'top',
                          },
                          title: {
                            display: true,
                            text: questions[qKey],
                          },
                        },
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 shadow-lg p-6 rounded-lg mt-6">
            <h2 className="font-semibold text-lg sm:text-xl mb-4">Resultados de las Encuestas</h2>

            {surveys.length > 0 ? (
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead>
                    <tr>
                      {questionOrder.map((qKey) => (
                        <th key={qKey} className="border px-2 sm:px-4 py-2">
                          {questions[qKey]}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {surveys.map((survey, index) => (
                      <tr key={index}>
                        {questionOrder.map((qKey) => (
                          <td key={qKey} className="border px-2 sm:px-4 py-2 text-center">
                            {survey[qKey]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-600 dark:text-gray-400">No hay encuestas registradas.</p>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </div>

  )
}
