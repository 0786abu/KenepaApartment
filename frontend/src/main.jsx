import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store.jsx'
import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';
createRoot(document.getElementById('root')).render(
 <MantineProvider>
   <Provider store={store}>
    <BrowserRouter>
  <StrictMode>
    <App />
  </StrictMode>
  </BrowserRouter>
  </Provider>
 </MantineProvider>,
)
