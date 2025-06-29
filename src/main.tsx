import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Home from "./components/Home.tsx";
import SignUp from "./components/SignUp.tsx";
import SignIn from "./components/SignIn.tsx";
import Error from "./components/Error.tsx";
import Dashboard from "./components/Dashboard.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      { index: true, element: <SignIn /> },
      { path: "sign-up", element: <SignUp /> },
    ],
    errorElement: <Error />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
