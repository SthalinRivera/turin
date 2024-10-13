import React, { useState } from 'react';
import { useAuth } from "../../context/AuthContext";
import OpenAI from 'openai';

import { NavBar } from "../../components/NavBar";
import toast, { Toaster } from 'react-hot-toast';
import "../../index.css";
import { db } from "../../firebase";
import { collection, getDocs, getDoc, deleteDoc, addDoc, query, limit, startAfter, orderBy, where } from 'firebase/firestore';

import { ListSearch } from "../../components/Skeleton/ListSearch";

import { Footer } from "../../components/Footer/";
// Access the API key from .env
const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const Tesis = () => {

  return (
    <div className='bg-zinc-200 dark:bg-slate-900 '>
      <NavBar />
      <div className=" min-h-screen  container mx-auto p-6  rounded-lg transition-colors duration-300">

        <div className='mt-[80px] md:mt-4 '>
          <h1 className=" text-lg font-bold text-gray-900 dark:text-gray-100 mb-2 text-center">
            Tesis
          </h1>
          <p className='text-sm  text-gray-900 dark:text-gray-100 mb-6 text-center'>Herramientas de IA todo en uno para estudiantes e investigadores.</p>
        </div>

      </div>

      <Footer />
    </div>

  );
};
