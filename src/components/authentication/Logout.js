import React, {PropTypes} from "react";
import {Form, FormGroup, Label, Input, Button, Card, CardText, CardTitle, Row, Col} from 'reactstrap';
import { browserHistory } from 'react-router';
import {connect} from 'react-redux';
import {loadTokens} from '../../actions/tokenActions';
import * as types from '../../actions/actionTypes';
import Loader from '../common/Loader';

class Logout extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.props.logout();
        browserHistory.push('/');
    }
    render() {
        return (
            <div>
                <Loader />
            </div>
        );
    }

}

Logout.propTypes = {
};

let mapStateToProps = function(state) {
    return {};
};

let mapDispatchToProps = function (dispatch) {
    return({
        logout: (username, password) => {
            dispatch({type: types.DROP_STORE});
        }
    });
};
export default connect(mapStateToProps, mapDispatchToProps)(Logout);