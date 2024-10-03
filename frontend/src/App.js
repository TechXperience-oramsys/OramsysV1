import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes/Routes";
import store from "./redux/store";
// import './i18n';



window.onbeforeunload = function () {
  // localStorage.clear();
};

function App() {

  
  // useEffect(() => {

  //   // Load float.js dynamically from public folder
  //   const customScript = document.createElement("script");
  //   customScript.src = `${process.env.PUBLIC_URL}/float.js`; // Load script.js from public folder
  //   customScript.defer = true;
  //   document.body.appendChild(customScript);

  //   // Load lang.js dynamically from public folder
  //   const langScript = document.createElement("script");
  //   langScript.src = `${process.env.PUBLIC_URL}/lang.js`; // Load lang.js from public folder
  //   langScript.defer = true;
  //   document.body.appendChild(langScript);

  //   // Cleanup function to remove scripts when component unmounts
  //   return () => {
  //     if (langScript && langScript.parentNode) {
  //       langScript.parentNode.removeChild(langScript);
  //     }
  //     if (customScript && customScript.parentNode) {
  //       customScript.parentNode.removeChild(customScript);
  //     }
  //   };
  // }, []); // Empty array ensures this only runs after the component is first mounted

  return (
    <div className="">
      {/* <div className="gtranslate_wrapper"></div> */}
      <Provider store={store}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
