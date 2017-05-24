import React from "react";
import { browserHistory } from 'react-router';
import {connect} from 'react-redux';
import {loadCurrentUser} from '../../actions/currentUserActions';
import Loader from '../common/Loader';

class UserGetter extends React.Component {
    constructor(props, context) {
        super(props, context);
        /*if(this.props.isLoggedIn) {
            browserHistory.push('/dashboard');
        }*/
        this.getCurrentUser = this.getCurrentUser.bind(this);
    }

    componentDidMount() {
        console.log(this.props);
    }

    getCurrentUser() {
        this.props.loadCurrentUser(this.props.access_token);
        browserHistory.push("/dashboard");
    }


    render() {

        if(this.props.access_token != null) {
            this.getCurrentUser();
        }

        return (
            <div className="row justify-content-center m-0 p-0 pt-5">
                <Loader />
            </div>
        );
    }

}

let mapStateToProps = function(state) {
    return {
        access_token: state.tokens.access_token,
        currentUser: state.currentUser
    }
};

let mapDispatchToProps = function (dispatch) {
    return({
        loadCurrentUser: (access_token) => {
            dispatch(loadCurrentUser(access_token));
        }
    })
};
export default connect(mapStateToProps, mapDispatchToProps)(UserGetter);