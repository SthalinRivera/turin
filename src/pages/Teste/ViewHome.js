import React from "react";

export function ViewHome({ isOpen, closeModal, product }) {
  const jsonToTable = (jsonData) => {
    if (!jsonData || typeof jsonData !== 'object') return null;

    const createTableRows = (obj) => {
      return Object.keys(obj).map(key => {
        const value = obj[key];

        if (typeof value === 'object' && !Array.isArray(value)) {
          // Si es un objeto, recursivamente desglosar sus campos
          return (
            <tr key={key} className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-1 text-start text-sm font-medium text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-800">
                {key}
              </td>
              <td className="px-4 py-1 text-start text-sm text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-900">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 border border-gray-200 dark:border-gray-700">
                  <tbody>
                    {createTableRows(value)}
                  </tbody>
                </table>
              </td>
            </tr>
          );
        } else if (Array.isArray(value)) {
          // Si es un array, procesar los elementos de forma clara, incluyendo dimensiones e indicadores
          return (
            <tr key={key} className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-1 text-start text-sm font-medium text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-800">
                {key}
              </td>
              <td className="px-4 py-1 text-start text-sm text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-900">
                <ul className="list-disc pl-5">
                  {value.map((item, index) => (
                    <li key={index}>
                      {typeof item === 'object' ? (
                        <>
                          {/* Mostrar el nombre de la dimensión */}
                          {item.Nombre && (
                            <div className="mb-2">
                              <strong>Dimensión: {item.Nombre}</strong>
                              {/* Mostrar los indicadores en una tabla */}
                              {item.Indicadores && Array.isArray(item.Indicadores) && (
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 border border-gray-200 dark:border-gray-700 mt-2">
                                  <thead>
                                    <tr>
                                      <th className="px-2 py-2 text-xs font-medium text-gray-500 uppercase dark:text-gray-400">Indicador</th>
                                      <th className="px-2 py-2 text-xs font-medium text-gray-500 uppercase dark:text-gray-400">Ítems o Fórmula</th>
                                      <th className="px-2 py-2 text-xs font-medium text-gray-500 uppercase dark:text-gray-400">Instrumento y Escala de Medición</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {item.Indicadores.map((indicador, indIndex) => (
                                      <tr key={indIndex}>
                                        <td className="px-2 py-2 text-sm text-gray-900 dark:text-gray-100">
                                          {indicador.Indicador}
                                        </td>
                                        <td className="px-2 py-2 text-sm text-gray-500 dark:text-gray-400">
                                          {indicador["Ítems o formula"]}
                                        </td>
                                        <td className="px-2 py-2 text-sm text-gray-500 dark:text-gray-400">
                                          {indicador["Instrumento y escala de medición"]}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              )}
                            </div>
                          )}
                        </>
                      ) : (
                        item
                      )}
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          );
        } else {
          // Si es un valor primitivo, solo mostrarlo
          return (
            <tr key={key} className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-1 text-start text-sm font-medium text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-800">
                {key}
              </td>
              <td className="px-4 py-1 text-start text-sm text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-900">
                {value}
              </td>
            </tr>
          );
        }
      });
    };

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 border border-gray-200 dark:border-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-900">
            <tr>
              <th className="px-1 py-4 text-center text-xs font-medium text-gray-500 uppercase dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">Key</th>
              <th className="px-1 py-4 text-center text-xs font-medium text-gray-500 uppercase dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">Value</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
            {createTableRows(jsonData)}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm z-50">
          <div className="relative w-full max-w-3xl sm:max-w-3xl mx-auto my-4 max-h-screen overflow-y-auto rounded-lg bg-slate-100 text-slate-900 dark:bg-gray-800 dark:text-slate-100">
            <button
              onClick={closeModal}
              className="absolute top-1 right-1 text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-full text-sm px-2 py-2 text-center me-2 mb-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="p-2">
              <p className="text-lg font-semibold mb-1">
                {product.visibility ? "Public" : "Private"}
              </p>
              <p className="text-sm font-bold mb-1">
                {product.name.charAt(0).toUpperCase() + product.name.slice(1)}
              </p>
              <div className="overflow-y-auto h-auto mb-4">
                {jsonToTable(product.response)} {/* Renderiza la tabla a partir de 'product.response' */}
              </div>
              <div className="flex items-center mb-1">
                <img
                  className="w-6 h-6 rounded-full mr-4"
                  src={product.photoURL || "https://example.com/default-image.jpg"}
                  alt="Avatar"
                />
                <div className="text-start">
                  <p className="text-slate-900 dark:text-slate-200 text-[10px]">{product.userEmail?.split('@')[0]}</p>
                  <p className="text-slate-900 dark:text-slate-300 text-[10px]">{product.timestamp}</p>
                </div>
              </div>
              <div className="flex justify-between">
                <button className="flex items-center text-blue-100 bg-gray-700 hover:bg-gray-900 font-medium rounded-lg py-1 px-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-4 h-4 mr-2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                  <span>{product.views}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
