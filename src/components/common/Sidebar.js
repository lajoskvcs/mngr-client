import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import { Link, IndexLink } from 'react-router';
import {Nav, NavItem, NavLink} from 'reactstrap';
import {browserHistory} from 'react-router';

class SideBar extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        let overview = () => browserHistory.push("/projects/"+this.props.project.id);
        let task_board = () => browserHistory.push("/projects/"+this.props.project.id+"/tasks");
        let notes = () => browserHistory.push("/projects/"+this.props.project.id+"/notes");
        let editProject = () => browserHistory.push("/projects/"+this.props.project.id+"/edit");
        return (
            <div className="card mr-1 rounded-0 height-100-percent" id="sidebar" role="navigation">
                <Nav className="pl-0 flex-column">
                    <NavItem>
                        <NavLink onClick={overview} href="#">Overview</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink onClick={task_board} href="#">Task board</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink onClick={notes} href="#">Notes</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink onClick={editProject} href="#">Edit project</NavLink>
                    </NavItem>
                </Nav>
            </div>
        );
    }
}

SideBar.propTypes = {
    access_token: PropTypes.object.isRequired
};

let mapStateToProps = function(state) {
    return {
        project : state.selectedProject
    };
};

let mapDispatchToProps = function (dispatch) {
    return({});
};
export default connect(mapStateToProps, mapDispatchToProps)(SideBar);