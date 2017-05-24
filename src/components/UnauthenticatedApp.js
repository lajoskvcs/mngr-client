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
        if (this.props.currentUser != null) {
            browserHistory.push("/dashboard");
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
    children: PropTypes.object.isRequired,
    currentUser: PropTypes.object.isRequired,
    tokens: PropTypes.object.isRequired
};

let mapStateToProps = function(state) {
    return {
        currentUser: state.currentUser,
        redirectUrl: state.redirectUrl
    };
};


export default connect(mapStateToProps)(UnauthenticatedApp);