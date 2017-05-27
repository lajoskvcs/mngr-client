import React, {PropTypes} from "react";
import {Card, CardText, CardTitle, Row, Col} from 'reactstrap';
import { browserHistory } from 'react-router';
import {connect} from 'react-redux';
import {loadDashboard} from '../../actions/dashboardActions';
import LoaderSmall from '../common/LoaderSmall';

class Dashboard extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.props.loadDashboard(this.props.access_token);
    }

    redirectTo(e) {
        browserHistory.push(e.target.getAttribute("to"));

    }
    render() {
        return (
            <div className="row m-3 mt-4">
                <Col xs="3">
                    <Card block color="info">
                        <CardTitle>Count of projects</CardTitle>
                        <CardText className="h2 text-right">
                            {(this.props.dashboard.projectNumber != null)? this.props.dashboard.projectNumber : <LoaderSmall />}
                        </CardText>
                    </Card>
                    
                </Col>
                <Col xs="3">
                    <Card block color="warning">
                        <CardTitle>In plan tasks</CardTitle>
                        <CardText className="h2 text-right">
                            {(this.props.dashboard.inPlanTaskNumber != null)?this.props.dashboard.inPlanTaskNumber:<LoaderSmall />}
                        </CardText>
                    </Card>
                </Col>
                <Col xs="3">
                    <Card block color="danger">
                        <CardTitle>In progress tasks</CardTitle>
                        <CardText className="h2 text-right">
                            {(this.props.dashboard.inProgressTaskNumber != null)?this.props.dashboard.inProgressTaskNumber:<LoaderSmall />}
                        </CardText>
                    </Card>
                </Col>
                <Col xs="3">
                    <Card block color="success">
                        <CardTitle>Done tasks</CardTitle>
                        <CardText className="h2 text-right">
                            {(this.props.dashboard.doneTaskNumber != null)? this.props.dashboard.doneTaskNumber : <LoaderSmall />}
                        </CardText>
                    </Card>
                </Col>
            </div>
        );
    }

}

Dashboard.propTypes = {
    access_token: PropTypes.object.isRequired,
    loadDashboard: PropTypes.object.isRequired
};

let mapStateToProps = function(state) {
    return {
        access_token: state.tokens.access_token,
        dashboard: state.dashboard
    };
};

let mapDispatchToProps = function (dispatch) {
    return({
        loadDashboard: (access_token) => {
            dispatch(loadDashboard(access_token));
        }
    });
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);