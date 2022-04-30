import React, { Component } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Switch, Route, withRouter } from "react-router-dom";
import StaffList from "./StaffList";
import StaffDetail from "./StaffDetail";
import Department from "./Department";
import Salary from "./Salary";
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    staffs: state.staffs,
    department: state.departments
  }
};

class Main extends Component {
  constructor(props) {
    super(props);
    this.addStaff = this.addStaff.bind(this);
  }

  addStaff = (staff) => {
    const id = Math.floor(Math.random() * 10000 + 1);
    const newList = this.props.staffs;
    const newStaff = {
      id: id,
      name: staff.username,
      doB: staff.doB,
      salaryScale: staff.salaryScale,
      startDate: staff.startDate,
      department: staff.department,
      annualLeave: staff.annualLeave,
      overTime: staff.overTime,
      image: '/assets/images/alberto.png',
    }
    if (staff.department === 'Sale')
      newStaff.department = this.props.department[0];
    else if (staff.department === 'HR')
      newStaff.department = this.props.department[1];

    else if (staff.department === 'Marketing')
      newStaff.department = this.props.department[2];
    else if (staff.department === 'IT')
      newStaff.department = this.props.department[3];
    else
      newStaff.department = this.props.department[4];

    newList.push(newStaff);
    this.setState({
      staffs: newList
    });
  }

  render() {
    const StaffWithId = ({ match }) => {
      return (
        <StaffDetail
          nv={
            this.props.staffs.filter(
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
            component={() => <StaffList onAdd={this.addStaff} staffs={this.props.staffs} />}
          />
          <Route path="/staff/:staffId" component={StaffWithId} />
          <Route
            path="/department"
            component={() => <Department dept={this.props.departments} />}
          />
          <Route
            path="/salary"
            component={() => <Salary salary={this.props.staffs} />}
          />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;
