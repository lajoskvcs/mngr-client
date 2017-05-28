import React, {PropTypes} from "react";
import { browserHistory } from 'react-router';
import {connect} from 'react-redux';
import SideBar from '../common/Sidebar';
import Loader from '../common/Loader';

import {patchNote} from '../../actions/projectActions';


class Notes extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleContentChange = this.handleContentChange.bind(this);
        this.saveNote = this.saveNote.bind(this);
        this.state = {
            content: this.props.note.note
        };
    }

    redirectTo(e) {
        browserHistory.push(e.target.getAttribute("to"));

    }


    handleContentChange(e) {
        this.setState({content: e.target.value});
    }
    saveNote() {
        this.props.patchNote(this.props.access_token, this.props.note.id, this.state.content);
    }

    render() {
        let project;
        if(this.props.note == null) {
            project = <Loader />;
        } else {
            project = (
                <div className="row">
                    <div className="col">
                        <div className="card">
                            <div className="card-block">
                                <textarea onChange={this.handleContentChange}>
                                    {this.state.content}
                                </textarea>
                                <button className="btn btn-block" onClick={this.saveNote}>Save note</button>
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

Notes.propTypes = {
    access_token: PropTypes.object.isRequired
};

let mapStateToProps = function(state) {
    return {
        access_token: state.tokens.access_token,
        project : state.selectedProject,
        note: state.note
    };
};

let mapDispatchToProps = function (dispatch) {
    return({
        patchNote: (id, note) => {
            dispatch(patchNote(id, note));
        }
    });
};
export default connect(mapStateToProps, mapDispatchToProps)(Notes);