import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { PrivyProvider } from "@privy-io/react-auth"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PrivyProvider
      appId="cmiay4it100p0l70cdijf2wfk"
      config={{
        embeddedWallets: {
          ethereum: {
            createOnLogin: "users-without-wallets",
          },
        },
      }}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PrivyProvider>
  </StrictMode>
)
