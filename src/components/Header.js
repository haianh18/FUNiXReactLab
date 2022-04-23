import React from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, NavItem, Collapse } from 'reactstrap';
import { NavLink } from 'react-router-dom';

function Header() {
    return (
        <div>
            <Navbar dark expand='md' color='primary'>
                <div className='container'>
                <NavbarToggler/>
                <NavbarBrand className='mr-auto' href='/'>
                    <img src='assets/images/logo.png' width='40' alt='Quan Ly Nhan Vien'/>
                </NavbarBrand>
                <Collapse navbar>
                <Nav navbar>
                    <NavItem>
                       <NavLink className='nav-link' to='/staff'><span className='fa fa-users fa-lg'></span>Nhân viên</NavLink>
                    </NavItem>
                    <NavItem>
                       <NavLink className='nav-link' to='/department'><span className='fa fa-id-card-o fa-lg'></span>Phòng ban</NavLink>
                    </NavItem>
                    <NavItem>
                       <NavLink className='nav-link' to='/salary'><span className='fa fa-money fa-lg'></span>Bảng lương</NavLink>
                    </NavItem>
                </Nav>
                </Collapse>
                </div>
            </Navbar>
        </div>
    )
}
export default Header;