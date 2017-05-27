import React from "react";
import {connect} from 'react-redux';
import {Form, FormGroup, Label, Input, Button, Card, CardText, CardTitle, Row, Col} from 'reactstrap';
import { browserHistory } from 'react-router';
import {registerUser} from '../../actions/registerActions';

class Register extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            username: "",
            password: "",
            firstname: "",
            lastname: "",
            email: "",
            address: "",
            borndate: "",
            company: ""
        };
        this.userChange = this.userChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
        this.emailChange = this.emailChange.bind(this);
        this.firstnameChange = this.firstnameChange.bind(this);
        this.lastnameChange = this.lastnameChange.bind(this);
        this.companyChange = this.companyChange.bind(this);
        this.addressChange = this.addressChange.bind(this);
        this.borndateChange = this.borndateChange.bind(this);
        this.register = this.register.bind(this);
    }

    redirectTo(e) {
        browserHistory.push(e.target.getAttribute("to"));
    }

    register(e) {
        e.preventDefault();
        this.props.registerUser(
            this.state.username,
            this.state.password,
            this.state.firstname,
            this.state.lastname,
            this.state.email,
            this.state.address,
            this.state.borndate,
            this.state.company
        );
    }

    userChange(e) {
        this.setState({
            username: e.target.value
        });
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
    borndateChange(e) {
        this.setState({
            borndate: e.target.value
        });
    }

    render() {
        return (
            <div>
                <Form>
                    <Card block>
                        <CardTitle>Sign up</CardTitle>
                        <CardText>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label for="username" hidden>Username</Label>
                                        <Input onChange={this.userChange} value={this.state.username} type="text" name="username" id="username" placeholder="Username" />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label for="password" hidden>Password</Label>
                                        <Input onChange={this.passwordChange} value={this.state.password} type="password" name="password" id="password" placeholder="Password" />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label for="first_name" hidden>Firstname</Label>
                                        <Input onChange={this.firstnameChange} value={this.state.firstname} type="text" name="firstname" id="first_name" placeholder="Firstname" />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label for="last_name" hidden>Lastname</Label>
                                        <Input onChange={this.lastnameChange} value={this.state.lastname} type="text" name="lastname" id="last_name" placeholder="Lastname" />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label for="email" hidden>E-mail</Label>
                                        <Input onChange={this.emailChange} value={this.state.email} type="text" name="email" id="email" placeholder="E-mail" />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label for="address" hidden>Address</Label>
                                        <Input onChange={this.addressChange} value={this.state.address} type="text" name="address" id="address" placeholder="Address" />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label for="borndate" hidden>Born date</Label>
                                        <Input onChange={this.borndateChange} value={this.state.borndate} type="text" name="borndate" id="borndate" placeholder="Born date" />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label for="company" hidden>Company</Label>
                                        <Input onChange={this.companyChange} value={this.state.company} type="text" name="company" id="company" placeholder="Company" />
                                    </FormGroup>
                                </Col>
                            </Row>
                        </CardText>
                        <Button onClick={this.register} className="mb-1">Sign up</Button>
                        <Button onClick={this.redirectTo} to="/login"><i className="fa fa-arrow-left" /> Sign in</Button>
                    </Card>
                </Form>
            </div>
        );
    }

}

let mapStateToProps = (state) => {
    return {};
};

let mapDispatchToProps = (dispatch) => {
    return({
        registerUser: (username,
        password,
        firstname,
        lastname,
        email,
        address,
        borndate,
        company) => {
            dispatch(registerUser(username,
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
export default connect(mapStateToProps, mapDispatchToProps)(Register);