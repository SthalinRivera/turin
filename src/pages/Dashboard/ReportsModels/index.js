// src/pages/Places/Places.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebase";
import { NavBar } from "../../../components/NavBar";
import { Footer } from "../../../components/Footer";
import { SideBar } from "../../../components/SideBar";
import { FaPlusCircle, FaRedo } from "react-icons/fa";
import { Scatter } from 'react-chartjs-2'; // Para gráfico de dispersión
import { Line } from 'react-chartjs-2'; // Para gráfico de líneas
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export function ReportsModels() {
  const [reports, setReports] = useState([]);
  const [reportsGPT, setReportsGPT] = useState([]);
  const [reportsGemini, setReportsGemini] = useState([]);
  const [reportsClaude, setReportsClaude] = useState([]);

  const getReportsGPT = async () => {
    try {
      const reportsCollection = collection(db, "reportsModels");
      const Query = query(reportsCollection, where("usedModel", "==", "gpt-3.5-turbo"));
      const data = await getDocs(Query);

      console.log("Documentos obtenidos:", data.docs);  // Verifica si hay documentos
      if (data.docs.length > 0) {
        setReportsGPT(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } else {
        console.log("No se encontraron reportes para 'gpt-3.5-turbo'");
      }
    } catch (error) {
      console.error("Error al obtener los reportes de Gemini:", error);
    }
  };
  const getReportsGenimi = async () => {
    try {
      const reportsCollection = collection(db, "reportsModels");
      const geminiQuery = query(reportsCollection, where("usedModel", "==", "gemini-flash"));
      const data = await getDocs(geminiQuery);

      console.log("Documentos obtenidos:", data.docs);  // Verifica si hay documentos
      if (data.docs.length > 0) {
        setReportsGemini(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } else {
        console.log("No se encontraron reportes para 'gemini-flash'");
      }
    } catch (error) {
      console.error("Error al obtener los reportes de Gemini:", error);
    }
  };
  const getReportsClaude = async () => {
    try {
      const reportsCollection = collection(db, "reportsModels");
      const geminiQuery = query(reportsCollection, where("usedModel", "==", "claude-3.5-sonnet-20241022"));
      const data = await getDocs(geminiQuery);

      console.log("Documentos obtenidos:", data.docs);  // Verifica si hay documentos
      if (data.docs.length > 0) {
        setReportsClaude(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } else {
        console.log("No se encontraron reportes para 'claude-3.5-sonnet-20241022'");
      }
    } catch (error) {
      console.error("Error al obtener los reportes de Gemini:", error);
    }
  };
  useEffect(() => {
    getReportsGPT();
    getReportsGenimi();
    getReportsClaude();
  }, []);

  // Preparar datos para el gráfico de dispersión (OpenAI)
  const LineData1 = {
    labels: reportsGPT.map((report) => report.inputCharacters), // Usar Input Characters como etiquetas
    datasets: [
      {
        label: 'Input Characters',
        data: reportsGPT.map((report) => ({
          x: report.inputCharacters,
          y: report.responseTime, // Tiempo como Y
        })),
        fill: false,
        backgroundColor: 'rgba(75, 192, 192, 0.6)', // Color de fondo para Input
        borderColor: 'rgba(75, 192, 192, 1)', // Color sólido para Input
        pointRadius: 5, // Radio de los puntos
      }
    ],
  };
  // Preparar datos para el gráfico de dispersión (OpenAI)
  const LineData2 = {
    labels: reportsClaude.map((report) => report.inputCharacters), // Usar Input Characters como etiquetas
    datasets: [
      {
        label: 'Input Characters',
        data: reportsClaude.map((report) => ({
          x: report.inputCharacters,
          y: report.responseTime, // Tiempo como Y
        })),
        fill: false,
        backgroundColor: 'rgba(75, 192, 192, 0.6)', // Color de fondo para Input
        borderColor: 'rgba(75, 192, 192, 1)', // Color sólido para Input
        pointRadius: 5, // Radio de los puntos
      }
    ],
  };
  // Preparar datos para el gráfico de líneas (Gemini)
  const lineData = {
    labels: reportsGemini.map((report) => report.inputCharacters), // Usar Input Characters como etiquetas
    datasets: [{
      label: 'Input Characters',
      data: reportsGemini.map((report) => report.responseTime), // Respuesta de tiempo
      fill: false,
      backgroundColor: 'rgba(255, 99, 132, 0.6)',
      borderColor: 'rgba(255, 99, 132, 1)',
    },],
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Número de Caracteres', // Título del eje X
        },
      },
      y: {
        title: {
          display: true,
          text: 'Tiempo de Respuesta (Segundos)', // Título del eje Y
        },
      },
    },
  };

  const multiAxisLineData = {
    labels: reportsGPT.map((report, index) => report.inputCharacters),  // Usamos los inputCharacters como etiquetas
    datasets: [
      {
        label: 'GPT-3.5-turbo',
        data: reportsGPT.map((report) => report.responseTime), // Tiempo de respuesta para GPT-3.5
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        yAxisID: 'y',
      },
      {
        label: 'Gemini-flash',
        data: reportsGemini.map((report) => report.responseTime), // Tiempo de respuesta para Gemini
        fill: false,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        yAxisID: 'y',
      },
      {
        label: 'Claude',
        data: reportsClaude.map((report) => report.responseTime), // Tiempo de respuesta para Claude
        fill: false,
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        yAxisID: 'y',
      },
    ],
  };

  const multiAxisOptions = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Input Characters',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Response Time (Seconds)',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-900 text-black dark:text-white">
      <NavBar />
      <div className="flex flex-1">
        <SideBar className="fixed top-0 left-0 h-full w-64 bg-white dark:bg-slate-900 shadow-lg z-50" />
        {/* Contenido Principal */}
        <main className="flex-1 p-2 md:p-6 bg-gray-100 dark:bg-slate-800">
          <div className="bg-white dark:bg-slate-900 shadow-lg  p-2 md:p-4 rounded-lg font-sans">
            {/* Cabecera */}
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-lg md:text-xl font-bold">Compartivo de modelos genertivos Claude || Gemini || OpenAI</h1>
              <Link to="/reports">
                <button className="button text-white text-sm md:text-base px-3 py-2 rounded hover:bg-blue-700 transition flex items-center">
                  <FaRedo />
                  <p className="ml-2">Actualizar</p>
                </button>
              </Link>
            </div>

            <hr className="my-2 md:my-4 border-gray-300 dark:border-gray-600" />
            <div className="bg-white dark:bg-slate-900 shadow-lg p-2 md:p-4 rounded-lg font-sans">
              <h1 className="text-lg md:text-xl font-bold">Comparativa de Modelos</h1>
              <Line data={multiAxisLineData} options={multiAxisOptions} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Gráfico de dispersión (OpenAI) */}
              <div className="overflow-x-auto">
                <h1 className="text-lg md:text-xl font-bold">API Gpt-3.5-turbo</h1>
                <Line data={LineData1} options={options} />
              </div>

              {/* Gráfico de líneas (Gemini) */}
              <div className="overflow-x-auto">
                <h1 className="text-lg md:text-xl font-bold">API Gemini-1.5-flash</h1>
                <Line data={lineData} options={options} />
              </div>

              {/* Gráfico de líneas (Gemini) */}
              <div className="overflow-x-auto">
                <h1 className="text-lg md:text-xl font-bold">API Claude</h1>
                <Line data={LineData2} options={options} />
              </div>
            </div>

            <hr className="my-2 md:my-4 border-gray-300 dark:border-gray-600" />

            {/* Tabla de resultados */}
            <div className="overflow-x-auto">
              <h1 className="text-lg md:text-xl font-bold">Tiempo de respuesta de API de Gpt-3.5-turbo de OpenAI</h1>
              <table className="min-w-full table-auto text-xs md:text-sm">
                <thead className="bg-gray-50 dark:bg-slate-800 text-gray-700 dark:text-gray-300 uppercase">
                  <tr>
                    <th className="px-2 py-1 md:px-4 md:py-2">#</th>
                    <th className="px-2 py-1 md:px-4 md:py-2">Input Characters</th>
                    <th className="px-2 py-1 md:px-4 md:py-2">Output Characters</th>
                    <th className="px-2 py-1 md:px-4 md:py-2">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(reportsGPT) && reportsGPT.length > 0 ? (
                    reportsGPT.map((report, index) => (
                      <tr key={report.id} className="bg-white dark:bg-slate-900 border-b hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="px-2 py-1 md:px-4 md:py-2">{index + 1}</td>
                        <td className="px-2 py-1 md:px-4 md:py-2">{report.inputCharacters}</td>
                        <td className="px-2 py-1 md:px-4 md:py-2">{report.outputCharacters}</td>
                        <td className="px-2 py-1 md:px-4 md:py-2">{report.responseTime} Seg.</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center py-4 text-gray-500 dark:text-gray-400">
                        No hay datos disponibles.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="overflow-x-auto">
              <h1 className="text-lg md:text-xl font-bold">Tiempo de respuesta de API Gemini-1.5-flash  de Google</h1>
              <table className="min-w-full table-auto text-xs md:text-sm">
                <thead className="bg-gray-50 dark:bg-slate-800 text-gray-700 dark:text-gray-300 uppercase">
                  <tr>
                    <th className="px-2 py-1 md:px-4 md:py-2">#</th>
                    <th className="px-2 py-1 md:px-4 md:py-2">Input Characters</th>
                    <th className="px-2 py-1 md:px-4 md:py-2">Output Characters</th>
                    <th className="px-2 py-1 md:px-4 md:py-2">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(reportsGemini) && reportsGemini.length > 0 ? (
                    reportsGemini.map((report, index) => (
                      <tr key={report.id} className="bg-white dark:bg-slate-900 border-b hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="px-2 py-1 md:px-4 md:py-2">{index + 1}</td>
                        <td className="px-2 py-1 md:px-4 md:py-2">{report.inputCharacters}</td>
                        <td className="px-2 py-1 md:px-4 md:py-2">{report.outputCharacters}</td>
                        <td className="px-2 py-1 md:px-4 md:py-2">{report.responseTime} Seg.</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center py-4 text-gray-500 dark:text-gray-400">
                        No hay datos disponibles.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="overflow-x-auto">
              <h1 className="text-lg md:text-xl font-bold">Tiempo de respuesta de API Claude de Anthropic</h1>
              <table className="min-w-full table-auto text-xs md:text-sm">
                <thead className="bg-gray-50 dark:bg-slate-800 text-gray-700 dark:text-gray-300 uppercase">
                  <tr>
                    <th className="px-2 py-1 md:px-4 md:py-2">#</th>
                    <th className="px-2 py-1 md:px-4 md:py-2">Input Characters</th>
                    <th className="px-2 py-1 md:px-4 md:py-2">Output Characters</th>
                    <th className="px-2 py-1 md:px-4 md:py-2">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(reportsClaude) && reportsClaude.length > 0 ? (
                    reportsClaude.map((report, index) => (
                      <tr key={report.id} className="bg-white dark:bg-slate-900 border-b hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="px-2 py-1 md:px-4 md:py-2">{index + 1}</td>
                        <td className="px-2 py-1 md:px-4 md:py-2">{report.inputCharacters}</td>
                        <td className="px-2 py-1 md:px-4 md:py-2">{report.outputCharacters}</td>
                        <td className="px-2 py-1 md:px-4 md:py-2">{report.responseTime} Seg.</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center py-4 text-gray-500 dark:text-gray-400">
                        No hay datos disponibles.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>

  );
}
