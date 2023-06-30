import React, { useEffect } from "react";
import TerrainItem from "./TerrainItem";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getTerrains } from "../Redux/Slices/sliceTerrains";
import Table from "react-bootstrap/Table";

function ListTerrains() {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTerrains(id));
  }, [id, dispatch]);

  const terrains = useSelector((state) => state.terrain.terrains);
  return (
    <div>
      <h1>Liste des terrains</h1>
      <Table striped>
        <thead>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>Adresse</th>
            <th>Prix</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {terrains?.map((item, key) => {
            return <TerrainItem key={key} terrain={item} />;
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default ListTerrains;
