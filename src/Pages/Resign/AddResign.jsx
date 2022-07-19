/* eslint-disable no-useless-concat */
import { React, useState, useEffect } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Swal from "sweetalert2";
import Multiselect from "multiselect-react-dropdown";
import {
  Card,
  Row,
  Col,
  Form,
  Button,
  Alert,
  Container,
} from "react-bootstrap";

import DateRangePicker from "@wojtekmaj/react-daterange-picker";

import { API_URL } from "../../Utils/Constant";
import { FAKEAPI_URL } from "../../Utils/Constant";

const AddResign = () => {
  const [setUserName] = useState("");
  const [expire, setExpire] = useState("");

  const [namaKaryawan, setNamaKaryawan] = useState("");
  const [nama, setNama] = useState("");

  const [tanggalresign, setTanggalresign] = useState("");
  const [handoverKaryawan, setHandoverKaryawan] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [tanggalHandover, setTanggalHandover] = useState(["", ""]);

  const history = useHistory();
  const [msg, setMsg] = useState("");

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
          await axios.delete(API_URL + `/karyawans/${user_id}`);
          await axios.post(FAKEAPI_URL + `/resign`, {
            user_id: user_id,
            tanggalresign,
            handoverKaryawan,
            keterangan,
            tanggalHandover,
          });

          history.push("/resign");

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
                  <Form.Group className="mb-3" controlId="formGridEmail">
                    <div className="row">
                      <div className="col-md-2">
                        <Form.Label>Nama Karyawan Resign</Form.Label>
                      </div>
                      <div className="col-md-10">
                        <Form.Control
                          className="btn form-select w-25"
                          style={{ backgroundColor: "#11cdf1", color: "white" }}
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
                                  style={{
                                    backgroundColor: "white",
                                    color: "black",
                                  }}
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
                      </div>
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formGridEmail">
                    <div className="row">
                      <div className="col-md-2">
                        <Form.Label>Tanggal Resign</Form.Label>
                      </div>
                      <div className="col-md-8">
                        <Form.Control
                          className="form-select w-25"
                          type="date"
                          value={tanggalresign}
                          onChange={(e) => setTanggalresign(e.target.value)}
                          placeholder="Masukkan Tanggal Resign"
                        />
                      </div>
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formGridEmail">
                    <div className="row">
                      <div className="col-md-2">
                        <Form.Label>Handover Kepada</Form.Label>
                      </div>
                      <div className="col-md-10">
                        <Multiselect
                          isObject={false}
                          onRemove={(e) => {
                            console.log(e);
                          }}
                          onSelect={(e) => {
                            console.log(e);
                            setHandoverKaryawan(`${e},`);
                          }}
                          options={
                            namaKaryawan.length > 0
                              ? namaKaryawan.map((nama) => {
                                  return nama.fullname;
                                })
                              : []
                          }
                          showCheckbox
                          value={handoverKaryawan}
                          onChange={(e) => setHandoverKaryawan(e.target.value)}
                          className="form-multiple"
                        />
                      </div>
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formGridEmail">
                    <div className="row">
                      <div className="col-md-2">
                        <Form.Label>Keterangan Project</Form.Label>
                      </div>
                      <div className="col-md-10">
                        <textarea
                          className="form-control w-25"
                          style={{ height: "100px" }}
                          type="text"
                          value={keterangan}
                          onChange={(e) => setKeterangan(e.target.value)}
                        />
                      </div>
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formGridEmail">
                    <div className="row">
                      <div className="col-md-2">
                        <Form.Label>
                          Tanggal Handover
                          <span className="text-secondary">
                            <br /> (start - end)
                          </span>
                        </Form.Label>
                      </div>
                      <div className="col-md-8">
                        <DateRangePicker
                          value={tanggalHandover}
                          onChange={setTanggalHandover}
                          format="dd/MM/yyyy"
                        />
                      </div>
                    </div>
                  </Form.Group>
                  <Button
                    style={{ backgroundColor: "#b66dff", border: "none" }}
                    size="md"
                    className="btn m-1"
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
