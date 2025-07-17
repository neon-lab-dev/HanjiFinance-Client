import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/routes'
import SmoothScroll from './components/SmoothScroll'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SmoothScroll>
    <RouterProvider router={router} />
    </SmoothScroll>
  </React.StrictMode>
)