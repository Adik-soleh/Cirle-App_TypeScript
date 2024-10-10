import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import circleTheme from './themes/theme.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
                  <ChakraProvider theme={circleTheme}>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </ChakraProvider>
    </React.StrictMode>
)
