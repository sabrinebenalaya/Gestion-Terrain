import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Carousel from "react-bootstrap/Carousel";
import { useNavigate, useParams } from "react-router-dom";
import { getTerrainByID, updateTerrain } from "../Redux/Slices/sliceTerrains";

import Row from "react-bootstrap/Row";
import { useDispatch, useSelector } from "react-redux";

function EditTerrain( ) {
const { id }= useParams()
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getTerrainByID(id));
  }, [id, dispatch]);

  const terrainToEdited = useSelector((state) => state.terrain.terrain);

  const [terrain, setTerrain] = useState(terrainToEdited);

  const [files, setFiles] = useState([]);

  const handleFileInputChange = (event) => {
    const selectedFiles = event.target.files;
    setFiles(Array.from(selectedFiles));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;

    setTerrain((prevState) => ({
      ...prevState,
      address: {
        ...prevState.address,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Ajoute les nouvelles photos à formData
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        formData.append("image", files[i]);
      }
    }

    // Ajoute les données du nouveau terrain à formData
    formData.append("editTerrain", JSON.stringify(terrain));

    try {
      await dispatch(
        updateTerrain({ terrainToEdit: formData, idterrain: id, navigate })
      );

      // Efface les fichiers sélectionnés après l'ajout du terrain
      setFiles([]);
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  return (
    <Container style={{ marginRight: "-75px" }}>
      <div>
        <Col xs={12} md={6} className="text-center">
          {terrainToEdited.photo && (
            <Carousel>
              {terrainToEdited.photo.map((photo, index) => (
                <Carousel.Item key={index}>
                  <Image src={photo} alt={`Photo ${index + 1}`} fluid />
                </Carousel.Item>
              ))}
            </Carousel>
          )}
        </Col>

        <Col xs={12} md={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="Name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder={terrainToEdited.name}
                value={terrain.name}
                onChange={(e) =>
                  setTerrain({ ...terrain, name: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="surface">
              <Form.Label>Surface</Form.Label>
              <Form.Control
                type="number"
                placeholder={terrainToEdited.surface}
                value={terrain.surface}
                onChange={(e) =>
                  setTerrain({ ...terrain, surface: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder={terrainToEdited.price}
                value={terrain.price}
                onChange={(e) =>
                  setTerrain({ ...terrain, price: e.target.value })
                }
              />
            </Form.Group>

            <Row className="mb-3">
              <Form.Group as={Col} md="4">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="tape the city"
                  name="city"
                  onChange={handleAddressChange}
                />
              </Form.Group>
              <Form.Group as={Col} md="4">
                <Form.Label>Governorate</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="governorate"
                  name="governorate"
                  onChange={handleAddressChange}
                />
              </Form.Group>
              <Form.Group as={Col} md="4">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="country"
                  name="country"
                  onChange={handleAddressChange}
                />
              </Form.Group>
              <Form.Group as={Col} md="4">
                <Form.Label>Postal Code</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="postalCode"
                  name="postalCode"
                  onChange={handleAddressChange}
                />
              </Form.Group>
            </Row>

            <Form.Control
              as="textarea"
              name="description"
              placeholder={terrainToEdited.description}
              style={{ height: "100px" }}
              onChange={(e) =>
                setTerrain({ ...terrain, description: e.target.value })
              }
            />

            <Form.Group className="position-relative mb-3">
              <Form.Label>Photos of the terrain</Form.Label>
              <Form.Control
                type="file"
                name="photo"
                multiple
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

export default EditTerrain;
