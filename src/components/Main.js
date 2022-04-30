import React, { Component } from 'react';
import StaffList from './StaffList';
import Header from './Header';
import Footer from './Footer';
import StaffDetail from './StaffDetail';
import Department from './Department';
import Salary from './Salary';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    staffs: state.staffs,
    department: state.department,
  }
}
class Main extends Component {
  constructor(props) {
    super(props);
    this.addStaff = this.addStaff.bind(this);
  }

  addStaff = (staff) => {
    const newList = this.props.staffs;
    const id = this.props.staffs.length;

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
    const staffsWithId = ({ match }) => {
      return (
        <StaffDetail staff={this.props.staffs.filter((staffs) => staffs.id === parseInt(match.params.staffsId, 10))[0]}
        />
      );
    };

    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path='/staff' component={() => <StaffList staffs={this.props.staffs} onAdd={this.addStaff} />} />
          <Route path='/staff/:staffsId' component={staffsWithId} />
          <Route exact path='/department' component={() => <Department department={this.props.department} />} />
          <Route exact path='/salary' component={() => <Salary staffs={this.props.staffs} allItem={1} />} />
          <Redirect to="/staff" />
        </Switch>
        <Footer />
      </div>
    );

  }

}
export default withRouter(connect(mapStateToProps)(Main));