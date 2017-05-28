import React, {PropTypes} from "react";
import {Card, CardBlock, CardSubtitle, CardLink, CardText, CardTitle, Row, Col} from 'reactstrap';
import { browserHistory } from 'react-router';
import {connect} from 'react-redux';
import {loadProject, loadNotes, loadTasks} from '../../actions/projectActions';
import SideBar from '../common/Sidebar';
import Loader from '../common/Loader';
import moment from 'moment';

class Project extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.props.loadTasks(this.props.access_token, this.props.params.projectId);
        this.props.loadProject(this.props.access_token, this.props.params.projectId);
        this.props.loadNotes(this.props.access_token, this.props.params.projectId);

    }

    redirectTo(e) {
        browserHistory.push(e.target.getAttribute("to"));

    }

    render() {
        let project;
        if(this.props.project == null) {
            project = <Loader />;
        } else {
            project = (
                <div className="row">
                    <div className="col">
                        <div className="card">
                            <div className="card-block">
                                {this.props.project.description}
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card">
                            <div className="card-block">
                                {this.props.project.description}
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card">
                            <div className="card-block">
                                {this.props.project.description}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <div className="row height-100-percent">
                <div className="col-2 height-100-percent">
                    <SideBar />
                </div>
                <div className="col mt-4 mr-4">
                    {project}
                </div>
            </div>
        );
    }

}

Project.propTypes = {
    access_token: PropTypes.object.isRequired
};

let mapStateToProps = function(state) {
    return {
        access_token: state.tokens.access_token,
        project : state.selectedProject
    };
};

let mapDispatchToProps = function (dispatch) {
    return({
        loadProject: (access_token, id) =>  {
            dispatch(loadProject(access_token, id));
        },
        loadNotes: (access_token, id) =>  {
            dispatch(loadNotes(access_token, id));
        },
        loadTasks: (access_token, id) => {
            dispatch(loadTasks(access_token, id));
        }
    });
};
export default connect(mapStateToProps, mapDispatchToProps)(Project);