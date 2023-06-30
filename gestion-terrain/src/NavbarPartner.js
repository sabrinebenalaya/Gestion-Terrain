import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function NavbarPartner() {
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(to bottom right, #ff00ff, #00ffff)",
    color: "#fff",
    padding: "10px",
    fontWeight: "bold",
  };

  const navStyle = {
    listStyleType: "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "0",
    height: "100px",
  };

  const linkStyle = {
    color: "#fff",
    textDecoration: "none",
    margin: "0 10px",
  };
  const outletStyle = {
    flex: "1",
  };
  const id = useSelector((state) => state.auth.partner._id);
  const [idloged, setIdloged] = useState(id);
  return (
    <div style={containerStyle}>
      <nav>
        <ul style={navStyle}>
          <li>
            <NavLink
              to={`/partner/${idloged}`}
              style={linkStyle}
              activeClassName="active"
            >
              Profil
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/editProfil/${idloged}`}
              style={linkStyle}
              activeClassName="active"
            >
              Edit Profil
            </NavLink>
          </li>
          <li>
            <NavLink
               to={`/addterrain/${idloged}`}
              style={linkStyle}
              activeClassName="active"
            >
              Add Terrain
            </NavLink>
          </li>
          <li>
            <NavLink
               to={`/terrains/${idloged}`}
              style={linkStyle}
              activeClassName="active"
            >
              All Terrain
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/" style={linkStyle} activeClassName="active">
              Home
            </NavLink>
          </li>
        </ul>
      </nav>
      <Outlet style={outletStyle} />
    </div>
  );
}

export default NavbarPartner;
