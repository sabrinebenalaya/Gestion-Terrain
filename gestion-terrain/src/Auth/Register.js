import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import ValidateRegister from "../Validator/ValidateRegister"
import { toast } from "react-toastify";
import { isEmpty } from "../Validator/IsEmpty";
import { useDispatch } from "react-redux";
import {register} from "../Redux/Slices/sliceAuth";

function Register() {
  const dispatch = useDispatch();
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
    }else{
     
      dispatch(register(newPartner)); 
    }


    
    
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
              setNewPartner({ ...newPartner, [e.target.name]: e.target.value })
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
              setNewPartner({ ...newPartner, [e.target.name]: e.target.value })
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
              setNewPartner({ ...newPartner, [e.target.name]: e.target.value })
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
              setNewPartner({ ...newPartner, [e.target.name]: e.target.value })
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
              setNewPartner({ ...newPartner, [e.target.name]: e.target.value })
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
              setNewPartner({ ...newPartner, [e.target.name]: e.target.value })
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
              setNewPartner({ ...newPartner, [e.target.name]: e.target.value })
            }
          />
        </Col>
       
      </Row>
      <Button variant="success" onClick={handelRegister}>
        Success
      </Button>
    </Form>
  );
}

export default Register;
