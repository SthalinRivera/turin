import React, { useRef, useState, useEffect } from 'react';
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import Base64 from 'base64-js';
import MarkdownIt from 'markdown-it';
import { NavBar } from "../../components/NavBar";
import { Footer } from "../../components/Footer";
import { FaRobot } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";

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
      toggleCamera();
    }
  };
  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageCapture(imageSrc);
    setShowCamera(false)
  };

  useEffect(() => {

    setShowCamera(false)
    setImageCapture(null)

  }, [imageFile]);


  const toggleCamera = () => {
    setShowCamera(true)
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
        setPrompt('');
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
            model: "gemini-1.5-pro",
            safetySettings: [
              {
                category: HarmCategory.HARM_CATEGORY_HARASSMENT,
                threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
              },
            ],
          });

          const result = await model.generateContentStream({ contents });
          setPrompt('');
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
      <div className='h-full dark:bg-slate-900'>
        <NavBar></NavBar>
        <div className='wrapper '>
          <p className='mt-[80px] md:mt-4 text-center text-lg md:text-[35px] font-bold dark:text-slate-200'>Vision Gemini Pro </p>
          <p className='text-center text-sm md:text-lg dark:text-slate-200 mt-4'>Captura en Tiempo real y enterate de la magia que se puede hacer.</p>
          
          {/* Inicio de chat */}
          <div class=" bg-slate-100 dark:bg-slate-800 p-6 rounded-lg w-full mb-12">
            <div class="pr-4 h-80 overflow-y-auto" >
               {/* chat de sisitema */}
              <div class="flex gap-3 my-4 text-gray-600 text-sm flex-1">
                <span
                  class="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
                  <div class="rounded-full bg-gray-100 border p-2">
                  <FaRobot />
                  </div>
                </span>
                <p class="leading-relaxed text-slate-900 dark:text-slate-100">
                  <span class="block font-bold text-slate-900 dark:text-slate-100">AI </span>Hi, how can I help you today?
                </p>
              </div>
               {/* chat de usurario */}

              <div class="flex gap-3 my-4 text-gray-600 text-sm flex-1"><span
                class="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
                <div class="rounded-full bg-gray-100 border p-2">
                <FaRegUser />
                </div>
              </span>
                <div class="leading-relaxed"><span class="block font-bold text-slate-900 dark:text-slate-100">You </span>
                  <div className='' >
                    {imageFile && (
                      <img className=' object-cover mt-4 rounded-xl w-40  h-40' src={imageFile ? URL.createObjectURL(imageFile) : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} alt="" />
                    )}
                    {showCamera && (

                      <div className='p-2'>
                        <div className='relative justify-center'>
                          <div>
                            <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" className='  w-full mx-auto md:w-full  rounded-2xl' videoConstraints={videoConstraints} />
                          </div>
                          <div className='absolute inset-0 w-full justify-center text-center content-end '>
                            <button className=' text-slate-100   dark:text-slate-300 p-2  mt-3 bg-white rounded-full opacity-40' onClick={capture}>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="2 2" />
                              </svg>
                            </button>
                          </div>

                        </div>
                      </div>

                    )}
                    {imageCapture && (
                      <div>
                        <img className='w-full h-auto ' src={imageCapture} alt="Captured" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {output &&
                (
                  <div class="flex gap-3 my-4 text-gray-600 text-sm flex-1">
                    <span
                      class="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
                      <div class="rounded-full bg-gray-100  border p-2">
                      <FaRobot />
                      </div>
                    </span>
                    <div class="leading-relaxed"><span class="block font-bold text-slate-900 dark:text-slate-100">AI </span>
                      <div className="output text-slate-900 dark:text-slate-100" dangerouslySetInnerHTML={{ __html: output }}></div>
                    </div>
                  </div>
                )
              }
            </div>
  {/* chat de usurario */}
            <div className='w-full mx-auto xl:block  bottom-0 left-0 right-0'>
              <form onSubmit={handleSubmit} className='mt-2 md:mt-2'>
                <label for="chat" class="sr-only">Your message</label>
                <div class="flex items-center  md:py-2 px-2 md:px-3  rounded-lg ">
                  <div className="flex items-center">
                    <input
                      type="file"
                      id="hidden-file-input"
                      name="chosen-image"
                      accept="image/*"
                      onChange={(e) => setImageFile(e.target.files[0])}
                      className="hidden"
                    />
                    <div onClick={handleIconClick} className="inline-flex justify-center md:p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <button className={`md:p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 ${isActive ? 'active' : ''}`} onClick={handleClick}>
                    {isActive ? (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6" >
                        <path d="M6 12l2-2 2 2" />
                        <path d="M8 13a4 4 0 0 0 4 4m4-4a4 4 0 0 0-4-4" />
                        <path stroke-linecap="butt" d="M8 12v1m0-3v3m8 0v3" />
                        <path d="M18 14l-2 2-2-2" />
                        <path d="M8 7l.74-1.11A2 2 0 0 1 10.404 5h3.192a2 2 0 0 1 1.664.89L16 7h5v13H3V7h5z" />
                      </svg>
                    )}
                  </button>
                  <textarea id="chat" rows="2" type="text" required
                    name="prompt"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)} class="block mx-2  my-2 md:mx-4 p-1 md:p-2.5 w-full text-sm text-gray-900 bg-white dark:bg-slate-700 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your message..."></textarea>
                  <button type="submit" class="inline-flex justify-center p-1 dark:text-slate-100 rounded-full cursor-pointer hover:bg-blue-100  dark:hover:bg-gray-600">
                    <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.7639 12H10.0556M3 8.00003H5.5M4 12H5.5M4.5 16H5.5M9.96153 12.4896L9.07002 15.4486C8.73252 16.5688 8.56376 17.1289 8.70734 17.4633C8.83199 17.7537 9.08656 17.9681 9.39391 18.0415C9.74792 18.1261 10.2711 17.8645 11.3175 17.3413L19.1378 13.4311C20.059 12.9705 20.5197 12.7402 20.6675 12.4285C20.7961 12.1573 20.7961 11.8427 20.6675 11.5715C20.5197 11.2598 20.059 11.0295 19.1378 10.5689L11.3068 6.65342C10.2633 6.13168 9.74156 5.87081 9.38789 5.95502C9.0808 6.02815 8.82627 6.24198 8.70128 6.53184C8.55731 6.86569 8.72427 7.42461 9.05819 8.54246L9.96261 11.5701C10.0137 11.7411 10.0392 11.8266 10.0493 11.9137C10.0583 11.991 10.0582 12.069 10.049 12.1463C10.0387 12.2334 10.013 12.3188 9.96153 12.4896Z" />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>

      </div>

      <Footer></Footer >
    </>

  );
};


