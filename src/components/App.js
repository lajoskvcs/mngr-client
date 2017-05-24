import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import Header from './common/Header';

class App extends React.Component {
    componentDidUpdate(prevProps) {

    }

    render() {
        return (
            <div className="container-fluid p-0">
                {this.props.children}
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.object.isRequired
};

let mapStateToProps = function(state) {
    return {};
};

export default connect(mapStateToProps)(App);