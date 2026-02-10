import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AlertProvider } from './store/providers/AlertProvider.tsx'
import { LoadingProvider } from './store/providers/LoadingProvider.tsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './store/providers/AuthProvider.tsx'
import { UserProvider } from './store/providers/UserProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <AlertProvider>
    <LoadingProvider>
      <BrowserRouter>
        <AuthProvider>
          <UserProvider>
            <App />
          </UserProvider>
        </AuthProvider>
      </BrowserRouter>
    </LoadingProvider>
  </AlertProvider>
);
