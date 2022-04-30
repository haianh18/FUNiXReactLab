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
