/* eslint-disable no-useless-concat */
import { React, useState, useEffect } from "react";
import axios from "axios";
import "./assignment.css";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Swal from "sweetalert2";
import {
  Card,
  Row,
  Col,
  Form,
  Button,
  Alert,
  Container,
} from "react-bootstrap";

import { API_URL } from "../../Utils/Constant";
import { FAKEAPI_URL } from "../../Utils/Constant";

const TambahAssignment = () => {
  const [setUserName] = useState("");
  const [expire, setExpire] = useState("");

  const [dataKaryawan, setDataKaryawan] = useState("");
  const [dataProject, setDataProject] = useState("");
  const [dataProjectManager, setDataProjectManager] = useState("");

  const [user_id, setUser_id] = useState("");
  const [nama, setNama] = useState("");
  const [namaProject, setNamaProject] = useState("");
  const [projectManager, setProjectManager] = useState("");
  const [assignmentType, setAssignmentType] = useState("");
  const [assignmentStatus] = useState("ACTIVE");
  const [CR, setCR] = useState("");
  const [dateAssignment, setDateAssignment] = useState("");
  const [endAssignment, setEndAssignment] = useState("");
  const { extendassignment } = useState(" " ? null : "");

  const history = useHistory();
  const [msg, setMsg] = useState("");

  useEffect(() => {
    refreshToken();
    getKaryawans();
    getProjects();
    getPM();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get(API_URL + "/token");
      const decoded = jwt_decode(response.data.accessToken);
      setUserName(decoded.email);
      setExpire(decoded.exp);
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
        setUserName(decoded.email);
        setExpire(decoded.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const getKaryawans = () => {
    try {
      axios.get(API_URL + "/karyawans").then((res) => {
        //Storing users detail in state array object
        const data = res.data;
        setDataKaryawan(data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getProjects = () => {
    try {
      axios.get(FAKEAPI_URL + "/boards").then((res) => {
        //Storing users detail in state array object
        const data = res.data;
        setDataProject(data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getPM = () => {
    try {
      axios.get(FAKEAPI_URL + "/pm").then((res) => {
        //Storing users detail in state array object
        const data = res.data;
        setDataProjectManager(data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (e) => {
    setUser_id(
      dataKaryawan.find((item) => item.fullname === e.target.value).user_id
    );
    setNama(
      dataKaryawan.find((item) => item.fullname === e.target.value).fullname
    );
  };

  const addAssignment = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#fe7c96",
      cancelButtonColor: "#b66dff",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      try {
        if (result.isConfirmed) {
          setUser_id(user_id);
          await axios.post(FAKEAPI_URL + `/assignment`, {
            crname: CR ? CR : null,
            user_id: user_id,
            fullname: nama,
            name: namaProject,
            pm: projectManager,
            assignmenttype: assignmentType,
            status: assignmentStatus,
            extendassignment: extendassignment ? extendassignment : null,
            dateassignment: dateAssignment,
            endassignment: endAssignment,
          });

          setNama("");
          setNamaProject("");
          setProjectManager("");
          setAssignmentType("");
          setCR("");
          setDateAssignment("");
          setEndAssignment("");

          Swal.fire({
            title: "Saved",
            text: "Success",
            icon: "success",
            confirmButtonText: "Ok",
          });
        }
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    });
  };

  return (
    <div className="MainDiv">
      <Container>
        <Row>
          <Col>
            <Card className="border-0 rounded shadow mb-5">
              <Card.Header as="h5" className=" bg-white">
                Add Assignment
              </Card.Header>
              <Card.Body>
                {msg.errors && (
                  <Alert variant="danger">
                    <ul className="mt-0 mb-0">
                      {msg.errors.map((error, index) => (
                        <li key={index}>{`${error.param} : ${error.msg}`}</li>
                      ))}
                    </ul>
                  </Alert>
                )}

                <Form onSubmit={addAssignment}>
                  <Form.Group className="mb-3" controlId="formGridEmail">
                    <div className="row">
                      <div className="col-md-2">
                        <Form.Label>Nama Karyawan</Form.Label>
                      </div>
                      <div className="col-md-10">
                        <Form.Control
                          className="btn form-select w-25"
                          style={{ backgroundColor: "#11cdf1", color: "white" }}
                          as="select"
                          required
                          value={nama}
                          onChange={onChange}
                        >
                          <option value={""} hidden>
                            -Pilih Nama Karyawan-
                          </option>
                          {dataKaryawan.length > 0 ? (
                            dataKaryawan.map((data) => {
                              return (
                                <option
                                  style={{
                                    backgroundColor: "white",
                                    color: "black",
                                  }}
                                  key={data.user_id}
                                  value={data.fullname}
                                >
                                  {data.fullname}
                                </option>
                              );
                            })
                          ) : (
                            <option value={""}>-No Data-</option>
                          )}
                        </Form.Control>
                      </div>
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formGridEmail">
                    <div className="row">
                      <div className="col-md-2">
                        <Form.Label>Project / Board</Form.Label>
                      </div>
                      <div className="col-md-10">
                        <Form.Control
                          className="btn form-select w-25"
                          style={{ backgroundColor: "#11cdf1", color: "white" }}
                          as="select"
                          required
                          value={namaProject}
                          onChange={(e) => setNamaProject(e.target.value)}
                        >
                          <option value={""} hidden>
                            -Pilih Project-
                          </option>
                          {dataProject.length > 0 ? (
                            dataProject.map((board, idx) => {
                              return (
                                <option
                                  style={{
                                    backgroundColor: "white",
                                    color: "black",
                                  }}
                                  text={board.boardid}
                                  key={idx}
                                  value={board.boardname}
                                >
                                  {/* {nama.user_id} */}
                                  {board.boardname}
                                </option>
                              );
                            })
                          ) : (
                            <option value={""}>-No Data-</option>
                          )}
                        </Form.Control>
                      </div>
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formGridEmail">
                    <div className="row">
                      <div className="col-md-2">
                        <Form.Label>Project Manager</Form.Label>
                      </div>
                      <div className="col-md-10">
                        <Form.Control
                          className="btn form-select w-25"
                          style={{ backgroundColor: "#11cdf1", color: "white" }}
                          as="select"
                          required
                          value={projectManager}
                          onChange={(e) => setProjectManager(e.target.value)}
                        >
                          <option value={""} hidden>
                            -Pilih Project Manager-
                          </option>
                          {dataProjectManager.length > 0 ? (
                            dataProjectManager.map((pm, idx) => {
                              return (
                                <option
                                  style={{
                                    backgroundColor: "white",
                                    color: "black",
                                  }}
                                  text={pm.id}
                                  key={idx}
                                  value={pm.fullname}
                                >
                                  {/* {nama.user_id} */}
                                  {pm.fullname}
                                </option>
                              );
                            })
                          ) : (
                            <option value={""}>-No Data-</option>
                          )}
                        </Form.Control>
                      </div>
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formGridEmail">
                    <div className="row">
                      <div className="col-md-2">
                        <Form.Label>Assignment Type</Form.Label>
                      </div>
                      <div className="col-md-10">
                        <Form.Control
                          className="btn form-select w-25"
                          style={{ backgroundColor: "#11cdf1", color: "white" }}
                          as="select"
                          required
                          value={assignmentType}
                          onChange={(e) => setAssignmentType(e.target.value)}
                        >
                          <option value={""} hidden>
                            -Pilih Assignment Type-
                          </option>
                          <option value="Project">Project</option>
                          <option value="Riset">Riset</option>
                          <option value="POC">POC</option>
                          <option value="CSR">CSR</option>
                          <option value="Hibah">Hibah</option>
                        </Form.Control>
                      </div>
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formGridEmail">
                    <div className="row">
                      <div className="col-md-2">
                        <Form.Label>CR Name</Form.Label>
                      </div>
                      <div className="col-md-10">
                        <Form.Control
                          name="crName"
                          className="form-control w-25"
                          type="text"
                          value={CR}
                          onChange={(e) => setCR(e.target.value)}
                        />
                      </div>
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formGridEmail">
                    <div className="row">
                      <div className="col-md-2">
                        <Form.Label>Date Assignment</Form.Label>
                      </div>
                      <div className="col-md-8">
                        <Form.Control
                          className="form-select w-25"
                          type="date"
                          value={dateAssignment}
                          onChange={(e) => setDateAssignment(e.target.value)}
                        />
                      </div>
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formGridEmail">
                    <div className="row">
                      <div className="col-md-2">
                        <Form.Label>End Assignment</Form.Label>
                      </div>
                      <div className="col-md-8">
                        <Form.Control
                          className="form-select w-25"
                          type="date"
                          value={endAssignment}
                          onChange={(e) => setEndAssignment(e.target.value)}
                        />
                      </div>
                    </div>
                  </Form.Group>

                  <Button
                    style={{ backgroundColor: "#b66dff", border: "none" }}
                    size="md"
                    className="btn m-1"
                    onClick={() => addAssignment(nama)}
                  >
                    SUBMIT
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TambahAssignment;
