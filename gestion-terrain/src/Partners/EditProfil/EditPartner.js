import React, { useEffect, useState } from "react";
import { getPartnerByID, updatePartner } from "../../Redux/Slices/slicePartner";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";

import Form from "react-bootstrap/Form";
function EditPartner() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  //call partner details
  useEffect(() => {
    dispatch(getPartnerByID(id));
  }, [id, dispatch]);

  const { partner } = useSelector((state) => state.partner);

  // EditState
  const [editPartner, setEditPartner] = useState(partner);

  const [file, setFile] = useState(null);

  const handleFileInputChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const HandelEdit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    if (file) {
      formData.append("image", file);
    }

    formData.append("editPartner", JSON.stringify(editPartner));

    dispatch(
      updatePartner({ partnerToEdit: formData, idPartner: id, navigate })
    );
  };
  return (
    <Container>
      <Col xs={6} md={4}>
        <Image
          src={partner.photo}
          roundedCircle
          style={{ width: "200px", height: "200px" }}
        />
      </Col>

      <Col xs={6} md={4}>
        <Form.Label htmlFor="firstName">First Name</Form.Label>
        <Form.Control
          type="text"
          id="firstName"
          placeholder={partner.firstName}
          onChange={(e) =>
            setEditPartner({
              ...editPartner,
              firstName: e.target.value,
            })
          }
        />
      </Col>
      <Col xs={6} md={4}>
        <Form.Label htmlFor="lastName">last Name</Form.Label>
        <Form.Control
          type="text"
          id="lastName"
          placeholder={partner.lastName}
          onChange={(e) =>
            setEditPartner({
              ...editPartner,
              lastName: e.target.value,
            })
          }
        />
      </Col>
      <Col xs={6} md={4}>
        <Form.Label htmlFor="Email">Email</Form.Label>
        <Form.Control
          type="email"
          id="Email"
          placeholder={partner.email}
          onChange={(e) =>
            setEditPartner({
              ...editPartner,
              email: e.target.value,
            })
          }
        />
      </Col>
      <Col xs={6} md={4}>
        <Form.Label htmlFor="Password">Password</Form.Label>
        <Form.Control
          type="password"
          id="Password"
          placeholder="*******"
          onChange={(e) =>
            setEditPartner({
              ...editPartner,
              password: e.target.value,
            })
          }
        />
      </Col>
      <Col xs={6} md={4}>
        <Form.Label htmlFor="CIN">CIN</Form.Label>
        <Form.Control
          type="Number"
          id="CIN"
          placeholder={partner.cin}
          onChange={(e) =>
            setEditPartner({
              ...editPartner,
              cin: e.target.value,
            })
          }
        />
      </Col>
      <Col xs={6} md={4}>
        <Form.Label htmlFor="Phone">Phone</Form.Label>
        <Form.Control
          type="Number"
          id="Phone"
          placeholder={partner.phone}
          onChange={(e) =>
            setEditPartner({
              ...editPartner,
              phone: e.target.value,
            })
          }
        />
      </Col>
      <Col xs={6} md={4}>
        <Form.Group controlId="formFileSm" className="mb-3">
          <Form.Label>Photo</Form.Label>
          <Form.Control
            type="file"
            size="sm"
            name="image"
            onChange={handleFileInputChange}
          />
        </Form.Group>
      </Col>
      <Col xs={6} md={4}>
        <Button variant="success" onClick={HandelEdit}>
          Edit
        </Button>
      </Col>
    </Container>
  );
}

export default EditPartner;
