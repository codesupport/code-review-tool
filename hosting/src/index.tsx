import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "./components/pages/HomePage";
import { ErrorPage } from "./components/pages/ErrorPage";
import { ProtectedPageTemplate } from "./components/templates/ProtectedPageTemplate";
import reportWebVitals from "./reportWebVitals";
import "./index.css";

const router = createBrowserRouter([
    {
        path: "/",
        errorElement: <ErrorPage />,
        element: <ProtectedPageTemplate />,
        children: [
            {
                path: "/",
                element: <HomePage />,
            }
        ]
    }
]);

const root = ReactDOM.createRoot(
  document.getElementById("app") as HTMLElement
);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
