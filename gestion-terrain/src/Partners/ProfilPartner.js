import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPartnerByID } from "../Redux/Slices/slicePartner";
import { useNavigate, useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';

function ProfilPartner() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getPartnerByID(id));
  }, [id, dispatch]);

  const { partner } = useSelector((state) => state.partner);

  function handelEdit() {
    navigate(`/editProfil/${id}`);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
      <div style={{ width: "200px", height: "200px", borderRadius: "50%", overflow: "hidden" }}>
        <img src={partner.photo} alt="Partner" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      <h2>{partner.firstName} {partner.lastName}</h2>
      <p>Email: {partner.email}</p>
      <p>CIN: {partner.cin}</p>
      <p>Phone: {partner.phone}</p>
      <Button variant="primary" onClick={handelEdit}>Edit Profil</Button>
    </div>
  );
}

export default ProfilPartner;
