import React, {PropTypes} from "react";
import {Card, CardBlock, CardSubtitle, CardLink, CardText, CardTitle, Row, Col} from 'reactstrap';
import { browserHistory } from 'react-router';
import {connect} from 'react-redux';
import {loadProjects, selectProject} from '../../actions/projectActions';
import Loader from '../common/Loader';
import moment from 'moment';

class Projects extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.props.loadProjects(this.props.access_token);
        this.selectProject = this.selectProject.bind(this);
    }

    redirectTo(e) {
        browserHistory.push(e.target.getAttribute("to"));

    }
    selectProject(e) {
        let id = e.target.id;
        this.props.selectProject(id, this.props.projects);

    }
    render() {
        let projects;
        if(this.props.projects.length === 0) {
            projects = <Loader />;
        } else {
            projects = this.props.projects.map((project) => {
                return (
                    <Col xs="3">
                        <Card>
                            <CardBlock>
                            <CardTitle>{project.name}</CardTitle>
                            <CardSubtitle>Due date: {moment(project.dueDate).format("YYYY-MM-DD")}</CardSubtitle>
                            </CardBlock>
                            <CardBlock>
                            <CardText>{project.description}</CardText>
                            <CardLink onClick={this.selectProject} href="#" id={project.id}>Check out</CardLink>
                            </CardBlock>
                        </Card>
                    </Col>
                );
            });
        }
        return (
            <div className="row m-3">
                    {projects}
            </div>
        );
    }

}

Projects.propTypes = {
    access_token: PropTypes.object.isRequired,
    loadDashboard: PropTypes.object.isRequired
};

let mapStateToProps = function(state) {
    return {
        access_token: state.tokens.access_token,
        projects: state.projects
    };
};

let mapDispatchToProps = function (dispatch) {
    return({
        loadProjects: (access_token) =>  {
            dispatch(loadProjects(access_token));
        },
        selectProject: (id, projects) => {
            dispatch(selectProject(id, projects));
        }
    });
};
export default connect(mapStateToProps, mapDispatchToProps)(Projects);