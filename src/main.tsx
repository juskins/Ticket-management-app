import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom';
import { Toaster } from './components/ui/sonner.tsx';
import { Routes } from './routes/route.tsx';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
      <RouterProvider router={Routes} />
      <Toaster richColors position="top-center" />
  </StrictMode>
);
