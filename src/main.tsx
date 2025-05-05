import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "leaflet/dist/leaflet.css";

import App from "./App.tsx";
import { Provider } from "./provider.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import "@/styles/globals.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthProvider>
      <Provider>
        <App />
      </Provider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
