import React, { useRef, useState, useEffect } from 'react';
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import Base64 from 'base64-js';
import MarkdownIt from 'markdown-it';
import { NavBar } from "../../components/NavBar";
import { Footer } from "../../components/Footer";

import Webcam from "react-webcam";
const API_KEY = process.env.REACT_APP_GEMINI_API_KEY
export const Gemini = () => {
  const [prompt, setPrompt] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [output, setOutput] = useState('');
  const webcamRef = useRef(null);
  const [imageCapture, setImageCapture] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [useFrontCamera, setUseFrontCamera] = useState(true);

  const videoConstraints = {
    width: 200,
    height: 100,
    facingMode: useFrontCamera ? "user" : { exact: "environment" }
  };
  const [isActive, setIsActive] = useState(true); // Initial state: camera active

  const handleClick = () => {
    setIsActive(!isActive);
    if (isActive) {
      setShowCamera(true)
    } else {
      toggleCamera() ;
    }
  };
  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageCapture(imageSrc);
  };
  const camera = () => {
    setShowCamera(true)
  }

  
  const toggleCamera = () => {
    setUseFrontCamera((prev) => !prev);
  };
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setOutput('Generating...');


    try {

      // Si se capturó una imagen, la agregamos a los contenidos
      if (imageCapture) {
        let capturedImageBase64 = imageCapture.split(",")[1];
        // Assemble the prompt by combining the text with the chosen image
        let contents = [
          {
            role: 'user',
            parts: [
              { inline_data: { mime_type: 'image/jpeg', data: capturedImageBase64, } },
              { text: prompt }
            ]
          }
        ];
        // Call the gemini-pro-vision model, and get a stream of results
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({
          model: "gemini-pro-vision",
          safetySettings: [
            {
              category: HarmCategory.HARM_CATEGORY_HARASSMENT,
              threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
            },
          ],
        });

        const result = await model.generateContentStream({ contents });

        // Read from the stream and interpret the output as markdown
        let buffer = [];
        let md = new MarkdownIt();
        for await (let response of result.stream) {
          buffer.push(response.text());
          setOutput(md.render(buffer.join('')));
        }

      }

      if (imageFile) {
        // Convert the image file to a base64 string

        let reader = new FileReader();
        reader.readAsArrayBuffer(imageFile);
        reader.onloadend = async () => {
          let imageBase64 = Base64.fromByteArray(new Uint8Array(reader.result));

          // Assemble the prompt by combining the text with the chosen image
          let contents = [
            {
              role: 'user',
              parts: [
                { inline_data: { mime_type: 'image/jpeg', data: imageBase64, } },
                { text: prompt }
              ]
            }
          ];

          // Call the gemini-pro-vision model, and get a stream of results
          const genAI = new GoogleGenerativeAI(API_KEY);
          const model = genAI.getGenerativeModel({
            model: "gemini-pro-vision",
            safetySettings: [
              {
                category: HarmCategory.HARM_CATEGORY_HARASSMENT,
                threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
              },
            ],
          });

          const result = await model.generateContentStream({ contents });

          // Read from the stream and interpret the output as markdown
          let buffer = [];
          let md = new MarkdownIt();
          for await (let response of result.stream) {
            buffer.push(response.text());
            setOutput(md.render(buffer.join('')));
          }
        };
      }


    } catch (e) {
      setOutput(prevOutput => prevOutput + '<hr>' + e);
    }
  };
  const handleIconClick = () => {
    document.getElementById('hidden-file-input').click();
  };
  return (
    <>
      <NavBar></NavBar>
      <div className='dark:bg-zinc-800 h-screen '>
        <div className='wrapper '>
        <div className=''>
          <p className='mt-[80px] md:mt-4 text-center text-lg md:text-[35px] font-bold dark:text-slate-200'>Vision Gemini Pro </p>
          <p className='text-center text-sm md:text-lg dark:text-slate-200 mt-4'>Captura en Tiempo real y enterate de la magia que se puede hacer.</p>
        </div>
          <form onSubmit={handleSubmit} className=' mt-4 md:mt-2'>
            <label for="chat" class="sr-only">Your message</label>
            <div class="flex items-center  md:py-2 px-2 md:px-3 bg-gray-50 rounded-lg dark:bg-gray-700">
              <div className="flex items-center">
                <input
                  type="file"
                  id="hidden-file-input"
                  name="chosen-image"
                  accept="image/*"
              
                  onChange={(e) => setImageFile(e.target.files[0])}
                  className="hidden "
                />
                <div
                  onClick={handleIconClick}
                  className="inline-flex justify-center md:p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>

              <button onClick={camera} type="button" class=" md:p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                </svg>

              </button>
              <button onClick={toggleCamera} type="button" className="md:p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"> <title id="cameraRearIconTitle">Switch the Cameras</title> <desc id="cameraRearIconDesc">Icon of a camera with a rotate sign inside</desc> <path d="M6 12l2-2 2 2" /> <path d="M8 13a4 4 0 0 0 4 4m4-4a4 4 0 0 0-4-4" /> <path stroke-linecap="butt" d="M8 12v1m0-3v3m8 0v3" /> <path d="M18 14l-2 2-2-2" /> <path d="M8 7l.74-1.11A2 2 0 0 1 10.404 5h3.192a2 2 0 0 1 1.664.89L16 7h5v13H3V7h5z" /> </svg>
              </button>
              <button
      className={`camera-button ${isActive ? 'active' : ''}`}
      onClick={handleClick}
    >
      {isActive ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          {/* Camera icon SVG */}
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          {/* Camera rear icon SVG */}
          <title id="cameraRearIconTitle">Switch the Cameras</title>
          <desc id="cameraRearIconDesc">Icon of a camera with a rotate sign inside</desc>
          <path d="M6 12l2-2 2 2" />
          <path d="M8 13a4 4 0 0 0 4 4m4-4a4 4 0 0 0-4-4" />
          <path stroke-linecap="butt" d="M8 12v1m0-3v3m8 0v3" />
          <path d="M18 14l-2 2-2-2" />
          <path d="M8 7l.74-1.11A2 2 0 0 1 10.404 5h3.192a2 2 0 0 1 1.664.89L16 7h5v13H3V7h5z" />
        </svg>
      )}
    </button>
              <textarea id="chat" rows="1" type="text"
                name="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)} class="block mx-2 md:mx-4 p-1 md:p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your message..."></textarea>
              <button type="submit" class="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-yellow-300 dark:hover:bg-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                </svg>

              </button>
            </div>
          </form>

          <img className=' object-cover mt-4 rounded-xl w-20 h-20' src={imageFile ? URL.createObjectURL(imageFile) : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
            alt=""
          />
          <div className="output dark:text-slate-100" dangerouslySetInnerHTML={{ __html: output }}></div>
          {showCamera && (
            <>
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={200}
                height={100}
                videoConstraints={videoConstraints}
              />
              <button className='bg-slate-900 text-slate-100 p-2 rounded-md mt-3' onClick={capture}>Capture photo</button>
            </>
          )}

          {imageCapture && (
            <div>
              <h2>Captured Image:</h2>
              <img src={imageCapture} alt="Captured" />
            </div>
          )}
        </div><Footer></Footer>
      </div>


    </>

  );
};


