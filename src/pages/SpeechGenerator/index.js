import React, { useEffect, useState } from 'react';
import OpenAI from "openai";
import { NavBar } from "../../components/NavBar";
import data from "../SpeechGenerator/data.json";
const openai = new OpenAI({
  apiKey: process.env["REACT_APP_OPENAI_API_KEY"], // This is the default and can be omitted
  dangerouslyAllowBrowser: true
});
export function SpeechGenerator() {
  const [speechUrl, setSpeechUrl] = useState("");
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);

  const generateSpeech = async () => {
    setLoading(true);
    try {
      const mp3 = await openai.audio.speech.create({
        model: "tts-1",
        voice: "alloy",
        input: inputText,
      });
      const blob = new Blob([await mp3.arrayBuffer()], { type: "audio/mp3" });
      const url = URL.createObjectURL(blob);
      setSpeechUrl(url);
    } catch (error) {
      console.error("Error generating speech:", error);
    }
    setLoading(false);
  };

  function llenarInput() {
    setInputText(inputText)
    console.log(inputText);
  }


  return (
    <div className="bg-slate-700 h-full">

      <NavBar />
      <div className="wrapper">


        <div className="flex space-x-2  py-2 ">
          {data.map(item => (
            <div key={item.id} className="card">
              <div class="max-w-7xl mx-auto" onClick={llenarInput}>
                <div class="relative group">
                  <div class="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                  <div class="relative px-7 py-6 bg-white ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-start space-x-6">
                    <svg class="w-8 h-8 text-purple-600" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.75 6.75C6.75 5.64543 7.64543 4.75 8.75 4.75H15.25C16.3546 4.75 17.25 5.64543 17.25 6.75V19.25L12 14.75L6.75 19.25V6.75Z"></path>
                    </svg>
                    <div class="space-y-2">
                      <p class="text-slate-800" value={inputText}>   <h2>{item.description}</h2></p>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>



        <div class="bg-white border border-slate-200 grid grid-cols-6 gap-2 rounded-xl p-2 text-sm">
          <h1 class="text-center text-slate-600 text-xl font-bold col-span-6">Send Feedback</h1>
          <textarea placeholder="Enter text to convert to speech..." value={inputText}
            onChange={(e) => setInputText(e.target.value)} class="bg-slate-100 text-slate-600 h-28 placeholder:text-slate-600 placeholder:opacity-50 border border-slate-200 col-span-6 resize-none outline-none rounded-lg p-2 duration-300 focus:border-slate-600"></textarea>
          <button class="fill-slate-600 col-span-1 flex justify-center items-center rounded-lg p-2 duration-300 bg-slate-100 hover:border-slate-600 focus:fill-blue-200 focus:bg-blue-400 border border-slate-200">
            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 512 512">
              <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm177.6 62.1C192.8 334.5 218.8 352 256 352s63.2-17.5 78.4-33.9c9-9.7 24.2-10.4 33.9-1.4s10.4 24.2 1.4 33.9c-22 23.8-60 49.4-113.6 49.4s-91.7-25.5-113.6-49.4c-9-9.7-8.4-24.9 1.4-33.9s24.9-8.4 33.9 1.4zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"></path>
            </svg>
          </button>
          <button class="fill-slate-600 col-span-1 flex justify-center items-center rounded-lg p-2 duration-300 bg-slate-100 hover:border-slate-600 focus:fill-blue-200 focus:bg-blue-400 border border-slate-200">
            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 512 512">
              <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM174.6 384.1c-4.5 12.5-18.2 18.9-30.7 14.4s-18.9-18.2-14.4-30.7C146.9 319.4 198.9 288 256 288s109.1 31.4 126.6 79.9c4.5 12.5-2 26.2-14.4 30.7s-26.2-2-30.7-14.4C328.2 358.5 297.2 336 256 336s-72.2 22.5-81.4 48.1zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"></path></svg>
          </button>
          <span class="col-span-2"></span>
          <button class="bg-slate-100 stroke-slate-600 border border-slate-200 col-span-2 flex justify-center rounded-lg p-2 duration-300 hover:border-slate-600 hover:text-white focus:stroke-blue-200 focus:bg-blue-400">
            <svg fill="none" viewBox="0 0 24 24" height="30px" width="30px" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" d="M7.39999 6.32003L15.89 3.49003C19.7 2.22003 21.77 4.30003 20.51 8.11003L17.68 16.6C15.78 22.31 12.66 22.31 10.76 16.6L9.91999 14.08L7.39999 13.24C1.68999 11.34 1.68999 8.23003 7.39999 6.32003Z"></path>
              <path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" d="M10.11 13.6501L13.69 10.0601"></path>
            </svg>
          </button>

        </div>

        <br />
        <button onClick={generateSpeech} disabled={loading}>
          {loading ? "Generating..." : "Generate Speech"}
        </button>
        {speechUrl && (
          <audio controls>
            <source src={speechUrl} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
        )}
      </div>

    </div>
  );
}
