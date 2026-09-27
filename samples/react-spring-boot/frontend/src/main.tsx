import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'

import { App } from './app/App'
import { AppProviders } from './app/providers'
import './styles/bootstrap-overrides.css'
import './styles/app.css'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('找不到 React Root Element。')
}

createRoot(rootElement).render(
  <StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </StrictMode>
)
