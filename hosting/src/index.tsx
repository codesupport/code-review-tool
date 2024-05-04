import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HomePage } from "./components/pages/HomePage";
import { ErrorPage } from "./components/pages/ErrorPage";
import { ProtectedPageTemplate } from "./components/templates/ProtectedPageTemplate";
import { ImportRepositoryPage } from "./components/pages/ImportRepositoryPage";
import reportWebVitals from "./reportWebVitals";
import "./index.css";

const queryClient = new QueryClient();

const router = createBrowserRouter([
    {
        path: "/",
        errorElement: <ErrorPage />,
        element: <ProtectedPageTemplate />,
        children: [
            {
                path: "/",
                element: <HomePage />,
            },
            {
                path: "/repositories/import",
                element: <ImportRepositoryPage />
            }
        ]
    }
]);

const root = ReactDOM.createRoot(
  document.getElementById("app") as HTMLElement
);

root.render(
  <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
  </React.StrictMode>
);

reportWebVitals();
