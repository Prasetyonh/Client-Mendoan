/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import { Col, Row, Card, Button } from "react-bootstrap";
import axios from "axios";
import { FAKEAPI_URL } from "../../Utils/Constant";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faTrash,
  faFileExcel,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { GridLoader } from "react-spinners";
import * as XLSX from "xlsx";

const ReportAssignment = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
    getAssignment();
  }, []);

  const getAssignment = () => {
    axios.get(FAKEAPI_URL + "/assignment").then((res) => {
      const data = res.data;
      console.log(data);
      setData(data);
      $(document).ready(function () {
        setTimeout(function () {
          $("#example").DataTable();
        }, 1000);
      });
    });
  };
  const deleteAssignment = async (id) => {
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
          await axios.delete(FAKEAPI_URL + `/assignment/${id}`);
          // .then((response) => {
          //   console.log(response);
          // });
          getAssignment();
          Swal.fire("Deleted!", "Assignment has been deleted.", "success");
        }
      } catch (error) {
        console.log(error);
      }
    });
  };
  const onClickExport = () => {
    let wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(data);

    XLSX.utils.book_append_sheet(wb, ws, "Assignments");

    XLSX.writeFile(wb, "Assignments.xlsx");
  };
  return (
    <div className="MainDiv">
      <h6 className="text-secondary ms-3">REPORT ASSIGNMENT</h6>

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
              List Assignment
            </Card.Header>
            {loading ? (
              <center>
                <GridLoader
                  color="#b66cfd"
                  loading
                  margin={8}
                  size={30}
                  speedMultiplier={1}
                />
              </center>
            ) : (
              <Card.Body>
                <Button
                  style={{ backgroundColor: "#1bcfb4", border: "none" }}
                  className="btn text-white mb-3 float-start"
                  size="md"
                  onClick={onClickExport}
                >
                  EXPORT <FontAwesomeIcon icon={faFileExcel} />
                </Button>
                <div style={{ overflowX: "auto", width: "100%" }}>
                  <table
                    id="example"
                    className="table table-borderless table-striped hover compact"
                  >
                    <thead>
                      <tr style={{ color: "#5e5e5e", fontSize: "12px" }}>
                        <th>NO</th>
                        <th>NAMA KARYAWAN</th>
                        <th>PROJECT</th>
                        <th>CR NAME</th>
                        <th>PROJECT MANAGER</th>
                        <th>ASSIGNMENT TYPE</th>
                        <th>STATUS</th>
                        <th>START ASSIGNMENT</th>
                        <th>END ASSIGNMENT</th>
                        <th>EXTEND ASSIGNMENT</th>
                        <th>ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((result, idx) => {
                        return (
                          <tr key={idx} style={{ fontSize: "12px" }}>
                            <td>{idx + 1}</td>
                            <td>{result.fullname}</td>
                            <td>{result.name}</td>
                            <td>{result.crname}</td>
                            <td>{result.pm}</td>
                            <td>{result.assignmenttype}</td>
                            <td>{result.status}</td>
                            <td>{result.dateassignment}</td>
                            <td>{result.endassignment}</td>
                            <td>{result.extendassignment}</td>
                            <td>
                              <Button
                                as={Link}
                                to={`/editassignment/${result.id}`}
                                style={{
                                  backgroundColor: "#fed713",
                                  border: "none",
                                }}
                                size="sm"
                                className="btn m-1"
                              >
                                <FontAwesomeIcon icon={faPencil} size="sm" />
                              </Button>

                              <Button
                                style={{
                                  backgroundColor: "#fe7c96",
                                  border: "none",
                                }}
                                size="sm"
                                className="btn btn-light text-white m-1"
                                onClick={() => deleteAssignment(result.id)}
                              >
                                <FontAwesomeIcon icon={faTrash} size="sm" />
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </Card.Body>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ReportAssignment;
