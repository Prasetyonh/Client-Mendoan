/* eslint-disable array-callback-return */
import React, { useState, useEffect } from "react";
import { Col, Row, Container, Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

import { API_URL } from "../../Utils/Constant";
import { FAKEAPI_URL } from "../../Utils/Constant";

const Resign = () => {
  const [setToken] = useState("");
  const [setExpire] = useState("");

  const [data, setData] = useState([]);
  const [dataResign, setDataResign] = useState([]);
  const history = useHistory();

  useEffect(() => {
    refreshToken();
    getResign();
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

  const getResign = () => {
    axios.get(API_URL + "/resign").then((res) => {
      const data = res.data;
      setData(data);
    });
    axios.get(FAKEAPI_URL + `/resign`).then((res) => {
      const resigns = res.data;
      setDataResign(resigns);
      console.log(resigns);
    });
    //initialize datatable
    $(document).ready(function () {
      setTimeout(function () {
        $("#example").DataTable();
      }, 1000);
    });
  };

  return (
    <div className="MainDiv">
      <Container>
        <Row className="mt-4">
          <Col md="{12}">
            <Card className="border-0 rounded shadow mb-3">
              <Card.Header as="h5" className="text-center">
                List Karyawan Resign
              </Card.Header>
              <Card.Body>
                <Link to={"/addresign"}>
                  <Button
                    style={{ backgroundColor: "#b66dff" }}
                    className="mb-3 float-end btn-light text-white"
                    size="md"
                  >
                    Add Resign
                  </Button>
                </Link>
                <div style={{ overflowX: "auto", width: "100%" }}>
                  <table
                    id="example"
                    className="table table-borderless table-striped hover compact "
                  >
                    <thead>
                      <tr>
                        <th style={{ width: "4%" }}>No</th>
                        <th>Nama Karyawan</th>
                        <th>NIK</th>
                        <th>Tanggal Resign</th>
                        <th>Divisi</th>
                        <th>Email</th>
                        <th>Status Karyawan</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((result, index) => {
                        return (
                          <tr key={result.id}>
                            <td>{index + 1}</td>
                            <td>{result.fullname}</td>
                            <td>{result.nik}</td>
                            <td>
                              {dataResign.map((resign, idx) => {
                                if (result.user_id === resign.user_id) {
                                  return (
                                    <div>
                                      {moment(resign.tanggalresign).format(
                                        "DD-MM-YYYY"
                                      )}
                                    </div>
                                  );
                                }
                              })}
                            </td>

                            <td>{result.divisi}</td>
                            <td>{result.email}</td>
                            <td>{result.status}</td>

                            <td align="center">
                              <Button
                                as={Link}
                                to={`/detailresign/${result.user_id}`}
                                variant="info"
                                aria-label="Info Karyawan"
                                size="sm"
                                className="btn m-1 text-white"
                              >
                                <FontAwesomeIcon icon={faInfo} size="sm" />
                              </Button>
                              {/* <Button
                                as={Link}
                                to={`/editkaryawan/${result.user_id}`}
                                style={{
                                  backgroundColor: "#fed713",
                                  border: "none",
                                }}
                                size="sm"
                                className="btn m-1"
                              >
                                <FontAwesomeIcon icon={faPencil} size="sm" />
                              </Button> */}
                            </td>
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
      </Container>
    </div>
  );
};

export default Resign;
