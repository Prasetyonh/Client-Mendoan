import { React, useState, useEffect } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
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

const AddResign = () => {
  const [setUserName] = useState("");
  const [expire, setExpire] = useState("");

  const [namaKaryawan, setNamaKaryawan] = useState("");
  const [nama, setNama] = useState("");

  const [tanggalresign, setTanggalresign] = useState("");

  const history = useHistory();
  const [msg, setMsg] = useState("");

  useEffect(() => {
    getKaryawans();
    refreshToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:2471/token");
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
        const response = await axios.get("http://localhost:2471/token");
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
      axios.get("http://localhost:2471/karyawans").then((res) => {
        //Storing users detail in state array object
        const data = res.data;
        setNamaKaryawan(data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const addResign = async (user_id) => {
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
          await axios.delete(`http://localhost:2471/karyawans/${user_id}`);
          await axios.put(`http://localhost:2471/karyawans/${user_id}`, {
            user_id: nama,
            tanggalresign: tanggalresign,
          });

          history.push("/resign");

          Swal.fire({
            title: "Saved",
            text: "Employee has been saved",
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
              <Card.Header as="h5" className="text-center">
                Add Karyawan Resign
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

                <Form onSubmit={addResign}>
                  <div className="row">
                    <div className="col-md-12">
                      <Form.Group className="mb-3" controlId="formGridEmail">
                        <Form.Label>Nama Karyawan</Form.Label>
                        <Form.Control
                          className="form-select"
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
                                  value={nama.user_id}
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
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formGridEmail">
                        <Form.Label>Tanggal Resign</Form.Label>
                        <Form.Control
                          type="date"
                          value={tanggalresign}
                          onChange={(e) => setTanggalresign(e.target.value)}
                          placeholder="Masukkan Tanggal Resign"
                        />
                      </Form.Group>
                    </div>
                  </div>
                  <Button
                    style={{ backgroundColor: "#b66dff", border: "none" }}
                    size="md"
                    className="btn m-1"
                    // type="submit"
                    onClick={() => addResign(nama)}
                  >
                    SUBMIT
                  </Button>

                  <Link to={"/resign"}>
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

export default AddResign;
