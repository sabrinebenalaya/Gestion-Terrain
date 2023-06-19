import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter,  RouterProvider } from "react-router-dom";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import React from 'react'


function App() {

  const router = createBrowserRouter([
    {
      path: "/logIn",
      element: <Login />,

    },
    {
      path: "/register",
      element: <Register />,

    },
    
  ]);

  return (
    <div style={{ height: "100%" }}>
    <ToastContainer />
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </div>
  );
}

export default App;
