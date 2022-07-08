import React, { useState, useEffect } from "react";
import "../Dashboard/Dashboard.css";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";
import CardSummary from "./CardSummary";
import { Col, Row, Card } from "react-bootstrap";

import { API_URL, FAKEAPI_URL } from "../../Utils/Constant";

const Dashboard = () => {
  const [setToken] = useState("");
  const [setExpire] = useState("");

  const [data, setData] = useState([]);

  const history = useHistory();

  useEffect(() => {
    refreshToken();

    getLastTen();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get(API_URL + "/token");
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);

      setExpire(decoded.exp);
    } catch (error) {
      if (error.response) {
        history.push("/");
      }
    }
  };

  const getLastTen = () => {
    axios.get(FAKEAPI_URL + "/lastten").then((res) => {
      const data = res.data;
      console.log(data);
      setData(data);
    });
  };

  return (
    <div className="MainDiv">
      <h6 className="text-secondary ms-3">DASHBOARD</h6>
      <CardSummary />
      <Row className="mt-4">
        <Col md="{12}">
          <Card className=" shadow mb-3 mx-4 " style={{ borderRadius: "15px" }}>
            <Card.Header
              style={{
                backgroundColor: "white",
                borderTopLeftRadius: "15px",
                borderTopRightRadius: "15px",
              }}
              as="h5"
            >
              List Activity
            </Card.Header>
            <Card.Body>
              <div style={{ overflowX: "auto" }}>
                <table className="table table-borderless table-striped hover compact">
                  <thead>
                    <tr style={{ color: "#5e5e5e" }}>
                      <th>NAMA PROJECT / BOARD</th>
                      <th>DIUPDATE OLEH</th>
                      <th>KEGIATAN</th>
                      <th>TANGGAL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((result) => {
                      return (
                        <tr key={result.id}>
                          <td style={{ color: "#b66cfd" }}>{result.name}</td>
                          <td>{result.fullname}</td>
                          <td>{result.type}</td>
                          <td>{result.tanggal}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;