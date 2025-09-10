import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Toaster } from "react-hot-toast";
import AuthModal from "./components/Auth/AuthModal/AuthModal"; // 👈 import it
import SmoothScroll from "./components/SmoothScroll";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SmoothScroll>
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster />
      <AuthModal /> {/* 👈 always mounted here */}
    </Provider>
    </SmoothScroll>
  </React.StrictMode>
);
