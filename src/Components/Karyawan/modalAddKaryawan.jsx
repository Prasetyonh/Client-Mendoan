import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import date from "date-and-time";
import { Form, Button, Modal } from "react-bootstrap";
import Swal from "sweetalert2";

import { API_URL } from "../../Utils/Constant";

function ModalAddKaryawan({ handleClose, getKaryawans }) {
  const [username, setUserName] = useState("");
  const [expire, setExpire] = useState("");

  const [user_id, setUser_id] = useState("");
  const [fullname, setFullname] = useState("");
  const [statuspernikahan, setStatuspernikahan] = useState("");
  const [nik, setNik] = useState("");
  const [identitas, setIdentitas] = useState("");
  const [divisi, setDivisi] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("Active");
  const [statuskaryawan, setstatusKaryawan] = useState("");
  const [tanggalmasuk, setTanggalmasuk] = useState("");
  const [phone, setPhone] = useState("");
  const [site, setSite] = useState("");
  const [posisi, setPosisi] = useState("");
  const [telegram, setTelegram] = useState("");
  const [pendidikan, setPendidikan] = useState("");
  const [institusi, setInstitusi] = useState("");
  const [tempatlahir, setTempatlahir] = useState("");
  const [tanggallahir, setTanggallahir] = useState("");
  const [role_trello, setRole_trello] = useState("");
  const [nikkaryawan, setNikKaryawan] = useState("");
  const [jurusan, setJurusan] = useState("");
  const [alamat, setAlamat] = useState("");

  const [msg, setMsg] = useState("");

  const history = useHistory();

  const now = new Date();

  useEffect(() => {
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

  const addKaryawan = async (e) => {
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
          await axios.post(API_URL + "/karyawans", {
            user_id: user_id,
            fullname: fullname,
            statuspernikahan: statuspernikahan,
            nik: nik,
            identitas: identitas,
            divisi: divisi,
            email: email,
            status: status,
            statuskaryawan: statuskaryawan,
            tanggalmasuk: tanggalmasuk,
            phone: phone,
            site: site,
            posisi: posisi,
            telegram: telegram,
            pendidikan: pendidikan,
            institusi: institusi,
            tempatlahir: tempatlahir,
            tanggallahir: tanggallahir,
            role_trello: role_trello,
            nikkaryawan: nikkaryawan,
            jurusan: jurusan,
            alamat: alamat,
            createdby: username,
            createdate: date.format(now, "YYYY-MM-DD HH:mm:ss"),
          });

          handleClose();
          getKaryawans();
          Swal.fire({
            title: "Saved",
            text: "Employee has been saved",
            icon: "success",
            confirmButtonText: "Ok",
          });
        } catch (error) {
          if (error.response) {
            setMsg(error.response.data.msg);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: msg,
            });
          }
        }
      }
    });
  };

  return (
    <>
      {/* <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="name@example.com" autoFocus />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Example textarea</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>
      </Form> */}

      <Form onSubmit={addKaryawan}>
        <div className="row">
          <div className="col-md-6">
            <Form.Group className="mb-3" controlId="user_id">
              <Form.Label>User Id</Form.Label>
              <Form.Control
                name="user_id"
                type="text"
                value={user_id}
                onChange={(e) => setUser_id(e.target.value)}
                placeholder="Masukkan User Id"
                required
              />
              <p className="text-danger fst-italic">{msg}</p>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridPassword">
              <Form.Label>Nama Lengkap</Form.Label>
              <Form.Control
                name="fullname"
                type="text"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                placeholder="Masukkan Nama Lengkap"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridEmail">
              <Form.Label>Identitas</Form.Label>
              <Form.Control
                as="select"
                value={identitas}
                onChange={(e) => setIdentitas(e.target.value)}
                required
              >
                <option value={""} hidden>
                  -Pilih Identitas Karyawan-
                </option>
                <option value="KTP">KTP</option>
                <option value="SIM">SIM</option>
                <option value="PASSPORT">PASSPORT</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGridEmail">
              <Form.Label>NIK / NO SIM / NO PASSPORT</Form.Label>
              <Form.Control
                name="nik"
                type="text"
                value={nik}
                onChange={(e) => setNik(e.target.value)}
                placeholder="Masukkan NIK/ NO SIM / NO PASSPORT"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridEmail">
              <Form.Label>Status Pernikahan</Form.Label>
              <Form.Control
                as="select"
                value={statuspernikahan}
                onChange={(e) => setStatuspernikahan(e.target.value)}
                required
              >
                <option value={""} hidden>
                  -Pilih Status Pernikahan-
                </option>
                <option value="Belum Kawin">Belum Kawin</option>
                <option value="Kawin">Kawin</option>
                <option value="Cerai Hidup">Cerai Hidup</option>
                <option value="Cerai Mati">Cerai Mati</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridEmail">
              <Form.Label>Divisi</Form.Label>
              <Form.Control
                name="divisi"
                as="select"
                value={divisi}
                onChange={(e) => setDivisi(e.target.value)}
                placeholder="Masukkan Divisi"
                required
              >
                <option value={""} hidden>
                  -Pilih Divisi Karyawan-
                </option>
                <option value="Developer">Developer</option>
                <option value="BSO">BSO</option>
                <option value="Digital Marketing">Digital Marketing</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridEmail">
              <Form.Label>Tanggal Masuk</Form.Label>
              <Form.Control
                name="tanggalmasuk"
                type="date"
                value={tanggalmasuk}
                onChange={(e) => setTanggalmasuk(e.target.value)}
                placeholder="Masukkan Tanggal Masuk"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridEmail">
              <Form.Label>Status Karyawan</Form.Label>
              <Form.Control
                as="select"
                value={statuskaryawan}
                onChange={(e) => setstatusKaryawan(e.target.value)}
                required
              >
                <option value={""} hidden>
                  -Pilih Status Karyawan-
                </option>
                <option value="Tetap">Karyawan Tetap</option>
                <option value="Non-Tetap">Karyawan Non Tetap</option>
                <option value="Magang / Part Time">
                  Karyawan Magang / Part Time
                </option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Masukkan Email"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridEmail">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                name="phone"
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Masukkan Nomor HP Karyawan"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridEmail">
              <Form.Label>Alamat</Form.Label>
              <Form.Control
                name="alamat"
                type="text"
                value={alamat}
                onChange={(e) => setAlamat(e.target.value)}
                placeholder="Masukkan Alamat Karyawan"
                required
              />
            </Form.Group>
          </div>

          <div className="col-md-6">
            <Form.Group className="mb-3" controlId="formGridEmail">
              <Form.Label>Posisi</Form.Label>
              <Form.Control
                name="posisi"
                type="text"
                value={posisi}
                onChange={(e) => setPosisi(e.target.value)}
                placeholder="Masukkan Posisi Karyawan"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridEmail">
              <Form.Label>Site</Form.Label>
              <Form.Control
                name="site"
                type="text"
                value={site}
                onChange={(e) => setSite(e.target.value)}
                placeholder="Masukkan Provinsi Karyawan"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridEmail">
              <Form.Label>Username Telegram</Form.Label>
              <Form.Control
                name="telegram"
                type="text"
                value={telegram}
                onChange={(e) => setTelegram(e.target.value)}
                placeholder="Masukkan Username Telegram Karyawan"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridEmail">
              <Form.Label>Pendidikan Terakhir</Form.Label>
              <Form.Control
                as="select"
                value={pendidikan}
                onChange={(e) => setPendidikan(e.target.value)}
                required
              >
                <option value={""} hidden>
                  -Pilih Pendidikan Terakhir Karyawan-
                </option>
                <option value="SMA/SMK">SMA/SMK</option>
                <option value="D3">D3</option>
                <option value="S1">S1</option>
                <option value="S2">S2</option>
                <option value="S3">S3</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridPassword">
              <Form.Label>Institusi Pendidikan Karyawan</Form.Label>
              <Form.Control
                name="institusi"
                type="text"
                value={institusi}
                onChange={(e) => setInstitusi(e.target.value)}
                placeholder="Masukkan Institusi Pendidikan Karyawan"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridPassword">
              <Form.Label>Jurusan Karyawan</Form.Label>
              <Form.Control
                name="jurusan"
                type="text"
                value={jurusan}
                onChange={(e) => setJurusan(e.target.value)}
                placeholder="Masukkan Jurusan Karyawan"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridEmail">
              <Form.Label>Tempat Lahir Karyawan</Form.Label>
              <Form.Control
                name="tempatlahir"
                type="text"
                value={tempatlahir}
                onChange={(e) => setTempatlahir(e.target.value)}
                placeholder="Masukkan Tempat Lahir Karyawan"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridPassword">
              <Form.Label>Tanggal Lahir Karyawan</Form.Label>
              <Form.Control
                name="tanggallahir"
                type="date"
                value={tanggallahir}
                onChange={(e) => setTanggallahir(e.target.value)}
                // placeholder="Masukkan Tempat Lahir Karyawan"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridPassword">
              <Form.Label>Role Trello Karyawan</Form.Label>
              <Form.Control
                name="role_trello"
                type="text"
                value={role_trello}
                onChange={(e) => setRole_trello(e.target.value)}
                placeholder="Masukkan Trello Karyawan"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridEmail">
              <Form.Label>NIK Karyawan</Form.Label>
              <Form.Control
                name="nikkaryawan"
                type="text"
                value={nikkaryawan}
                onChange={(e) => setNikKaryawan(e.target.value)}
                placeholder="Masukkan NIK Karyawan"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridEmail">
              <Form.Label>Status Bekerja</Form.Label>
              <Form.Control
                name="status"
                as="select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                placeholder="Masukkan Status Karyawan"
                disabled
              >
                <option selected value="Active">
                  Active
                </option>
              </Form.Control>
            </Form.Group>
          </div>
        </div>
        <Modal.Footer>
          <Button
            className="btn"
            style={{ backgroundColor: "#b66dff", border: "none" }}
            type="submit"
            size="md"
          >
            SUBMIT
          </Button>
          <button
            onClick={handleClose}
            type="button"
            className="btn ms-2 btn-outline-secondary"
            size="sm"
          >
            CLOSE
          </button>
        </Modal.Footer>
      </Form>
    </>
  );
}

export default ModalAddKaryawan;
