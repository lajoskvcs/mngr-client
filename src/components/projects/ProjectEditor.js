import React, {PropTypes} from "react";
import {
    Button,
    Form,
    FormGroup,
    Input,
    Label,
    Row,
    Col,
    Card,
    CardBlock,
    CardFooter
} from 'reactstrap';
import { browserHistory } from 'react-router';
import {connect} from 'react-redux';
import {updateProject, deleteProject} from '../../actions/projectActions';
import moment from 'moment';
import SideBar from '../common/Sidebar';

class ProjectEditor extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.updateProject = this.updateProject.bind(this);
        this.deleteProject = this.deleteProject.bind(this);
        this.handleDueDateChange = this.handleDueDateChange.bind(this);
        this.handleProjectDescriptionChange = this.handleProjectDescriptionChange.bind(this);
        this.handleProjectNameChange = this.handleProjectNameChange.bind(this);

        this.state = {
            project: {
                name: this.props.project.name,
                description: this.props.project.description,
                dueDate: moment(this.props.project.dueDate).format("YYYY-MM-DD")
            }

        };
    }

    deleteProject(e) {
        this.props.deleteProject(this.props.access_token, this.props.project.id);
        browserHistory.push("/projects");
    }

    updateProject(e) {
        e.preventDefault();
        let date = this.state.project.dueDate.split('-');
        let project = {
            id: this.props.project.id,
            name: this.state.project.name,
            description: this.state.project.description,
            dueDate: [
                parseInt(date[0]),
                parseInt(date[1]),
                parseInt(date[2])
            ],
            users: [
                this.props.currentUser
            ]
        };

        this.props.updateProject(this.props.access_token, project);
    }

    handleDueDateChange(e) {
        this.setState({
            project: {
                dueDate: e.target.value,
                name: this.state.project.name,
                description: this.state.project.description
            }
        });
    }

    handleProjectNameChange(e) {
        this.setState({
            project: {
                dueDate: this.state.project.dueDate,
                name: e.target.value,
                description: this.state.project.description
            }
        });
    }

    handleProjectDescriptionChange(e) {
        this.setState({
            project: {
                dueDate: this.state.project.dueDate,
                name: this.state.project.name,
                description: e.target.value
            }
        });
    }

    render() {
        return (
        <div className="row height-100-percent" style={{width: '100%'}}>
            <div className="col-2 height-100-percent">
                <SideBar />
            </div>
            <div className="col">
                <div className="row m-3 justify-content-center">
                    <Col xs="5" >
                        <Card>
                            <CardBlock>
                                <Form>
                                    <FormGroup>
                                        <Label>Name</Label>
                                        <Input value={this.state.project.name} onChange={this.handleProjectNameChange} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Description</Label>
                                        <Input type="textarea" value={this.state.project.description} onChange={this.handleProjectDescriptionChange} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Due date</Label>
                                        <Input type="date" value={this.state.project.dueDate} onChange={this.handleDueDateChange} />
                                    </FormGroup>
                                </Form>
                            </CardBlock>
                            <CardFooter>
                                <Button onClick={this.updateProject} color="primary">Save</Button>
                                <Button onClick={this.deleteProject} color="danger" className="pull-right">Delete Project</Button>
                            </CardFooter>
                        </Card>
                    </Col>
                </div>
            </div>
        </div>
        );
    }

}

ProjectEditor.propTypes = {
    access_token: PropTypes.object.isRequired,
    loadDashboard: PropTypes.object.isRequired
};

let mapStateToProps = function(state) {
    return {
        access_token: state.tokens.access_token,
        project: state.selectedProject,
        currentUser: state.currentUser
    };
};

let mapDispatchToProps = function (dispatch) {
    return({
        deleteProject: (access_token, id) => {
            dispatch(deleteProject(access_token, id));
        },
        updateProject: (access_token, project) => {
            dispatch(updateProject(access_token, project));
        }
    });
};
export default connect(mapStateToProps, mapDispatchToProps)(ProjectEditor);