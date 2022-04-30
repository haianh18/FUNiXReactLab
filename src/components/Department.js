import React from 'react';
import { Card, CardTitle, CardText, CardBody } from 'reactstrap';
function RenderDept({ dept }) {
    return (

        <Card>
            <CardTitle className='m-2'>{dept.name}</CardTitle>
            <CardBody>
                <CardText style={{ color: 'black' }}>Số lượng nhân viên: {dept.numberOfStaff}</CardText>
            </CardBody>
        </Card>

    );
}
const Department = (props) => {
    const department = props.department.map((department) => {
        return (
            <div className="col-12 col-md-6 col-lg-4 mt-2 mb-2" key={department.id}>
                <RenderDept dept={department} />
            </div>
        );
    });
    return (
        <div className="container">
            <div className="row shadow m-3">
                {department}
            </div>
        </div>
    );

}
export default Department;