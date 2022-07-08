import React, { useState, useEffect } from "react";
import "../Dashboard/Dashboard.css";
import axios from "axios";

import { FAKEAPI_URL } from "../../Utils/Constant";

const CardSummary = () => {
  const [summary, setSummary] = useState({});

  useEffect(() => {
    getSummary();
  }, []);

  const getSummary = () => {
    axios.get(FAKEAPI_URL + "/summary").then((res) => {
      const data = res.data;
      setSummary(data[0]);
      console.log(data[0]);
    });
  };
  return (
    <div>
      {" "}
      <div>
        <ul class="box-info">
          <li>
            <i class="bx bxs-bar-chart-square"></i>
            <span class="text">
              <p>AKTIF PROJECT</p>
              <h3>{summary.activeProject}</h3>
            </span>
          </li>

          <li>
            <i class="bx bxs-pie-chart-alt-2"></i>
            <span class="text">
              <p>RESOURCE AKTIF</p>
              <h3>{summary.resourceActive}</h3>
            </span>
          </li>

          <li>
            <i class="bx bxs-group"></i>
            <span class="text">
              <p>RESOURCE IDLE</p>
              <h3>{summary.ResourceIdle}</h3>
            </span>
          </li>

          <li>
            <i class="bx bxs-bookmarks"></i>
            <span class="text">
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
