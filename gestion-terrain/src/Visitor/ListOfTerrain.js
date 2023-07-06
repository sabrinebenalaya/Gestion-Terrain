import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllterrains, getTerrains } from "./../Redux/Slices/sliceTerrains";

import CardTerrain from "./CardTerrain";

function ListOfTerrain() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllterrains());
  }, [dispatch]);

  const listterrains = useSelector((state) => state.terrain.terrains);

  
  const terrains = Array.isArray(listterrains) ? listterrains : [listterrains];

 console.log(terrains)

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }} className="container">
      {terrains?.map((terrain) => (
        <CardTerrain key={terrain._id} terrain={terrain} />
      ))}
    </div>
  );
}

export default ListOfTerrain;
