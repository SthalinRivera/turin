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
import { Dashboard } from "./pages/Dashboard"
import { Parafrasear } from "./pages/Parafrasear";
import { Turis } from "./pages/Turis";
import { Resumir } from "./pages/Resumir";
import { Opera } from "./pages/Opera";
import { Teste } from "./pages/Teste";
import { Preguntas } from "./pages/Preguntas";
import { Encuesta } from "./pages/Encuesta";
import { NewEncuesta } from "./pages/Encuesta/NewEncuesta";
import { EditEncuesta } from "./pages/Encuesta/EditEncuesta";
import {Search  } from "./pages/Search/";
export function App() {
  useEffect(() => {
    // Código del efecto que se ejecutará después del renderizado
    TitleStatus();
    return () => {
      // Código de limpieza opcional (cleanup)
    };
  }, [/* dependencias opcionales */]);
  const TitleStatus = () => {
    const originalTitle = document.title;

    // Función para cambiar el título cuando se cambia la visibilidad
    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = "¡😭💔No te vayas no puedo vivir sin tiii... !";
      } else {
        document.title = originalTitle;
      }
    };

    // Agregamos el evento de cambio de visibilidad
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Limpiamos el evento cuando el componente se desmonta
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.title = originalTitle; // Restauramos el título original
    };
  }
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
          <Route
            path="/parafrasear"
            element={<ProtectedRoute>
              <Parafrasear />
            </ProtectedRoute>} />
          <Route
            path="/resumir"
            element={<ProtectedRoute>
              <Resumir />
            </ProtectedRoute>} />
            <Route
            path="/opera"
            element={<ProtectedRoute>
              <Opera />
            </ProtectedRoute>} />
          <Route
            path="/gemini"
            element={<ProtectedRoute>
              <Gemini />
            </ProtectedRoute>} />

          <Route path="/register" element={<Register />} />
          <Route path="/speech-generator" element={<SpeechGenerator />} />


          <Route path="/product" element={<ProtectedRoute><Product /></ProtectedRoute>} />

          <Route path="/product/new-posts" element={<ProtectedRoute><NewPosts /></ProtectedRoute>} />

          <Route path="/places" element={<ProtectedRoute><Places /></ProtectedRoute>} />

          <Route path="/places/new-place" element={<ProtectedRoute><NewPlace /></ProtectedRoute>} />

          <Route path="/storage" element={<Storage />} />
          <Route path="/teste" element={<Teste />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="dashboard" element={<Dashboard />}></Route>
          <Route path="/preguntas" element={<Preguntas/>}> </Route>
          <Route path="turis" element={<Turis />}> </Route>
          <Route path="encuesta" element={<Encuesta />}> </Route>
          <Route path="encuesta/new-encuesta" element={<NewEncuesta />}> </Route>
          <Route path="encuesta/edit" element={<EditEncuesta />}> </Route>
          <Route path="search" element={<Search />}> </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}
