import React from "react";
import { Route, Routes } from "react-router-dom";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Home } from "./pages/Home";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Portal } from "./pages/Portal";
import { AuthProvider } from "./context/AuthContext";
import { NotFound } from "./pages/NotFound";
import { Prueba } from "./pages/Prueba";
import { Create } from "./pages/Prueba/create";


function App() {

  const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
  console.log('aqui debe de estar');
  console.log(apiKey); // Outputs the value from your .env file
  return (
    <div className=" text-black h-screen  text-black">
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Portal />} />
          <Route path="/*" element={<NotFound />} />

          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/prueba" element={<Prueba />} />
          <Route path="/prueba/create" element={<Create />} />

        </Routes>

        <div>hola estoy aqui</div>
      </AuthProvider>
    </div>
  );
}

export default App;
