import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import { API_URL } from "../../Utils/Constant";

const CardKaryawan = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    getKaryawans();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getKaryawans = () => {
    axios.get(API_URL + "/karyawans").then((res) => {
      //Storing users detail in state array object
      const data = res.data;
      setData(data);

      console.log("total karyawan = " + data.length);
    });
  };
  return (
    <>
      {/* desktop */}
      <div className="d-md-block d-none">
        <div className="row container text-white mb-2 card-karyawan ">
          <div className="card col-sm-6 col-lg bg-c-blue ms-3 ">
            <div className="card-body">
              <div className="card-body-icon">
                <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
              </div>
              <h6 className="card-title">TOTAL KARYAWAN AKTIF</h6>
              <div className="display-4">{data.length}</div>
            </div>
          </div>

          <div className="card col-sm-6 col-lg bg-c-green ms-3">
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

          <div className="card col-sm-6 col-lg bg-c-pink ms-3">
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
          <div className="card col-sm-6 col-lg bg-c-yellow ms-3">
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
        </div>
      </div>

      {/* mobile */}
      <div className="d-sm-block d-md-none ">
        <div className="row container text-white mb-2 card-karyawan ">
          <div className="card col-sm-6 col-lg bg-c-blue ms-3 ">
            <div className="card-body">
              <div className="card-body-icon">
                <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
              </div>
              <h6 className="card-title">TOTAL KARYAWAN AKTIF</h6>
              <div className="display-4">{data.length}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardKaryawan;
