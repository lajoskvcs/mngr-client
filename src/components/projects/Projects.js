import React, {PropTypes} from "react";
import {
    Card,
    CardBlock,
    CardSubtitle,
    CardLink,
    CardText,
    CardTitle,
    Row,
    Col,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Form,
    FormGroup,
    InputGroupAddon,
    Input,
    InputGroup,
    Label
} from 'reactstrap';
import { browserHistory } from 'react-router';
import {connect} from 'react-redux';
import {loadProjects, selectProject, unloadProject, addProject} from '../../actions/projectActions';
import Loader from '../common/Loader';
import moment from 'moment';
import * as DatePicker from 'react-datepicker';

class Projects extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.props.unloadProject();

        this.props.loadProjects(this.props.access_token);

        this.selectProject = this.selectProject.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.addNewProject = this.addNewProject.bind(this);
        this.resetModal = this.resetModal.bind(this);
        this.handleDueDateChange = this.handleDueDateChange.bind(this);
        this.handleProjectDescriptionChange = this.handleProjectDescriptionChange.bind(this);
        this.handleProjectNameChange = this.handleProjectNameChange.bind(this);

        this.state = {
                isOpen: false,
                project: {
                    name: "",
                    description: "",
                    dueDate: ""
                }

        };

    }

    addNewProject(e) {
        e.preventDefault();
        let date = this.state.project.dueDate.split('-');
        let project = {
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

        this.props.addProject(this.props.access_token, project);
        this.resetModal();

    }
    toggleModal() {
        this.setState({isOpen: !this.state.isOpen});
    }
    resetModal() {
        this.setState({
                isOpen: false,
                project: {
                    name: "",
                    description: "",
                    dueDate: moment.now()
                }
        });
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

    redirectTo(e) {
        browserHistory.push(e.target.getAttribute("to"));

    }
    selectProject(id) {
        browserHistory.push("/projects/"+id);

    }
    render() {
        let projects;
        if(this.props.projects.length === 0) {
            projects = <Loader />;
        } else {
            projects = this.props.projects.map((project) => {
                let globalProject = project;
                return (
                    <Col xs="3" className="mb-4">
                        <Card className="clickable" onClick={() => this.selectProject(globalProject.id)}>
                            <CardBlock>
                            <CardTitle>{project.name}</CardTitle>
                            <CardSubtitle>Due date: {moment(project.dueDate).format("YYYY-MM-DD")}</CardSubtitle>
                            </CardBlock>
                            <CardBlock>
                            <CardText>{project.description}</CardText>
                            </CardBlock>
                        </Card>
                    </Col>
                );
            });
        }
        return (
            <div className="row m-3">
                    {projects}
                <div className="col-3">
                    <div className="card clickable" onClick={this.toggleModal}>
                        <div className="card-block" style={{display: 'flex', justifyContent: 'center'}}>
                            <h4 className="card-title">Add new project</h4>
                        </div>
                        <div className="card-block" style={{display: 'flex', justifyContent: 'center'}}>
                            <i className="fa fa-plus" style={{'font-size':'2.2em'}} />
                        </div>
                    </div>
                </div>
                    <Modal isOpen={this.state.isOpen} toggle={this.toggleModal} backdrop="false">
                        <ModalHeader toggle={this.resetModal}>Add new Project</ModalHeader>
                        <ModalBody>
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
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={this.resetModal}>Cancel</Button>
                            <Button onClick={this.addNewProject}>Create</Button>
                        </ModalFooter>
                    </Modal>
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
        projects: state.projects,
        currentUser: state.currentUser
    };
};

let mapDispatchToProps = function (dispatch) {
    return({
        loadProjects: (access_token) =>  {
            dispatch(loadProjects(access_token));
        },
        selectProject: (id, projects) => {
            dispatch(selectProject(id, projects));
        },
        unloadProject: () => {
            dispatch(unloadProject());
        },
        addProject: (access_token, project) => {
            dispatch(addProject(access_token, project));
        }
    });
};
export default connect(mapStateToProps, mapDispatchToProps)(Projects);