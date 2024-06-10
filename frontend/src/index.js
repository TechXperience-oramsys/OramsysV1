import React from "react"
import ReactDOM from "react-dom/client"
import "./App.css"
import "./index.css"
import App from "./App"
import {Toaster} from "react-hot-toast"
import reportWebVitals from "./reportWebVitals"
import "@fortawesome/fontawesome-svg-core/styles.css"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "slick-carousel/slick/slick.css"
// import "slick-carousel/slick/slick-theme.css"
// import 'react-loading-skeleton/dist/skeleton.css'
// import 'react-tooltip/dist/react-tooltip.css'

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <App />
    <Toaster 
      />
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
