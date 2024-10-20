import React, { useEffect, useState } from 'react';
import OpenAI from "openai";
import { NavBar } from "../../components/NavBar";
import { Footer } from "../../components/Footer";
import { SideBar } from "../../components/SideBar";
import { ListPlaceholder } from "../../components/Skeleton/ListPlaceholder";
import { ChartComponent } from "../../components/ChartComponent";

import { db, storage } from "../../firebase";
import { collection, getDocs, getDoc, deleteDoc, doc, addDoc, query, orderBy } from 'firebase/firestore';
export function Dashboard(props) {
  const [posts, setPosts] = useState([]);



  const [totalPosts, setTotalPosts] = useState(0); // Estado para almacenar el total de posts
  const postsCollection = collection(db, "dataset");
  const getDataCharts = async () => {
    try {
      const data = await getDocs(query(postsCollection, orderBy("time", "asc")));
      setPosts(data.docs.map(doc => doc.data()));
    } catch (error) {
      console.error("Error fetching posts: ", error);
    }
  }
  const getPostsTotal = async () => {
    try {
      const data = await getDocs(query(postsCollection, orderBy("time", "asc")));
      setTotalPosts(data.docs.length); // Actualiza el total de posts
    } catch (error) {
      console.error("Error fetching posts: ", error);
    }
  }

  useEffect(() => {
    getDataCharts()
    getPostsTotal()

  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white">
      <NavBar />

      <div className="flex flex-1">
        {/* Barra Lateral */}
        <SideBar />

        {/* Contenido Principal */}
        <main className="flex-1 p-4 md:p-6 bg-gray-100 dark:bg-slate-800">
          <div className="bg-white dark:bg-slate-900 shadow-lg  p-2 md:p-4 rounded-lg font-sans">
            <p className='text-black dark:text-white font-bold'>Dashboard</p>
            {/*bloque fila 1*/}
            <div className="md:flex mt-20 md:mt-0 mb-4">
              {/**/}
              <div className="w-full md:w-1/4 p-2">
                <div className="relative flex flex-col min-w-0 mb-6 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border shadow-xl dark:bg-slate-800">
                  <div className="flex-auto p-4">
                    <div className="flex flex-wrap -mx-3">
                      <div className="flex-none w-2/3 max-w-full px-3">
                        <div>
                          <p className="mb-0 font-sans font-semibold leading-normal text-sm dark:text-gray-200">Places</p>
                          <h5 className="mb-0 font-bold text-[30px] dark:text-gray-200">43</h5>
                        </div>
                      </div>
                      <div className="w-4/12 max-w-full px-3 ml-auto text-right flex items-center justify-center">
                        <div className="w-12 h-12 rounded-lg bg-gradient shadow-xl flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-lg text-center text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/**/}
              <div className="md:w-1/4 p-2">
                <div className="relative flex flex-col min-w-0 mb-6 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border shadow-xl dark:bg-gray-800">
                  <div className="flex-auto p-4">
                    <div className="flex flex-wrap -mx-3">
                      <div className="flex-none w-2/3 max-w-full px-3 text-left">
                        <div>
                          <p className="mb-0 font-sans font-semibold leading-normal text-sm dark:text-gray-200">Views</p>
                          <h5 className="mb-0 font-bold text-[30px] dark:text-gray-200">43</h5>
                        </div>
                      </div>
                      <div className="w-4/12 max-w-full px-3 ml-auto text-right flex items-center justify-center">
                        <div className="w-12 h-12 rounded-lg bg-gradient shadow-xl flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-lg text-center text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/**/}
              <div className="md:w-1/4 p-2">
                <div className="relative flex flex-col min-w-0 mb-6 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border shadow-xl dark:bg-gray-800">
                  <div className="flex-auto p-4">
                    <div className="flex flex-wrap -mx-3">
                      <div className="flex-none w-2/3 max-w-full px-3 text-left">
                        <div>
                          <p className="mb-0 font-sans font-semibold leading-normal text-sm dark:text-gray-200">Likes</p>
                          <h5 className="mb-0 font-bold text-[30px] dark:text-gray-200">43</h5>
                        </div>
                      </div>
                      <div className="w-4/12 max-w-full px-3 ml-auto text-right flex items-center justify-center">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-tl bg-gradient shadow-xl flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-lg text-center text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/**/}
              <div className="md:w-1/4 p-2">
                <div className="relative flex flex-col min-w-0 mb-6 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border shadow-xl dark:bg-gray-800">
                  <div className="flex-auto p-4">
                    <div className="flex flex-wrap -mx-3">
                      <div className="flex-none w-2/3 max-w-full px-3 text-left">
                        <div>
                          <p className="mb-0 font-sans font-semibold leading-normal text-sm dark:text-gray-200">Posts</p>
                          <h5 className="mb-0 font-bold text-[30px] dark:text-gray-200">{totalPosts}</h5>
                        </div>
                      </div>
                      <div className="w-4/12 max-w-full px-3 ml-auto text-right flex items-center justify-center">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-tl bg-gradient shadow-xl flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-lg text-center text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bloque Fila 2 */}
            <div className="md:flex mb-4">
              <div className="md:w-2/3 p-2">
                <div className="relative flex flex-col min-w-0 mb-6 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border shadow-xl dark:bg-gray-800">
                  <div className="flex-auto p-4">
                    <h5 className="mb-0 font-bold dark:text-gray-200">Total Posts</h5>
                    <p className="dark:text-gray-200">A brief overview of your posts and analytics.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>

  );
}
