import React, { useEffect, useState } from 'react';
import OpenAI from "openai";
import { NavBar } from "../../components/NavBar";
import { ListPlaceholder } from "../../components/Skeleton/ListPlaceholder";
import { ChartComponent } from "../../components/ChartComponent";

import { db, storage } from "../../firebase";
import { collection, getDocs, getDoc, deleteDoc, doc, addDoc,query, orderBy } from 'firebase/firestore';
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
    <div className="h-full">
      <NavBar />
      <div className="wrapper">
        <p className='text-black font-bold'>Dashboard</p>
        {/*bloque fila 1*/}
        <div class="md:flex mt-20 md:mt-0 mb-4">
          {/**/}
          <div class=" w-full md:w-1/4 p-2">
            <div class="relative flex flex-col min-w-0 mb-6 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border shadow-xl">
              <div class="flex-auto p-4">
                <div class="flex flex-wrap -mx-3">
                  <div class="flex-none w-2/3 max-w-full px-3">
                    <div>
                      <p class="mb-0 font-sans font-semibold leading-normal text-sm">Places</p>
                      <h5 class="mb-0 font-bold text-[30px]">
                        43

                      </h5>
                    </div>
                  </div>
                  <div class="w-4/12 max-w-full px-3 ml-auto text-right flex items-center justify-center">
                    <div class="w-12 h-12 rounded-lg bg-gradient shadow-xl flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-lg text-center text-white">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/**/}
          <div class="md:w-1/4 p-2  ">
            <div class="relative flex flex-col min-w-0 mb-6 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border shadow-xl">
              <div class="flex-auto p-4">
                <div class="flex flex-wrap -mx-3">
                  <div class="flex-none w-2/3 max-w-full px-3 text-left">
                    <div>
                      <p class="mb-0 font-sans font-semibold leading-normal text-sm">Views</p>
                      <h5 class="mb-0 font-bold text-[30px]">43  </h5>
                    </div>
                  </div>
                  <div class="w-4/12 max-w-full px-3 ml-auto text-right flex items-center justify-center">
                    <div class="w-12 h-12 rounded-lg bg-gradient shadow-xl flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-lg text-center text-white">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/**/}
          <div class="md:w-1/4 p-2 ">
            <div class="relative flex flex-col min-w-0 mb-6 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border shadow-xl">
              <div class="flex-auto p-4">
                <div class="flex flex-wrap -mx-3">
                  <div class="flex-none w-2/3 max-w-full px-3  text-left">
                    <div>
                      <p class="mb-0 font-sans font-semibold leading-normal text-sm">Likes</p>
                      <h5 class="mb-0 font-bold text-[30px]">
                        43

                      </h5>
                    </div>
                  </div>
                  <div class="w-4/12 max-w-full px-3 ml-auto text-right flex items-center justify-center">
                    <div class="w-12 h-12 rounded-lg bg-gradient-to-tl bg-gradient shadow-xl flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-lg text-center text-white">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/**/}
          <div class="md:w-1/4 p-2 ">
            <div class="relative flex flex-col min-w-0 mb-6 break-words bg-white shadow-soft-xl rounded-2xl bg-clip-border shadow-xl">
              <div class="flex-auto p-4">
                <div class="flex flex-wrap -mx-3">
                  <div class="flex-none w-2/3 max-w-full px-3  text-left ">
                    <div>
                      <p class="mb-0 font-sans font-semibold leading-normal text-sm">Posts</p>
                      <h5 class="mb-0 font-bold text-[30px]">
                        {totalPosts}
                      </h5>
                    </div>
                  </div>
                  <div class="w-4/12 max-w-full px-3 ml-auto text-right flex items-center justify-center">
                    <div class="w-12 h-12 rounded-lg bg-gradient-to-tl bg-gradient shadow-xl flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-lg text-center text-white">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*Bloque 02*/}
        <div class="md:flex mt-20 md:mt-0 mb-4">
          {/**/}
          <div class=" w-full md:w-3/5 p-2">
            <div class="relative flex flex-col min-w-0 break-words bg-white shadow-lg rounded-2xl bg-clip-border">
              <div class="flex-auto p-4">
                <div class="flex flex-wrap -mx-3">
                  <div class="max-w-full px-3 lg:w-1/2 lg:flex-none">
                    <div class="flex flex-col h-full">
                      <p class="pt-2 mb-1 font-semibold">Built by developers</p>
                      <h5 class="font-bold">Soft UI Dashboard</h5>
                      <p class="mb-12">From colors, cards, typography to complex elements, you will find the full documentation.</p>
                      <a class="mt-auto mb-0 font-semibold leading-normal text-sm group text-slate-500" href="javascript:;">
                        Read More
                        <i class="fas fa-arrow-right ease-bounce text-sm group-hover:translate-x-1.25 ml-1 leading-normal transition-all duration-200"></i>
                      </a>
                    </div>
                  </div>
                  <div class="max-w-full px-3 mt-12 ml-auto text-center lg:mt-0 lg:w-5/12 lg:flex-none">
                    <div class="h-full bg-gradient-to-tl from-purple-700 to-pink-500 rounded-xl">
                      <img src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-dashboard/assets/img/shapes/waves-white.svg" class="absolute top-0 hidden w-1/2 h-full lg:block" alt="waves" />
                      <div class="relative flex items-center justify-center h-full">
                        <img class="relative z-20 w-full pt-6" src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-dashboard/assets/img/illustrations/rocket-white.png" alt="rocket" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/**/}
          <div class=" w-full md:w-2/5 p-2  ">
            <div className="relative flex flex-col h-full min-w-0 p-4 break-words bg-white shadow-lg rounded-2xl bg-clip-border">
              <div className="relative h-full overflow-hidden bg-cover rounded-xl" style={{ backgroundImage: "url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-dashboard/assets/img/ivancik.jpg')" }}>
                <span className="absolute top-0 left-0 w-full h-full bg-center bg-cover bg-gradient-to-tl from-gray-900 to-slate-800 opacity-80"></span>
                <div className="relative z-10 flex flex-col flex-auto h-full p-4">
                  <h5 className="pt-2 mb-6 font-bold text-white">Work with the rockets</h5>
                  <p className="text-white">Wealth creation is an evolutionarily recent positive-sum game. It is all about who take the opportunity first.</p>
                  <a className="mt-auto mb-0 font-semibold leading-normal text-white group text-sm" href="javascript:;">
                    Read More
                    <i className="fas fa-arrow-right ease-bounce text-sm group-hover:translate-x-1.25 ml-1 leading-normal transition-all duration-200"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>



        <div class="w-full max-w-full px-3 mt-0  lg:flex-none ">
          <div class="relative z-20 flex flex-col min-w-0 break-words bg-white border-0 border-solid dark:bg-gray-950 border-black-125 shadow-xl dark:shadow-soft-dark-xl rounded-2xl bg-clip-border">
            <div class="p-6 pb-0 mb-0 border-b-0 border-solid border-black-125 rounded-t-2xl">
              <h6 class="dark:text-white">Sales overview</h6>
              <p class="leading-normal text-sm dark:opacity-60">
                <i class="fa fa-arrow-up text-lime-500" aria-hidden="true"></i>
                <span class="font-semibold">4% more</span> in 2021
              </p>
            </div>
            <div class="flex-auto p-4">
              <ChartComponent {...props} data={posts}></ChartComponent>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
