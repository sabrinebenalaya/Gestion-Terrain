import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPartnerByID } from "../../Redux/Slices/slicePartner";
import { useNavigate, useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
function ProfilPartner() {
  const { id } = useParams();
  const dispatch = useDispatch();
const navigate = useNavigate();

  useEffect(() => {
    dispatch(getPartnerByID(id));
  }, [id, dispatch]);

  const { partner } = useSelector((state) => state.partner);

  function handelEdit(){
   navigate(`/editProfil/${id}`);
  };

  return (
    <div>
      {" "}
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>first name :{partner.firstName} last Name :{partner.lastName}</Card.Title>
          <Card.Text> Email:
          {partner.email}
          </Card.Text>
          <Card.Text>
            CIN:
          {partner.cin}
          </Card.Text>
          <Card.Text>
            Phone:
          {partner.phone}
          </Card.Text>
          <Card.Text>
            photo:
            <img src={partner.photo} alt="a partner"></img>
          </Card.Text>
          <Button variant="primary" onClick={handelEdit}>Edit Profil</Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ProfilPartner;
