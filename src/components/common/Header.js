import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { Link, IndexLink } from 'react-router';
import MD5 from 'crypto-js/md5';
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from 'reactstrap';


class Header extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            dropdownOpen: false
        };
        this.toggle = this.toggle.bind(this);
    }
    toggle() {
        this.setState({dropdownOpen: !this.state.dropdownOpen});
    }
    render() {
        let brand;
        if(this.props.project == null) {
            brand = <a className="navbar-brand mb-1" href="#" title="">MNGR</a>;
        } else {
            brand = <a className="navbar-brand mb-1" href="#" title="">{this.props.project.name}</a>
        }

        let gravatar;
        if(this.props.currentUser.email != null) {
            gravatar = "https://www.gravatar.com/avatar/" + MD5(this.props.currentUser.email.trim().toLowerCase()) + "&s=50";
        }
        let firstname = (this.props.currentUser.firstName != null)? this.props.currentUser.firstName: '';
        let lastname = (this.props.currentUser.lastName != null)? this.props.currentUser.lastName: '';
        return (
            <nav className="navbar navbar-fixed-top navbar-toggleable-sm navbar-inverse bg-primary">
                <div className="flex-row d-flex">
                    {brand}
                </div>
                <ul className="navbar-nav nav-buttons-margin">
                    <li className="nav-item">
                        <IndexLink className="nav-link" to="/dashboard" activeClassName="active">Dashboard</IndexLink>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/projects" activeClassName="active">Projects</Link>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto">
                    <li className="navbar-text">
                        <span className="" onClick={this.toggle}>
                            <img src={gravatar} className="rounded-circle mr-3" width="35"/>
                            {firstname} {lastname}
                        </span>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link mt-1 ml-4" to="/logout">
                            Logout <i className="fa fa-sign-out" />
                        </Link>

                    </li>
                </ul>
            </nav>
        );
    }
}

Header.propTypes = {
    currentUser: PropTypes.object.isRequired
};

let mapStateToProps = function(state) {
    return {
        currentUser: (state.currentUser == null)? {} : state.currentUser,
        project: state.selectedProject
    };
};

export default connect(mapStateToProps)(Header);