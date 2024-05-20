
import { useAuth } from "../../context/AuthContext";
import { NavBar } from "../NavBar";
import React, { useEffect, useRef, useState } from 'react';
import { Link } from "react-router-dom";
export function Footer() {
;

  
    return (
        <>
            <footer className="w-full mx-auto xl:block  fixed bottom-0 left-0 right-0">
                <div className=" ">
                    <div class="sticky bottom-2 p-1 md:p-5 px-6 m-2 flex items-center justify-between bg-slate-300 dark:bg-gray-900 shadow-3xl text-slate-800 dark:text-gray-400 rounded-2xl cursor-pointer">
                        <div class="flex flex-col items-center transition ease-in duration-200 hover:text-blue-400 ">
                          <Link to="/"> <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z">
                                </path>
                            </svg>
                            </Link> 
                        </div>
              
                    </div>
                </div>
            </footer>
        </>
    );
}
