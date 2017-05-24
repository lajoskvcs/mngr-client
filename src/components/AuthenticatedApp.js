import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import {browserHistory} from 'react-router';
import Header from './common/Header';
import SideBar from './common/Sidebar';

class AuthApp extends React.Component {
    componentDidMount() {
        if (this.props.tokens.access_token == null) {
            browserHistory.push("/login");
        }
    }
    componentDidUpdate(prevProps) {
        if (this.props.currentUser == null) {
            browserHistory.push("/login");
        } else if (isLoggingOut) {
            // do any kind of cleanup or post-logout redirection here
        }
    }

    render() {
        return (
            <div>
                <Header currentUser={this.props.currentUser} />
                <div className="container-fluid p-0">
                    <div className="row row-offcanvas row-offcanvas-left">
                        <SideBar />
                        {this.props.children}
                    </div>
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