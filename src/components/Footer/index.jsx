
import { useAuth } from "../../context/AuthContext";
import { NavBar } from "../NavBar";
import React, { useEffect, useRef, useState } from 'react';
import { Link } from "react-router-dom";
export function Footer() {

    const [theme, setTheme] = useState(() => {
        // On page load or when changing themes, check localStorage for the theme
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme === 'dark' || (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            return 'dark';
        } else {
            return 'light';
        }
    });

    // Update the theme in localStorage and apply it to the HTML element
    useEffect(() => {
        localStorage.setItem('theme', theme);
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    // Function to toggle between light and dark themes
    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
    };
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
                        <div class="flex flex-col items-center transition ease-in duration-200 hover:text-blue-400 ">
                            <button onClick={toggleTheme} className={` h-10 w-10 md:h-12 md:w-12 rounded-lg md:p-2 hover:bg-gray-300 ${theme === 'dark' ? 'dark:bg-gray-700' : ''}`}>
                                <svg className={`${theme === 'dark' ? 'fill-yellow-500' : 'fill-violet-800'} block dark:hidden`} fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                                </svg>
                                <svg className={`${theme === 'dark' ? 'fill-yellow-500' : 'fill-violet-300'} hidden dark:block`} fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
