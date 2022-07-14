/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useHistory } from "react-router-dom";
import { FaUserAlt, FaPowerOff, FaUserCog } from "react-icons/fa";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import { RiDashboardFill, RiBookMarkFill } from "react-icons/ri";
import { BsFillBookmarkPlusFill } from "react-icons/bs";

import { API_URL } from "../../Utils/Constant";

const Sidebar = ({ children, setIsLogin }) => {
  const history = useHistory();

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const Logout = async (e) => {
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
          localStorage.clear();
          setIsLogin(false);
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
            <img
              className="w3-animate-left"
              src="../assets/images/logotext.png"
              width="160"
              height="40"
              alt="mendoan logo"
            />
          </h1>
          <div style={{ marginLeft: isOpen ? "5px" : "0px" }} className="bars">
            <AiOutlineMenuUnfold
              style={{ display: isOpen ? "none" : "block" }}
              onClick={toggle}
              className="w3-animate-right"
            />
            <AiOutlineMenuFold
              className="w3-animate-left"
              style={{ display: isOpen ? "block" : "none" }}
              onClick={toggle}
            />
          </div>
        </div>

        <Link className="link" to={"/dashboard"}>
          <RiDashboardFill className="icon " />{" "}
          <div
            className="link_text ms-3"
            style={{ display: isOpen ? "block" : "none" }}
          >
            Dashboard
          </div>{" "}
        </Link>

        <div className="dropdown">
          <div className="link ">
            <FaUserAlt
              className="icon "
              data-bs-toggle="dropdown"
              aria-expanded="false"
            />
            <div
              className="link_text dropdown-toggle ms-3"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{ display: isOpen ? "block" : "none" }}
            >
              Karyawan
            </div>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <li>
                <Link className="dropdown-item" to={"/karyawan"}>
                  Karyawan
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to={"/cuti"}>
                  Cuti
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to={"/resign"}>
                  Resign
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Link className="link" to={"/assignment"}>
          <RiBookMarkFill className="icon " />{" "}
          <div
            className="link_text ms-3"
            style={{ display: isOpen ? "block" : "none" }}
          >
            Report Assignment
          </div>{" "}
        </Link>

        <Link className="link" to={"/addassignment"}>
          <BsFillBookmarkPlusFill className="icon " />{" "}
          <div
            className="link_text ms-3"
            style={{ display: isOpen ? "block" : "none" }}
          >
            Tambah Assignment
          </div>{" "}
        </Link>

        <Link className="link" to={"/users"}>
          <FaUserCog className="icon " />{" "}
          <div
            className="link_text ms-3"
            style={{ display: isOpen ? "block" : "none" }}
          >
            Users
          </div>{" "}
        </Link>

        <div className="link" onClick={Logout}>
          <FaPowerOff className="icon" />
          <div
            className="link_text ms-3"
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
