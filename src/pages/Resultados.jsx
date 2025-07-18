import Navbar from '../components/Navbar';

export default function Resultados() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-16 pb-8">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse-slow"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse-slow" style={{animationDelay: '1s'}}></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse-slow" style={{animationDelay: '2s'}}></div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="animate-fade-in-up">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-500 to-indigo-500 drop-shadow-2xl tracking-tight mb-6">
                Resultados
              </h1>
              <p className="text-xl md:text-2xl text-white/90 font-medium mb-12 max-w-3xl mx-auto leading-relaxed">
                Aquí podrás ver y gestionar todas las descripciones generadas
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="relative z-10 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20 backdrop-blur-xl animate-fade-in-up">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500 mb-4">
                Historial de Descripciones
              </h2>
              <p className="text-white/80 text-lg max-w-2xl mx-auto">
                Próximamente podrás ver aquí todas las descripciones que hayas generado
              </p>
            </div>

            {/* Placeholder Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="glass rounded-2xl p-6 border border-white/20 hover-lift">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Mate Artesanal</h3>
                <p className="text-white/70 text-sm mb-4">Descripción generada el 15 de Noviembre</p>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg text-sm font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300">
                    Ver Detalles
                  </button>
                  <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg text-sm font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all duration-300">
                    Copiar
                  </button>
                </div>
              </div>

              {/* Card 2 */}
              <div className="glass rounded-2xl p-6 border border-white/20 hover-lift">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Cuadro Decorativo</h3>
                <p className="text-white/70 text-sm mb-4">Descripción generada el 14 de Noviembre</p>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg text-sm font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300">
                    Ver Detalles
                  </button>
                  <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg text-sm font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all duration-300">
                    Copiar
                  </button>
                </div>
              </div>

              {/* Card 3 */}
              <div className="glass rounded-2xl p-6 border border-white/20 hover-lift">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Joya Artesanal</h3>
                <p className="text-white/70 text-sm mb-4">Descripción generada el 13 de Noviembre</p>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg text-sm font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300">
                    Ver Detalles
                  </button>
                  <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg text-sm font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all duration-300">
                    Copiar
                  </button>
                </div>
              </div>
            </div>

            {/* Coming Soon Message */}
            <div className="mt-12 text-center">
              <div className="glass rounded-2xl p-8 border border-white/20">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Funcionalidad en Desarrollo</h3>
                <p className="text-white/80 text-lg mb-6 max-w-2xl mx-auto">
                  Estamos trabajando para que puedas guardar y gestionar todas tus descripciones generadas. 
                  Pronto podrás acceder a tu historial completo.
                </p>
                <button className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-bold shadow-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 border-2 border-indigo-300 hover-lift">
                  Volver al Generador
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
