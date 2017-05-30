import React, {PropTypes} from "react";
import {
    Button,
    ButtonGroup,
    Input,
    Modal,
    ModalFooter,
    ModalBody,
    ModalHeader
} from 'reactstrap';
import { browserHistory } from 'react-router';
import {connect} from 'react-redux';
import {loadTask, updateTask, deleteTask} from '../../actions/projectActions';
import SideBar from '../common/Sidebar';
import Loader from '../common/Loader';
import moment from 'moment';

class Task extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.props.loadTask(this.props.access_token, this.props.params.taskId);
        this.switchStatusButtons = this.switchStatusButtons.bind(this);
        this.updateStatus = this.updateStatus.bind(this);
        this.updatePriority = this.updatePriority.bind(this);
        this.updateName = this.updateName.bind(this);
        this.updateDescription = this.updateDescription.bind(this);
        this.updateHourlySalary = this.updateHourlySalary.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.deleteTime = this.deleteTime.bind(this);

        this.toggleNameEditable = this.toggleNameEditable.bind(this);
        this.toggleDescriptionEditable = this.toggleDescriptionEditable.bind(this);
        this.toggleNameChange = this.toggleNameChange.bind(this);
        this.toggleDescriptionChange = this.toggleDescriptionChange.bind(this);
        this.toggleHourlySalaryChange = this.toggleHourlySalaryChange.bind(this);
        this.toggleHourlySalaryEditable = this.toggleHourlySalaryEditable.bind(this);

        this.state = {
            nameEditable: false,
            descriptionEditable: false,
            hourlySalaryEditable: false,
            hourlySalary: null,
            name: null,
            description: null
        };
    }

    toggleNameChange(e) {
        this.setState({
            name: e.target.value
        });
    }
    toggleDescriptionChange(e) {
        this.setState({
            description: e.target.value
        });
    }
    toggleHourlySalaryChange(e) {
        this.setState({
            hourlySalary: e.target.value
        });
    }

    toggleHourlySalaryEditable() {
        this.setState({
            hourlySalary: this.props.task.hourlySalary,
            hourlySalaryEditable: !this.state.hourlySalaryEditable
        });
    }

    toggleNameEditable() {
        this.setState({
            name: this.props.task.name,
            nameEditable: !this.state.nameEditable
        });
    }
    toggleDescriptionEditable() {
        this.setState({
            description: this.props.task.description,
            descriptionEditable: !this.state.descriptionEditable
        });
    }

    switchStatus(status) {
        switch(status) {
            case 0:
                return "In Plan";
            case 1:
                return "In Progress";
            case 2:
                return "Done";
        }
    }

    switchPriority(priority) {
        switch(priority) {
            case 0:
                return "Low";
            case 1:
                return "Medium";
            case 2:
                return "High";
        }
    }

    deleteTask(id) {
        this.props.deleteTask(this.props.access_token, this.props.task.id);
        browserHistory.push("/projects/"+this.props.params.projectId);
    }

    deleteTime(id) {
        let taskToUpdate = Object.assign({},this.props.task);
        taskToUpdate.times = taskToUpdate.times.filter(time => {
            return time.id != id;
        });
        this.props.updateTask(this.props.access_token, taskToUpdate);
    }

    updateName() {
        let taskToUpdate = Object.assign({},this.props.task);
        taskToUpdate.name = this.state.name;
        this.props.updateTask(this.props.access_token, taskToUpdate);
    }

    updateHourlySalary() {
        let taskToUpdate = Object.assign({},this.props.task);
        taskToUpdate.hourlySalary = this.state.hourlySalary;
        this.props.updateTask(this.props.access_token, taskToUpdate);
    }

    updateDescription() {
        let taskToUpdate = Object.assign({},this.props.task);
        taskToUpdate.description = this.state.description;
        this.props.updateTask(this.props.access_token, taskToUpdate);
    }

    updateStatus(status) {
        let taskToUpdate = Object.assign({},this.props.task);
        taskToUpdate.status = status;
        this.props.updateTask(this.props.access_token, taskToUpdate);
    }

    updatePriority(priority) {
        let taskToUpdate = Object.assign({},this.props.task);


        if(this.props.task.priority + priority > -1 && this.props.task.priority + priority < 3) {
            taskToUpdate.priority += priority;
            this.props.updateTask(this.props.access_token, taskToUpdate);
        }
    }

    switchStatusButtons(status) {
        let inPlan = <Button onClick={() => {this.updateStatus(0)}}>In Plan</Button>;
        let inProgress = <Button onClick={() => {this.updateStatus(1)}}>In Progress</Button>;
        let done = <Button onClick={() => {this.updateStatus(2)}}>Done</Button>;
        switch(status) {
            case 0:
                return <ButtonGroup>{inProgress}{done}</ButtonGroup>;
            case 1:
                return <ButtonGroup>{inPlan}{done}</ButtonGroup>;
            case 2:
                return <ButtonGroup>{inPlan}{inProgress}</ButtonGroup>;
        }
    }


    render() {
        let task;
        if(this.props.task == null) {
            task = (
                <div className="col mt-4 mr-4">
                    <Loader />
                </div>
            );
        } else {
            let statusButtons = this.switchStatusButtons(this.props.task.status);

            task = (
                <div className="col mt-4 mr-4">
                    <div className="row justify-content-center">
                        <div className="col text-center">
                            <h5 style={{color: 'white'}}>
                                <Button onClick={() => {this.updatePriority(-1)}} className={"btn-sm mr-2" + ((this.props.task.priority == 0)? " disabled":"")}><i className="fa fa-arrow-left" /></Button>
                                {this.switchPriority(this.props.task.priority)}
                                <Button onClick={() => {this.updatePriority(1)}} className={"btn-sm ml-2" + ((this.props.task.priority == 2)? " disabled":"")}><i className="fa fa-arrow-right" /></Button>
                            </h5>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            {
                                (this.state.nameEditable) ? <Input
                                    onKeyPress={
                                        (event) => {
                                            if(event.key == 'Enter') {
                                                this.updateName();
                                                this.toggleNameEditable();
                                            }
                                        }

                                    }
                                    value={this.state.name}
                                    onChange={this.toggleNameChange}/> :
                                    <h1 style={{color: 'white'}} onDoubleClick={this.toggleNameEditable}>{this.props.task.name}</h1>
                            }

                        </div>
                        <div className="col text-center">
                            <h2 style={{color: 'white'}}>
                                {this.switchStatus(this.props.task.status)}
                            </h2>
                        </div>
                        <div className="col text-right">
                            {statusButtons}
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col">
                            <div className="card">
                                <div className="card-header">
                                    Task description
                                </div>
                                <div className="card-block">
                                    {
                                        (this.state.descriptionEditable) ? <Input
                                            type="textarea"
                                            onKeyPress={
                                                (event) => {
                                                    if(event.key == 'Enter') {
                                                        this.updateDescription();
                                                        this.toggleDescriptionEditable();
                                                    }
                                                }

                                            }
                                            value={this.state.description}
                                            onChange={this.toggleDescriptionChange} /> :
                                            <p onDoubleClick={this.toggleDescriptionEditable}>{this.props.task.description}</p>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-around mb-3">
                        <div className="col-xs-4">
                            <div className="card card-info">
                                <div className="card-header">
                                    Worked hours
                                </div>
                                <div className="card-block text-center">
                                    <h1>{this.props.task.workedHours}</h1>
                                </div>
                            </div>
                        </div>

                        <div className="col-xs-4">
                            <div className="card card-success">
                                <div className="card-header">
                                    Total payment for the Task
                                </div>
                                <div className="card-block text-center">
                                    <h1>{this.props.task.totalPayment}</h1>
                                </div>
                            </div>
                        </div>

                        <div className="col-xs-4">
                            <div className="card card-success">
                                <div className="card-header">
                                    Total profit for the Task
                                </div>
                                <div className="card-block text-center">
                                    <h1>{this.props.task.totalProfit}</h1>
                                </div>
                            </div>
                        </div>

                        <div className="col-xs-4">
                            <div className="card card-warning">
                                <div className="card-header">
                                    Hourly salary
                                </div>
                                <div className="card-block text-center">
                                    {
                                        (this.state.hourlySalaryEditable) ? <Input
                                            onKeyPress={
                                                (event) => {
                                                    if(event.key == 'Enter') {
                                                        this.updateHourlySalary();
                                                        this.toggleHourlySalaryEditable();
                                                    }
                                                }

                                            }
                                            value={this.state.hourlySalary}
                                            onChange={this.toggleHourlySalaryChange} /> :
                                            <h1 onDoubleClick={this.toggleHourlySalaryEditable}>{this.props.task.hourlySalary}</h1>
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col">
                            <div className="card">
                                <div className="card-header">
                                    Time entries
                                </div>
                                <div className="card-block">
                                    <table className="table-bordered table">
                                        <tr>
                                            <th>Start date</th>
                                            <th>End date</th>
                                            <th>Worked hours</th>
                                            <th width="10" />
                                        </tr>



                                            {
                                                this.props.task.times.map(
                                                    time => {
                                                        return(
                                                            <tr>
                                                                <td>{moment(time.startDate).format('YYYY-MM-DD hh:mm:ss')}</td>
                                                                <td>{moment(time.endDate).format('YYYY-MM-DD hh:mm:ss')}</td>
                                                                <td>
                                                                    {
                                                                        moment(time.endDate).diff(moment(time.startDate), 'hours')
                                                                    }
                                                                </td>
                                                                <td>
                                                                    <button onClick={() => {
                                                                        this.deleteTime(time.id);
                                                                    }} type="button" className="close" aria-label="Close">
                                                                        <span aria-hidden="true">&times;</span>
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    }
                                                )
                                            }
                                            <tr>
                                                <th />
                                                <th />
                                                <th>
                                                    {this.props.task.workedHours}
                                                </th>
                                                <th>
                                                    <a className="clickable">
                                                        <i className="fa fa-plus" />
                                                    </a>
                                                </th>
                                            </tr>

                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="card">
                                <div className="card-header">
                                    Materials
                                </div>
                                <div className="card-block">
                                    <table className="table table-bordered">
                                        <tr>
                                            <th>Name</th>
                                            <th>Store name</th>
                                            <th>List price</th>
                                            <th>Quantity</th>
                                            <th>Percentage</th>
                                            <th>Price</th>
                                            <th>Actual Price</th>
                                            <th width="10"></th>
                                        </tr>
                                        {
                                            this.props.task.materials.map(
                                                material => {
                                                    return(
                                                        <tr>
                                                            <td>
                                                                {material.name}
                                                            </td>
                                                            <td>
                                                                {material.storeName}
                                                            </td>
                                                            <td>
                                                                {material.listPrice}
                                                            </td>
                                                            <td>
                                                                {material.quantity}
                                                            </td>
                                                            <td>
                                                                {material.percent}
                                                            </td>
                                                            <td>
                                                                {material.price}
                                                            </td>
                                                            <td>
                                                                {material.actualPrice}
                                                            </td>
                                                            <td>
                                                                <button onClick={() => {
                                                                    this.deleteMaterial(material.id);
                                                                }} type="button" className="close" aria-label="Close">
                                                                    <span aria-hidden="true">&times;</span>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    )
                                                }
                                            )
                                        }
                                        <tr>
                                            <th />
                                            <th />
                                            <th />
                                            <th />
                                            <th />
                                            <th />
                                            <th>
                                                {this.props.task.summedMaterialPrice}
                                            </th>
                                            <th>
                                                <a className="clickable">
                                                    <i className="fa fa-plus" />
                                                </a>
                                            </th>
                                        </tr>

                                    </table>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-5 mb-5 justify-content-center">
                        <div className="col-xs-4">
                            <Button className="btn-danger" onClick={this.deleteTask}>Delete Task</Button>
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
                {task}
            </div>
        );
    }

}

Task.propTypes = {
    access_token: PropTypes.object.isRequired
};

let mapStateToProps = function(state) {
    return {
        access_token: state.tokens.access_token,
        task : state.task
    };
};

let mapDispatchToProps = function (dispatch) {
    return({
        loadTask: (access_token, id) => {
            dispatch(loadTask(access_token, id));
        },
        updateTask: (access_token, task) => {
            dispatch(updateTask(access_token, task));
        },
        deleteTask: (access_token, taskId) => {
            dispatch(deleteTask(access_token, taskId));
        }

    });
};
export default connect(mapStateToProps, mapDispatchToProps)(Task);