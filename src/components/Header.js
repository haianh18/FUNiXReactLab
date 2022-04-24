import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavbarToggler,
  NavItem,
  Collapse,
} from "reactstrap";
import { NavLink } from "react-router-dom";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <div>
      <Navbar dark expand="md" color="primary">
        <div className="container">
          <NavbarToggler onClick={toggle} />
          <NavbarBrand className="mr-auto ml-2" href="/">
            <img src="assets/images/logo.png" width="40" alt="" />
          </NavbarBrand>
          <Collapse isOpen={isOpen} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink className="nav-link" to="/staff">
                  <span className="fa fa-users fa-lg"></span> Nhân viên
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/department">
                  <span className="fa fa-id-card-o fa-lg"></span> Phòng ban
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link" to="/salary">
                  <span className="fa fa-money fa-lg"></span> Bảng lương
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </div>
      </Navbar>
    </div>
  );
}
export default Header;
