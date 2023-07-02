import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import ValidateRegister from "../Validator/ValidateRegister";
import { toast } from "react-toastify";
import { isEmpty } from "../Validator/IsEmpty";
import { useDispatch } from "react-redux";
import { register } from "../Redux/Slices/sliceAuth";
import { useNavigate } from "react-router-dom";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [newPartner, setNewPartner] = useState({});

  const handelRegister = (e) => {
    e.preventDefault();

    const { errors, isValid } = ValidateRegister(newPartner);
    if (!isValid) {
      if (!isEmpty(errors.email)) {
        toast.error(errors.email);
      }

      if (!isEmpty(errors.firstName)) {
        toast.error(errors.firstName);
      }
      if (!isEmpty(errors.lastName)) {
        toast.error(errors.lastName);
      }
      if (!isEmpty(errors.phone)) {
        toast.error(errors.phone);
      }
      if (!isEmpty(errors.cin)) {
        toast.error(errors.cin);
      }
      if (!isEmpty(errors.password)) {
        toast.error(errors.password);
      }
      if (!isEmpty(errors.reppassword)) {
        toast.error(errors.reppassword);
      }
    } else {
      dispatch(register(newPartner)).then((resultAction) => {
        if (resultAction.payload) {
          navigate(resultAction.payload);
        }
      });
    }
  };

  const containerStyle = {
    background: "linear-gradient(to bottom right, #ff00ff, #00ffff)",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    color: "#fff",
  };

  const cardStyle = {
    width: "400px",
    padding: "20px",
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
    margin: "auto",
  };

  return (
    <div style={containerStyle}>
      <Card style={cardStyle}>
      <Card.Title style={{ color: "black" }}>Register</Card.Title>

        <Form>
          <Row>
            <Col>
              <Form.Control
                className="mb-3"
                placeholder="First name"
                name="firstName"
                type="text"
                onChange={(e) =>
                  setNewPartner({
                    ...newPartner,
                    [e.target.name]: e.target.value,
                  })
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
                  setNewPartner({
                    ...newPartner,
                    [e.target.name]: e.target.value,
                  })
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
                  setNewPartner({
                    ...newPartner,
                    [e.target.name]: e.target.value,
                  })
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
                  setNewPartner({
                    ...newPartner,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Control
                className="mb-3"
                type="password"
                placeholder="Tape your Password"
                name="password"
                onChange={(e) =>
                  setNewPartner({
                    ...newPartner,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </Col>
            <Col>
              <Form.Control
                className="mb-3"
                type="password"
                placeholder="Confirm your Password"
                name="reppassword"
                onChange={(e) =>
                  setNewPartner({
                    ...newPartner,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Control
                className="mb-3"
                type="Number"
                placeholder="Tape your cin number"
                name="cin"
                onChange={(e) =>
                  setNewPartner({
                    ...newPartner,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </Col>
          </Row>
          <Button variant="primary" onClick={handelRegister}>
            Register
          </Button>
        </Form>
      </Card>
    </div>
  );
}

export default Register;
