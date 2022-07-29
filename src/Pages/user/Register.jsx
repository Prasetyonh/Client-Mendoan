import React, { useState, useEffect } from "react";
import validator from "validator";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { Button } from "react-bootstrap";
import Error404 from "../../Components/404NotFound/404NotFound";
import jwt_decode from "jwt-decode";

import { API_URL } from "../../Utils/Constant";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [msg, setMsg] = useState("");
  const history = useHistory();

  const [roles, setRoles] = useState("");

  const [userRole, setUserRole] = useState("");

  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    refreshToken();
    getRoles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validateEmail = (e) => {
    var email = e.target.value;

    if (validator.isEmail(email)) {
      setEmailError(" ");
    } else {
      setEmailError("Enter valid Email!");
    }
  };

  const refreshToken = async () => {
    try {
      const response = await axios.get(API_URL + "/token");
      const decoded = jwt_decode(response.data.accessToken);

      setUserRole(decoded.role);
    } catch (error) {
      if (error.response) {
        history.push("/");
      }
    }
  };

  const getRoles = async () => {
    try {
      const response = await axios.get(API_URL + "/roles");
      setRoles(response.data);
    } catch (error) {
      if (error.response) {
        history.push("/");
      }
    }
  };

  const Register = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL + "/users", {
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

  if (userRole !== 1) {
    return (
      <div>
        <Error404 />
      </div>
    );
  } else {
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
                            <select
                              type="select"
                              className="form-control form-control-lg form-select "
                              value={role}
                              onChange={(e) => setRole(e.target.value)}
                            >
                              <option value={""} hidden>
                                Select Role
                              </option>
                              {roles.length > 0 ? (
                                roles.map((role, idx) => (
                                  <option key={idx} value={role.role_id}>
                                    {role.role_name}
                                  </option>
                                ))
                              ) : (
                                <option value={""}>No Roles</option>
                              )}
                            </select>
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
  }
};

export default Register;
