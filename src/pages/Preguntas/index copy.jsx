
import {useAuth  } from "../../context/AuthContext";
import OpenAI from 'openai';
import { NavBar } from "../../components/NavBar";
import React, { useState } from 'react';
export function Home() {
  const { logout, user } = useAuth();
  const [inputValue, setInputValue] = useState('');
  const [response, setResponse] = useState('');

  console.log(user);
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error.message);
    }
  };

  const openai = new OpenAI({
    dangerouslyAllowBrowser: true,
     apiKey: process.env.OPENAI_API_KEY,
  });
  console.log(process.env.OPENAI_API_KEY)
  async function fetchResponse() {
    try {
      const completion = await openai.chat.completions.create({
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: inputValue }
        ],
        model: "gpt-3.5-turbo",
      });

      setResponse(completion.choices[0].message.content);
    } catch (error) {
      console.error('Error fetching response:', error);
    }
  }
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchResponse();
  };


  return (
    <>
    <NavBar />
      <div className="w-full max-w-xs m-auto text-black">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Escribe tu solicitud..."
          value={inputValue}
          onChange={handleInputChange}
        />
        <button type="submit">Enviar</button>
      </form>
      {response && <p>{response}</p>}

      
        <img src={user.photoURL} alt="Logo" /> 
        <p className="text-xl mb-4">welcome {user.displayName }</p>
        <p className="text-xl mb-4"> { user.email}</p>
        <button
            className="bg-slate-200 hover:bg-slate-300 rounded py-2 px-4 text-black"
            onClick={handleLogout}
          >
            logout
          </button>
        </div>
      </div>
    </>
  );
}
