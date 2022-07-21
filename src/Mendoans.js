import "./App.css";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Users } from "./Pages/user";
// import Navbar from "./Components/Navbar";
import { Karyawan, EditKaryawan, InfoKaryawan } from "./Pages/karyawan";
import { Cuti, AddCuti } from "./Pages/cuti";
import { Resign, AddResign, DetailResign } from "./Pages/Resign";

import Sidebar from "./Components/Sidebar/SideBar";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Error404 from "./Components/404NotFound/404NotFound";
import {
  ReportAssignment,
  AddAssignment,
  EditAssignment,
} from "./Pages/Assignment";
import axios from "axios";
axios.defaults.withCredentials = true;

function Mendoans({ setIsLogin }) {
  document.body.style.backgroundColor = "#ebdfed";
  return (
    <>
      <BrowserRouter>
        {" "}
        <Sidebar setIsLogin={setIsLogin}>
          <Switch setIsLogin={setIsLogin}>
            <Route path="/dashboard">
              {/* <Navbar /> */}
              <Dashboard />
            </Route>
            <Route path="/users">
              {/* <Navbar /> */}
              <Users />
            </Route>
            <Route path="/karyawan">
              {/* <Navbar /> */}
              <Karyawan />
            </Route>
            {/* <Route path="/addkaryawan">
            <Navbar />
            <AddKaryawan />
          </Route> */}
            <Route path="/editkaryawan/:id">
              {/* <Navbar /> */}
              <EditKaryawan />
            </Route>
            <Route path="/infokaryawan/:id">
              {/* <Navbar /> */}
              <InfoKaryawan />
            </Route>
            <Route path="/cuti">
              {/* <Navbar /> */}
              <Cuti />
            </Route>
            <Route path="/addcuti">
              {/* <Navbar /> */}
              <AddCuti />
            </Route>
            <Route path="/resign">
              {/* <Navbar /> */}
              <Resign />
            </Route>
            <Route path="/addresign">
              {/* <Navbar /> */}
              <AddResign />
            </Route>
            <Route path="/detailresign/:id">
              {/* <Navbar /> */}
              <DetailResign />
            </Route>
            <Route path="/assignment">
              {/* <Navbar /> */}
              <ReportAssignment />
            </Route>
            <Route path="/addassignment">
              {/* <Navbar /> */}
              <AddAssignment />
            </Route>
            <Route path="/editassignment/:id">
              {/* <Navbar /> */}
              <EditAssignment />
            </Route>
            <Route exact path="/">
              <Redirect to="/dashboard" />
            </Route>{" "}
            <Route path="*" component={Error404} />
          </Switch>{" "}
        </Sidebar>
      </BrowserRouter>
    </>
  );
}

export default Mendoans;
