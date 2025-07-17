import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-white shadow flex justify-between items-center px-8 py-4 rounded-b-2xl border-b border-gray-200">
      <div className="flex items-center gap-3 font-extrabold text-2xl text-green-700 tracking-wide">
        <img src="https://res.cloudinary.com/dirzzzy50/image/upload/v1752723426/logo_ixdoiz.png" alt="Logo Descripto" className="h-10 w-10 rounded-full shadow" />
        <Link to="/">Descripto</Link>
      </div>
      <div className="space-x-6">
        <Link to="/" className="text-green-700 font-medium hover:text-purple-600 transition-colors">Inicio</Link>
        <Link to="/resultados" className="text-green-700 font-medium hover:text-purple-600 transition-colors">Resultados</Link>
      </div>
    </nav>
  );
}
