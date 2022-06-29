import React from "react";
import {
  Button,
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Offcanvas,
} from "react-bootstrap";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";

import { API_URL } from "../Utils/Constant";

const Menu = () => {
  // const handleSelect = (eventKey) => alert(`selected ${eventKey}`);

  const history = useHistory();

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
    <>
      {[false].map((expand) => (
        <Navbar
          key={expand}
          bg="light"
          expand={expand}
          className="mb-3"
          fixed="top"
        >
          <Container fluid>
            <Navbar.Brand href="/dashboard">
              <img
                src="../assets/images/mendoan.png"
                width="200"
                height="50"
                className="d-inline-block align-top"
                alt="mendoans"
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  <img
                    src="../assets/images/mendoan.png"
                    width="200"
                    height="50"
                    className="d-inline-block align-top"
                    alt="mendoans"
                  />
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link as={Link} to={"/dashboard"}>
                    Dashboard
                  </Nav.Link>
                  <NavDropdown
                    title="Karyawan"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item as={Link} to={"/karyawan"}>
                      Karyawan
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to={"/resign"}>
                      Resign
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to={"/cuti"}>
                      Cuti
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action4">Mutasi</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                      Challenge
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                      Assignment
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                      Timesheet
                    </NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown
                    title="Mandays"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href="#action4">
                      Mandays by Employee
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                      Mandays by Project
                    </NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown
                    title="Projects"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href="#action4">List</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">Setting</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">Report</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                <Button
                  style={{ backgroundColor: "#fe7c96", border: "none" }}
                  size="md"
                  className="mt-3"
                  type="submit"
                  onClick={Logout}
                >
                  Logout
                </Button>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
};

export default Menu;

// import React from "react";
// import axios from "axios";
// import { Link, useHistory } from "react-router-dom";
// import Swal from "sweetalert2";
// import { Button } from "react-bootstrap";

// const Navbar = () => {
//   const history = useHistory();

//   const Logout = async () => {
//     Swal.fire({
//       title: "Are you sure to logout?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes",
//     }).then(async (result) => {
//       try {
//         if (result.isConfirmed) {
//           await axios.delete("http://localhost:2471/logout");
//           Swal.fire("Success!", "You have successfully logged out.", "success");
//           history.push("/");
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     });
//   };

//   return (
//     <nav className="navbar navbar-expand-lg navbar-light bg-light">
//       <div className="container fluid">
//         <a className="navbar-brand" href="/dashboard">
//           <img
//             src="../assets/images/logo.png"
//             alt="login form"
//             className="img-fluid mt-0"
//             width={200}
//             height={200}
//           />
//         </a>
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarSupportedContent"
//           aria-controls="navbarSupportedContent"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <div className="collapse navbar-collapse" id="navbarSupportedContent">
//           <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//             <li className="nav-item">
//               <Link
//                 className="nav-link active"
//                 aria-current="page"
//                 to={"/dashboard"}
//               >
//                 Dashboard
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link
//                 className="nav-link active"
//                 aria-current="page"
//                 to={"/karyawan"}
//               >
//                 Karyawan
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link
//                 className="nav-link active"
//                 aria-current="page"
//                 to={"/karyawan"}
//               >
//                 Mandays
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link
//                 className="nav-link active"
//                 aria-current="page"
//                 to={"/karyawan"}
//               >
//                 Projects
//               </Link>
//             </li>
//           </ul>
//           <Button variant="danger" size="sm" type="submit" onClick={Logout}>
//             Logout
//           </Button>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
