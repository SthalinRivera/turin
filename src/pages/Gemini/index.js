import React, {useRef, useState } from 'react';
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import Base64 from 'base64-js';
import MarkdownIt from 'markdown-it';
import { NavBar } from "../../components/NavBar";
import { Footer } from "../../components/Footer";

import Webcam from "react-webcam";


const API_KEY = 'AIzaSyCD6vY9uhhaukCegaaru8CtXXXL7knKR7Y';
export const Gemini = () => {
  const [prompt, setPrompt] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [output, setOutput] = useState('');
  const webcamRef = useRef(null);
  const [image, setImage] = useState('');

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setOutput('Generating...');

    try {
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
    } catch (e) {
      setOutput(prevOutput => prevOutput + '<hr>' + e);
    }
  };

  return (
    <>

      <div className='dark:bg-zinc-800 h-screen'>    <NavBar></NavBar>
        <div className='wrapper mt-10 '>
          <form onSubmit={handleSubmit}>
            <input
              className='p-4  resize-none block bg-zinc-300 dark:bg-zinc-800 w-full p-4 ps-10 text-sm pl-9  text-slate-700 dark:text-white border  dark:border-slate-400 rounded-xl placeholder-slate-700 dark:placeholder-slate-300'
              type="text"
              name="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your prompt"
            />
            <div
              id="FileUpload"
              className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5 mt-4"
            >
              <input
                type="file"
                name="chosen-image"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
                className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
              />
              <div className="flex flex-col items-center justify-center space-y-3 ">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white  dark:border-strokedark dark:bg-boxdark ">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
                      fill="#3C50E0"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
                      fill="#3C50E0"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
                      fill="#3C50E0"
                    />
                  </svg>
                </span>
                <p className='dark:text-slate-100'>
                  <span className="text-primary">Click to upload</span> or
                  drag and drop
                </p>
                <p className="mt-1.5 dark:text-slate-100">SVG, PNG, JPG or GIF</p>
                <p className='dark:text-slate-100'>(max, 800 X 800px)</p>
              </div>
            </div>

            <button
              className='shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded mt-4'
              type="submit">Generate</button>
          </form>

          <img className=' object-cover mt-4 rounded-xl w-20 h-20' src={imageFile ? URL.createObjectURL(imageFile) : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
            alt=""
          />
          <div className="output dark:text-slate-100" dangerouslySetInnerHTML={{ __html: output }}></div>

          <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={640}
        height={480}
      />
      <button onClick={capture}>Capture photo</button>
      {image && (
        <div>
          <h2>Captured Image:</h2>
          <img src={image} alt="Captured" />
        </div>
      )}
        </div><Footer></Footer>
      </div>


    </>

  );
};


