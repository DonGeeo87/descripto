import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Resultados from './pages/Resultados';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  // Eliminando la ruta de servicios
  { path: '/productos', element: <Resultados /> }, // Suponiendo que esta es la ruta de productos
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
