import React, { Component } from 'react';
import { Card, CardImg, CardText, Button, Row, Col, Modal, ModalHeader, ModalBody, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

function RenderStaffList({ staffs }) {
  return (
    <Card>
      <Link to={`/staff/${staffs.id}`} >
        <CardImg className="mx-auto img-thumbnail" width="100%" src={staffs.image} alt={staffs.name} />
        <CardText style={{ color: "black", textAlign: "center" }}>{staffs.name}</CardText>
      </Link>
    </Card>
  );
}

class StaffList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      staffs: this.props.staffs,
      name: '',
      isModalOpen: false,
    }
    this.handleSearch = this.handleSearch.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSearch(event) {
    event.preventDefault();
    const result = this.props.staffs.filter(s => s.name.toLowerCase().match(this.state.name.toLowerCase()));
    this.setState({
      staffs: result,
      name: this.name.value,
    });

  }
  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }
  handleSubmit(values) {
    this.props.onAdd(values);
  }

  render() {
    const chuanhap = (val) => val && (val.length >= 0);
    const isNumber = (val) => !isNaN(Number(val));
    const minNum = (val) => !chuanhap(val) || !isNumber(val) || val >= 1;
    const maxNum = (val) => val <= 3 || !isNumber(val);
    const minLength = (len) => (val) => !chuanhap(val) || (val && (val.length >= len));
    const maxLength = (len) => (val) => !(val) || (val.length <= len);
    const soDuong = (val) => !(isNumber(val)) || val >= 0;
    const menu = this.state.staffs.map((staffs) => {
      return (
        <div key={staffs.id} className="col-6 col-md-4 col-lg-2 mb-1 mt-1">
          <RenderStaffList staffs={staffs} />
        </div>
      );
    });
    return (
      <div className="container mb-1">
        <div className="row">
          <div className="col-12 col-md-6 mt-3">
            <div className='row'>
              <div className="col-10 col-md-10" >
                <h3>Nhân viên</h3>
              </div>
              <div className="col-2 col-auto">
                <Button outline type="submit" onClick={this.toggleModal}>
                  <span className='fa fa-plus fa-lg'></span>
                </Button>
              </div>
            </div>
          </div>
          <div className='col-12 col-md-6 mt-3'>
            <form onSubmit={this.handleSearch} className='form-group row'>
              <div className="col-8 col-md-8">
                <Input
                  type="text"
                  id="name"
                  name="name"
                  placeholder='Tìm kiếm nhân viên...'
                  innerRef={(input) => this.name = input}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="col-4 col-md-4">
                <button className="btn btn-success" type='submit'>
                  Tìm kiếm
                </button>
              </div>
            </form>
          </div>
        </div>
        <hr />
        <div className="row">
          {menu}
        </div>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Thêm nhân viên</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <Row className="form-group">
                <Label htmlFor="username" md={4}>Tên</Label>
                <Col md={8}>
                  <Control.text model=".username" id="username" name="username"
                    placeholder="Name"
                    className="form-control"
                    validators={{
                      chuanhap,
                      minLength: minLength(3),
                      maxLength: maxLength(30)
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".username"
                    show="touched"
                    messages={{
                      chuanhap: 'Chưa nhập ',
                      minLength: 'Ít nhất 3 kí tự',
                      maxLength: 'Tối đa 30 kí tự'

                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="doB" md={4}>Ngày sinh</Label>
                <Col md={8}>
                  <Control.text model=".doB" id="doB" name="doB"
                    className="form-control" type='date'
                    defaultValue="2000-01-01"
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="startDate" md={4}>Ngày vào công ty</Label>
                <Col md={8}>
                  <Control.text model=".startDate" id="startDate" name="startDate"
                    className="form-control" type='date'
                    defaultValue="2022-01-01"
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="department" md={4}>Phòng ban</Label>
                <Col md={8}>
                  <Control.select model=".department" id="department" name="department"
                    defaultValue='Sale'
                    className="form-control">
                    <option>Sale</option>
                    <option>HR</option>
                    <option>Marketing</option>
                    <option>IT</option>
                    <option>Finance</option>
                  </Control.select>
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="salaryScale" md={4}>Hệ số lương</Label>
                <Col md={8}>
                  <Control.text model=".salaryScale" id="salaryScale" name="salaryScale"
                    placeholder="1->3"
                    defaultValue='1'
                    className="form-control"
                    validators={{
                      chuanhap,
                      isNumber,
                      minNum,
                      maxNum
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".salaryScale"
                    show="touched"
                    messages={{
                      chuanhap: 'Chưa nhập ',
                      isNumber: 'Phải là số ',
                      minNum: 'Phải >= 1 ',
                      maxNum: 'Phải <=3 '
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="annualLeave" md={4}>Số ngày nghỉ còn lại</Label>
                <Col md={8}>
                  <Control.text model=".annualLeave" id="annualLeave" name="annualLeave"
                    defaultValue='0'
                    className="form-control"
                    validators={{
                      chuanhap,
                      isNumber,
                      soDuong
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".annualLeave"
                    show="touched"
                    messages={{
                      chuanhap: 'Chưa nhập ',
                      isNumber: 'Phải là số',
                      soDuong: 'Phải >=0'

                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="overTime" md={4}>Số ngày làm thêm</Label>
                <Col md={8}>
                  <Control.text model=".overTime" id="overTime" name="overTime"
                    defaultValue='0'
                    className="form-control"
                    validators={{
                      chuanhap,
                      isNumber,
                      soDuong
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".overTime"
                    show="touched"
                    messages={{
                      chuanhap: 'Chưa nhập ',
                      isNumber: 'Phải là số',
                      soDuong: 'Phải >=0'

                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Col xs={6} md={4} style={{ margin: 'auto' }}>
                  <Button type="submit" color="primary">
                    Thêm mới
                  </Button>
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default StaffList;

