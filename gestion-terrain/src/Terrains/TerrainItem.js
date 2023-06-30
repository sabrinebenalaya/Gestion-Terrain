import React from 'react'
import { deleteTerrain } from '../Redux/Slices/sliceTerrains';
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

import { useDispatch,  } from "react-redux";
function TerrainItem({terrain}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
     //delete terrain
  const handelDelete = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this terrain"
    );
    if (confirmed) {
      dispatch(deleteTerrain({ idTerrain: terrain._id, navigate }));
    }
   

  };

  //Edit Terrain
  const handelEdit = () => {
    navigate(`/editTerrain/${terrain._id}`)
  };

  return (
    <tr>
    <td>{terrain._id}</td>
    <td>{terrain.name}</td>
    <td>{terrain.price}</td>
    <td>{terrain.price}</td>
    <td>
      <Button variant="danger" onClick={handelDelete}>
        Delete
      </Button>  
      <Button variant="warning" onClick={handelEdit}>
        Edit
      </Button>  
    
    </td>
  </tr>
  )
}

export default TerrainItem