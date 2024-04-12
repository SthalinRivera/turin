import React, { useState, useEffect } from "react";
import OpenAI from "openai";
import axios from "axios";

const openai = new OpenAI({
  apiKey: process.env["REACT_APP_OPENAI_API_KEY"], // This is the default and can be omitted
  dangerouslyAllowBrowser: true
});

export function Prueba() {
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    const generateImage = async () => {
      try {
        const image = await openai.images.generate({ model: "dall-e-3", prompt: "A cute baby sea otter" });
        setImageData(image.data);
      } catch (error) {
        console.error('Error generating image:', error);
      }
    };

    generateImage();
  }, []);

  return (
    <div>
        <NavBar />
      {imageData && <img src={imageData} alt="Generated Image" />}
    </div>
  );
};