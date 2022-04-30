import React, { useState } from 'react';
import { Card, CardTitle, CardText, CardBody, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';


const luongCB = 3000000;
const luongOT = 200000;

function RenderSalary({ staff }) {
  return (
    <Card>
      <CardTitle className="p-3 bg-white rounded m-2">{staff.name}</CardTitle>
      <CardBody>
        <CardText>Mã nhân viên: {staff.id}</CardText>
        <CardText>Hệ số lương: {staff.salaryScale}</CardText>
        <CardText>Số giờ làm thêm: {staff.overTime}</CardText>
        <CardText className="bg-light p-2 shadow">Lương: {''}{(staff.salaryScale * luongCB + staff.overTime * luongOT).toFixed(0)} </CardText>
      </CardBody>
    </Card>
  )

}

const Salary = (props) => {
  const [sortSalary, setSortSalary] = useState(false);

  const salary = props.staffs
    .sort((a, b) =>
      sortSalary ? a.salaryScale - b.salaryScale : b.salaryScale - a.salaryScale
    )
    .map((staff) => {
      return (
        <div className="col-12 col-md-6 col-lg-4 mt-2 mb-2" key={staff.id}>
          <RenderSalary staff={staff} />
        </div>
      );
    });
  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/staff">Nhân viên</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>Bảng lương</BreadcrumbItem>
        </Breadcrumb>
      </div>

      <button
        className="btn btn-danger"
        onClick={() => setSortSalary(!sortSalary)}
      >
        Sắp xếp theo Hệ số lương
      </button>
      <div className="row shadow mb-3">{salary}</div>
    </div>
  )

}


export default Salary;