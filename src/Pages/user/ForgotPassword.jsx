/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from "react";
import validator from "validator";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { Button, Form, InputGroup } from "react-bootstrap";

import show from "../../assets/eye.png";
import hide from "../../assets/hidden.png";

import { API_URL } from "../../Utils/Constant";

const ForgotPass = () => {
  const [emailError, setEmailError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showBtn, setShowBtn] = useState(true);

  const [passwordShown, setPasswordShown] = useState(false);
  const [confPasswordShown, setConfPasswordShown] = useState(false);

  const history = useHistory();

  const validateEmail = (e) => {
    var email = e.target.value;

    if (validator.isEmail(email)) {
      setEmailError(" ");
    } else {
      setEmailError("Enter valid Email!");
    }
  };

  const forgotPass = async (e) => {
    e.preventDefault();
    try {
      await axios.put(API_URL + "/forgot", {
        email: email,
        password: password,
        confPassword: confPassword,
      });
      setShowForm(true);
      setShowBtn(false);
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  const reset = async (e) => {
    e.preventDefault();
    try {
      if (password === confPassword) {
        Swal.fire({
          title: "Reset Password?",
          text: "You won't be able to revert this!",
          icon: "warning",
          focusConfirm: false,
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, reset it!",
        }).then(async (result) => {
          if (result.isConfirmed) {
            await axios.put(API_URL + "/forgot", {
              email: email,
              password: password,
              confPassword: confPassword,
            });
            Swal.fire("Success!", "Your password has been reset.", "success");
            history.push("/");
          }
        });
      } else {
        setMsg("Password and confirm password do not match!");
      }
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <section
        className="vh-100 forgot-page"
        style={{ backgroundColor: "#ebdfed" }}
      >
        <div className="container  h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card shadow" style={{ borderRadius: "1rem" }}>
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block mt-lg-5">
                    <img
                      src="../assets/images/forgotPass.png"
                      alt="login form"
                      className="img-fluid mt-5"
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
                          {" "}
                          <img
                            src="../assets/images/logotext.png"
                            width="350"
                            height="90"
                            alt="mendoans"
                          />
                        </span>
                      </div>
                      <h5
                        className="fw-normal mb-3 pb-3"
                        style={{ letterSpacing: "1px" }}
                      >
                        Forgot your password?
                      </h5>
                      <Form onSubmit={forgotPass}>
                        <Form.Group controlId="formBasicEmail" className="mb-4">
                          <Form.Label>Email</Form.Label>

                          <Form.Control
                            name="email"
                            type="email"
                            value={email}
                            onChange={(e) =>
                              setEmail(e.target.value) & validateEmail(e)
                            }
                            required
                          />
                          <p className="mt-2 text-danger">{emailError}</p>
                        </Form.Group>
                        {showBtn ? (
                          <>
                            <Button
                              style={{
                                backgroundColor: "#b66dff",
                                border: "none",
                              }}
                              type="submit"
                            >
                              Submit
                            </Button>
                          </>
                        ) : null}
                      </Form>
                      {showForm ? (
                        <>
                          <Form onSubmit={reset}>
                            <Form.Label>New Password</Form.Label>
                            <InputGroup className="pass mb-4">
                              <Form.Control
                                type={passwordShown ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                              />{" "}
                              <InputGroup.Text>
                                <img
                                  src={passwordShown ? hide : show}
                                  onClick={() =>
                                    setPasswordShown((prevState) => !prevState)
                                  }
                                  alt="show password"
                                />
                              </InputGroup.Text>
                            </InputGroup>

                            <Form.Label>Confirm New Password</Form.Label>
                            <InputGroup className="confPass mb-4">
                              <Form.Control
                                type={confPasswordShown ? "text" : "password"}
                                value={confPassword}
                                onChange={(e) =>
                                  setConfPassword(e.target.value)
                                }
                                required
                              />{" "}
                              <InputGroup.Text>
                                <img
                                  src={confPasswordShown ? hide : show}
                                  onClick={() =>
                                    setConfPasswordShown(
                                      (prevState) => !prevState
                                    )
                                  }
                                  cursor="pointer"
                                  alt="show password"
                                />
                              </InputGroup.Text>
                            </InputGroup>
                            <Button
                              style={{
                                backgroundColor: "#b66dff",
                                border: "none",
                              }}
                              type="submit"
                            >
                              Reset Password
                            </Button>
                          </Form>
                        </>
                      ) : null}
                      <p className="mt-2 text-danger">{msg}</p>
                      <p>
                        Back to
                        <Link className="text-primary" to={"/"}>
                          {"  "}Login
                        </Link>
                      </p>
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

export default ForgotPass;
