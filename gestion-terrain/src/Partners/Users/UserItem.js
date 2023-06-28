import React from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

import { useDispatch,  } from "react-redux";
import { deleteUser } from "../../Redux/Slices/sliceUser";
function UserItem({ user }) {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //delete user
  const handelDelete = () => {
    
    dispatch(deleteUser({ idUser: user._id, idpartner: user.partner, navigate }));

  };

  //Edit user
  const handelEdit = () => {
    navigate(`/editUser/${user._id}`)
  };

  //show user
  const handelProfil = () => {  navigate(`/profilUser/${user._id}`)};
  return (
    <tr>
      <td>{user._id}</td>
      <td>{user.firstName}</td>
      <td>{user.lastName}</td>
      <td>
        <Button variant="danger" onClick={handelDelete}>
          Delete
        </Button>  
        <Button variant="warning" onClick={handelEdit}>
          Edit
        </Button>  
        <Button variant="info" onClick={handelProfil}>
          profil
        </Button>
      </td>
    </tr>
  );
}

export default UserItem;
