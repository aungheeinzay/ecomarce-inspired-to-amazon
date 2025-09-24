import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { persister, store } from './store/index.ts'
import { Toaster } from 'sonner'
import { PersistGate } from 'redux-persist/integration/react'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persister}>
  <Toaster position="bottom-center" richColors toastOptions={{
    style: {
      fontSize:"15px",
    },
  }}/>
      <App />
      </PersistGate>
      
    </Provider>
  </StrictMode>,
)
