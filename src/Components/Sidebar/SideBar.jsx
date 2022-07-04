/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useHistory } from "react-router-dom";
import {
  FaTh,
  FaBars,
  FaUserAlt,
  FaRegChartBar,
  FaThList,
  FaPowerOff,
  FaRunning,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

import { API_URL } from "../../Utils/Constant";
import { Button, Nav } from "react-bootstrap";

const Sidebar = ({ children }) => {
  const history = useHistory();

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const Logout = async () => {
    Swal.fire({
      title: "Are you sure to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#fe7c96",
      cancelButtonColor: "#b66dff",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      try {
        if (result.isConfirmed) {
          await axios.delete(API_URL + "/logout");
          Swal.fire("Success!", "You have successfully logged out.", "success");
          history.push("/");
        }
      } catch (error) {
        console.log(error);
      }
    });
  };
  return (
    <div className="container-sidebar">
      <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar">
        <div className="top_section">
          <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
            Mendoan
          </h1>
          <div style={{ marginLeft: isOpen ? "15px" : "0px" }} className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>

        <Link className="link" to={"/dashboard"}>
          <FaTh className="icon " />{" "}
          <div
            className="link_text ms-5"
            style={{ display: isOpen ? "block" : "none" }}
          >
            Dashboard
          </div>{" "}
        </Link>

        <div className="dropdown">
          <Link className="link ">
            <FaUserAlt
              className="icon "
              data-bs-toggle="dropdown"
              aria-expanded="false"
            />
            <div
              className="link_text dropdown-toggle ms-5"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{ display: isOpen ? "block" : "none" }}
            >
              Karyawan
            </div>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <li>
                <Link class="dropdown-item" to={"/karyawan"}>
                  Karyawan
                </Link>
              </li>
              <li>
                <Link class="dropdown-item" to={"/cuti"}>
                  Cuti
                </Link>
              </li>
              <li>
                <Link class="dropdown-item" to={"/resign"}>
                  Resign
                </Link>
              </li>
            </ul>
          </Link>
        </div>

        <div className="link" onClick={Logout}>
          <FaPowerOff className="icon" />
          <div
            className="link_text ms-5"
            style={{ display: isOpen ? "block" : "none" }}
          >
            Logout
          </div>
        </div>
      </div>

      <main>{children}</main>
    </div>
  );
};

export default Sidebar;
