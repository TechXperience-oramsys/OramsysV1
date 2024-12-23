import React from "react"
import ReactDOM from "react-dom/client"
import "./App.css"
import "./index.css"
import App from "./App"
import { Toaster } from "sonner"
import reportWebVitals from "./reportWebVitals"
import "@fortawesome/fontawesome-svg-core/styles.css"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "slick-carousel/slick/slick.css"
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { BsTools } from "react-icons/bs";

// import "slick-carousel/slick/slick-theme.css"
// import 'react-loading-skeleton/dist/skeleton.css'
// import 'react-tooltip/dist/react-tooltip.css'
// import './i18n';

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Toaster richColors position="top-right" toastOptions={{ duration: 3000 }} />
      <App />
      {/* <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center bg-light position-relative">
        <BsTools
          className="position-absolute text-primary"
          style={{
            fontSize: '15rem',
            opacity: 0.1,
            zIndex: 1,
          }}
        />
        <h1 className="display-1 text-danger fw-bold position-relative" style={{ zIndex: 2 }}>
          500
        </h1>
        <h2 className="mt-3 text-dark fw-semibold position-relative" style={{ zIndex: 2 }}>
          This platform is under maintenance
        </h2>
        <p className="lead text-muted position-relative" style={{ zIndex: 2 }}>
          We are currently performing updates to enhance your experience. Please check back shortly.
        </p>
        <p className="text-muted position-relative" style={{ zIndex: 2 }}>
          For more information about why you're seeing this page, please contact the administrator.
        </p>
        <button
          className="btn btn-primary mt-3 px-4 py-2 shadow position-relative"
          style={{ zIndex: 2 }}
          onClick={() => window.location.reload()}
        >
          Refresh Page
        </button>
      </div> */}
    </MantineProvider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
