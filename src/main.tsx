import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/routes'
import SmoothScroll from './components/SmoothScroll'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { Toaster } from './../node_modules/react-hot-toast/src/components/toaster';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SmoothScroll>
      <Provider store={store}>
    <RouterProvider router={router} />
     <Toaster />
    </Provider>
    </SmoothScroll>
  </React.StrictMode>
)