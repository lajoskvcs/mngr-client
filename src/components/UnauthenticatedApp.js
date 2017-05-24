import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import Header from './common/Header';
import './common/Sidebar';
import {browserHistory} from 'react-router';

class UnauthenticatedApp extends React.Component {
    componentDidMount() {
        if (this.props.currentUser != null) {
            browserHistory.push("/dashboard");
        }
    }
    componentDidUpdate(prevProps) {
        const { dispatch, redirectUrl } = this.props;
        const isLoggingOut = prevProps.isLoggedIn && !this.props.isLoggedIn;
        const isLoggingIn = !prevProps.isLoggedIn && this.props.isLoggedIn;

        if (this.props.currentUser != null) {
            browserHistory.push("/dashboard");
        } else if (isLoggingOut) {
            // do any kind of cleanup or post-logout redirection here
        }
    }

    render() {
        return (
            <div className="row justify-content-center">
                <div className="col-3 mt-4">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

UnauthenticatedApp.propTypes = {
    children: PropTypes.object.isRequired
};

let mapStateToProps = function(state) {
    return {
        currentUser: state.currentUser,
        redirectUrl: state.redirectUrl
    }
};


export default connect(mapStateToProps)(UnauthenticatedApp);