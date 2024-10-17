import React, { useEffect } from "react";
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
import { Dashboard } from "./pages/Dashboard";
import { Parafrasear } from "./pages/Parafrasear";
import { Turis } from "./pages/Turis";
import { Resumir } from "./pages/Resumir";
import { Opera } from "./pages/Opera";
import { Teste } from "./pages/Teste";
import { Preguntas } from "./pages/Preguntas";
import { Encuesta } from "./pages/Encuesta";
import { NewEncuesta } from "./pages/Encuesta/NewEncuesta";
import { EndEncuesta } from "./pages/Encuesta/EndEncuesta";
import { EditEncuesta } from "./pages/Encuesta/EditEncuesta";
import { Search } from "./pages/Search/";
import { useState } from "react";
import { Banner } from "./components/Banner";
import { Tesis } from "./pages/Tesis";
import { Reports } from "./pages/Reports";
export function App() {
  const [isBannerOpen, setIsBannerOpen] = useState(false);
  const showBanner = () => {
    setIsBannerOpen(false);
  };

  useEffect(() => {
    TitleStatus();
    const timer = setTimeout(() => {
      setIsBannerOpen(true); // Mostrar el banner una vez después de 3 segundos
    }, 20000);

    return () => {
      clearTimeout(timer); // Limpiar el temporizador al desmontar el componente
    };
  }, []);

  const TitleStatus = () => {
    const originalTitle = document.title;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = "¡😭💔No te vayas no puedo vivir sin tiii... !";
      } else {
        document.title = originalTitle;
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.title = originalTitle;
    };
  };

  return (
    <div>
      {isBannerOpen && (
        <Banner showBanner={showBanner} />
      )}
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Portal />} />
          <Route path="/*" element={<NotFound />} />
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/parafrasear" element={<ProtectedRoute><Parafrasear /></ProtectedRoute>} />
          <Route path="/resumir" element={<ProtectedRoute><Resumir /></ProtectedRoute>} />
          <Route path="/opera" element={<ProtectedRoute><Opera /></ProtectedRoute>} />
          <Route path="/gemini" element={<ProtectedRoute><Gemini /></ProtectedRoute>} />
          <Route path="/product" element={<ProtectedRoute><Product /></ProtectedRoute>} />
          <Route path="/product/new-posts" element={<ProtectedRoute><NewPosts /></ProtectedRoute>} />
          <Route path="/places" element={<ProtectedRoute><Places /></ProtectedRoute>} />
          <Route path="/places/new-place" element={<ProtectedRoute><NewPlace /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/encuesta" element={<ProtectedRoute><Encuesta /></ProtectedRoute>} />
          <Route path="/encuesta/new-encuesta" element={<ProtectedRoute><NewEncuesta /></ProtectedRoute>} />
          <Route path="/encuesta/end-encuesta" element={<ProtectedRoute><EndEncuesta /></ProtectedRoute>} />
          <Route path="/encuesta/edit" element={<ProtectedRoute><EditEncuesta /></ProtectedRoute>} />
          <Route path="/search" element={<ProtectedRoute><Search /></ProtectedRoute>} />
          <Route path="/preguntas" element={<ProtectedRoute><Preguntas /></ProtectedRoute>} />
          <Route path="/tesis" element={<ProtectedRoute><Tesis /></ProtectedRoute>} />
          <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
          <Route path="/register" element={<Register />} />
          <Route path="/speech-generator" element={<SpeechGenerator />} />
          <Route path="/storage" element={<Storage />} />
          <Route path="/teste" element={<Teste />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/turis" element={<Turis />} />

        </Routes>
      </AuthProvider>
    </div>
  );
}
