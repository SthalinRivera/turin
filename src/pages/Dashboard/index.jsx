import React, { useEffect, useState } from 'react';
import { NavBar } from "../../components/NavBar";
import { Footer } from "../../components/Footer";
import { SideBar } from "../../components/SideBar";
import { db } from "../../firebase";
import { Link } from "react-router-dom";
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

export function Dashboard(props) {
  const [totalUsers, setTotalUsers] = useState(0);  // Estado para el total de usuarios
  const [totalVisits, setTotalVisits] = useState(0);  // Estado para el total de visitas
  const usersCollection = collection(db, "Users");  // Suponiendo que tienes una colección llamada "Users"
  const visitsCollection = collection(db, "visitas");  // Colección para registrar las visitas
  // Función para obtener el total de usuarios
  const getUsersTotal = async () => {
    try {
      const data = await getDocs(usersCollection);  // Obtenemos todos los usuarios
      setTotalUsers(data.docs.length);  // Contamos el número de usuarios
    } catch (error) {
      console.error("Error fetching users: ", error);
    }
  };
  // Función para obtener el total de visitas
  const getVisitsTotal = async () => {
    try {
      const data = await getDocs(visitsCollection);  // Obtenemos todas las visitas
      setTotalVisits(data.docs.length);  // Contamos el número de visitas
    } catch (error) {
      console.error("Error fetching visits: ", error);
    }
  };
  useEffect(() => {
    getUsersTotal();  // Llamamos a la función para obtener el total de usuarios
    getVisitsTotal();  // Llamamos a la función para obtener el total de visitas
  }, []);



  return (
    <div className="flex flex-col min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white transition-all">
      <NavBar />
      <div className="flex flex-1">
        <SideBar />
        <main className="flex-1 p-6 md:p-8 bg-gray-100 dark:bg-slate-800 transition-all">
          <div className="bg-white dark:bg-slate-900 shadow-xl p-4 md:p-6 rounded-xl font-sans">
            <p className='text-black dark:text-white font-bold text-xl md:text-2xl mb-6'>Dashboard</p>

            {/*bloque fila 1*/}
            <div className="md:flex mt-10 md:mt-0 mb-8 gap-6">

              {/* Card 1: Places */}
              <div className="w-full md:w-1/3 p-2">
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl transition-all transform hover:scale-105 p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-sm text-gray-500 dark:text-gray-300">Usurios</p>
                      <h5 className="font-bold text-3xl dark:text-gray-100">{totalUsers}</h5>
                    </div>
                    <div className="text-indigo-600 dark:text-indigo-400 text-3xl">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                      </svg>

                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: Views */}
              <div className="w-full md:w-1/3 p-2">
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl transition-all transform hover:scale-105 p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-sm text-gray-500 dark:text-gray-300">Visitas</p>
                      <h5 className="font-bold text-3xl dark:text-gray-100">{totalVisits}</h5>
                    </div>
                    <div className="text-green-600 dark:text-green-400 text-3xl">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      </svg>

                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3: Total Posts */}
              <div className="w-full md:w-1/3 p-2">
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl transition-all transform hover:scale-105 p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-sm text-gray-500 dark:text-gray-300">Modelos</p>
                      <h5 className="font-bold text-3xl dark:text-gray-100">03</h5>
                    </div>
                    <div className="text-purple-600 dark:text-purple-400 text-3xl">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.401-6.402M6.75 21A3.75 3.75 0 0 1 3 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 0 0 3.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008Z" />
                      </svg>

                    </div>
                  </div>
                </div>
              </div>
            </div>


            <div className="md:flex mt-10 md:mt-0 mb-8 gap-6">

              {/* Card 1: GPT-4.0 Turbo */}
              <div className="w-full md:w-1/3 p-2">
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl transition-all transform hover:scale-105 p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-sm text-gray-500 dark:text-gray-300">GPT-4.0 Turbo</p>
                      <h5 className="font-bold text-3xl dark:text-gray-100">Tokens: 234</h5>
                    </div>
                    <div className="text-indigo-600 dark:text-indigo-400 text-3xl">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0 1 12 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: Gemini Flash */}
              <div className="w-full md:w-1/3 p-2">
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl transition-all transform hover:scale-105 p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-sm text-gray-500 dark:text-gray-300">Gemini Flash</p>
                      <h5 className="font-bold text-3xl dark:text-gray-100">Tokens: 545</h5>
                    </div>
                    <div className="text-green-600 dark:text-green-400 text-3xl">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0 1 12 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3: Anthropic */}
              <div className="w-full md:w-1/3 p-2">
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl transition-all transform hover:scale-105 p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-sm text-gray-500 dark:text-gray-300">Anthropic</p>
                      <h5 className="font-bold text-3xl dark:text-gray-100">Tokens: 233</h5>
                    </div>
                    <div className="text-purple-600 dark:text-purple-400 text-3xl">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0 1 12 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5" />
                      </svg>

                    </div>
                  </div>
                </div>
              </div>

            </div>


            {/* Aquí puedes agregar gráficos u otros componentes */}
            <div className="md:flex mt-10 md:mt-0 mb-8 gap-6">

              {/* Card 2: Views */}
              <div className="w-full md:w-1/2 p-2">
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl transition-all transform hover:scale-105 p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h5 className="font-bold text-lg dark:text-gray-100">Reporte de encuesta de satisfacción de usuarios</h5>
                    </div>
                    <div className="text-green-600 dark:text-green-400 text-3xl">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-20">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
                      </svg>

                    </div>
                  </div>
                  {/* Link to Report */}
                  <Link to="/dashboard/reportsSatisfactionUsers" className="mt-4 inline-block bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition-all duration-200">
                    Ver Reporte de Encuesta

                  </Link>
                </div>
              </div>

              {/* Card 2: Views */}
              <div className="w-full md:w-1/2 p-2">
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl transition-all transform hover:scale-105 p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h5 className="font-bold text-lg dark:text-gray-100">Reporte de Tiempo de Respuesta de Modelos</h5>
                    </div>
                    <div className="text-green-600 dark:text-green-400 text-3xl">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-20">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                      </svg>

                    </div>
                  </div>
                  {/* Link to Report */}
                  <Link to="/dashboard/reportsModels" className="mt-4 inline-block bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition-all duration-200">
                    Ver Reporte de Respuesta

                  </Link>
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
