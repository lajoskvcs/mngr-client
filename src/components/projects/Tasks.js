import React, {PropTypes} from "react";
import { browserHistory } from 'react-router';
import {connect} from 'react-redux';
import {Modal, ModalHeader, ModalBody, Button, ModalFooter, Input, FormGroup, Form, Label} from 'reactstrap';
import SideBar from '../common/Sidebar';
import {loadTasks, addTask} from '../../actions/projectActions';


class Tasks extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.toggleModal = this.toggleModal.bind(this);
        this.toggleNameChange = this.toggleNameChange.bind(this);
        this.toggleDescriptionChange = this.toggleDescriptionChange.bind(this);
        this.toggleWageChange = this.toggleWageChange.bind(this);
        this.addTask = this.addTask.bind(this);

        this.state = {
            modalOpen: false,
            taskName: "",
            taskDescription: "",
            taskWage: 0
        };
        this.props.loadTasks(this.props.access_token, this.props.params.projectId);

    }

    toggleModal() {
        this.setState({modalOpen: !this.state.modalOpen});
    }

    toggleNameChange(e) {
        this.setState({taskName: e.target.value});
    }
    toggleDescriptionChange(e) {
        this.setState({taskDescription: e.target.value});
    }
    toggleWageChange(e) {
        this.setState({taskWage: e.target.value});
    }

    addTask() {
        let task = {
            name: this.state.taskName,
            description: this.state.taskDescription,
            hourlyWage: this.state.taskWage,
            priority: 0,
            status: 0,
            project: this.props.project
        };
        this.props.addTask(this.props.access_token, this.props.params.projectId, task);
        this.props.loadTasks(this.props.access_token, this.props.params.projectId);
        this.toggleModal();
    }


    redirectTo(e) {
        browserHistory.push(e.target.getAttribute("to"));

    }
    writePriority(p) {
        switch (p) {
            case 0:
                return "Low";
            case 1:
                return "Medium";
            case 2:
                return "High";
        }
    }

    switchPriorityColor(p) {
        switch (p) {
            case 0:
                return "info";
            case 1:
                return "warning";
            case 2:
                return "danger";
        }
    }

    render() {
            let inPlan = this.props.inPlan.map( task => {
                let currentTaskId = task.id;
                let currentProjectId = this.props.project.id;
                return (
                    <div className={"card mb-2 clickable card-"+this.switchPriorityColor(task.priority)} onClick={() =>browserHistory.push("/projects/"+currentProjectId+"/tasks/"+currentTaskId)}>
                        <div className="card-header">{task.name}</div>
                        <div className="card-block">
                            Priority: {this.writePriority(task.priority)}
                        </div>
                    </div>
                );
            });
        let inProgress = this.props.inProgress.map( task => {
            let currentTaskId = task.id;
            let currentProjectId = this.props.project.id;
            return (
                <div className={"card mb-2 clickable card-"+this.switchPriorityColor(task.priority)} onClick={() =>browserHistory.push("/projects/"+currentProjectId+"/tasks/"+currentTaskId)}>
                    <div className="card-header">{task.name}</div>
                    <div className="card-block">
                        Priority: {this.writePriority(task.priority)}
                    </div>
                </div>
            );
        });
        let done = this.props.done.map( task => {
            let currentTaskId = task.id;
            let currentProjectId = this.props.project.id;
            return (
                <div className={"card mb-2 clickable card-"+this.switchPriorityColor(task.priority)} onClick={() =>browserHistory.push("/projects/"+currentProjectId+"/tasks/"+currentTaskId)}>
                    <div className="card-header">{task.name}</div>
                    <div className="card-block">
                        Priority: {this.writePriority(task.priority)}
                    </div>
                </div>
            );
        });

        return (
            <div className="row height-100-percent" style={{width: '100%'}}>
                <div className="col-2 height-100-percent">
                    <SideBar />
                </div>
                <div className="col mt-4 mr-4">
                    <div className="row justify-content-center mb-3">
                        <div className="col">
                            <Button onClick={this.toggleModal}><i className="fa fa-plus" /> Add task</Button>
                        </div>
                        <Modal isOpen={this.state.modalOpen} toggle={this.toggleModal}>
                            <ModalHeader toggle={this.toggleModal}>
                                Add new task
                            </ModalHeader>
                            <ModalBody>
                                <Form>
                                    <FormGroup>
                                        <Label>Name</Label>
                                        <Input value={this.state.taskName} onChange={this.toggleNameChange} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Description</Label>
                                        <Input value={this.state.taskDescription} onChange={this.toggleDescriptionChange} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Hourly wage</Label>
                                        <Input value={this.state.taskWage} onChange={this.toggleWageChange} />
                                    </FormGroup>
                                </Form>
                            </ModalBody>
                            <ModalFooter>
                                <Button onClick={this.addTask}>Save</Button>
                            </ModalFooter>
                        </Modal>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="card">
                                <h3 className="card-header">In Plan Tasks</h3>
                                <div className="card-block">
                                    {inPlan}
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card">
                                <h3 className="card-header">In Progress Tasks</h3>
                                <div className="card-block">
                                    {inProgress}
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card">
                                <h3 className="card-header">Done Tasks</h3>
                                <div className="card-block">
                                    {done}
                                </div>
                            </div>
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
        inPlan: state.tasks.filter(task => task.status == 0),
        inProgress: state.tasks.filter(task => task.status == 1),
        done: state.tasks.filter(task => task.status == 2)
    };
};

let mapDispatchToProps = function (dispatch) {
    return({
        loadTasks: (access_token, projectid) => {
            dispatch(loadTasks(access_token, projectid));
        },
        addTask: (access_token, projectId, id) => {
            dispatch(addTask(access_token, projectId, id));
        }
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);