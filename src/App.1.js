import React from "react";
import { Route, Routes } from "react-router-dom";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Home } from "./pages/Home";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Portal } from "./pages/Portal";
import { AuthProvider } from "./context/AuthContext";
import { NotFound } from "./pages/NotFound";
import { SpeechGenerator } from "./pages/SpeechGenerator";
import { Gemini } from "./pages/Gemini";
import { Product } from "./pages/Product";
import { NewPosts } from "./pages/Product/NewPosts";
import { Storage } from "./pages/Storage";
import { Gallery } from "./pages/Gallery";
import { Places } from "./pages/Places";
import { NewPlace } from "./pages/Places/NewPlace";
export function App() {

  const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
  console.log('aqui debe de estar');
  console.log(apiKey); // Outputs the value from your .env file
  return (
    <div className="  ">
      <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Portal />} />
            <Route path="/*" element={<NotFound />} />

            <Route
              path="/home"
              element={<ProtectedRoute>
                <Home />
              </ProtectedRoute>} />


            <Route path="/register" element={<Register />} />

            <Route path="/speech-generator" element={<SpeechGenerator />} />
            <Route path="/gemini" element={<Gemini />} />

            <Route path="/product" element={<ProtectedRoute><Product /></ProtectedRoute>} />

            <Route path="/product/new-posts" element={<ProtectedRoute><NewPosts /></ProtectedRoute>} />

            <Route path="/places" element={<ProtectedRoute><Places /></ProtectedRoute>} />

            <Route path="/places/new-place" element={<ProtectedRoute><NewPlace /></ProtectedRoute>} />

            <Route path="/storage" element={<Storage />} />
            <Route path="/gallery" element={<Gallery />} />
          </Routes>
      </AuthProvider>
    </div>
  );
}
