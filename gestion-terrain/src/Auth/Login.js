import React, { useState } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import ValidateLogin from "./../Validator/ValidateLogin";
import { login } from "../Redux/Slices/sliceAuth";
import { toast } from "react-toastify";
import { isEmpty } from "../Validator/IsEmpty";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

function Login() {
  const [userLoged, setUserLoged] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handelLogin = (e) => {
    e.preventDefault();

    const { errors, isValid } = ValidateLogin(userLoged);
    if (!isValid) {
      if (!isEmpty(errors.email)) {
        toast.error(errors.email);
      }

      if (!isEmpty(errors.password)) {
        toast.error(errors.password);
      }
    } else {
      console.log(userLoged);
      dispatch(login(userLoged)).then((resultAction) => {
        if (resultAction.payload) {
          navigate(resultAction.payload);
        }
      });
    }
  };

  return (
    <div
      style={{
        background: "linear-gradient(to bottom right, #ff00ff, #00ffff)",
      }}
    >
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <div className="border border-3 border-primary"></div>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-uppercase ">Login</h2>
                  <p className=" mb-5">Please enter your login and password!</p>
                  <div className="mb-3">
                    <Form>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Email address
                        </Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          placeholder="Enter email"
                          onChange={(e) =>
                            setUserLoged({
                              ...userLoged,
                              [e.target.name]: e.target.value,
                            })
                          }
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="password"
                          placeholder="Password"
                          onChange={(e) =>
                            setUserLoged({
                              ...userLoged,
                              [e.target.name]: e.target.value,
                            })
                          }
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      >
                        <p className="small">
                          <a className="text-primary" href="#!">
                            Forgot password?
                          </a>
                        </p>
                      </Form.Group>
                      <div className="d-grid">
                        <Button variant="primary" onClick={handelLogin}>
                          Login
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Don't have an account?{" "}
                        <NavLink to="/register"> Sign Up</NavLink>
                      </p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
