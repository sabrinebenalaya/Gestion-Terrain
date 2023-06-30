import React, { useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addTerrain } from "../Redux/Slices/sliceTerrains";

function AddTerrain() {
  const {id}= useParams()
  const [newTerrain, setNewTerrain] = useState({partner: id});
  const dispatch = useDispatch();

  const [files, setFiles] = useState([]);

  const handleFileInputChange = (event) => {
    const selectedFiles = event.target.files;
    const fileArray = Array.from(selectedFiles);
    setFiles(fileArray);
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    
    setNewTerrain((prevState) => ({
      ...prevState,
      address: {
        ...prevState.address,
        [name]: value,
      },
    }));
  };
  


  const handleSubmit = (e) => {
    e.preventDefault();
  
    const formData = new FormData();
  
    if (files) {
      formData.append("image", files);
    }
console.log(newTerrain)  
    Object.entries(newTerrain).forEach(([key, value]) => {
      formData.append(key, value);
    });
  
    dispatch(addTerrain({ newTerrain: formData }));
    console.log("submitting", formData);
  };
  

  return (
    <div>
      <h2>Add Terrain</h2>
      <Form className="container">
        <Form.Group className="mb-3">
          <Form.Label> Name:</Form.Label>
          <Form.Control
            type="text"
            placeholder="tape the name of terrain"
            name="name"
            onChange={(e) =>
              setNewTerrain({ ...newTerrain, [e.target.name]: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label> Surface:</Form.Label>
          <Form.Control
            type="number" name="surface"
            placeholder="tape the surface of terrain"
            onChange={(e) =>
              setNewTerrain({ ...newTerrain, [e.target.name]: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label> Price:</Form.Label>
          <Form.Control
            type="number"
            placeholder="tape the price of terrain" name="price"
            onChange={(e) =>
              setNewTerrain({ ...newTerrain, [e.target.name]: e.target.value })
            }
          />
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} md="4" >
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              placeholder="City"
            
              name="city"
              onChange={handleAddressChange}
            />
       
          </Form.Group>
          <Form.Group as={Col} md="4" >
            <Form.Label>governorate</Form.Label>
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
          <Form.Group as={Col} md="4" >
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              type="text"
              placeholder="postalCode"
              name="postalCode"
              onChange={handleAddressChange}
            />
           
          </Form.Group>
        </Row>
        <FloatingLabel label="Description">
          <Form.Control
            as="textarea"
            name="description"
            placeholder="Leave a description here"
            style={{ height: "100px" }}
            onChange={(e) =>
              setNewTerrain({ ...newTerrain, [e.target.name]: e.target.value })
            }
          />
        </FloatingLabel>

        <Form.Group className="position-relative mb-3">
          <Form.Label>File</Form.Label>
          <Form.Control
            type="file"
           
            name="photo"
            accept="image/*"
            multiple
            onChange={handleFileInputChange}
          />
     
        </Form.Group>

        <Button type="submit" onClick={handleSubmit}>
          Add Terrain
        </Button>
      </Form>
    </div>
  );
}

export default AddTerrain;
