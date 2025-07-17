

import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import { generarPromptProducto, generarConGemini } from "../utils/openaiPrompt";

// Formulario para productos

export default function FormularioProducto() {
  const [image, setImage] = useState(null);
  const [showWebcam, setShowWebcam] = useState(false);
  const [nombre, setNombre] = useState("");
  const [tecnica, setTecnica] = useState("");
  const [material, setMaterial] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const webcamRef = useRef(null);

  // Captura desde webcam
  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
    setShowWebcam(false);
  };

  // Maneja carga desde input file
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Maneja el submit del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setDescripcion("");
    try {
      const prompt = generarPromptProducto({ nombre, imagen: !!image, tecnica, material });
      // Si hay imagen, pásala como segundo parámetro (base64) a generarConGemini
      const respuesta = await generarConGemini(prompt, image);
      setDescripcion(respuesta);
    } catch (err) {
      setError("Error generando descripción: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-xl mx-auto bg-white/70 shadow-2xl rounded-3xl p-10 mt-12 border border-violet-200 backdrop-blur-md">
      <h2 className="text-3xl font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-violet-600 to-fuchsia-500 mb-8 drop-shadow-lg tracking-tight">Generador de Descripción de Producto</h2>
      <div className="mb-8">
        <label className="block mb-2 font-bold text-violet-700">Nombre del Producto</label>
        <input
          type="text"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          required
          className="w-full border-2 border-violet-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 bg-white/80 text-lg shadow"
          placeholder="Ej: Mate artesanal, Cuadro decorativo, etc."
        />
      </div>
      <div className="flex flex-col md:flex-row gap-6 items-center justify-center mb-2">
        <label className="w-full md:w-1/2">
          <input
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFileChange}
            className="hidden"
            id="input-file-upload"
          />
          <button
            type="button"
            className="w-full px-6 py-4 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-white rounded-2xl font-extrabold text-lg shadow-xl hover:from-yellow-500 hover:to-yellow-700 transition tracking-wide border-2 border-yellow-200 mb-2"
            onClick={() => document.getElementById('input-file-upload').click()}
          >
            Seleccionar Imagen
          </button>
        </label>
        <button
          type="button"
          className="w-full md:w-1/2 px-6 py-4 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-white rounded-2xl font-extrabold text-lg shadow-xl hover:from-yellow-500 hover:to-yellow-700 transition tracking-wide border-2 border-yellow-200 mb-2"
          onClick={() => setShowWebcam((v) => !v)}
        >
          {showWebcam ? "Cerrar Cámara" : "Utiliza tu Cámara"}
        </button>
      </div>
      {showWebcam && (
        <div className="flex flex-col items-center my-3 w-full">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="rounded-2xl border-2 border-violet-300 mt-2 shadow-lg w-40 h-40 object-cover"
            videoConstraints={{ facingMode: "user" }}
          />
          <button
            type="button"
            className="mt-3 px-5 py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-xl shadow hover:from-yellow-500 hover:to-yellow-700 transition font-bold border border-yellow-300"
            onClick={capture}
          >
            Capturar foto
          </button>
        </div>
      )}
      {image && (
        <div className="flex justify-center mt-4">
          <img src={image} alt="preview" className="w-40 h-40 object-cover rounded-2xl border-2 border-violet-200 shadow-xl backdrop-blur" />
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className="block mb-2 font-bold text-violet-700">Técnica</label>
          <input
            type="text"
            value={tecnica}
            onChange={(e) => setTecnica(e.target.value)}
            required
            className="w-full border-2 border-violet-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 bg-white/80 text-lg shadow"
            placeholder="Ej: tallado a mano"
          />
        </div>
        <div>
          <label className="block mb-2 font-bold text-violet-700">Material</label>
          <input
            type="text"
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
            required
            className="w-full border-2 border-violet-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 bg-white/80 text-lg shadow"
            placeholder="Ej: madera de lenga"
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full px-6 py-4 bg-gradient-to-r from-violet-700 via-fuchsia-600 to-yellow-400 text-white rounded-2xl font-extrabold text-xl shadow-xl hover:from-violet-800 hover:to-yellow-500 transition tracking-wide border-2 border-yellow-200"
        disabled={loading}
      >
        {loading ? "Generando..." : "Generar descripción"}
      </button>
      {descripcion && (
        <div className="mt-8 p-7 bg-white/80 rounded-2xl border-2 border-violet-200 shadow-2xl backdrop-blur-lg flex flex-col items-center">
          <span className="block mb-3 font-extrabold text-fuchsia-700 text-xl">Descripción generada:</span>
          <div className="w-full text-justify text-lg leading-relaxed font-medium text-gray-900">
            {descripcion.split(/\n{2,}/).map((parrafo, idx) => (
              <p key={idx} className="mb-4 whitespace-pre-line">{parrafo}</p>
            ))}
          </div>
          <button
            type="button"
            className="px-6 py-2 bg-gradient-to-r from-fuchsia-600 to-yellow-400 text-white rounded-xl font-bold shadow hover:from-fuchsia-700 hover:to-yellow-500 transition border-2 border-yellow-200 mt-2"
            onClick={() => {navigator.clipboard.writeText(descripcion)}}
          >
            Copiar descripción
          </button>
          <span className="text-xs text-gray-500 mt-2">Puedes copiar o pegar la descripción donde la necesites.</span>
        </div>
      )}
      {error && (
        <div className="mt-6 p-4 bg-red-100 rounded-xl border-2 border-red-300 text-red-700 font-bold shadow">
          {error}
        </div>
      )}
    </form>
  );
}
