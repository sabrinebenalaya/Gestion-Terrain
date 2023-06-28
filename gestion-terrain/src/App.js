import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter,  RouterProvider } from "react-router-dom";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import React from 'react'
import ProfilPartner from "./Partners/Profils/ProfilPartner";
import EditPartner from "./Partners/EditProfil/EditPartner";
import UserOfPartner from "./Partners/Users/UserOfPartner";
import EditUser from "./Partners/Users/EditUser";
import ProfilUser from "./Partners/Users/ProfilUser";

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
    {
      path: "/partner/:id",
      element: <ProfilPartner />,
      
    },
    {
      path: "/editProfil/:id",
      element: <EditPartner />,

    },

    {
      path: "/users/:id",
      element: <UserOfPartner/>,

    },
    {
      path: "/editUser/:id",
      element: <EditUser/>,

    },
    {
      path: "/profilUser/:id",
      element: <ProfilUser/>,

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
