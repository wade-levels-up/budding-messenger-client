import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home.tsx";
import SignUp from "./components/forms/SignUp.tsx";
import SignIn from "./components/forms/SignIn.tsx";
import Error from "./pages/Error.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import VerifyAccount from "./pages/VerifyAccount.tsx";
import Profile from "./pages/Profile.tsx";
import AllUsers from "./pages/AllUsers.tsx";
import Conversation from "./pages/Conversation.tsx";
import Friends from "./pages/Friends.tsx";
import { ToastContainer } from "react-toastify";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      { index: true, element: <SignIn /> },
      { path: "sign-up", element: <SignUp /> },
      { path: "verify-user", element: <VerifyAccount /> },
    ],
    errorElement: <Error />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      { index: true, element: <Profile /> },
      { path: "/dashboard/profile", element: <Profile /> },
      { path: "/dashboard/all-users", element: <AllUsers /> },
      { path: "/dashboard/conversation", element: <Conversation /> },
      { path: "/dashboard/friends", element: <Friends /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
    <ToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar={true}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  </StrictMode>
);
