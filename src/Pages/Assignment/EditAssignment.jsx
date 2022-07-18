import { useState, useEffect } from "react";
import "./assignment.css";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useHistory, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import {
  Card,
  Row,
  Col,
  Form,
  Button,
  Alert,
  Container,
} from "react-bootstrap";

import { API_URL, FAKEAPI_URL } from "../../Utils/Constant";

const EditAssignment = () => {
  //not allow space
  // eslint-disable-next-line no-undef
  $(function () {
    // eslint-disable-next-line no-undef
    $("#user_id").on("keypress", function (e) {
      if (e.which === 32) {
        return false;
      }
    });
  });

  // state token
  const [setToken] = useState("");
  const [setExpire] = useState("");

  //state
  const [assignment, setAssignment] = useState({
    crname: "",
    assignment_id: "",
    user_id: "",
    fullname: "",
    name: "",
    pm: "",
    assignmenttype: "",
    status: "",
    extendassignment: "",
    dateassignment: "",
    endassignment: "",
  });

  const [msg, setMsg] = useState("");

  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    refreshToken();
    const getAssignment = async () => {
      const res = await axios.get(FAKEAPI_URL + `/assignment/${id}`);
      const data = res.data;
      setAssignment({
        crname: data.crname,
        assignment_id: data.assignment_id,
        user_id: data.user_id,
        fullname: data.fullname,
        name: data.name,
        pm: data.pm,
        assignmenttype: data.assignmenttype,
        status: data.status,
        extendassignment: data.extendassignment,
        dateassignment: data.dateassignment,
        endassignment: data.endassignment,
      });
    };
    getAssignment();
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

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setAssignment({ ...assignment, [name]: value });
  };

  const updateAssignment = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure want to update this data?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#fe7c96",
      cancelButtonColor: "#b66dff",
      confirmButtonText: "Yes, update it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.value) {
        try {
          const {
            crname,
            assignment_id,
            user_id,
            fullname,
            name,
            pm,
            assignmenttype,
            status,
            extendassignment,
            dateassignment,
            endassignment,
          } = assignment;
          const newAssignment = {
            crname,
            assignment_id,
            user_id,
            fullname,
            name,
            pm,
            assignmenttype,
            status,
            extendassignment,
            dateassignment,
            endassignment,
          };

          await axios.put(FAKEAPI_URL + `/assignment/${id}`, newAssignment);

          history.push("/assignment");

          Swal.fire({
            title: "Updated",
            text: "Employee has been updated",
            icon: "success",
            confirmButtonText: "Ok",
          });
        } catch (error) {
          if (error.response) {
            setMsg(error.response.data.msg);
          }
        }
      }
    });
  };

  return (
    <div className="MainDiv">
      <h6 className="text-secondary ms-3">EDIT ASSIGNMENT</h6>
      <Container>
        <Row className="mt-4">
          <Col>
            <Card className="border-0 rounded shadow mb-5">
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
                <p className="info-assignment">ASSIGNMENT INFORMATION</p>

                <Form onSubmit={updateAssignment} style={{ padding: "0 50px" }}>
                  <section className="info">
                    <Row>
                      <div className="col-md-6 mb-3">
                        <span className="title">Nama Karyawan</span>
                        <h4>{assignment.fullname}</h4>
                      </div>
                      <div className="col-md-6 mb-3">
                        <span className="title">Project Manager</span>
                        <h4>{assignment.pm}</h4>
                      </div>
                      <div className="col-md-6 mb-3">
                        <span className="title">Nama Project</span>
                        <h4>{assignment.name}</h4>
                      </div>
                    </Row>
                  </section>

                  <section className="edit mt-3 mb-5">
                    <Row>
                      <div className="col-md-4">
                        <span>Start Date</span>
                        <Form.Control
                          className="form-update shadow-sm"
                          type="date"
                          name="dateassignment"
                          value={assignment.dateassignment || ""}
                          onChange={onChangeInput}
                          required
                        />
                      </div>
                      <div className="col-md-4">
                        {" "}
                        <span>End Date</span>
                        <Form.Control
                          className="form-update shadow-sm"
                          type="date"
                          name="endassignment"
                          value={assignment.endassignment || ""}
                          onChange={onChangeInput}
                          required
                        />
                      </div>
                      <div className="col-md-4">
                        <span>Extend Assignment</span>
                        <Form.Control
                          className="form-update shadow-sm"
                          type="date"
                          name="extendassignment"
                          value={assignment.extendassignment || ""}
                          onChange={onChangeInput}
                        />
                      </div>
                      <div className="col-md-4">
                        <span>Assignment Type</span>
                        <Form.Control
                          className="form-update shadow-sm form-select"
                          as="select"
                          required
                          value={assignment.assignmenttype || ""}
                          onChange={onChangeInput}
                          name="assignmenttype"
                        >
                          <option value="Project">Project</option>
                          <option value="Riset">Riset</option>
                          <option value="POC">POC</option>
                          <option value="CSR">CSR</option>
                          <option value="Hibah">Hibah</option>
                        </Form.Control>
                      </div>
                      <div className="col-md-4">
                        <span>Status</span>
                        <Form.Control
                          name="status"
                          className="form-update shadow-sm form-select"
                          as="select"
                          required
                          value={assignment.status}
                          onChange={onChangeInput}
                        >
                          <option value="ACTIVE">ACTIVE</option>
                          <option value="HOLD">HOLD</option>
                          <option value="DONE">DONE</option>
                        </Form.Control>
                      </div>

                      <div className="col-md-4">
                        <span>CR Name</span>
                        <Form.Control
                          className="form-update shadow-sm"
                          type="text"
                          name="crname"
                          value={assignment.crname}
                          onChange={onChangeInput}
                        />
                      </div>
                    </Row>
                  </section>

                  <Button
                    style={{
                      backgroundColor: "#fed713",
                      border: "none",
                    }}
                    type="submit"
                    size="md"
                  >
                    UPDATE
                  </Button>
                  <Link to={"/assignment"}>
                    <button
                      type="button"
                      className="ms-2 btn btn-outline-secondary"
                      size="sm"
                    >
                      CANCEL
                    </button>
                  </Link>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default EditAssignment;
