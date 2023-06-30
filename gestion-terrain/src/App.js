import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import React from "react";

import EditPartner from "./Partners/EditPartner";

import EditUser from "./Users/EditUser";
import ProfilUser from "./Users/ProfilUser";
import UserOfPartner from "./Users/UserOfPartner";
import ProfilPartner from "./Partners/ProfilPartner";
import AddTerrain from "./Terrains/AddTerrain";
import Home from "./Home";
import NavbarPartner from "./NavbarPartner";
import ListTerrains from "./Terrains/ListTerrains";
import EditTerrain from "./Terrains/EditTerrain";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <NavbarPartner />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "partner/:id",
          element: <ProfilPartner />,
        },
        {
          path: "editProfil/:id",
          element: <EditPartner />,
        },
        {
          path: "addterrain/:id",
          element: <AddTerrain />,
        }, 
        {
          path: "terrains/:id",
          element: <ListTerrains />,
        },
        {
          path: "editTerrain/:id",
          element: <EditTerrain />,
        },
      ]
    },
    {
      path: "/logIn",
      element: <Login />,
    },

    {
      path: "/register",
      element: <Register />,
    },
 
  

    {
      path: "/users/:id",
      element: <UserOfPartner />,
    },
    {
      path: "/editUser/:id",
      element: <EditUser />,
    },
    {
      path: "/profilUser/:id",
      element: <ProfilUser />,
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
