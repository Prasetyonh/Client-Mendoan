import { BrowserRouter, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Login, Register, Forgot, Dashboard } from "./Pages/user";
import Navbar from "./Components/Navbar";
import {
  AddKaryawan,
  Karyawan,
  EditKaryawan,
  InfoKaryawan,
} from "./Pages/karyawan";
import { Cuti, AddCuti } from "./Pages/cuti";
import { Resign, AddResign, DetailResign } from "./Pages/Resign";

function App() {
  document.body.style.backgroundColor = "#ebdfed";
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/forgot" component={Forgot} />
          <Route path="/dashboard">
            <Navbar />
            <Dashboard />
          </Route>
          <Route path="/karyawan">
            <Navbar />
            <Karyawan />
          </Route>
          <Route path="/addkaryawan">
            <Navbar />
            <AddKaryawan />
          </Route>
          <Route path="/editkaryawan/:id">
            <Navbar />
            <EditKaryawan />
          </Route>
          <Route path="/infokaryawan/:id">
            <Navbar />
            <InfoKaryawan />
          </Route>
          <Route path="/cuti">
            <Navbar />
            <Cuti />
          </Route>
          <Route path="/addcuti">
            <Navbar />
            <AddCuti />
          </Route>
          <Route path="/resign">
            <Navbar />
            <Resign />
          </Route>
          <Route path="/addresign">
            <Navbar />
            <AddResign />
          </Route>
          <Route path="/detailresign/:id">
            <Navbar />
            <DetailResign />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
