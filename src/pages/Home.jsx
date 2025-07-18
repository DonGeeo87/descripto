import FormularioProducto from '../components/FormularioProducto';
import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse-slow"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse-slow" style={{animationDelay: '1s'}}></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse-slow" style={{animationDelay: '2s'}}></div>
        </div>

        {/* Content */}
        <div className="relative z-10 pt-16 pb-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="animate-fade-in-up">
              <h1 className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 drop-shadow-2xl tracking-tight mb-6">
                DESCRIPTO
              </h1>
              <p className="text-xl md:text-2xl text-white/90 font-medium mb-8 max-w-3xl mx-auto leading-relaxed">
                Genera contenido completo para tus productos: descripciones comerciales y captions para redes sociales
              </p>
              
              {/* Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="glass rounded-2xl p-6 hover-lift">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Captura de Imágenes</h3>
                  <p className="text-white/80 text-sm">Sube fotos o usa tu cámara para mostrar tu producto</p>
                </div>
                
                <div className="glass rounded-2xl p-6 hover-lift">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">IA Inteligente</h3>
                  <p className="text-white/80 text-sm">Contenido estructurado: descripciones y captions para redes</p>
                </div>
                
                <div className="glass rounded-2xl p-6 hover-lift">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Rápido y Fácil</h3>
                  <p className="text-white/80 text-sm">Obtén descripciones en segundos con solo unos clics</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Formulario */}
      <div className="relative z-10 pb-16">
        <FormularioProducto />
      </div>

      {/* Footer */}
      <footer className="relative z-10 text-center py-8">
        <div className="glass rounded-2xl mx-4 max-w-md mx-auto p-6">
          <p className="text-white/80 text-sm mb-2">
            Creado con ❤️ por 
            <a 
              href="https://github.com/DonGeeo87" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-purple-300 font-bold hover:text-pink-300 transition-colors ml-1"
            >
              @DonGeeo87
            </a>
          </p>
          <p className="text-white/60 text-xs">
            Potenciado por Inteligencia Artificial
          </p>
        </div>
      </footer>
    </div>
  );
}
