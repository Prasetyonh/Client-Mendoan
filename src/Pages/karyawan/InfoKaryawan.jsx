import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import {
  Card,
  Row,
  Col,
  Button,
  Alert,
  Container,
  CardGroup,
} from "react-bootstrap";

const InfoKaryawan = () => {
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

  const history = useHistory();
  const [msg, setMsg] = useState("");
  const { id } = useParams();

  useEffect(() => {
    refreshToken();
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

  return (
    <div className="MainDiv">
      <Container>
        <Row>
          <Col md="{12}">
            <Card className="border-0 rounded shadow mb-3">
              <Card.Header as="h5" className="text-center">
                Info Karyawan
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

                <CardGroup className="mb-3">
                  <Col>
                    <Card.Text>
                      Nama &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp; :{" "}
                      {karyawan.fullname}
                    </Card.Text>
                    <Card.Text>
                      User Id &emsp;&emsp;&emsp;&emsp;&emsp;&ensp;&nbsp; :{" "}
                      {karyawan.user_id}
                    </Card.Text>
                    <Card.Text>
                      Status Pernikahan &emsp; : {karyawan.statuspernikahan}
                    </Card.Text>
                    <Card.Text>
                      NIK &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp; :{" "}
                      {karyawan.nik}
                    </Card.Text>
                    <Card.Text>
                      Identitas &emsp;&emsp;&emsp;&emsp;&emsp; :{" "}
                      {karyawan.identitas}
                    </Card.Text>
                    <Card.Text>
                      Divisi &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&ensp; :{" "}
                      {karyawan.divisi}
                    </Card.Text>
                    <Card.Text>
                      Tanggal Masuk &emsp;&emsp;&nbsp; : {karyawan.tanggalmasuk}
                    </Card.Text>
                    <Card.Text>
                      Status Karyawan &emsp;&ensp;&nbsp; :{" "}
                      {karyawan.statuskaryawan}
                    </Card.Text>
                    <Card.Text>
                      Email &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&ensp; :{" "}
                      {karyawan.email}
                    </Card.Text>
                    <Card.Text>
                      Phone &emsp;&emsp;&emsp;&emsp;&emsp;&emsp; :{" "}
                      {karyawan.phone}
                    </Card.Text>
                    <Card.Text>
                      Posisi &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&ensp; :{" "}
                      {karyawan.posisi}
                    </Card.Text>
                    <Card.Text>
                      NIK Karyawan &emsp;&emsp;&nbsp;&nbsp;&nbsp; :{" "}
                      {karyawan.nikkaryawan}
                    </Card.Text>
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

                <Link to={"/karyawan"}>
                  <Button type="button" className="btn-danger" size="sm">
                    Back
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default InfoKaryawan;
