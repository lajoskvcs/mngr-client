import React from "react";
import {connect} from 'react-redux';
import {Form, FormGroup, Label, Input, Button, Card, CardText, CardTitle, Row, Col} from 'reactstrap';
import { browserHistory } from 'react-router';
import {updateUser} from '../../actions/registerActions';

class UserForm extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            username: this.props.user.username,
            password: this.props.user.password,
            firstname: this.props.user.firstName,
            lastname: this.props.user.lastName,
            email: this.props.user.email,
            address: this.props.user.address,
            company: this.props.user.company
        };
        this.passwordChange = this.passwordChange.bind(this);
        this.emailChange = this.emailChange.bind(this);
        this.firstnameChange = this.firstnameChange.bind(this);
        this.lastnameChange = this.lastnameChange.bind(this);
        this.companyChange = this.companyChange.bind(this);
        this.addressChange = this.addressChange.bind(this);
        this.save = this.save.bind(this);
    }

    redirectTo(e) {
        browserHistory.push(e.target.getAttribute("to"));
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
        return (
            <div>
                <Form>
                    <Card block>
                        <CardTitle>Edit you profile</CardTitle>
                        <CardText>
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
                                        <Label for="company" hidden>Company</Label>
                                        <Input onChange={this.companyChange} value={this.state.company} type="text" name="company" id="company" placeholder="Company" />
                                    </FormGroup>
                                </Col>
                            </Row>
                        </CardText>
                        <Button onClick={this.save} className="mb-1">Save</Button>
                    </Card>
                </Form>
            </div>
        );
    }

}

let mapStateToProps = (state) => {
    return {
        user: state.currentUser,
        access_token: state.tokens.access_token
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
export default connect(mapStateToProps, mapDispatchToProps)(UserForm);