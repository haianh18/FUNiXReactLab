import React, { Component } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Switch, Route } from "react-router-dom";
import StaffList from "./StaffList";
import StaffDetail from "./StaffDetail";
import { STAFFS, DEPARTMENTS } from "../data/staffs";
import Department from "./Department";
import Salary from "./Salary";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      staffs: STAFFS,
      departments: DEPARTMENTS,
    };
    this.addStaff = this.addStaff.bind(this);
  }

  addStaff = (staff) => {
    const id = Math.floor(Math.random() * 10000 + 1);
    const newStaff = { id, ...staff };
    this.setState({
      staffs: [...this.state.staffs, newStaff]
    });
  }

  render() {
    const StaffWithId = ({ match }) => {
      return (
        <StaffDetail
          nv={
            this.state.staffs.filter(
              (item) => item.id === parseInt(match.params.staffId, 10)
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
            path="/staff"
            component={() => <StaffList onAdd={this.addStaff} staffs={this.state.staffs} />}
          />
          <Route path="/staff/:staffId" component={StaffWithId} />
          <Route
            path="/department"
            component={() => <Department dept={this.state.departments} />}
          />
          <Route
            path="/salary"
            component={() => <Salary salary={this.state.staffs} />}
          />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;
