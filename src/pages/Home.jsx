import FormularioProducto from '../components/FormularioProducto';

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center mt-8 mb-4">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 drop-shadow-lg tracking-tight mb-8">DESCRIPTO</h1>
        <FormularioProducto />
      </div>
      <footer className="w-full text-center mt-10 mb-4 text-gray-400 text-sm">
        Creado por <a href="https://github.com/DonGeeo87" target="_blank" rel="noopener noreferrer" className="text-fuchsia-600 font-bold hover:underline">@DonGeeo87</a>
      </footer>
    </>
  );
}
