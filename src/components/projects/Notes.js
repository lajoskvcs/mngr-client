import React, {PropTypes} from "react";
import { browserHistory } from 'react-router';
import {connect} from 'react-redux';
import SideBar from '../common/Sidebar';
import Loader from '../common/Loader';
import FroalaEditor from 'react-froala-wysiwyg';
import {patchNote} from '../../actions/projectActions';


class Notes extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleContentChange = this.handleContentChange.bind(this);
        this.saveNote = this.saveNote.bind(this);
        this.toggleEditable = this.toggleEditable.bind(this);
        this.state = {
            content: this.props.note.note,
            editable: false
        };
    }

    redirectTo(e) {
        browserHistory.push(e.target.getAttribute("to"));

    }


    handleContentChange(model) {
        this.setState({content: model});
    }
    saveNote() {
        this.props.patchNote(this.props.access_token, this.props.project.id, this.props.note.id, this.state.content);
        this.toggleEditable();
    }

    toggleEditable() {
        this.setState({editable: !this.state.editable});
    }

    render() {
        let project;
        if(this.props.note == null) {
            project = <Loader />;
        } else {
            let content;
            let button;
            if(this.state.editable) {
                content = (
                    <div>
                        <FroalaEditor
                            tag='textarea'
                            model={this.state.content}
                            onModelChange={this.handleContentChange}
                        />
                    </div>
                );
                button = <button className="btn btn-block" onClick={this.saveNote}>Save note</button>;
            } else {
                content = (
                    <div>
                        <div dangerouslySetInnerHTML={{ __html: this.state.content }} />
                    </div>
                );
                button = <button className="btn btn-block" onClick={this.toggleEditable}>Edit note</button>;
            }

            project = (
                <div className="row">
                    <div className="col">
                        <div className="card">
                            <div className="card-block">
                                {content}
                            </div>
                            <div className="card-footer">
                                {button}
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
        patchNote: (access_token, projectId, noteId, note) => {
            dispatch(patchNote(access_token, projectId, noteId, note));
        }
    });
};
export default connect(mapStateToProps, mapDispatchToProps)(Notes);