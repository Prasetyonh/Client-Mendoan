import React, { useState, useEffect } from "react";
import { Col, Row, Container, Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import moment from "moment";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

const Resign = () => {
  const [setToken] = useState("");
  const [setExpire] = useState("");

  const [data, setData] = useState([]);
  const history = useHistory();

  useEffect(() => {
    document.body.style.backgroundColor = "#f2edf3";
    refreshToken();
    getResign();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:2471/token");
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
    axios.get("http://localhost:2471/resign").then((res) => {
      //Storing users detail in state array object
      const data = res.data;
      setData(data);

      console.log("total karyawan = " + data.length);
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
                List Karyawan
              </Card.Header>
              <Card.Body>
                <Link to={"/addkaryawan"}>
                  <Button
                    variant="success"
                    className="mb-3 float-end"
                    size="sm"
                  >
                    Add Karyawan
                  </Button>
                </Link>
                <div style={{ overflowX: "auto", width: "100%" }}>
                  <table
                    id="example"
                    className="table table-hover table-bordered"
                  >
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Nama Karyawan</th>
                        <th>NIK</th>
                        <th>Lama Bekerja</th>
                        <th>Divisi</th>
                        <th>Email</th>
                        <th>Status Karyawan</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((result, index) => {
                        const now = moment(new Date());
                        const tglMasuk = moment(result.tanggalmasuk);
                        const years = now.diff(tglMasuk, "year");
                        tglMasuk.add(years, "years");
                        const months = now.diff(tglMasuk, "months");
                        tglMasuk.add(months, "months");
                        const days = now.diff(tglMasuk, "days");

                        return (
                          <tr key={result.id}>
                            <td>{index + 1}</td>
                            <td>{result.fullname}</td>
                            <td>{result.nik}</td>
                            <td>
                              {years +
                                " Tahun " +
                                months +
                                " Bulan " +
                                days +
                                " Hari"}
                            </td>
                            <td>{result.divisi}</td>
                            <td>{result.email}</td>
                            <td>{result.status}</td>

                            <td align="center">
                              <Button
                                as={Link}
                                to={`/infokaryawan/${result.user_id}`}
                                variant="primary"
                                aria-label="Info Karyawan"
                                size="sm"
                                className="btn m-1"
                              >
                                <FontAwesomeIcon icon={faInfo} size="sm" />
                              </Button>
                              <Button
                                as={Link}
                                to={`/editkaryawan/${result.user_id}`}
                                variant="warning"
                                size="sm"
                                className="btn m-1"
                              >
                                <FontAwesomeIcon icon={faPencil} size="sm" />
                              </Button>
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
