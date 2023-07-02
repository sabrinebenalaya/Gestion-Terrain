import React, { useEffect, useState } from "react";
import { getPartnerByID, updatePartner } from "../Redux/Slices/slicePartner";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function EditPartner({ id }) {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Charger les détails du partenaire
  useEffect(() => {
    dispatch(getPartnerByID(id));
  }, [id, dispatch]);

  const { partner } = useSelector((state) => state.partner);

  // État de l'édition
  const [editPartner, setEditPartner] = useState(partner);
  const [file, setFile] = useState(null);

  const handleFileInputChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleEdit = (e) => {
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
    <Container style={{ marginRight: "-75px" }}>
      <div>
        <Col xs={12} md={6} className="text-center">
          <Image
            src={partner.photo}
            roundedCircle
            style={{ width: "200px", height: "200px" }}
          />
        </Col>

        <Col xs={12} md={6}>
          <Form onSubmit={handleEdit}>
            <Form.Group controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder={partner.firstName}
                value={editPartner.firstName}
                onChange={(e) =>
                  setEditPartner({ ...editPartner, firstName: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder={partner.lastName}
                value={editPartner.lastName}
                onChange={(e) =>
                  setEditPartner({ ...editPartner, lastName: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder={partner.email}
                value={editPartner.email}
                onChange={(e) =>
                  setEditPartner({ ...editPartner, email: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="*******"
                
                onChange={(e) =>
                  setEditPartner({ ...editPartner, password: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="cin">
              <Form.Label>CIN</Form.Label>
              <Form.Control
                type="number"
                placeholder={partner.cin}
                value={editPartner.cin}
                onChange={(e) =>
                  setEditPartner({ ...editPartner, cin: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="phone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="number"
                placeholder={partner.phone}
                value={editPartner.phone}
                onChange={(e) =>
                  setEditPartner({ ...editPartner, phone: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="photo">
              <Form.Label>Photo</Form.Label>
              <Form.Control
                type="file"
                name="image"
                onChange={handleFileInputChange}
              />
            </Form.Group>

            <Button
              variant="success"
              type="submit"
              style={{
                marginTop: "10px",
                width: "200px",
                backgroundColor: "#f8f9fa",
                color: "#000000",
                border: "none",
                display: "block",
                margin: "10px auto 0",
              }}
            >
              Edit
            </Button>
          </Form>
        </Col>
      </div>
    </Container>
  );
}

export default EditPartner;
