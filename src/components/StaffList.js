import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, CardTitle, CardImg, Button, Modal, Col, Form, Input, ModalHeader, ModalBody, Row, Label } from "reactstrap";
import { Control, LocalForm, Errors } from 'react-redux-form';

function RenderStaffList({ staffs }) {

  return (
    <Card>
      <Link to={`/menu/${staffs.id}`} >
        <CardImg width="100%" src={staffs.image} alt={staffs.name} />
        <CardTitle style={{ color: "black", textAlign: "center" }}>{staffs.name}</CardTitle>
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
      modalOpen: false,
    }
    this.timNhanvien = this.timNhanvien.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }


  handleSubmit(newStaff) {

    this.props.onAdd(newStaff);
  }


  toggleModal() {
    this.setState({
      modalOpen: !this.state.modalOpen
    });
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  timNhanvien(event) {
    event.preventDefault();
    const result = this.props.staffs.filter((val) => {
      if (this.state.name === "") {
        return val;
      } else if (
        val.name.toLowerCase().includes(this.state.name.toLocaleLowerCase())
      ) {
        return val;
      } else {
        return null;
      }
    })
    this.setState({
      staffs: result,
      name: this.name.value
    });
  }

  render() {
    const chuanhap = (val) => val && (val.length >= 0);
    const isNumber = (val) => !isNaN(Number(val));
    const minNum = (val) => !chuanhap(val) || !isNumber(val) || val >= 1;
    const maxNum = (val) => val <= 3 || !isNumber(val);
    const minLength = (len) => (val) => !chuanhap(val) || (val && (val.length >= len));
    const maxLength = (len) => (val) => !(val) || (val.length <= len);
    const soDuong = (val) => !(isNumber(val)) || val >= 0;
    const listNhanvien = this.state.staffs.map((staffs) => {
      return (
        <div className="col-12 col-md-4 col-lg-2">
          <RenderStaffList staffs={staffs} />
        </div>
      );
    });

    return (
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6 mt-3">
            <div className="row">
              <div className="col-10 col-md-10">
                <h3>Nhân viên</h3>
              </div>
              <div className="col-2 col-auto">
                <Button outline onClick={this.toggleModal}>
                  <span className="fa fa-plus fa-lg"></span>
                </Button>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 mt-3">
            <Form onSubmit={this.timNhanvien}>
              <Row className="form-group">
                <Col md={{ size: 6, offset: 2 }} style={{ marginTop: "10px" }}>
                  <Input
                    type='text'
                    id='name'
                    name='name'
                    placeholder="Tìm kiếm nhân viên..."
                    innerRef={(input) => this.name = input}
                    onChange={this.handleInputChange}
                  />
                </Col>
              </Row>
              <Col md={{ size: 2, offset: 1 }} style={{ marginTop: "10px" }}>
                <Button type="submit" color="success">
                  Tìm kiếm
                </Button>
              </Col>
            </Form>
          </div>
        </div>
        <hr />
        <div className="dataResult container m-1">
          <div className="row">{listNhanvien}</div>
        </div>
        <Modal isOpen={this.state.modalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Thêm nhân viên</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <Row className='form-group mb-3'>
                <Label htmlFor='name' md={4}>
                  Tên
                </Label>
                <Col md={8}>
                  <Control.text
                    model=".name"
                    className='form-control'
                    id='name'
                    name='name'
                    validators={{
                      chuanhap,
                      minLength: minLength(3), maxLength: maxLength(30)
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".name"
                    show="touched"
                    messages={{
                      chuanhap: 'Yêu cầu nhập ',
                      minLength: 'Ít nhất 3 kí tự',
                      maxLength: 'Tối đa 30 kí tự'
                    }}
                  />
                </Col>
              </Row>
              <Row className='form-group mb-3'>
                <Label htmlFor='doB' md={4}>
                  Ngày sinh
                </Label>
                <Col md={8}>
                  <Control.text
                    type='date'
                    className='form-control'
                    id='doB'
                    name='doB'
                    model='.doB'
                    defaultValue="2000-01-01"
                  />
                </Col>
              </Row>
              <Row className='form-group mb-3'>
                <Label htmlFor='startDate' md={4}>
                  Ngày vào công ty
                </Label>
                <Col md={8}>
                  <Control.text
                    type='date'
                    className='form-control'
                    id='startDate'
                    name='startDate'
                    defaultValue='2000-01-01'
                    model='.startDate'
                  />
                </Col>
              </Row>
              <Row className='form-group mb-3'>
                <Label htmlFor='department' md={4}>
                  Phòng ban
                </Label>
                <Col md={8}>
                  <Control.select
                    model='.department'
                    id='department'
                    name='department'
                    defaultValue='Sale'
                  >
                    <option>Sale</option>
                    <option>HR</option>
                    <option>Marketing</option>
                    <option>IT</option>
                    <option>Finance</option>
                  </Control.select>
                </Col>
              </Row>
              <Row className='form-group mb-3'>
                <Label htmlFor='salaryScale' md={4}>
                  Hệ số lương
                </Label>
                <Col md={8}>
                  <Control.text
                    model='.salaryScale'
                    className='form-control'
                    id='salaryScale'
                    name='salaryScale'
                    placeholder='1->3'
                    defaultValue='1'
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
              <Row className='form-group mb-1'>
                <Label htmlFor='annualLeave' md={4}>
                  Số ngày nghỉ còn lại
                </Label>
                <Col md={8}>
                  <Control.text
                    model='.annualLeave'
                    className='form-control'
                    id='anualLeave'
                    name='annualLeave'
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
              <Row className='form-group mb-3'>
                <Label htmlFor='overTime' md={4}>
                  Số ngày đã làm thêm
                </Label>
                <Col md={8}>
                  <Control.text
                    model='.overTime'
                    className='form-control'
                    id='overTime'
                    name='overTime'
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
        </Modal >
      </div >
    );
  }

}

export default StaffList;
