import React, { useState, useEffect } from "react";
import "../Dashboard/Dashboard.css";
import axios from "axios";

import { FAKEAPI_URL } from "../../Utils/Constant";

const CardSummary = () => {
  const [summary, setSummary] = useState({});

  useEffect(() => {
    getSummary();
  }, []);

  const getSummary = async () => {
    try {
      axios.get(FAKEAPI_URL + "/summary").then((res) => {
        const data = res.data;
        setSummary(data[0]);
        console.log(data[0]);
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {" "}
      <div>
        <ul className="box-info">
          <li>
            <i className="bx bxs-bar-chart-square"></i>
            <span className="text">
              <p>AKTIF PROJECT</p>
              <h3>{summary.activeProject}</h3>
            </span>
          </li>

          <li>
            <i className="bx bxs-pie-chart-alt-2"></i>
            <span className="text">
              <p>RESOURCE AKTIF</p>
              <h3>{summary.resourceActive}</h3>
            </span>
          </li>

          <li>
            <i className="bx bxs-group"></i>
            <span className="text">
              <p>RESOURCE IDLE</p>
              <h3>{summary.ResourceIdle}</h3>
            </span>
          </li>

          <li>
            <i className="bx bxs-bookmarks"></i>
            <span className="text">
              <p>RESOURCE PMO</p>
              <h3>{summary.resourcePMO}</h3>
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CardSummary;
