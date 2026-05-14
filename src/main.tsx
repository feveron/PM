import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.tsx"
import posthog from "posthog-js"
import * as Sentry from "@sentry/react"

Sentry.init({
  dsn: "https://da779397b72c1a6403d2d365be27ebbb@o4511345402707968.ingest.de.sentry.io/4511345407098961",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 1.0,
  replaysOnErrorSampleRate: 1.0,
  environment: "development",
  sendDefaultPii: true,
})

posthog.init('phc_vBCAWk2bBDKVM9Wq4CHsdrFceabiTFUCTndMpxga9GNj', {
  api_host: window.location.origin + "/ingest",
  ui_host: "https://eu.posthog.com",
  person_profiles: "always",
  capture_pageview: true,
})

const SentryApp = Sentry.withProfiler(App)

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SentryApp />
  </StrictMode>,
)