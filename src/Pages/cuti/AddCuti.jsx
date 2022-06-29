import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import date from "date-and-time";
import {
  Card,
  Row,
  Col,
  Form,
  Button,
  Alert,
  Container,
} from "react-bootstrap";
import Swal from "sweetalert2";

import { API_URL } from "../../Utils/Constant";

const AddCuti = () => {
  const [username, setUserName] = useState("");
  const [expire, setExpire] = useState("");
  //state
  const [namaKaryawan, setNamaKaryawan] = useState("");
  const [nama, setNama] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [keterangan, setKeterangan] = useState("");

  //state validation
  const [msg, setMsg] = useState("");

  const history = useHistory();

  const now = new Date();

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

  useEffect(() => {
    getKaryawans();
    refreshToken();
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
        setNamaKaryawan(data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const addCuti = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure want to save this data?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#fe7c96",
      cancelButtonColor: "#b66dff",
      confirmButtonText: "Yes, save it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.value) {
        try {
          await axios.post(API_URL + "/cuti", {
            name: nama,
            tanggal: tanggal,
            keterangan: keterangan,
            createdby: username,
            createdate: date.format(now, "YYYY-MM-DD HH:mm:ss"),
          });

          history.push("/cuti");

          Swal.fire({
            title: "Saved",
            text: "Furlough employee has been saved",
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
      <Container>
        <Row>
          <Col>
            <Card className="border-0 rounded shadow mb-5">
              <Card.Header as="h5" className="text-center">
                Add Karyawan Cuti
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

                <Form onSubmit={addCuti}>
                  <div className="row">
                    <div className="col-md-12">
                      <Form.Group className="mb-3" controlId="formGridEmail">
                        <div className="row">
                          <div className="col-md-2">
                            <Form.Label>Nama Karyawan</Form.Label>
                          </div>
                          <div className="col-md-10">
                            <Form.Control
                              style={{
                                backgroundColor: "#11cdf1",
                                color: "white",
                              }}
                              className="form-select w-25"
                              as="select"
                              required
                              value={nama}
                              onChange={(e) => setNama(e.target.value)}
                            >
                              <option value={""} hidden>
                                -Pilih Nama Karyawan-
                              </option>
                              {namaKaryawan.length > 0 ? (
                                namaKaryawan.map((nama, idx) => {
                                  return (
                                    <option
                                      text={nama.id}
                                      key={idx}
                                      value={nama.fullname}
                                      style={{
                                        backgroundColor: "white",
                                        color: "black",
                                      }}
                                    >
                                      {/* {nama.user_id} */}
                                      {nama.fullname}
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
                            <Form.Label>Tanggal</Form.Label>
                          </div>
                          <div className="col-md-10">
                            <Form.Control
                              name="tangal"
                              type="date"
                              className="form-control w-25"
                              value={tanggal}
                              onChange={(e) => setTanggal(e.target.value)}
                              placeholder="Masukkan Tanggal"
                              required
                            />
                          </div>
                        </div>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formGridEmail">
                        <div className="row">
                          <div className="col-md-2">
                            <Form.Label>Keterangan</Form.Label>
                          </div>
                          <div className="col-md-10">
                            <Form.Control
                              name="keterangan"
                              type="text"
                              className="form-control w-25"
                              value={keterangan}
                              onChange={(e) => setKeterangan(e.target.value)}
                              placeholder="Masukkan Keterangan"
                              required
                              autoComplete="off"
                            />
                          </div>
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                  <Button
                    style={{ backgroundColor: "#b66dff", border: "none" }}
                    className="btn"
                    type="submit"
                    size="md"
                  >
                    SUBMIT
                  </Button>

                  <Link to={"/cuti"}>
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

export default AddCuti;
