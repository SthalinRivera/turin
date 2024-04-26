import React from 'react';
import { useAuth } from "../../context/AuthContext";
import "../../index.css";
export function Card({ product }) {
    const { logout, user } = useAuth();
    return (
        <div className='wrapper'>

            <div class="flex flex-wrap justify-center mt-2 bg-gradient-to-r from-slate-500 via-slate-600 to-slate-700 z-40 rounded-lg drop-shadow-lg">
                <div class="p-2 w-full focus:text-white  focus:bg-indigo-900">
                    <div class="flex rounded-lg h-full w-full p-8 flex-col"> 
                        <div class="flex items-center mb-3 rounded-full p-2  bg-slate-800">
                            <div
                                class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full dark:bg-indigo-500 bg-indigo-500 text-white flex-shrink-0">
                                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                                </svg>
                            </div>
                            <h2 class="text-slate-300 dark:text-white font-medium text-sm">      {product.name}</h2>
                        </div>
                        <div class="flex flex-col justify-between flex-grow">
                            <p class="leading-relaxed text-base text-white dark:text-gray-300 text-sm">
                             {/*     <div dangerouslySetInnerHTML={{ __html: product.response }} />*/}
                            </p>

                            <div class=" mt-2 p-2 flex rounded-full items-center ">
                                <img class="w-10 h-10 rounded-full mr-4 " src={product.photoURL} alt="Avatar of Jonathan Reinink" />
                                <div class="text-sm">
                                    <p class="text-gray-900 leading-none text-slate-200">{product.userName} </p>
                                    <p class="text-gray-600 text-slate-400">Created {product.timestamp}</p>
                                </div>
                            </div>
                            <a href="#" class="mt-3 text-white dark:text-white hover:text-blue-600 inline-flex items-center">Learn More
                                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                    stroke-width="2" class="w-4 h-4 ml-2" viewBox="0 0 24 24">
                                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>




            </div>



        </div>
    );
}
