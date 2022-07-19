import { useState, useEffect } from "react";
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

const EditKaryawan = () => {
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
  const [karyawan, setKaryawan] = useState({
    user_id: "",
    fullname: "",
    statuspernikahan: "",
    nik: "",
    identitas: "",
    divisi: "",
    tanggalmasuk: "",
    statuskaryawan: "",
    email: "",
    phone: "",
    alamat: "",
    posisi: "",
    site: "",
    telegram: "",
    createdby: "",
    createdate: "",
    pendidikan: "",
    institusi: "",
    tempatlahir: "",
    tanggallahir: "",
    role_trello: "",
    nikkaryawan: "",
    jurusan: "",
    createddby: "",
    updateat: "",
    status: "",
  });

  const [msg, setMsg] = useState("");

  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    refreshToken();
    const getKaryawan = async () => {
      const res = await axios.get(`http://localhost:2471/karyawans/${id}`);

      setKaryawan({
        user_id: res.data.user_id,
        fullname: res.data.fullname,
        statuspernikahan: res.data.statuspernikahan,
        nik: res.data.nik,
        identitas: res.data.identitas,
        divisi: res.data.divisi,
        tanggalmasuk: res.data.tanggalmasuk,
        email: res.data.email,
        phone: res.data.phone,
        alamat: res.data.alamat,
        posisi: res.data.posisi,
        site: res.data.site,
        telegram: res.data.telegram,
        createdby: res.data.createdby,
        createdate: res.data.createdate,
        pendidikan: res.data.pendidikan,
        institusi: res.data.institusi,
        tempatlahir: res.data.tempatlahir,
        tanggallahir: res.data.tanggallahir,
        role_trello: res.data.role_trello,
        nikkaryawan: res.data.nikkaryawan,
        statuskaryawan: res.data.statuskaryawan,
        jurusan: res.data.jurusan,
        createddby: res.data.createddby,
        updateat: res.data.updateat,
        status: res.data.status,
      });
    };
    getKaryawan();
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

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setKaryawan({ ...karyawan, [name]: value });
    // setKaryawan({value: e.target.value})
  };

  const updateKaryawan = async (e) => {
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
            user_id,
            fullname,
            statuspernikahan,
            nik,
            identitas,
            email,
            divisi,
            tanggalmasuk,
            status,
            phone,
            alamat,
            posisi,
            site,
            telegram,
            createdby,
            createdate,
            pendidikan,
            institusi,
            tempatlahir,
            tanggallahir,
            role_trello,
            nikkaryawan,
            jurusan,
            createddby,
            updateat,
            statuskaryawan,
          } = karyawan;
          const newKaryawan = {
            user_id,
            fullname,
            statuspernikahan,
            nik,
            identitas,
            email,
            divisi,
            tanggalmasuk,
            phone,
            alamat,
            posisi,
            site,
            telegram,
            createdby,
            createdate,
            pendidikan,
            institusi,
            tempatlahir,
            tanggallahir,
            role_trello,
            nikkaryawan,
            jurusan,
            createddby,
            updateat,
            statuskaryawan,
            status,
          };

          await axios.put(`http://localhost:2471/karyawans/${id}`, newKaryawan);

          history.push("/karyawan");

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
      <Container>
        <Row>
          <Col md="{12}">
            <Card className="border-0 rounded shadow mb-5">
              <Card.Header as="h5" className="text-center">
                Edit Karyawan
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

                <Form onSubmit={updateKaryawan}>
                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="mb-3" controlId="user_id">
                        <Form.Label>User Id</Form.Label>
                        <Form.Control
                          name="user_id"
                          type="text"
                          value={karyawan.user_id || ""}
                          onChange={onChangeInput}
                          placeholder="Masukkan User Id"
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Nama Lengkap</Form.Label>
                        <Form.Control
                          name="fullname"
                          type="text"
                          value={karyawan.fullname || ""}
                          onChange={onChangeInput}
                          placeholder="Masukkan Nama Lengkap"
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Identitas</Form.Label>
                        <Form.Control
                          name="identitas"
                          as="select"
                          value={karyawan.identitas || ""}
                          onChange={onChangeInput}
                          placeholder="Masukkan Identitas"
                        >
                          <option value="KTP">KTP</option>
                          <option value="SIM">SIM</option>
                          <option value="PASSPORT">PASSPORT</option>
                        </Form.Control>
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>NIK / NO SIM / NO PASSPORT</Form.Label>
                        <Form.Control
                          name="nik"
                          type="text"
                          value={karyawan.nik || ""}
                          onChange={onChangeInput}
                          placeholder="NIK / NO SIM / NO PASSPORT"
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Status Pernikahan</Form.Label>
                        <Form.Control
                          name="statuspernikahan"
                          as="select"
                          value={karyawan.statuspernikahan || ""}
                          onChange={onChangeInput}
                          placeholder="Masukkan Status Pernikahan"
                        >
                          <option value="Belum Kawin">Belum Kawin</option>
                          <option value="Kawin">Kawin</option>
                          <option value="Cerai Hidup">Cerai Hidup</option>
                          <option value="Cerai Mati">Cerai Mati</option>
                        </Form.Control>
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Divisi</Form.Label>
                        <Form.Control
                          name="divisi"
                          as="select"
                          value={karyawan.divisi || ""}
                          onChange={onChangeInput}
                          placeholder="Masukkan Divisi"
                        >
                          <option value={""} hidden>
                            -Pilih Divisi Karyawan-
                          </option>
                          <option value="Developer">Developer</option>
                          <option value="BSO">BSO</option>
                          <option value="Digital Marketing">
                            Digital Marketing
                          </option>
                        </Form.Control>
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Tanggal Masuk</Form.Label>
                        <Form.Control
                          name="tanggalmasuk"
                          type="date"
                          value={karyawan.tanggalmasuk || ""}
                          onChange={onChangeInput}
                          placeholder="Masukkan Tanggal Masuk"
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Status Karyawan</Form.Label>
                        <Form.Control
                          name="statuskaryawan"
                          as="select"
                          value={karyawan.statuskaryawan || ""}
                          onChange={onChangeInput}
                          placeholder="Masukkan Status Karyawan"
                        >
                          <option value="Tetap">Karyawan Tetap</option>
                          <option value="Non-Tetap">Karyawan Non Tetap</option>
                          <option value="Magang / Part Time">
                            Karyawan Magang / Part Time
                          </option>
                        </Form.Control>
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          name="email"
                          type="email"
                          value={karyawan.email || ""}
                          onChange={onChangeInput}
                          placeholder="Masukkan Email"
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                          name="phone"
                          type="tel"
                          value={karyawan.phone || ""}
                          onChange={onChangeInput}
                          placeholder="Masukkan Nomor HP Karyawan"
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Alamat</Form.Label>
                        <Form.Control
                          name="alamat"
                          type="text"
                          value={karyawan.alamat || ""}
                          onChange={onChangeInput}
                          placeholder="Masukkan Alamat"
                        />
                      </Form.Group>
                    </div>

                    <div className="col-md-6">
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Posisi</Form.Label>
                        <Form.Control
                          name="posisi"
                          type="text"
                          value={karyawan.posisi || ""}
                          onChange={onChangeInput}
                          placeholder="Masukkan Posisi"
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Site</Form.Label>
                        <Form.Control
                          name="site"
                          type="text"
                          value={karyawan.site || ""}
                          onChange={onChangeInput}
                          placeholder="Masukkan Site"
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Username Telegram</Form.Label>
                        <Form.Control
                          name="telegram"
                          type="text"
                          value={karyawan.telegram || ""}
                          onChange={onChangeInput}
                          placeholder="Masukkan Username Telegram"
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Pendidikan Terakhir</Form.Label>
                        <Form.Control
                          name="pendidikan"
                          as="select"
                          value={karyawan.pendidikan || ""}
                          onChange={onChangeInput}
                          placeholder="Masukkan Pendidikan Terakhir"
                        >
                          <option value="SMA/SMK">SMA/SMK</option>
                          <option value="D3">D3</option>
                          <option value="S1">S1</option>
                          <option value="S2">S2</option>
                          <option value="S3">S3</option>
                        </Form.Control>
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Institusi Pendidikan</Form.Label>
                        <Form.Control
                          name="institusi"
                          type="text"
                          value={karyawan.institusi || ""}
                          onChange={onChangeInput}
                          placeholder="Masukkan Institusi"
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Jurusan Karyawan</Form.Label>
                        <Form.Control
                          name="jurusan"
                          type="text"
                          value={karyawan.jurusan || ""}
                          onChange={onChangeInput}
                          placeholder="Masukkan Jurusan Karyawan"
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Tempat Lahir</Form.Label>
                        <Form.Control
                          name="tempatlahir"
                          type="text"
                          value={karyawan.tempatlahir || ""}
                          onChange={onChangeInput}
                          placeholder="Masukkan Tempat Lahir"
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Tanggal Lahir</Form.Label>
                        <Form.Control
                          name="tanggallahir"
                          type="date"
                          value={karyawan.tanggallahir || ""}
                          onChange={onChangeInput}
                          placeholder="Masukkan Tanggal Lahir"
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Role Trello</Form.Label>
                        <Form.Control
                          name="role_trello"
                          type="text"
                          value={karyawan.role_trello || ""}
                          onChange={onChangeInput}
                          placeholder="Masukkan Role Trello"
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>NIK Karyawan</Form.Label>
                        <Form.Control
                          name="nikkaryawan"
                          type="text"
                          value={karyawan.nikkaryawan || ""}
                          onChange={onChangeInput}
                          placeholder="Masukkan NIK Karyawan"
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Status Bekerja</Form.Label>
                        <Form.Control
                          name="status"
                          as="select"
                          value={karyawan.status || ""}
                          onChange={onChangeInput}
                          placeholder="Masukkan Status"
                        >
                          <option value="Active">Active</option>
                          <option value="resign">Resign</option>
                        </Form.Control>
                      </Form.Group>
                    </div>
                  </div>
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

                  <Link to={"/karyawan"}>
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

export default EditKaryawan;
