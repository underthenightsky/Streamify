import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './output.css'
import App from './App.jsx'
import {BrowserRouter} from "react-router";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

// create a tanstack query client 
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
     <QueryClientProvider client={queryClient}>
      <App />
       </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
)
