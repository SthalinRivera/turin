import React from "react";
import { saveAs } from "file-saver";
import html2pdf from "html2pdf.js";
import { FacebookShareButton, TwitterShareButton, EmailShareButton } from 'react-share';

import { FaRegFilePdf } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaRegEnvelope } from "react-icons/fa";

import { FaFileWord } from "react-icons/fa";
export function ViewHome({ isOpen, closeModal, product }) {
  const apiResponse = product.response.variables;

  // Función para convertir a PDF
  const handlePDFExport = () => {
    const element = document.getElementById('table-content'); // Asegúrate de que este ID sea el correcto
    html2pdf()
      .from(element)
      .save(`${product.name}.pdf`);
  };

  // Función para guardar como Word
  const handleWordExport = () => {
    const element = document.getElementById('table-content');
    const blob = new Blob([element.innerHTML], {
      type: 'application/msword'
    });
    saveAs(blob, `${product.name}.doc`);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm z-50">
          <div className="relative w-full h-full sm:max-w-full mx-auto max-h-screen overflow-y-auto rounded-lg bg-slate-100 text-slate-900 dark:bg-gray-800 dark:text-slate-100">
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

            {/* Modal Content */}
            <div className="p-2">
              <p className="text-lg font-semibold mb-1">
                {product.visibility ? "Public" : "Private"}
              </p>
              <p className="text-sm font-bold mb-1">
                {product.name.charAt(0).toUpperCase() + product.name.slice(1)}
              </p>

              {/* Table */}
              <div className="overflow-y-auto h-auto mb-4" id="table-content">
                <table className="min-w-full border-collapse border border-gray-300 text-center mt-4 rounded-lg shadow-lg bg-white dark:bg-gray-800">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-gray-700">
                      <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-800 dark:text-gray-200">
                        Variable
                      </th>
                      <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-800 dark:text-gray-200">
                        Definición Operacional
                      </th>
                      <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-800 dark:text-gray-200">
                        Dimensión
                      </th>
                      <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-800 dark:text-gray-200">
                        Indicador
                      </th>
                      <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-800 dark:text-gray-200">
                        Ítems o Fórmula
                      </th>
                      <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-800 dark:text-gray-200">
                        Instrumento y Escala
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {apiResponse.map((variable, variableIndex) =>
                      variable.dimensiones.map((dimension, dimensionIndex) =>
                        dimension.indicadores.map((indicador, indicadorIndex) => (
                          <tr
                            key={`${variableIndex}-${dimensionIndex}-${indicadorIndex}`}
                            className="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-800 dark:even:bg-gray-700"
                          >
                            {dimensionIndex === 0 && indicadorIndex === 0 ? (
                              <td
                                className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-900 dark:text-gray-100"
                                rowSpan={variable.dimensiones.reduce(
                                  (total, dim) => total + dim.indicadores.length,
                                  0
                                )}
                              >
                                {variable.nombre}
                              </td>
                            ) : null}
                            {dimensionIndex === 0 && indicadorIndex === 0 ? (
                              <td
                                className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-900 dark:text-gray-100"
                                rowSpan={variable.dimensiones.reduce(
                                  (total, dim) => total + dim.indicadores.length,
                                  0
                                )}
                              >
                                {variable.definicion_operacional}
                              </td>
                            ) : null}
                            {indicadorIndex === 0 ? (
                              <td
                                className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-900 dark:text-gray-100"
                                rowSpan={dimension.indicadores.length}
                              >
                                {dimension.nombre}
                              </td>
                            ) : null}
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-900 dark:text-gray-100">
                              {indicador.nombre}
                            </td>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-900 dark:text-gray-100">
                              {indicador.items_formula}
                            </td>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-900 dark:text-gray-100">
                              {indicador.instrumento_escala}
                            </td>
                          </tr>
                        ))
                      )
                    )}
                  </tbody>
                </table>
              </div>

              {/* User Info */}
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

              {/* Export Buttons */}
              <div className="flex justify-between mb-2">
                <div className="flex">
                <button
                  onClick={handlePDFExport}
                  className="flex items-center text-white bg-green-500 hover:bg-green-700 font-medium rounded-lg py-1 px-2 mr-2"
                >
                  <FaRegFilePdf />
                </button>
                <button
                  onClick={handleWordExport}
                  className="flex items-center text-white bg-blue-500 hover:bg-blue-700 font-medium rounded-lg py-1 px-2 mr-2"
                >
                  <FaFileWord />
                </button>
                </div>
                <div className="flex space-x-2">
                  <FacebookShareButton url={window.location.href}>
                    <button className="flex items-center text-white bg-blue-600 hover:bg-blue-800 font-medium rounded-lg py-1 px-2">
                      <FaFacebook />
                    </button>
                  </FacebookShareButton>
                  <TwitterShareButton url={window.location.href}>
                    <button className="flex items-center text-white bg-blue-400 hover:bg-blue-600 font-medium rounded-lg py-1 px-2">
                      <FaTwitter />
                    </button>
                  </TwitterShareButton>
                  <EmailShareButton url={window.location.href}>
                    <button className="flex items-center text-white bg-green-600 hover:bg-green-800 font-medium rounded-lg py-1 px-2">
                      <FaRegEnvelope />
                    </button>
                  </EmailShareButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
