import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, CardText, CardImg, Button, Modal, Col, Form, Input, ModalHeader, ModalBody, Row, Label, FormFeedback } from "reactstrap";

class StaffList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      nameF: '',
      modalOpen: false,
      doB: '',
      salaryScale: 1,
      startDate: '',
      department: 'Sale',
      annualLeave: 0,
      overTime: 0,
      salary: 30000,
      image: '/assets/images/alberto.png',
      touched: {
        name: false,
        doB: false,
        salaryScale: false,
        startDate: false,
        department: false,
        annualLeave: false,
        overTime: false
      }
    };
    this.timNhanvien = this.timNhanvien.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleBlur = (field) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true }
    });
  }

  handleSubmit = () => {
    const newStaff = {
      name: this.state.name,
      doB: this.state.doB,
      startDate: this.state.startDate,
      department: { name: this.state.department },
      salaryScale: this.state.salaryScale,
      annualLeave: this.state.annualLeave,
      overTime: this.state.overTime,
      image: this.state.image
    };
    this.props.onAdd(newStaff);
    console.log(newStaff);
  }

  validate(
    name,
    salaryScale,
    doB,
    startDate,
    annualLeave,
    overTime
  ) {
    const errors = {
      name: '',
      doB: '',
      startDate: '',
      salaryScale: '',
      annualLeave: '',
      overTime: '',
    };
    if (this.state.touched.name && name.length < 2)
      errors.name = "Yêu cầu nhiều hơn 2 ký tự";
    else if (this.state.touched.name && name.length > 30)
      errors.name = "Yêu cầu ít hơn 30 ký tự";
    if (this.state.touched.salaryScale && salaryScale < 1)
      errors.salaryScale = "Yêu cầu nhập";
    if (this.state.touched.annualLeave && annualLeave < 1)
      errors.annualLeave = "Yêu cầu nhập";
    if (this.state.touched.overTime && overTime < 1)
      errors.overTime = "Yêu cầu nhập";
    if (this.state.touched.doB && doB < 1)
      errors.doB = "Yêu cầu nhập";
    if (this.state.touched.startDate && startDate < 1)
      errors.startDate = "Yêu cầu nhập";
    return errors;
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
    const nameS = event.target.nameS.value;
    this.setState({
      nameF: nameS
    });
  }

  render() {
    const errors = this.validate(
      this.state.name,
      this.state.salaryScale,
      this.state.doB,
      this.state.startDate,
      this.state.annualLeave,
      this.state.overTime
    );
    const listNhanvien = this.props.staffs
      .filter((val) => {
        if (this.state.nameF === "") {
          return val;
        } else if (
          val.name.toLowerCase().includes(this.state.nameF.toLocaleLowerCase())
        ) {
          return val;
        } else {
          return null;
        }
      })
      .map((nv) => {
        return (
          <div key={nv.id} className="col-6 col-md-4 col-lg-2 mb-1 mt-1">
            <Card>
              <Link to={`/staff/${nv.id}`}>
                <CardImg
                  className="mx-auto img-thumbnail"
                  src={nv.image}
                  alt={nv.name}
                />
                <CardText style={{ color: "black", textAlign: "center" }}>
                  {nv.name}
                </CardText>
              </Link>
            </Card>
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
            <form onSubmit={this.timNhanvien} className='form-group row'>
              <div className="col-8 col-md-8">
                <input
                  type='text'
                  name='nameS'
                  className="form-control"
                  placeholder="Tìm kiếm nhân viên..."
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
        <div className="dataResult container m-1">
          <div className="row">{listNhanvien}</div>
        </div>
        <Modal isOpen={this.state.modalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Thêm nhân viên</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleSubmit}>
              <Row className='control-group'>
                <Label htmlFor='name' md={4}>
                  Tên
                </Label>
                <Col md={8}>
                  <Input
                    type='text'
                    className='form-control'
                    id='name'
                    name='name'
                    value={this.state.name}
                    valid={errors.name === ""}
                    invalid={errors.name !== ""}
                    onBlur={() => this.handleBlur('name')}
                    onChange={this.handleInputChange}
                  />
                  <FormFeedback>{errors.name}</FormFeedback>
                </Col>
              </Row>
              <Row className='control-group'>
                <Label htmlFor='doB' md={4}>
                  Ngày sinh
                </Label>
                <Col md={8}>
                  <Input
                    type='date'
                    className='form-control'
                    id='doB'
                    name='doB'
                    value={this.state.doB}
                    valid={errors.doB === ""}
                    invalid={errors.doB !== ""}
                    onBlur={() => this.handleBlur('doB')}
                    onChange={this.handleInputChange}
                  />
                  <FormFeedback>{errors.doB}</FormFeedback>
                </Col>
              </Row>
              <Row className='control-group'>
                <Label htmlFor='startDate' md={4}>
                  Ngày vào công ty
                </Label>
                <Col md={8}>
                  <Input
                    type='date'
                    className='form-control'
                    id='startDate'
                    name='startDate'
                    value={this.state.startDate}
                    valid={errors.startDate === ""}
                    invalid={errors.startDate !== ""}
                    onBlur={() => this.handleBlur('startDate')}
                    onChange={this.handleInputChange}
                  />
                  <FormFeedback>{errors.startDate}</FormFeedback>
                </Col>
              </Row>
              <Row className='control-group'>
                <Label htmlFor='department' md={4}>
                  Phòng ban
                </Label>
                <Col md={8}>
                  <Input
                    type='select'
                    id='department'
                    name='department'
                    value={this.state.department.name}
                    onChange={this.handleInputChange}
                  >
                    <option>Sale</option>
                    <option>HR</option>
                    <option>Marketing</option>
                    <option>IT</option>
                    <option>Finance</option>
                  </Input>
                  <FormFeedback>{errors.department}</FormFeedback>
                </Col>
              </Row>
              <Row className='control-group'>
                <Label htmlFor='salaryScale' md={4}>
                  Hệ số lương
                </Label>
                <Col md={8}>
                  <Input
                    type='number'
                    className='form-control'
                    id='salaryScale'
                    name='salaryScale'
                    placeholder='1->3'
                    value={this.state.salaryScale}
                    valid={errors.salaryScale === ""}
                    invalid={errors.salaryScale !== ""}
                    onBlur={() => this.handleBlur('salaryScale')}
                    onChange={this.handleInputChange}
                  />
                  <FormFeedback>{errors.salaryScale}</FormFeedback>
                </Col>
              </Row>
              <Row className='control-group'>
                <Label htmlFor='annualLeave' md={4}>
                  Số ngày nghỉ còn lại
                </Label>
                <Col md={8}>
                  <Input
                    type='text'
                    className='form-control'
                    id='anualLeave'
                    name='annualLeave'
                    value={this.state.annualLeave}
                    valid={errors.annualLeave === ""}
                    invalid={errors.annualLeave !== ""}
                    onBlur={() => this.handleBlur('annualLeave')}
                    onChange={this.handleInputChange}
                  />
                  <FormFeedback>{errors.annualLeave}</FormFeedback>
                </Col>
              </Row>
              <Row className='control-group'>
                <Label htmlFor='overTime' md={4}>
                  Số ngày đã làm thêm
                </Label>
                <Col md={8}>
                  <Input
                    type='text'
                    className='form-control'
                    id='overTime'
                    name='overTime'
                    value={this.state.overTime}
                    valid={errors.overTime === ""}
                    invalid={errors.overTime !== ""}
                    onBlur={() => this.handleBlur('overTime')}
                    onChange={this.handleInputChange}
                  />
                  <FormFeedback>{errors.overTime}</FormFeedback>
                </Col>
              </Row>
              <div className="form-group row">
                <div className="col-12  text-center">
                  <Button type="submit" color="primary"
                    onClick={this.handleSubmit}
                  >Thêm nhân viên</Button>
                </div>
              </div>
            </Form>
          </ModalBody>
        </Modal >
      </div >
    );
  }

}

export default StaffList;
