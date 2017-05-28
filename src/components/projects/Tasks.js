import React, {PropTypes} from "react";
import { browserHistory } from 'react-router';
import {connect} from 'react-redux';
import SideBar from '../common/Sidebar';
import {patchNote} from '../../actions/projectActions';


class Tasks extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    redirectTo(e) {
        browserHistory.push(e.target.getAttribute("to"));

    }

    render() {
            let inPlan = this.props.inPlan.map( task => {
                return (
                    <p>{task.name}</p>
                );
            });
        let inProgress = this.props.inProgress.map( task => {
            return (
                <p>{task.name}</p>
            );
        });
        let done = this.props.done.map( task => {
            return (
                <p>{task.name}</p>
            );
        });

        return (
            <div className="row height-100-percent">
                <div className="col-2 height-100-percent">
                    <SideBar />
                </div>
                <div className="col mt-4 mr-4">
                    <div className="row">
                        <div className="col">
                            {inPlan}
                        </div>
                        <div className="col">
                            {inProgress}
                        </div>
                        <div className="col">
                            {done}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

Tasks.propTypes = {
    access_token: PropTypes.object.isRequired
};

let mapStateToProps = function(state) {
    return {
        access_token: state.tokens.access_token,
        project : state.selectedProject,
        inPlan: state.tasks.filter(task => task.state == 0),
        inProgress: state.tasks.filter(task => task.state == 1),
        done: state.tasks.filter(task => task.state == 2),
    };
};

let mapDispatchToProps = function (dispatch) {
    return({
    });
};
export default connect(mapStateToProps, mapDispatchToProps)(Tasks);