import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes/Routes";
import store from "./redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

window.onbeforeunload = function () {
  // localStorage.clear();
};

function App() {
  return (
    <div className="">
      <Provider store={store}>
        <BrowserRouter>
          <Routes />
          <ToastContainer />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
