import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Card, Row, Col, Alert, Container, CardGroup } from "react-bootstrap";
import moment from "moment";

const DetailResign = () => {
  const [setToken] = useState("");
  const [setExpire] = useState("");

  // state
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

  const [resign, setResign] = useState({
    tanggalresign: "",
    handoverKaryawan: "",
    keterangan: "",
    tanggalHandover: "",
  });

  const history = useHistory();
  const [msg, setMsg] = useState("");
  const { id } = useParams();

  useEffect(() => {
    refreshToken();
    getKaryawan();
    getResign();
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

  const getKaryawan = async () => {
    try {
      const res = await axios.get(`http://localhost:2471/karyawans/${id}`);

      setKaryawan({
        user_id: res.data.user_id,
        fullname: res.data.fullname,
        statuspernikahan: res.data.statuspernikahan,
        nik: res.data.nik,
        identitas: res.data.identitas,
        divisi: res.data.divisi,
        tanggalmasuk: res.data.tanggalmasuk,
        statuskaryawan: res.data.statuskaryawan,
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
        jurusan: res.data.jurusan,
        createddby: res.data.createddby,
        updateat: res.data.updateat,
        status: res.data.status,
      });
    } catch (error) {
      setMsg(error.response.data.msg);
    }
  };

  const getResign = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/resign?user_id=${id}`);
      const resigns = res.data[0];
      setResign(resigns);
    } catch (error) {
      console.log(error);
    }
  };

  let start = resign.tanggalHandover[0];
  let end = resign.tanggalHandover[1];

  return (
    <div className="MainDiv">
      <Container>
        <Row>
          <Col md="{12}">
            <Card className="border-0 rounded shadow mb-3">
              <Card.Header as="h5" className="text-center">
                Info Karyawan Resign
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
                <h5 className="text-center mb-3">Detail Karyawan</h5>
                <CardGroup className="mb-3">
                  <Col>
                    <div className="row mb-3">
                      <div className="col-md-4">
                        <Card.Text>Nama</Card.Text>
                      </div>
                      <div className="col-md-8">
                        <Card.Text>: {karyawan.fullname}</Card.Text>
                      </div>
                    </div>

                    <div className="row mb-3">
                      <div className="col-md-4">
                        <Card.Text>User Id</Card.Text>
                      </div>
                      <div className="col-md-8">
                        <Card.Text>: {karyawan.user_id}</Card.Text>
                      </div>
                    </div>

                    <div className="row mb-3">
                      <div className="col-md-4">
                        <Card.Text>Status Pernikahan</Card.Text>
                      </div>
                      <div className="col-md-8">
                        <Card.Text>: {karyawan.statuspernikahan}</Card.Text>
                      </div>
                    </div>

                    <div className="row mb-3">
                      <div className="col-md-4">
                        <Card.Text>NIK</Card.Text>
                      </div>
                      <div className="col-md-8">
                        <Card.Text>: {karyawan.nik}</Card.Text>
                      </div>
                    </div>

                    <div className="row mb-3">
                      <div className="col-md-4">
                        <Card.Text>Identitas</Card.Text>
                      </div>
                      <div className="col-md-8">
                        <Card.Text>: {karyawan.identitas}</Card.Text>
                      </div>
                    </div>

                    <div className="row mb-3">
                      <div className="col-md-4">
                        <Card.Text>Divisi</Card.Text>
                      </div>
                      <div className="col-md-8">
                        <Card.Text>: {karyawan.divisi}</Card.Text>
                      </div>
                    </div>

                    <div className="row mb-3">
                      <div className="col-md-4">
                        <Card.Text>Tanggal Masuk</Card.Text>
                      </div>
                      <div className="col-md-8">
                        <Card.Text>: {karyawan.tanggalmasuk}</Card.Text>
                      </div>
                    </div>

                    <div className="row mb-3">
                      <div className="col-md-4">
                        <Card.Text>Status Karyawan</Card.Text>
                      </div>
                      <div className="col-md-8">
                        <Card.Text>: {karyawan.statuskaryawan}</Card.Text>
                      </div>
                    </div>

                    <div className="row mb-3">
                      <div className="col-md-4">
                        <Card.Text>Email</Card.Text>
                      </div>
                      <div className="col-md-8">
                        <Card.Text>: {karyawan.email}</Card.Text>
                      </div>
                    </div>

                    <div className="row mb-3">
                      <div className="col-md-4">
                        <Card.Text>Phone</Card.Text>
                      </div>
                      <div className="col-md-8">
                        <Card.Text>: {karyawan.phone}</Card.Text>
                      </div>
                    </div>

                    <div className="row mb-3">
                      <div className="col-md-4">
                        <Card.Text>Posisi</Card.Text>
                      </div>
                      <div className="col-md-8">
                        <Card.Text>: {karyawan.posisi}</Card.Text>
                      </div>
                    </div>

                    <div className="row mb-3">
                      <div className="col-md-4">
                        <Card.Text>NIK Karyawan</Card.Text>
                      </div>
                      <div className="col-md-8">
                        <Card.Text>: {karyawan.nikkaryawan}</Card.Text>
                      </div>
                    </div>
                  </Col>
                  <Col>
                    <Card.Text>
                      Alamat &emsp;&emsp;&emsp;&emsp;&emsp;&ensp;&nbsp; :{" "}
                      {karyawan.alamat}
                    </Card.Text>
                    <Card.Text>
                      Site &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp; :{" "}
                      {karyawan.site}
                    </Card.Text>
                    <Card.Text>
                      Telegram &emsp;&emsp;&emsp;&emsp;&ensp;&nbsp; :{" "}
                      {karyawan.telegram}
                    </Card.Text>
                    <Card.Text>
                      Pendidikan Terakhir &nbsp; : {karyawan.pendidikan}
                    </Card.Text>
                    <Card.Text>
                      Institusi &emsp;&emsp;&emsp;&emsp;&emsp;&ensp; :{" "}
                      {karyawan.institusi}
                    </Card.Text>
                    <Card.Text>
                      Jurusan &emsp;&emsp;&emsp;&emsp;&emsp;&ensp; :{" "}
                      {karyawan.jurusan}
                    </Card.Text>
                    <Card.Text>
                      Tempat Lahir &emsp;&emsp;&emsp;&nbsp; :{" "}
                      {karyawan.tempatlahir}
                    </Card.Text>
                    <Card.Text>
                      Tanggal Lahir &emsp;&emsp;&emsp; : {karyawan.tanggallahir}
                    </Card.Text>
                    <Card.Text>
                      Status Bekerja &emsp;&emsp;&ensp;&nbsp; :{" "}
                      {karyawan.status}
                    </Card.Text>
                    <Card.Text>
                      Role Trello &emsp;&emsp;&emsp;&emsp;&nbsp; :{" "}
                      {karyawan.role_trello}
                    </Card.Text>
                    <Card.Text>
                      Created By &emsp;&emsp;&emsp;&ensp;&nbsp;&nbsp; :{" "}
                      {karyawan.createdby}
                    </Card.Text>
                    <Card.Text>
                      Create Date&emsp;&emsp;&emsp;&ensp;&nbsp;&nbsp; :{" "}
                      {karyawan.createdate}
                    </Card.Text>
                  </Col>
                </CardGroup>

                <h5 className="text-center mt-3">Detail Resign</h5>

                <Col>
                  <div className="row mb-3">
                    <div className="col-md-2">
                      <Card.Text>Tanggal Resign</Card.Text>
                    </div>
                    <div className="col-md-9">
                      <Card.Text>: {resign.tanggalresign}</Card.Text>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-2">
                      <Card.Text>Handover Karyawan</Card.Text>
                    </div>
                    <div className="col-md-9">
                      <Card.Text>: {resign.handoverKaryawan}</Card.Text>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-2">
                      <Card.Text>Keterangan Project</Card.Text>
                    </div>
                    <div className="col-md-9">
                      <Card.Text>: {resign.keterangan}</Card.Text>
                    </div>
                  </div>
                </Col>

                <Col>
                  <div className="row mb-3">
                    <div className="col-md-2">
                      <Card.Text>Tanggal Handover</Card.Text>
                    </div>
                    <div className="col-md-9">
                      <Card.Text>
                        : {moment(start).format("DD-MM-YYYY")} -{" "}
                        {moment(end).format("DD-MM-YYYY")}
                      </Card.Text>

                      {console.log(start)}
                    </div>
                  </div>
                </Col>

                <br />
                <Link to={"/resign"}>
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    size="sm"
                  >
                    Back
                  </button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default DetailResign;
