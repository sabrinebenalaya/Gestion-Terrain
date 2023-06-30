import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserByID } from "../Redux/Slices/sliceUser";
import { useDispatch, useSelector } from "react-redux";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
function ProfilUser() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();

  useEffect(() => {
    dispatch(getUserByID(id));
  }, [id, dispatch]);

  const user = useSelector((state) => state.user.user);


  function handelEdit(){
    navigate(`/editUser/${id}`);
   };
  return (
    <div>
   
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>first name :{user.firstName} last Name :{user.lastName}</Card.Title>
        <Card.Text> Email:
        {user.email}
        </Card.Text>
       
        <Card.Text>
          Phone:
        {user.phone}
        </Card.Text>
        <Card.Text>
          photo:
          <img src={user.photo} alt="user"
          style={{ width: "200px", height: "200px" }}></img>
        </Card.Text>
        <Button variant="primary" onClick={handelEdit}>Edit Profil</Button>
      </Card.Body>
    </Card>
  </div>
  )
}

export default ProfilUser