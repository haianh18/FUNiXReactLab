import React, { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Switch, Route } from "react-router-dom";
import StaffList from "./StaffList";
import StaffDetail from "./StaffDetail";
import { STAFFS, DEPARTMENTS } from "../data/staffs";
import Department from "./Department";
import Salary from "./Salary";

function Main() {
  const [nhanvien, setNhanvien] = useState({
    staffs: STAFFS,
    departments: DEPARTMENTS,
  });

  const StaffWithId = ({ match }) => {
    return (
      <StaffDetail
        nv={
          nhanvien.staffs.filter(
            (item) => item.id === parseInt(match.params.nhanvienId, 10)
          )[0]
        }
      />
    );
  };

  return (
    <div>
      <Header />
      <Switch>
        <Route
          exact
          path="/nhanvien"
          component={() => <StaffList staffs={nhanvien.staffs} />}
        />
        <Route path="/nhanvien/:nhanvienId" component={StaffWithId} />
        <Route
          path="/department"
          component={() => <Department dept={nhanvien.departments} />}
        />
        <Route
          path="/salary"
          component={() => <Salary salary={nhanvien.staffs} />}
        />
      </Switch>
      <Footer />
    </div>
  );
}
export default Main;
