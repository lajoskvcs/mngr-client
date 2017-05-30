import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { Link, IndexLink } from 'react-router';
import MD5 from 'crypto-js/md5';
import {browserHistory} from 'react-router';
import {
    Button,
    Modal,
    ModalFooter,
    ModalBody,
    ModalHeader,
    Row,
    Col,
    FormGroup,
    Label,
    Input,
    InputGroup,
    InputGroupAddon,
    CardTitle,
    CardBlock,
    CardText,
    Card,
    CardImg
} from 'reactstrap';
import {updateUser} from '../../actions/registerActions';

class Header extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            username: this.props.user.username,
            password: this.props.user.password,
            firstname: this.props.user.firstName,
            lastname: this.props.user.lastName,
            email: this.props.user.email,
            address: this.props.user.address,
            company: this.props.user.company,
            editable: false,
            UserModalOpen: false
        };
        this.passwordChange = this.passwordChange.bind(this);
        this.emailChange = this.emailChange.bind(this);
        this.firstnameChange = this.firstnameChange.bind(this);
        this.lastnameChange = this.lastnameChange.bind(this);
        this.companyChange = this.companyChange.bind(this);
        this.addressChange = this.addressChange.bind(this);
        this.save = this.save.bind(this);
        this.toggleEditable = this.toggleEditable.bind(this);
        this.user = this.user.bind(this);
    }
    user() {
        //browserHistory.push("/user");
        this.setState({UserModalOpen: !this.state.UserModalOpen});
    }
    toggleEditable() {
        this.setState({editable: !this.state.editable});
    }

    save(e) {
        e.preventDefault();
        this.props.updateUser(
            this.props.access_token,
            this.props.user.id,
            this.props.user.username,
            this.state.password,
            this.state.firstname,
            this.state.lastname,
            this.state.email,
            this.state.address,
            this.props.user.borndate,
            this.state.company
        );
        this.user();
        this.toggleEditable();
    }

    passwordChange(e) {
        this.setState({
            password: e.target.value
        });
    }
    emailChange(e) {
        this.setState({
            email: e.target.value
        });
    }
    firstnameChange(e) {
        this.setState({
            firstname: e.target.value
        });
    }
    lastnameChange(e) {
        this.setState({
            lastname: e.target.value
        });
    }
    companyChange(e) {
        this.setState({
            company: e.target.value
        });
    }
    addressChange(e) {
        this.setState({
            address: e.target.value
        });
    }

    render() {
        let brand;
        if(this.props.project == null) {
            brand = <a className="navbar-brand mb-1" href="#" title="">MNGR</a>;
        } else {
            brand = <a className="navbar-brand mb-1" href="#" title="">{this.props.project.name}</a>
        }

        let gravatar;
        if(this.props.user.email != null) {
            gravatar = "https://www.gravatar.com/avatar/" + MD5(this.props.user.email.trim().toLowerCase()) + "&s=50";
        }
        let firstname = (this.props.user.firstName != null)? this.props.user.firstName: '';
        let lastname = (this.props.user.lastName != null)? this.props.user.lastName: '';

        let modal_body;
        let modal_footer;

        if(this.state.editable) {
            modal_footer = (
                <ModalFooter>
                    <Button onClick={this.toggleEditable} className="mb-1">Cancel</Button>
                    <Button onClick={this.save} className="mb-1">Save</Button>
                </ModalFooter>
            );
            modal_body = (
                <ModalBody>

                    <Row>
                        <Col>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupAddon>First name</InputGroupAddon>
                                    <Label for="first_name" hidden>Firstname</Label>
                                    <Input onChange={this.firstnameChange} value={this.state.firstname} type="text" name="firstname" id="first_name" placeholder="Firstname" />
                                </InputGroup>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupAddon>Last name</InputGroupAddon>
                                    <Label for="last_name" hidden>Lastname</Label>
                                    <Input onChange={this.lastnameChange} value={this.state.lastname} type="text" name="lastname" id="last_name" placeholder="Lastname" />
                                </InputGroup>
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupAddon>Password</InputGroupAddon>
                                    <Label for="password" hidden>Password</Label>
                                    <Input onChange={this.passwordChange} value={this.state.password} type="password" name="password" id="password" placeholder="Password" />
                                </InputGroup>
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupAddon>Email address</InputGroupAddon>
                                    <Label for="email" hidden>E-mail</Label>
                                    <Input onChange={this.emailChange} value={this.state.email} type="text" name="email" id="email" placeholder="E-mail" />
                                </InputGroup>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupAddon>Address</InputGroupAddon>
                                    <Label for="address" hidden>Address</Label>
                                    <Input onChange={this.addressChange} value={this.state.address} type="text" name="address" id="address" placeholder="Address" />
                                </InputGroup>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupAddon>Company</InputGroupAddon>
                                    <Label for="company" hidden>Company</Label>
                                    <Input onChange={this.companyChange} value={this.state.company} type="text" name="company" id="company" placeholder="Company" />
                                </InputGroup>
                            </FormGroup>
                        </Col>
                    </Row>
                </ModalBody>
            );
        } else {
            modal_body = (
                <ModalBody>
                    <Card>
                        <CardImg top width="100%" src={"https://www.gravatar.com/avatar/" + MD5(this.props.user.email.trim().toLowerCase()) + "&s=320"} alt="Card image cap" />
                        <CardBlock>
                            <CardTitle>{this.state.firstname} {this.state.lastname}</CardTitle>
                            <CardText>
                                <i className="fa fa-envelope-o"></i> {this.state.email}
                            </CardText>
                            <CardText>
                                <i className="fa fa-address-card-o"></i> {this.state.address}
                            </CardText>
                            <CardText>
                                <i className="fa fa-building-o"></i> {this.state.company}
                            </CardText>
                        </CardBlock>
                    </Card>
                </ModalBody>
            );
            modal_footer = (
                <ModalFooter>
                    <Button onClick={this.toggleEditable} className="mb-1">Edit</Button>
                </ModalFooter>
            );
        }


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
                        <a className="clickable" onClick={this.user}>
                            <img src={gravatar} className="rounded-circle mr-3" width="35"/>
                            {firstname} {lastname}
                        </a>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link mt-1 ml-4" to="/logout">
                            Logout <i className="fa fa-sign-out" />
                        </Link>

                    </li>
                </ul>
                <Modal isOpen={this.state.UserModalOpen} toggle={this.user} backdrop="false">
                    <ModalHeader toggle={this.user}>Edit user</ModalHeader>
                    {modal_body}
                    {modal_footer}
                </Modal>
            </nav>
        );
    }
}

Header.propTypes = {
    user: PropTypes.object.isRequired
};

let mapStateToProps = function(state) {
    return {
        user: (state.currentUser == null)? {} : state.currentUser,
        access_token: state.tokens.access_token,
        project: state.selectedProject
    };
};
let mapDispatchToProps = (dispatch) => {
    return({
        updateUser: (
            access_token,
            id,
            username,
            password,
            firstname,
            lastname,
            email,
            address,
            borndate,
            company
        ) => {
            dispatch(updateUser(
                access_token,
                id,
                username,
                password,
                firstname,
                lastname,
                email,
                address,
                borndate,
                company));
        }
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);