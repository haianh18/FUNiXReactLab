import React from "react";
import { Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, CardText, CardTitle, CardImg } from "reactstrap";
import dateFormat from 'dateformat';

function StaffDetail(props) {
    if (props.nv != null) {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to='/staff'>Nhân viên</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>{props.nv.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.nv.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row mb-3">
                    <RenderStaff staff={props.nv} />
                </div>

            </div>
        );
    } else {
        return <div></div>
    }
}

function RenderStaff({ staff }) {
    if (staff != null) {
        console.log(staff.department);
        return (
            <div className="col-12">
                <div className="row">
                    <div className="col-3">
                        <CardImg width='100%' src={staff.image} alt={staff.name} />
                    </div>
                    <div className="col-9">
                        <CardTitle>Họ và tên: {staff.name}</CardTitle>
                        <CardText>
                            Ngày sinh: {dateFormat(staff.doB, "dd/mm/yyyy")}
                        </CardText>
                        <CardText>
                            Ngày vào công ty: {dateFormat(staff.startDate, "dd/mm/yyyy")}
                        </CardText>
                        <CardText>
                            Phòng ban: {staff.department.name}
                        </CardText>
                        <CardText>
                            Số ngày nghỉ còn lại: {staff.annualLeave}
                        </CardText>
                        <CardText>
                            Số ngày đã làm thêm: {staff.overTime}
                        </CardText>
                    </div>
                </div>
            </div>
        );
    }
    else {
        return (
            <div></div>
        )
    }
}

export default StaffDetail;