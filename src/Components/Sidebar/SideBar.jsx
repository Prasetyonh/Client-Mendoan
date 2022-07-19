/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useHistory } from "react-router-dom";
import { FaUserAlt, FaPowerOff, FaUserCog } from "react-icons/fa";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";
import { RiDashboardFill, RiBookMarkFill } from "react-icons/ri";
import { BsFillBookmarkPlusFill, BsDot } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import "./sidebar.css";

import "jquery/dist/jquery.min.js";
import $ from "jquery";

import { API_URL } from "../../Utils/Constant";

const Sidebar = ({ children, setIsLogin }) => {
  const history = useHistory();

  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  useEffect(() => {
    $(document).ready(function () {
      $(".parent").click(function () {
        $(" .sub-menu").toggleClass("show");
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

        <Link
          to={"#"}
          className="link parent"
          onClick={() => {
            !isOpen ? setIsOpen(true) : setIsOpen(true);
          }}
        >
          <FaUserAlt className="icon" />
          <div
            className=" link_text ms-3"
            style={{ display: isOpen ? "block" : "none" }}
          >
            Karyawan <IoMdArrowDropdown />
          </div>
        </Link>
        <ul className="sub-menu ms-3">
          <Link
            to={"/karyawan"}
            className="link"
            style={{ display: isOpen ? "block" : "none" }}
          >
            <div className="list-sub-menu">
              <BsDot />
              List Karyawan
            </div>
          </Link>
          <Link
            to={"/cuti"}
            className="link"
            style={{ display: isOpen ? "block" : "none" }}
          >
            <div className="list-sub-menu">
              {" "}
              <BsDot />
              Karyawan Cuti
            </div>
          </Link>
          <Link
            to={"/resign"}
            className="link"
            style={{ display: isOpen ? "block" : "none" }}
          >
            <div className="list-sub-menu">
              {" "}
              <BsDot />
              Karyawan Resign
            </div>
          </Link>
        </ul>

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
