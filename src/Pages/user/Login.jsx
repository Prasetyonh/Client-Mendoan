import React, { useState } from "react";
import validator from "validator";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { Button, Form, InputGroup } from "react-bootstrap";

import show from "../../assets/eye.png";
import hide from "../../assets/hidden.png";

import { API_URL } from "../../Utils/Constant";
axios.defaults.withCredentials = true;

const Login = ({ setIsLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const history = useHistory();

  const [passwordShown, setPasswordShown] = useState(false);

  const [emailError, setEmailError] = useState("");

  const validateEmail = (e) => {
    var email = e.target.value;

    if (validator.isEmail(email)) {
      setEmailError(" ");
    } else {
      setEmailError("Enter valid Email!");
    }
  };

  // const [validated, setValidated] = useState(false);

  // const handleSubmit = (event) => {
  //   const form = event.currentTarget;
  //   if (form.checkValidity() === false) {
  //     event.preventDefault();
  //     event.stopPropagation();
  //   }

  //   setValidated(true);
  // };

  const Auth = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(API_URL + "/login", {
        withCredentials: true,
        credentials: "same-origin",
        email: email,
        password: password,
      });
      localStorage.setItem("tokenStore", response.data.accessToken);
      setIsLogin(true);
      history.push("/dashboard");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <section
        className="vh-100 login-page zoom"
        style={{ backgroundColor: "#ebdfed" }}
      >
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card shadow" style={{ borderRadius: "1rem" }}>
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block mt-lg-5">
                    <img
                      src="../assets/images/Login.png"
                      alt="login form"
                      className="img-fluid mt-3"
                      style={{ borderRadius: "1rem 0 0 1rem" }}
                    />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <div className="d-flex align-items-center mb-3 pb-1">
                        <span
                          className="h1 fw-bold"
                          style={{ marginLeft: "-20px", marginBottom: "-25px" }}
                        >
                          <img
                            src="../assets/images/logotext.png"
                            width="350"
                            height="90"
                            alt="mendoans"
                            className="img-fluid"
                          />
                        </span>
                      </div>
                      <h5
                        className="fw-normal mb-3 pb-3"
                        style={{ letterSpacing: "1px" }}
                      >
                        Sign into your account
                      </h5>
                      <Form
                        onSubmit={Auth}
                        // noValidate
                        // validated={validated}
                        // onSubmit={handleSubmit}
                      >
                        <Form.Group controlId="validationCustom01">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            name="email"
                            required
                            type="email"
                            value={email}
                            onChange={(e) =>
                              setEmail(e.target.value) & validateEmail(e)
                            }
                          />
                          <p className="mt-2 text-danger">{emailError}</p>
                        </Form.Group>
                        <Form.Group
                          controlId="validationCustom02"
                          className="pass"
                        >
                          <Form.Label>Password</Form.Label>
                          <InputGroup hasValidation>
                            <Form.Control
                              type={passwordShown ? "text" : "password"}
                              required
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                            <InputGroup.Text id="inputGroupPrepend">
                              <img
                                src={passwordShown ? hide : show}
                                onClick={() =>
                                  setPasswordShown((prevState) => !prevState)
                                }
                                alt="show password"
                              />
                            </InputGroup.Text>
                          </InputGroup>
                          <p className="mt-2 text-danger">{msg}</p>
                        </Form.Group>
                        <Link className="text-primary" to={"/forgot"}>
                          Forgot password?
                        </Link>
                        <br />
                        <Button
                          style={{ backgroundColor: "#b66dff", border: "none" }}
                          className="mt-3"
                          type="submit"
                        >
                          Login
                        </Button>
                      </Form>

                      {/* Register (Not Used) */}
                      {/* <p className="mb-5 pb-lg-2">
                          Don't have an account?{" "}
                          <Link
                            to={"/register"}
                            style={{ textDecoration: "none" }}
                          >
                            Register here
                          </Link>
                        </p> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
