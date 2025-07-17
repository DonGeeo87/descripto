
import React, { useState } from "react";

// Formulario para servicios
export default function FormularioServicio() {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar el envío del formulario
    alert(`Servicio: ${nombre}\nDescripción: ${descripcion}`);
    setNombre("");
    setDescripcion("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <h2 className="text-lg font-bold">Formulario Servicio</h2>
      <div>
        <label className="block mb-1 font-medium">Nombre del servicio</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Breve descripción</label>
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
          className="w-full border rounded px-3 py-2"
          rows={3}
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Enviar formulario
      </button>
    </form>
  );
}
