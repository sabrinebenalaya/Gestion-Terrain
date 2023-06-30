import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserByID, updateUser } from "../Redux/Slices/sliceUser";
import { useDispatch, useSelector } from "react-redux";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";

import Form from "react-bootstrap/Form";
function EditUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //get user
  const { id } = useParams();

  useEffect(() => {
    dispatch(getUserByID(id));
  }, [id, dispatch]);

  const user = useSelector((state) => state.user.user);

  //edit user
  const [editUser, setEditUser] = useState(user);

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

    formData.append("editUser", JSON.stringify(editUser));

    dispatch(updateUser({ userToEdit: formData, iduser: id, navigate }));
  };
  return (
    <Container>
      <Col xs={6} md={4}>
        <Image
          src={user.photo}
          roundedCircle
          style={{ width: "200px", height: "200px" }}
        />
      </Col>

      <Col xs={6} md={4}>
        <Form.Label htmlFor="firstName">First Name</Form.Label>
        <Form.Control
          type="text"
          id="firstName"
          placeholder={user.firstName}
          onChange={(e) =>
            setEditUser({
              ...editUser,
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
          placeholder={user.lastName}
          onChange={(e) =>
            setEditUser({
              ...editUser,
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
          placeholder={user.email}
          onChange={(e) =>
            setEditUser({
              ...editUser,
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
            setEditUser({
              ...editUser,
              password: e.target.value,
            })
          }
        />
      </Col>

      <Col xs={6} md={4}>
        <Form.Label htmlFor="Phone">Phone</Form.Label>
        <Form.Control
          type="Number"
          id="Phone"
          placeholder={user.phone}
          onChange={(e) =>
            setEditUser({
              ...editUser,
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
          Edit User
        </Button>
      </Col>
    </Container>
  );
}

export default EditUser;
