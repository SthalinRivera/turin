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
      generateChartData(surveyList); // Generar datos para el gráfico
    } catch (error) {
      console.error("Error al obtener las encuestas:", error);
    }
  };

  // Función para generar los datos del gráfico de barras
  const generateChartData = (surveyList) => {
    const questionAverages = [1, 2, 3, 4, 5].map((qNum) => {
      const questionKey = `question${qNum}`;
      const total = surveyList.reduce((sum, survey) => sum + parseFloat(survey[questionKey] || 0), 0);
      return total / surveyList.length;
    });

    setChartData({
      labels: ['Pregunta 1', 'Pregunta 2', 'Pregunta 3', 'Pregunta 4', 'Pregunta 5'],
      datasets: [
        {
          label: 'Promedio de respuestas',
          data: questionAverages,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    });

    // Generar datos para gráficos circulares
    const pieChartData = {};
    [1, 2, 3, 4, 5].forEach((qNum) => {
      const questionKey = `question${qNum}`;
      const responseCounts = surveyList.reduce((counts, survey) => {
        const response = survey[questionKey];
        counts[response] = (counts[response] || 0) + 1;
        return counts;
      }, {});

      pieChartData[questionKey] = {
        labels: Object.keys(responseCounts),
        datasets: [
          {
            label: `Distribución de respuestas para Pregunta ${qNum}`,
            data: Object.values(responseCounts),
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
            ],
            borderWidth: 1,
          },
        ],
      };
    });

    setPieData(pieChartData);
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

                {/* Gráfico de resultados en barras */}
                {chartData && (
                  <div className="mt-8">
                    <h3 className="font-semibold text-lg mb-4">Gráfico de Promedios de Respuestas</h3>
                    <Bar data={chartData} options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          position: 'top',
                        },
                        title: {
                          display: true,
                          text: 'Promedio de Respuestas por Pregunta',
                        },
                      },
                    }} />
                  </div>
                )}

                {/* Gráficos de pastel para cada pregunta */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  {[1, 2, 3, 4, 5].map((qNum) => (
                    <div key={qNum}>
                      <h3 className="font-semibold text-lg mb-4">{`Distribución de Respuestas: Pregunta ${qNum}`}</h3>
                      {pieData[`question${qNum}`] && (
                        <Pie data={pieData[`question${qNum}`]} options={{
                          responsive: true,
                          plugins: {
                            legend: {
                              position: 'top',
                            },
                            title: {
                              display: true,
                              text: `Distribución de Respuestas para Pregunta ${qNum}`,
                            },
                          },
                        }} />
                      )}
                    </div>
                  ))}
                </div>
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
