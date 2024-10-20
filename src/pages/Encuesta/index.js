import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase"; // Asegúrate de tener la configuración correcta de Firebase
import { NavBar } from "../../components/NavBar";
import { Footer } from "../../components/Footer";
import { SideBar } from "../../components/SideBar";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Registrar los componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export function Encuesta() {
  const [surveys, setSurveys] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [pieData, setPieData] = useState({}); // Para gráficos de pastel

  // Función para obtener los datos desde Firebase
  const fetchSurveys = async () => {
    try {
      const surveysCollection = collection(db, "customer_satisfaction_surveys");
      const surveySnapshot = await getDocs(surveysCollection);
      const surveyList = surveySnapshot.docs.map((doc) => doc.data());
      setSurveys(surveyList);
     
    } catch (error) {
      console.error("Error al obtener las encuestas:", error);
    }
  };


  // Hook para obtener los resultados al montar el componente
  useEffect(() => {
    fetchSurveys();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex flex-1">
        <SideBar />
        <main className="flex-1 p-4 md:p-6 bg-gray-100">
          <div className="bg-white shadow-lg border p-6 rounded-lg">
            <h2 className="font-semibold text-xl mb-4">Resultados de las Encuestas</h2>

            {/* Comprobar si hay encuestas */}
            {surveys.length > 0 ? (
              <>
                <table className="table-auto w-full mb-6">
                  <thead>
                    <tr>
                      <th className="border px-4 py-2">Pregunta 1</th>
                      <th className="border px-4 py-2">Pregunta 2</th>
                      <th className="border px-4 py-2">Pregunta 3</th>
                      <th className="border px-4 py-2">Pregunta 4</th>
                      <th className="border px-4 py-2">Pregunta 5</th>
                    </tr>
                  </thead>
                  <tbody>
                    {surveys.map((survey, index) => (
                      <tr key={index}>
                        <td className="border px-4 py-2 text-center">{survey.question1}</td>
                        <td className="border px-4 py-2 text-center">{survey.question2}</td>
                        <td className="border px-4 py-2 text-center">{survey.question3}</td>
                        <td className="border px-4 py-2 text-center">{survey.question4}</td>
                        <td className="border px-4 py-2 text-center">{survey.question5}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>


              </>
            ) : (
              <p className="text-gray-600">No hay encuestas registradas.</p>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
