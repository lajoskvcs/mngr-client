import React from "react";
import {Form, FormGroup, Label, Input, Button, Card, CardText, CardTitle, Row, Col} from 'reactstrap';
import { browserHistory } from 'react-router';

class Register extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    redirectTo(e) {
        browserHistory.push(e.target.getAttribute("to"));

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
                                        <Input type="text" name="username" id="username" placeholder="Username" />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label for="password" hidden>Password</Label>
                                        <Input type="password" name="password" id="password" placeholder="Password" />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label for="first_name" hidden>Firstname</Label>
                                        <Input type="text" name="first_name" id="first_name" placeholder="Firstname" />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label for="last_name" hidden>Lastname</Label>
                                        <Input type="text" name="last_name" id="last_name" placeholder="Lastname" />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label for="email" hidden>E-mail</Label>
                                        <Input type="text" name="email" id="email" placeholder="E-mail" />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label for="address" hidden>Address</Label>
                                        <Input type="text" name="address" id="address" placeholder="Address" />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label for="born_date" hidden>Born date</Label>
                                        <Input type="text" name="born_date" id="born_date" placeholder="Born date" />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label for="company" hidden>Company</Label>
                                        <Input type="text" name="company" id="company" placeholder="Company" />
                                    </FormGroup>
                                </Col>
                            </Row>
                        </CardText>
                        <Button>Sign up</Button>
                        <Button onClick={this.redirectTo} to="/login">Sign in</Button>
                    </Card>
                </Form>
            </div>
        );
    }

}

export default Register;