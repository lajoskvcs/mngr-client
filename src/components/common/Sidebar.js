import React, {PropTypes} from 'react';
import { Link, IndexLink } from 'react-router';
import {Nav, NavItem, NavLink} from 'reactstrap';

const SideBar = () => {
    return (
        <div className="card rounded-0 col-md-3 col-lg-2 sidebar-offcanvas" id="sidebar" role="navigation">
            <Nav className="pl-0 flex-column">
                <NavItem>
                    <NavLink href="#">Overview</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="#">Task board</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="#">Notes</NavLink>
                </NavItem>
            </Nav>
        </div>
    );
};

export default SideBar;