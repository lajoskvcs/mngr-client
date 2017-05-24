import { React } from "react";
import { browserHistory } from "react-router";
import { connect } from "react-redux";

class EnsureLoggedInContainer extends React.Component {
    componentDidMount() {
        const { dispatch, currentURL } = this.props;

        if (!isLoggedIn) {
            // set the current url/path for future redirection (we use a Redux action)
            // then redirect (we use a React Router method)
            dispatch(setRedirectUrl(currentURL));
            browserHistory.replace("/login");
        }
    }

    render() {
        if (isLoggedIn) {
            return this.props.children;
        } else {
            return null;
        }
    }
}


function mapStateToProps(state, ownProps) {
    return {
        isLoggedIn: state.loggedIn,
        currentURL: ownProps.location.pathname
    }
}


export default connect(mapStateToProps)(EnsureLoggedInContainer);