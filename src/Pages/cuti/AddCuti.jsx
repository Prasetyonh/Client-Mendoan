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

const AddCuti = () => {
  const [username, setUserName] = useState("");
  const [expire, setExpire] = useState("");
  //state
  const [namaKaryawan, setNamaKaryawan] = useState("");
  const [nama, setNama] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [userId, setUserId] = useState("");
  const [id_karyawan, setIdKaryawan] = useState("");

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
        setUserId(data);
        
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
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, save it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.value) {
        try {
          await axios.post("http://localhost:2471/cuti", {
            id_karyawan: userId,
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
                        <Form.Label>Nama Karyawan</Form.Label>
                        <Form.Control
                          className="form-select"
                          as="select"
                          required
                          value={(id_karyawan.userId, nama.fullname)}
                          onChange={(e) => (
                            setUserId(e.target.value), setNama(e.target.value)
                          )}
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
                                  value={(id_karyawan.userId, nama.fullname)}
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
                        <Form.Label>Tanggal</Form.Label>
                        <Form.Control
                          name="tangal"
                          type="date"
                          value={tanggal}
                          onChange={(e) => setTanggal(e.target.value)}
                          placeholder="Masukkan Tanggal"
                          required
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formGridEmail">
                        <Form.Label>Keterangan</Form.Label>
                        <Form.Control
                          name="keterangan"
                          type="text"
                          value={keterangan}
                          onChange={(e) => setKeterangan(e.target.value)}
                          placeholder="Masukkan Keterangan"
                          required
                        />
                      </Form.Group>
                    </div>
                  </div>
                  <Button variant="primary" type="submit" size="sm">
                    SAVE
                  </Button>

                  <Link to={"/cuti"}>
                    <Button type="button" className="ms-2 btn-danger" size="sm">
                      CANCEL
                    </Button>
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
