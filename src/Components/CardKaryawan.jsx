import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const CardKaryawan = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    getKaryawans();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getKaryawans = () => {
    axios.get("http://localhost:2471/karyawans").then((res) => {
      //Storing users detail in state array object
      const data = res.data;
      setData(data);

      console.log("total karyawan = " + data.length);
    });
  };
  return (
    <>
      <div className="row text-white mb-2 align-items-center">
        <div className="card bg-c-blue ms-3" style={{ width: "20rem" }}>
          <div className="card-body">
            <div className="card-body-icon">
              <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
            </div>
            <h5 className="card-title">TOTAL KARYAWAN AKTIF</h5>
            <div className="display-4">{data.length}</div>
          </div>
        </div>

        <div className="card bg-c-green ms-3" style={{ width: "19rem" }}>
          <div className="card-body">
            <div className="card-body-icon">
              <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
            </div>
            <h6 className="card-title">DIVISI DEVELOPER</h6>
            <div className="display-4">
              {data.filter((item) => item.divisi === "Developer").length}
            </div>
          </div>
        </div>
        <div className="card bg-c-pink ms-3" style={{ width: "19rem" }}>
          <div className="card-body">
            <div className="card-body-icon">
              <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
            </div>
            <h6 className="card-title">DIVISI BSO</h6>
            <div className="display-4">
              {data.filter((item) => item.divisi === "BSO").length}
            </div>
          </div>
        </div>
        <div className="card bg-c-yellow ms-3" style={{ width: "19rem" }}>
          <div className="card-body">
            <div className="card-body-icon">
              <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
            </div>
            <h6 className="card-title">DIVISI DIGITAL MARKETING</h6>
            <div className="display-4">
              {
                data.filter((item) => item.divisi === "Digital Marketing")
                  .length
              }
            </div>
          </div>
        </div>
      </div>{" "}
    </>
  );
};

export default CardKaryawan;
