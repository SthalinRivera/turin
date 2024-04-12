import React, { useState, useEffect } from "react";
import OpenAI from "openai";
import axios from "axios";
import { NavBar } from "../../components/NavBar";
const OPENAI_API_KEY = process.env["REACT_APP_OPENAI_API_KEY"] // This is the default and can be omitted

export function Prueba() {
  const [prompt, setPrompt] = useState("un logo de sthalin ");
  const [generatedImages, setGeneratedImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function generateImages() {
    setIsLoading(true);

    try {
      const requestData = {
        prompt: prompt,
        n: 4,
        size: "256x256", // Set the desired image size here
      };

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      };

      const response = await axios.post(
        "https://api.openai.com/v1/images/generations",
        requestData,
        {
          headers: headers,
        }
      );

      setGeneratedImages(response.data.data);
    } catch (error) {
      console.error("Error generating images:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (

    <div>

      <NavBar />

      <div className="flex flex-col items-center justify-center min-h-screen">
        <div>
          <label htmlFor="prompt">Enter a Prompt: </label>
          <input
            type="text"
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="border rounded px-2 py-1"
          />
        </div>
        <button
          onClick={generateImages}
          disabled={isLoading}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {isLoading ? "Generating..." : "Generate Images"}
        </button>
        {isLoading && <p className="mt-4 text-gray-600">Loading...</p>}
        {generatedImages.length > 0 && (
          <div className="mt-4">
            {generatedImages.map((image, index) => (
              <div key={index} className="mt-4">
                <img
                  src={image.url}
                  alt={`Generated Image ${index}`}
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
