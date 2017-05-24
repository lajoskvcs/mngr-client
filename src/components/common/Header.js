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
        let gravatar;
        if(this.props.currentUser.email) {
            gravatar = "https://www.gravatar.com/avatar/" + MD5(this.props.currentUser.email.trim().toLowerCase()) + "&s=50";
        }
        return (
            <nav className="navbar navbar-fixed-top navbar-toggleable-sm navbar-inverse bg-primary">
                <div className="flex-row d-flex">
                    <a className="navbar-brand mb-1" href="#" title="Free Bootstrap 4 Admin Template">MNGR</a>
                </div>
                <ul className="navbar-nav nav-buttons-margin">
                    <li className="nav-item active">
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
                            {this.props.currentUser.firstName} {this.props.currentUser.lastName}
                        </span>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link mt-1 ml-4" to="/logout">
                            Kijelentkezés <i className="fa fa-sign-out" />
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
        currentUser: (state.currentUser == null)? {} : state.currentUser
    };
};

export default connect(mapStateToProps)(Header);