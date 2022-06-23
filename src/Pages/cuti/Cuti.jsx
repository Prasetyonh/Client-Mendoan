import React, { useState, useEffect } from "react";
import axios from "axios";
import { Col, Row, Container, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import moment from "moment";

//jQuery libraries
import "jquery/dist/jquery.min.js";

//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";

const Cuti = () => {
  const [setToken] = useState("");
  const [setExpire] = useState("");
  const history = useHistory();
  const [data, setData] = useState([]);

  useEffect(() => {
    refreshToken();
    getCuti();
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

  const getCuti = () => {
    axios.get("http://localhost:2471/cuti").then((res) => {
      //Storing users detail in state array object
      const data = res.data;
      setData(data);
    });
    //initialize datatable
    $(document).ready(function () {
      setTimeout(function () {
        $("#example").DataTable();
      }, 1000);
    });
  };

  const deleteKaryawanCuti = async (id) => {
    Swal.fire({
      title: "Are you sure to delete?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#fe7c96",
      cancelButtonColor: "#b66dff",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      try {
        if (result.isConfirmed) {
          await axios.delete(`http://localhost:2471/cuti/${id}`);
          getCuti();
          Swal.fire(
            "Deleted!",
            "Furlough employee has been deleted.",
            "success"
          );
        }
      } catch (error) {
        console.log(error);
      }
    });
  };

  return (
    <div className="MainDiv">
      <Container>
        <Row>
          <Col md="{12}">
            <Card className="border-0 rounded shadow mb-3">
              <Card.Header as="h5" className="text-center">
                List Karyawan Cuti
              </Card.Header>
              <Card.Body>
                <Link to={"/addcuti"}>
                  <Button
                    style={{ backgroundColor: "#b66dff", border: "none" }}
                    className="mb-3 float-end"
                    size="md"
                  >
                    Add Cuti
                  </Button>
                </Link>
                <div style={{ overflowX: "auto", width: "100%" }}>
                  <table
                    id="example"
                    className="table table-borderless table-striped hover compact "
                  >
                    <thead>
                      <tr>
                        <th style={{ width: "7%" }}>No</th>
                        <th style={{ width: "25%" }}>Nama Karyawan</th>
                        <th style={{ width: "20%" }}>Tanggal Cuti</th>
                        <th style={{ width: "35%" }}>Keterangan</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((result, index) => {
                        return (
                          <tr key={result.id}>
                            <td>{index + 1}</td>
                            <td>{result.name}</td>
                            <td>
                              {moment(result.tanggal).format("DD-MM-YYYY")}
                            </td>
                            <td>{result.keterangan}</td>
                            <td>
                              <p
                                style={{ color: "#b66dff" }}
                                size="sm"
                                className="btn m-1"
                                onClick={() => deleteKaryawanCuti(result.id)}
                              >
                                Delete
                              </p>
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

export default Cuti;
