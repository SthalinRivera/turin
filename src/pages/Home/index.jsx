import React, { useEffect, useState } from 'react';
import OpenAI from 'openai';
import { useNavigate, Link } from "react-router-dom";
import { db } from "../../firebase";
import { collection, getDocs, getDoc, deleteDoc, addDoc } from 'firebase/firestore';
import { NavBar } from "../../components/NavBar";
import { Card } from "../../components/Card";
import { useAuth } from "../../context/AuthContext";

export function Home() {
  const { logout, user } = useAuth();
  const [inputValue, setInputValue] = useState('');
  const [response, setResponse] = useState('');
  const [visibility, setVisibility] = useState('')

  const handleVisibilityChange = (e) => {
    // Cambiar el estado de visibilidad basado en el radio seleccionado
    setVisibility(e.target.value === 'public');
  };
  // Obtener la fecha y hora actual
  const currentDate = new Date();

  const navigate = useNavigate()

 // const   // Access the API key from .env
  const openai = new OpenAI({
    apiKey: process.env["REACT_APP_OPENAI_API_KEY"], // This is the default and can be omitted
    dangerouslyAllowBrowser: true
  });

  async function fetchResponse() {
    try {
      const completion = await openai.chat.completions.create({
        messages: [
          { role: "system", content: "Generar una tabla en html de  una matriz de consistencia tomando en cuenta problema general y espeficicos, objetivos general y especificos, hipotisis general y especificos  y lamethologia de las giguites variables" },
          { role: "user", content: inputValue }
        ],
        model: "gpt-3.5-turbo",
      });

      setResponse(completion.choices[0].message.content);
      const respuesta = completion.choices[0].message.content
      console.log(respuesta);
      // Verifica si hay una respuesta antes de llamar a store()
      if (respuesta) {
        setResponse(respuesta);
        store(respuesta); // Llamar a store después de obtener la respuesta exitosa
      } else {
        console.log("no tengo una respuesta ");
      }
    } catch (error) {
      console.error('Error fetching response:', error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Enviando solicitud...");
    await fetchResponse();
    console.log("Solicitud enviada.");

  };

  const [products, setProducts] = useState('');
  const productsCollection = collection(db, "products")
  const getProducts = async () => {
    const data = await getDocs(productsCollection)
    //console.log("hola", data.docs);
    setProducts(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    )
    console.log(" test", products);
  }

  const productsCollectionStore = collection(db, "products")
  const userName = user.displayName
  const photoURL = user.photoURL
  const userEmail = user.email

  const store = async (respuesta) => {
    console.log("Almacenando en Firebase...");
    console.log(respuesta);
    // Verifica si hay una respuesta antes de almacenar
    if (respuesta) {
      await addDoc(productsCollectionStore, {
        name: inputValue,
        visibility: visibility,
        response: respuesta,
        timestamp: currentDate.toISOString(),
        userName: userName,
        photoURL: photoURL,
        userEmail: userEmail
      });
      console.log("Datos almacenados en Firebase.");
    } else {
      console.log("No hay respuesta para almacenar en Firebase.");
    }
    //  window.location.reload();
  }

  useEffect(() => {
    getProducts()
  }, [])


  return (
    <div>
      <NavBar />
      <div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-4">
        <div class="">
          <div class=" mt-1 relative ">
            <div class="absolute inset-y-0  left-0  flex items-center m-2 pointer-events-none">
              <svg class="w-6 h-6 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <form onSubmit={handleSubmit}>
              <input type="text" className='block w-full p-4 ps-10 text-sm pl-9 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder="Escribe tu solicitud..." value={inputValue}
                onChange={(e) => setInputValue(e.target.value)} />
              <button className='absolute inset-y-0 right-0 w-28 mt-2 mr-2 mb-2 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 ' type="submit">Generate</button>
            </form>
          </div>
          <form onSubmit={handleSubmit}>
            <div className='mt-4 bg-clip-border rounded-xl bg-white text-gray-700 shadow-md ' >
              <div class="flex">
                <div class=" relative w-3/4">
                  <textarea type="text" rows={6} className='focus:outline-none  block w-full p-4 ps-10 text-sm pl-9  border-none' placeholder="Escribe tu solicitud..." value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)} />
                </div>
                <div class="relative w-1/4 text-center">
                  <p className='text-gray-500 '> Visibility</p>
                  <input type="radio" name="hs-default-radio"
                    value="private"
                    onChange={handleVisibilityChange}
                    id="private-radio"
                    checked={!visibility}
                    class="shrink-0  border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" />
                  <label for="hs-default-radio" class="text-sm text-gray-500  dark:text-gray-400">Private</label>

                  <input type="radio" name="hs-default-radio"
                    onChange={handleVisibilityChange}
                    value="public"
                    id="private-radio"
                    checked={visibility} class="shrink-0  border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" />
                  <label for="hs-checked-radio" class="text-sm text-gray-500  dark:text-gray-400">Public</label>
                </div>
              </div>

              <div className='p-3 relative bottom-0 left-0'>
                <a href="#buttons-with-link">
                  <button
                    class=" lign-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg border border-gray-900 text-gray-900 hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85]"
                    type="button">
                    Basic
                  </button>
                </a>
                <a href="#buttons-with-link">
                  <button
                    class="ml-2 align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg border border-gray-900 text-gray-900 hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85]"
                    type="button">
                    Intermediun
                  </button>
                </a>
                <a href="#buttons-with-link">
                  <button
                    class=" ml-2 align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg border border-gray-900 text-gray-900 hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85]"
                    type="button">
                    Expert
                  </button>
                </a>
                <div class="absolute bottom-0 right-0 ">
                  <button className='m-3 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-4 text-center  ' type="submit">Generate</button>
                </div>

              </div>
            </div>
          </form>
          {response &&
            <div className='flex flex-col bg-gray-200 rounded-lg p-4 m-2'>
              <div className="max-w-sm rounded overflow-hidden shadow-lg">

                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">{inputValue}</div>
                  <p className="text-gray-700 text-base">{response}</p>
                </div>

              </div>
            </div>
          }
        </div>
      </div>
      <div className=' flex justify-center items-center'>
        <p className='text-xl '>Esplore</p>
      </div>

      <div className=' grid xl:grid-cols-2 md:grid-cols-1 grid-cols-1  '>
        {Array.isArray(products) && products.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>

    </div>

  );
}

