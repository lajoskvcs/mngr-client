import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import {browserHistory} from 'react-router';
import Header from './common/Header';

class AuthApp extends React.Component {
    componentDidMount() {
        if (this.props.tokens.access_token == null) {
            browserHistory.push("/login");
        }
    }
    componentDidUpdate(prevProps) {
        if (this.props.currentUser == null) {
            browserHistory.push("/login");
        } 
    }

    render() {
        return (
            <div className="height-100-percent">
                <Header currentUser={this.props.currentUser} />
                <div className="container-fluid p-0 height-100-percent">
                        {this.props.children}
                </div>
            </div>
        );
    }
}

AuthApp.propTypes = {
    children: PropTypes.object.isRequired,
    tokens: PropTypes.object.isRequired,
    currentUser: PropTypes.object.isRequired
};

let mapStateToProps = function(state) {
    return {
        currentUser: state.currentUser,
        tokens: state.tokens
    };
};


export default connect(mapStateToProps)(AuthApp);