import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="glass sticky top-0 z-50 shadow-lg border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <img 
                src="https://res.cloudinary.com/dirzzzy50/image/upload/v1752723426/logo_ixdoiz.png" 
                alt="Logo Descripto" 
                className="h-10 w-10 rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300" 
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </div>
            <span className="text-2xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent tracking-wide">
              Descripto
            </span>
          </Link>

          {/* Navegación */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`relative px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover-lift ${
                location.pathname === '/' 
                  ? 'text-white bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg' 
                  : 'text-gray-200 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className="flex items-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>Inicio</span>
              </span>
            </Link>
            
            <Link 
              to="/productos" 
              className={`relative px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover-lift ${
                location.pathname === '/productos' 
                  ? 'text-white bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg' 
                  : 'text-gray-200 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className="flex items-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Resultados</span>
              </span>
            </Link>
          </div>

          {/* Botón móvil */}
          <div className="md:hidden">
            <button className="text-gray-200 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
