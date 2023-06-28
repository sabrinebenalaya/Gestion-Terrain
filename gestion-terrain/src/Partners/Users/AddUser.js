import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import { useDispatch } from "react-redux";
import { addUser } from "../../Redux/Slices/sliceUser";

function AddUser({ idPartner, handleClose }) {
  const dispatch = useDispatch();
  const [newUser, setNewUser] = useState({ partner: idPartner });

  const handelAdd = (e) => {
    e.preventDefault();

    dispatch(addUser({ newUser, handleClose }));
  };

  return (
    <Form>
      <Row>
        <Col>
          <Form.Control
            className="mb-3"
            placeholder="First name"
            name="firstName"
            type="text"
            onChange={(e) =>
              setNewUser({ ...newUser, [e.target.name]: e.target.value })
            }
          />
        </Col>
        <Col>
          <Form.Control
            className="mb-3"
            placeholder="Last name"
            name="lastName"
            type="text"
            onChange={(e) =>
              setNewUser({ ...newUser, [e.target.name]: e.target.value })
            }
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Control
            className="mb-3"
            type="email"
            placeholder="Tape your mail adress"
            name="email"
            onChange={(e) =>
              setNewUser({ ...newUser, [e.target.name]: e.target.value })
            }
          />
        </Col>
        <Col>
          <Form.Control
            className="mb-3"
            placeholder="Tape your phone number"
            name="phone"
            type="Number"
            onChange={(e) =>
              setNewUser({
                ...newUser,
                [e.target.name]: parseInt(e.target.value),
                password: e.target.value,
              })
            }
          />
        </Col>
      </Row>

      <Button variant="success" onClick={handelAdd}>
        Add User
      </Button>
    </Form>
  );
}

export default AddUser;
