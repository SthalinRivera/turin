import React from 'react';

export function Matriz() {
  const data = {
    "problema_general": "El uso ineficiente de la inteligencia artificial en la educación universitaria limita el aprendizaje personalizado de los estudiantes.",
    "problema_especifico1": "Falta de formación docente para integrar herramientas de inteligencia artificial en las aulas universitarias.",
    "problema_especifico2": "Desconocimiento por parte de los estudiantes sobre las aplicaciones de la inteligencia artificial en su proceso de aprendizaje.",
    "problema_especifico3": "Ausencia de plataformas educativas que utilicen inteligencia artificial para personalizar contenidos según el progreso del estudiante.",
    "población": "Estudiantes y docentes de universidades nacionales",
  };

  return (
    <div>
      <h2>Datos JSON:</h2>
      <div>
        <h3>Problema Específico 1</h3>
        <p>{data.problema_especifico1}</p>
      </div>
      <div>
        <h3>Población</h3>
        <p>{data.población}</p>
      </div>
    </div>
  );
};

