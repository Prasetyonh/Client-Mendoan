import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { Link, useHistory } from "react-router-dom";
import { Col, Row, Container, Card, Button } from "react-bootstrap";
import Error404 from "../../Components/404NotFound/404NotFound";

import { API_URL } from "../../Utils/Constant";

const Dashboard = () => {
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [users, setUsers] = useState([]);
  const [role, setRole] = useState("");
  const history = useHistory();

  useEffect(() => {
    refreshToken();
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get(API_URL + "/token");
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setName(decoded.name);
      setExpire(decoded.exp);
      setRole(decoded.role);
    } catch (error) {
      if (error.response) {
        history.push("/");
      }
    }
  };

  const axiosJwt = axios.create();

  axiosJwt.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
        const response = await axios.get(API_URL + "/token");
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        const decoded = jwt_decode(response.data.accessToken);
        setName(decoded.name);
        setExpire(decoded.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const getUsers = async () => {
    const response = await axiosJwt.get(API_URL + "/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setUsers(response.data);
    console.log(response.data);
  };
  if (role !== 1) {
    return <Error404 />;
  } else {
    return (
      <div className="MainDiv">
        {/* <Button variant="primary" size="sm" type="submit" onClick={getUsers}>
        Get Users
      </Button> */}
        <Container>
          <h4>
            Welcome : <span className="text-uppercase">{name}</span>
          </h4>
          <Row>
            <Col md="{12}">
              <Card className="border-0 rounded shadow mb-3">
                <Card.Header as="h5" className="text-center">
                  List Users Registered
                </Card.Header>
                <Card.Body>
                  <Link to={"/adduser"}>
                    <Button
                      style={{ backgroundColor: "#b66dff" }}
                      className="mb-3 float-end btn-light text-white"
                      size="md"
                    >
                      Add User
                    </Button>
                  </Link>
                  <div style={{ overflowX: "auto", width: "100%" }}>
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>No</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Role ID</th>
                          <th>Role</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role_id}</td>
                            <td>{user.role_name}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
};

export default Dashboard;
