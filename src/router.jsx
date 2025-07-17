import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Resultados from './pages/Resultados';


const router = createBrowserRouter(
  [
    { path: '/', element: <Home /> },
    { path: '/productos', element: <Resultados /> },
  ],
  {
    basename: import.meta.env.BASE_URL,
  }
);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
