import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import * as ReactDOM from 'react-dom/client'

import { Provider } from 'react-redux'
import { store } from './Redux/store'
import App from 'App';
import { BrowserRouter } from 'react-router-dom';

const rootElement = document.getElementById('root')

if(!rootElement) throw new Error("Root element not found")

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <Provider store={store}>
          <App/>
        </Provider>
        
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
)