import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Resultados from './pages/Resultados';
import ErrorElement from './components/ErrorElement';

const router = createBrowserRouter(
  [
    { path: '/', element: <Home /> },
    { path: '/productos', element: <Resultados /> },
  ],
  {
    basename: import.meta.env.BASE_URL,
    errorElement: <ErrorElement />,
  }
);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
