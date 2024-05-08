// UserContext.js
import React, { createContext, useState } from 'react';

// Creamos el contexto
const TabContext = createContext();

// Creamos el provider
export const TabProvider = ({ children }) => {
  // Definimos el estado para la información del usuario
  const [tab, setTab] = useState(null);



  return (
    <TabContext.Provider value={{ tab }}>
      {children}
    </TabContext.Provider>
  );
};

