import React from "react";

export default function ErrorElement({ error }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-900 to-blue-900 text-white p-8">
      <div className="bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl max-w-lg w-full text-center animate-fade-in-up">
        <h1 className="text-4xl font-black mb-4 text-red-400">¡Ups! Algo salió mal 😢</h1>
        <p className="mb-4 text-lg">Ha ocurrido un error inesperado en la aplicación.</p>
        {error && <pre className="bg-black/30 rounded p-3 text-xs text-red-200 overflow-x-auto mb-4">{error.message || String(error)}</pre>}
        <p className="mb-2">Puedes intentar recargar la página o volver al inicio.</p>
        <a href="/descripto/" className="inline-block mt-4 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold shadow-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300">Ir al inicio</a>
      </div>
    </div>
  );
} 