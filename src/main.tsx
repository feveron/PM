import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import posthog from 'posthog-js'
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://da779397b72c1a6403d2d365be27ebbb@o4511345402707968.ingest.de.sentry.io/4511345407098961",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  tracesSampleRate: 1.0,
  environment: "development",
  sendDefaultPii: true

})

posthog.init(import.meta.env.VITE_POSTHOG_KEY, {
  api_host: import.meta.env.VITE_POSTHOG_HOST,
  capture_pageview: true,
  session_recording: {
    maskAllInputs: false,
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
