// src/pages/Places/Places.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { NavBar } from "../../components/NavBar";
import { Footer } from "../../components/Footer";
import { SideBar } from "../../components/SideBar";
import { Edit } from "../Places/Edit";
import { FaPlusCircle } from "react-icons/fa";


export function Reports() {
  const [reports, setReports] = useState([]);

  const getReportsOperaVariables = async () => {
    const reportsCollection = collection(db, "reportsOperaVariables");
    const data = await getDocs(reportsCollection);

    // Aquí actualizamos el estado con los datos obtenidos de Firestore
    setReports(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

    // Imprimimos en consola los datos para ver lo que se está obteniendo
    console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getReportsOperaVariables();
  }, []);


  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex flex-1">
        <SideBar />
        {/* Contenido Principal */}
        <main className="flex-1 p-2 md:p-6 bg-gray-100">
          <div className="bg-white shadow-lg border p-2 md:p-4 rounded-lg font-sans">
            {/* Cabecera */}
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-lg md:text-xl font-bold">Tiempo de respuesta de API de OpenAI</h1>
              <Link to="/places/new-place">
                <button className="button text-white text-sm md:text-base px-3 py-2 rounded hover:bg-blue-700 transition flex items-center">
                  <FaPlusCircle />
                  <p className="ml-2">New Place</p>
                </button>
              </Link>
            </div>

            <hr className="my-2 md:my-4 border-gray-300" />

            {/* Tabla de Posts */}
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto text-xs md:text-sm">
                <thead className="bg-gray-50 text-gray-700 uppercase">
                  <tr>
                    <th className="px-2 py-1 md:px-4 md:py-2">#</th>
                    <th className="px-2 py-1 md:px-4 md:py-2">Time</th>
                    <th className="px-2 py-1 md:px-4 md:py-2">t_i_Letters</th>
                    <th className="px-2 py-1 md:px-4 md:py-2">t_i_Words</th>
                    <th className="px-2 py-1 md:px-4 md:py-2">t_r_Letters</th>
                    <th className="px-2 py-1 md:px-4 md:py-2">t_r_Words</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(reports) && reports.length > 0 ? (
                    reports.map((report, index) => (
                      <tr
                        key={report.id}
                        className="bg-white border-b hover:bg-gray-50"
                      >
                        <td className="px-2 py-1 md:px-4 md:py-2">{index + 1}</td>
                        <td className="px-2 py-1 md:px-4 md:py-2">{report.responseTime}</td>
                        <td className="px-2 py-1 md:px-4 md:py-2">{report.totalInputLetters}</td>
                        <td className="px-2 py-1 md:px-4 md:py-2">{report.totalInputWords}</td>
                        <td className="px-2 py-1 md:px-4 md:py-2">{report.totalResponseLetters}</td>
                        <td className="px-2 py-1 md:px-4 md:py-2">{report.totalResponseWords}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        className="text-center py-4 text-gray-500"
                      >
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
