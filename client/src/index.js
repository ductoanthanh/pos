import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
/* Using BrowserRouter to handle dynamic requests from Express Server */
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { VibamiProvider } from "./context/context";

/* Router components expects to only contain one child component that's why combining everything in App and importing the same */

ReactDOM.render(
  <VibamiProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </VibamiProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
