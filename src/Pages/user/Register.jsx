import React, { useState } from "react";
import validator from "validator";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { Button } from "react-bootstrap";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [msg, setMsg] = useState("");
  const history = useHistory();

  const [emailError, setEmailError] = useState("");
  const validateEmail = (e) => {
    var email = e.target.value;

    if (validator.isEmail(email)) {
      setEmailError(" ");
    } else {
      setEmailError("Enter valid Email!");
    }
  };

  const Register = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:2471/users", {
        name: name,
        email: email,
        role: role,
        password: password,
        confPassword: confPassword,
      });
      Swal.fire("Success!", "Registration Success", "success");
      history.push("/users");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <section className="vh-100" style={{ backgroundColor: "#ebdfed" }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card shadow" style={{ borderRadius: "1rem" }}>
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block mt-lg-5">
                    <img
                      src="../assets/images/SignUp.png"
                      alt="login form"
                      className="img-fluid"
                      style={{
                        borderRadius: "1rem 0 0 1rem",
                        marginTop: "150px",
                      }}
                    />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <form onSubmit={Register}>
                        <div className="d-flex align-items-center mb-3 pb-1">
                          <img
                            src="../assets/images/logotext.png"
                            width="350"
                            height="90"
                            alt="mendoans"
                            className="img-fluid"
                          />
                        </div>
                        <h5
                          className="fw-normal mb-3 pb-3"
                          style={{ letterSpacing: "1px" }}
                        >
                          Create an account
                        </h5>

                        <div className="form-outline mb-3">
                          <label
                            className="form-label"
                            htmlFor="form2Example17"
                          >
                            Name
                          </label>{" "}
                          <input
                            type="text"
                            id="form2Example17"
                            className="form-control form-control-lg"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>

                        <div className="form-outline mb-3">
                          <label
                            className="form-label"
                            htmlFor="form2Example18"
                          >
                            Email
                          </label>
                          <input
                            type="email"
                            id="form2Example18"
                            className="form-control form-control-lg"
                            required
                            value={email}
                            onChange={(e) =>
                              setEmail(e.target.value) & validateEmail(e)
                            }
                          />
                          <p className="mt-2 text-danger">{emailError}</p>
                        </div>

                        <div className="form-outline mb-3">
                          <label
                            className="form-label"
                            htmlFor="form2Example19"
                          >
                            Role
                          </label>{" "}
                          <input
                            type="number"
                            min="1"
                            max="15"
                            id="form2Example19"
                            className="form-control form-control-lg"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                          />
                        </div>

                        <div className="form-outline mb-3">
                          <label
                            className="form-label"
                            htmlFor="form2Example27"
                          >
                            Password
                          </label>
                          <input
                            type="password"
                            id="form2Example27"
                            className="form-control form-control-lg"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>

                        <div className="form-outline mb-4">
                          <label
                            className="form-label"
                            htmlFor="form2Example28"
                          >
                            Confirm Password
                          </label>{" "}
                          <input
                            type="password"
                            id="form2Example28"
                            className="form-control form-control-lg"
                            value={confPassword}
                            onChange={(e) => setConfPassword(e.target.value)}
                          />
                          <p className="mt-2 text-danger">{msg}</p>
                        </div>
                        <div className="pt-1 mb-4">
                          <Button
                            style={{
                              backgroundColor: "#b66dff",
                              border: "none",
                            }}
                            type="submit"
                          >
                            SUBMIT
                          </Button>
                        </div>
                      </form>
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

export default Register;
