import React, {PropTypes} from "react";
import {Card, CardBlock, CardSubtitle, CardLink, CardText, CardTitle, Row, Col} from 'reactstrap';
import { browserHistory } from 'react-router';
import {connect} from 'react-redux';
import {loadProject, loadNotes, loadTasks} from '../../actions/projectActions';
import SideBar from '../common/Sidebar';
import Loader from '../common/Loader';
import MD5 from 'crypto-js/md5';
import moment from 'moment';

class Project extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.props.loadProject(this.props.access_token, this.props.params.projectId);
        this.props.loadTasks(this.props.access_token, this.props.params.projectId);
        this.props.loadNotes(this.props.access_token, this.props.params.projectId);

    }

    redirectTo(e) {
        browserHistory.push(e.target.getAttribute("to"));

    }

    render() {
        let project;
        if(this.props.project == null) {
            project = (
                <div className="col mt-4 mr-4">
                    <Loader />
                </div>
            );
        } else {
            let contributors = this.props.project.users.map(user => {
                return(
                    <li className="list-group-item"><img src={"https://www.gravatar.com/avatar/" + MD5(user.email.trim().toLowerCase()) + "&s=50"} className="rounded-circle mr-3" width="35"/> {user.firstName}&nbsp;{user.lastName}</li>
                );
            });
            project = (
            <div className="col mt-4 mr-4">
                <div className="row mb-5">
                    <div className="col">
                        <div className="card">
                            <div className="card-header">
                                Project description
                            </div>
                            <div className="card-block">
                                {this.props.project.description}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="card">
                            <div className="card-header">
                                Project status
                            </div>
                            <div className="card-block">
                                <div className="progress">
                                    <div className="progress-bar" role="progressbar" style={{width:this.props.project.projectStatus+'%'}} aria-valuenow={this.props.project.projectStatus} aria-valuemin="0" aria-valuemax="100">{this.props.project.projectStatus}%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card">
                            <div className="card-header">
                                Project contributors
                            </div>
                            <div className="card-block">
                                <ul className="list-group">
                                    {contributors}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            );
        }
        return (
            <div className="row height-100-percent" style={{width: '100%'}}>
                <div className="col-2 height-100-percent">
                    <SideBar />
                </div>
                {project}
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