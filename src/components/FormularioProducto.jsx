import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import { generarPromptProducto, generarConGemini } from "../utils/openaiPrompt";
import Notification from "./Notification";

export default function FormularioProducto() {
  const [image, setImage] = useState(null);
  const [showWebcam, setShowWebcam] = useState(false);
  const [nombre, setNombre] = useState("");
  const [tecnica, setTecnica] = useState("");
  const [material, setMaterial] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notification, setNotification] = useState(null);
  const webcamRef = useRef(null);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
    setShowWebcam(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validar tipo de archivo
      if (!file.type.startsWith('image/')) {
        setNotification({
          message: "Por favor selecciona un archivo de imagen válido",
          type: "error"
        });
        return;
      }

      // Validar tamaño (máximo 10MB)
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        setNotification({
          message: "La imagen es demasiado grande. Máximo 10MB",
          type: "error"
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setNotification({
          message: "Imagen cargada correctamente",
          type: "success"
        });
      };
      reader.onerror = () => {
        setNotification({
          message: "Error al cargar la imagen. Intenta nuevamente",
          type: "error"
        });
      };
      reader.readAsDataURL(file);
    }
    
    // Limpiar el input para permitir seleccionar el mismo archivo nuevamente
    e.target.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setDescripcion("");
    try {
      const prompt = generarPromptProducto({ nombre, imagen: !!image, tecnica, material });
      const respuesta = await generarConGemini(prompt, image);
      setDescripcion(respuesta);
      setNotification({
        message: "¡Contenido generado con éxito!",
        type: "success"
      });
    } catch (err) {
      console.error('Error en handleSubmit:', err);
      const mensajeError = err.message.includes('API') 
        ? "Error de conexión con la API. Verifica tu conexión e intenta nuevamente."
        : err.message.includes('secciones') 
        ? "Error en el formato de respuesta. Intentando regenerar..."
        : "Error al generar contenido. Intenta nuevamente.";
      
      setError(mensajeError);
      setNotification({
        message: mensajeError,
        type: "error"
      });
      
      // Si es un error de formato, intenta regenerar automáticamente
      if (err.message.includes('secciones')) {
        setTimeout(async () => {
          try {
            const prompt = generarPromptProducto({ nombre, imagen: !!image, tecnica, material });
            const respuesta = await generarConGemini(prompt, image);
            setDescripcion(respuesta);
            setError("");
            setNotification({
              message: "¡Contenido regenerado con éxito!",
              type: "success"
            });
          } catch (retryErr) {
            setError("No se pudo generar el contenido. Intenta nuevamente.");
          }
        }, 2000);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <form onSubmit={handleSubmit} className="glass rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20 backdrop-blur-xl animate-fade-in-up">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 mb-4">
            Generador de Contenido
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Crea descripciones comerciales y captions para redes sociales con la ayuda de Inteligencia Artificial
          </p>
        </div>

        {/* Nombre del Producto */}
        <div className="mb-8">
          <label className="block mb-3 font-bold text-white text-lg flex items-center">
            <svg className="w-5 h-5 mr-2 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            Nombre del Producto
          </label>
          <input
            type="text"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            required
            className="w-full border-2 border-white/20 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent bg-white/10 text-white placeholder-white/50 text-lg shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
            placeholder="Ej: Mate artesanal, Cuadro decorativo, etc."
          />
        </div>

        {/* Botones de Imagen */}
        <div className="mb-4">
          <label className="block mb-3 font-bold text-white text-lg flex items-center">
            <svg className="w-5 h-5 mr-2 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Imagen del Producto
          </label>
          <p className="text-white/60 text-sm mb-4">Selecciona una imagen desde tu galería o toma una foto con la cámara</p>
          <div className="md:hidden mb-4 p-3 bg-blue-500/20 border border-blue-300/30 rounded-xl">
            <p className="text-blue-200 text-xs">
              💡 <strong>En móviles:</strong> Usa "Galería" para seleccionar una foto existente o "Cámara" para tomar una nueva foto
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Seleccionar desde galería */}
          <label className="group cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="input-file-upload"
            />
            <div className="glass rounded-2xl p-4 text-center hover-lift border-2 border-white/20 transition-all duration-300 group-hover:border-purple-400">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-white font-bold text-sm">Galería</span>
              <p className="text-white/60 text-xs mt-1">Seleccionar imagen</p>
            </div>
          </label>

          {/* Capturar con cámara trasera */}
          <label className="group cursor-pointer">
            <input
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFileChange}
              className="hidden"
              id="input-camera-upload"
            />
            <div className="glass rounded-2xl p-4 text-center hover-lift border-2 border-white/20 transition-all duration-300 group-hover:border-green-400">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <span className="text-white font-bold text-sm">Cámara Trasera</span>
              <p className="text-white/60 text-xs mt-1">Tomar foto</p>
            </div>
          </label>

          {/* Capturar con cámara frontal */}
          <label className="group cursor-pointer">
            <input
              type="file"
              accept="image/*"
              capture="user"
              onChange={handleFileChange}
              className="hidden"
              id="input-camera-front-upload"
            />
            <div className="glass rounded-2xl p-4 text-center hover-lift border-2 border-white/20 transition-all duration-300 group-hover:border-pink-400">
              <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-white font-bold text-sm">Cámara Frontal</span>
              <p className="text-white/60 text-xs mt-1">Selfie</p>
            </div>
          </label>

          {/* Webcam (solo desktop) */}
          <button
            type="button"
            className="glass rounded-2xl p-4 text-center hover-lift border-2 border-white/20 transition-all duration-300 hover:border-purple-400 group hidden md:block"
            onClick={() => setShowWebcam((v) => !v)}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-white font-bold text-sm">
              {showWebcam ? "Cerrar" : "Webcam"}
            </span>
            <p className="text-white/60 text-xs mt-1">Cámara web</p>
          </button>
        </div>

        {/* Webcam */}
        {showWebcam && (
          <div className="flex flex-col items-center mb-8 p-6 glass rounded-2xl border-2 border-white/20">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="rounded-2xl border-2 border-purple-300 shadow-2xl w-64 h-64 object-cover"
              videoConstraints={{ facingMode: "user" }}
            />
            <button
              type="button"
              className="mt-4 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl shadow-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 font-bold border-2 border-purple-300 hover-lift"
              onClick={capture}
            >
              <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Capturar Foto
            </button>
          </div>
        )}

        {/* Preview de Imagen */}
        {image && (
          <div className="flex justify-center mb-8">
            <div className="relative group">
              <img 
                src={image} 
                alt="preview" 
                className="w-48 h-48 object-cover rounded-2xl border-2 border-purple-300 shadow-2xl group-hover:scale-105 transition-transform duration-300" 
                onError={e => { e.target.onerror = null; e.target.src = '/logo.png'; }}
              />
              <button
                type="button"
                onClick={() => setImage(null)}
                className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-600"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Técnica y Material */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <label className="block mb-3 font-bold text-white text-lg flex items-center">
              <svg className="w-5 h-5 mr-2 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
              Técnica
            </label>
            <input
              type="text"
              value={tecnica}
              onChange={(e) => setTecnica(e.target.value)}
              required
              className="w-full border-2 border-white/20 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent bg-white/10 text-white placeholder-white/50 text-lg shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
              placeholder="Ej: tallado a mano"
            />
          </div>
          <div>
            <label className="block mb-3 font-bold text-white text-lg flex items-center">
              <svg className="w-5 h-5 mr-2 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              Material
            </label>
            <input
              type="text"
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              required
              className="w-full border-2 border-white/20 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent bg-white/10 text-white placeholder-white/50 text-lg shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
              placeholder="Ej: madera de lenga"
            />
          </div>
        </div>

        {/* Botón Generar */}
        <button
          type="submit"
          disabled={loading}
          className="w-full px-8 py-6 bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 text-white rounded-2xl font-black text-xl shadow-2xl hover:from-purple-700 hover:via-pink-700 hover:to-red-600 transition-all duration-300 border-2 border-purple-300 hover-lift disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
              Generando descripción...
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Generar Contenido
            </div>
          )}
        </button>

        {/* Resultado */}
        {descripcion && (
          <div className="mt-10 p-8 glass rounded-2xl border-2 border-white/20 shadow-2xl backdrop-blur-xl animate-fade-in-up">
            <div className="flex items-center justify-center mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">
                ¡Contenido Generado!
              </h3>
            </div>
            
            {/* Contenido estructurado */}
            <div className="space-y-6">
              {descripcion.split(/(?=## )/).map((seccion, idx) => {
                if (!seccion.trim()) return null;
                
                const esDescripcion = seccion.includes('📝 DESCRIPCIÓN');
                const esInstagram = seccion.includes('📱 CAPTION PARA INSTAGRAM');
                const esFacebook = seccion.includes('👥 CAPTION PARA FACEBOOK');
                
                let bgColor = 'bg-white/10';
                let borderColor = 'border-white/20';
                let icon = '📝';
                let titulo = 'Contenido';
                
                if (esInstagram) {
                  bgColor = 'bg-gradient-to-r from-purple-500/20 to-pink-500/20';
                  borderColor = 'border-purple-300/30';
                  icon = '📱';
                  titulo = 'Caption para Instagram';
                } else if (esFacebook) {
                  bgColor = 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20';
                  borderColor = 'border-blue-300/30';
                  icon = '👥';
                  titulo = 'Caption para Facebook';
                } else if (esDescripcion) {
                  bgColor = 'bg-gradient-to-r from-green-500/20 to-emerald-500/20';
                  borderColor = 'border-green-300/30';
                  icon = '📝';
                  titulo = 'Descripción del Producto';
                }
                
                const contenido = seccion.replace(/^## [^\n]+\n/, '').trim();
                
                // Verifica si el contenido está completo
                const estaCompleto = !contenido.endsWith('...') && contenido.length > 10;
                
                return (
                  <div key={idx} className={`${bgColor} rounded-2xl p-6 border-2 ${borderColor} backdrop-blur-sm`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{icon}</span>
                        <h4 className="text-xl font-bold text-white">{titulo}</h4>
                      </div>
                      {!estaCompleto && (
                        <span className="text-xs bg-yellow-500/20 text-yellow-200 px-2 py-1 rounded-full border border-yellow-300/30">
                          Incompleto
                        </span>
                      )}
                    </div>
                    <div className="text-white/90 leading-relaxed">
                      {contenido.split('\n').map((parrafo, pIdx) => {
                        if (!parrafo.trim()) return null;
                        
                        // Limpia caracteres extraños que puedan haber quedado
                        const parrafoLimpio = parrafo
                          .replace(/[🔲🔳⬜⬛□■▢▣▤▥▦▧▨▩▪▫]/g, '')
                          .trim();
                        
                        if (!parrafoLimpio) return null;
                        
                        return (
                          <p key={pIdx} className="mb-3 last:mb-0">
                            {parrafoLimpio}
                          </p>
                        );
                      })}
                    </div>
                    {!estaCompleto && (
                      <div className="mt-4 p-3 bg-yellow-500/10 rounded-lg border border-yellow-300/20">
                        <p className="text-yellow-200 text-sm">
                          ⚠️ Esta sección parece estar incompleta. Puedes intentar generar nuevamente.
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <button
                type="button"
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold shadow-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 border-2 border-purple-300 hover-lift flex items-center justify-center"
                onClick={() => {
                  navigator.clipboard.writeText(descripcion);
                  setNotification({
                    message: "Contenido copiado al portapapeles",
                    type: "success"
                  });
                }}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copiar Todo
              </button>
              
              <button
                type="button"
                className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl font-bold shadow-lg hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 border-2 border-yellow-300 hover-lift flex items-center justify-center"
                onClick={handleSubmit}
                disabled={loading}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                {loading ? "Regenerando..." : "Regenerar"}
              </button>
              
              <button
                type="button"
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-bold shadow-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 border-2 border-blue-300 hover-lift flex items-center justify-center"
                onClick={() => {
                  setDescripcion("");
                  setImage(null);
                  setNombre("");
                  setTecnica("");
                  setMaterial("");
                }}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Nuevo Producto
              </button>
            </div>
            
            <div className="text-center text-white/60 text-sm mt-6 space-y-2">
              <p>✅ Contenido generado con éxito</p>
              <p>📝 Descripción comercial • 📱 Caption Instagram • 👥 Caption Facebook</p>
              <p className="text-xs">Si alguna sección aparece incompleta, usa el botón "Regenerar"</p>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mt-8 p-6 bg-red-500/20 rounded-2xl border-2 border-red-400/50 text-red-200 font-bold shadow-lg backdrop-blur-sm animate-fade-in-up">
            <div className="flex items-start">
              <svg className="w-6 h-6 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="mb-2">{error}</p>
                {error.includes('regenerar') && (
                  <div className="flex items-center text-sm text-red-300">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-300 mr-2"></div>
                    Regenerando automáticamente...
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </form>
      
      {/* Notificaciones */}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
} 