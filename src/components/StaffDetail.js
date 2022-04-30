import React from 'react';
import { Card, CardImg, CardText, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import dateFormat from "dateformat";
const StaffDetail = (props) => {
    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/staff">Nhân viên</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.staff.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.staff.name}</h3>
                    <hr />
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-12 col-md-4 col-lg-3 mb-2">
                    <Card>
                        <CardImg top width='100%' className='img-thumbnail' src={props.staff.image} alt={props.staff.name} />
                    </Card>
                </div>
                <div className="col-12 col-md-8 col-lg-9">
                    <CardTitle style={{ color: "black" }}>Họ và tên: {props.staff.name}</CardTitle>
                    <CardText>Ngày sinh: {dateFormat(props.staff.doB, 'dd/mm/yyyy')} </CardText>
                    <CardText>Ngày vào công ty: {dateFormat(props.staff.startDate, 'dd/mm/yyyy')} </CardText>
                    <CardText>Phòng ban: {props.staff.department.name} </CardText>
                    <CardText>Số ngày nghỉ còn lại: {props.staff.annualLeave} </CardText>
                    <CardText>Số ngày đã làm thêm: {props.staff.overTime} </CardText>
                </div>
            </div>
        </div>
    );
}
export default StaffDetail;