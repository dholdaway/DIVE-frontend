import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { submitProject, deleteProject } from '../actions/ProjectActions.js';
import styles from './App/App.sass';

import BlockingModal from './Base/BlockingModal';
import RaisedButton from './Base/RaisedButton';
import Input from './Base/Input';

class ProjectSettingsModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projectName: this.props.projectName
    };
  }

  submit() {
    const { projectId, submitProject, closeAction } = this.props;
    const { projectName } = this.state;

    submitProject(projectId, { title: projectName });
    closeAction();
  }

  enteredProjectNameInput(event) {
    this.setState({ projectName: event.target.value });
  }

  onClickDeleteProject() {
    const { projectId, deleteProject } = this.props;
    deleteProject(projectId);
  }

  render() {
    const { closeAction } = this.props;
    const { projectName } = this.state;

    var footer = 
      <div className={ styles.footerContent }>
        <RaisedButton icon altText="Delete project" onClick={ this.onClickDeleteProject.bind(this) }>
          <i className="fa fa-trash"></i>
        </RaisedButton>

        <div className={ styles.rightActions }>
          <RaisedButton primary minWidth={ 100 } onClick={ this.submit.bind(this) }>Save</RaisedButton>
          <RaisedButton onClick={ closeAction }>Cancel</RaisedButton>
        </div>
      </div>;

    return (
      <BlockingModal
        scrollable={ false }
        closeAction={ this.props.closeAction }
        heading="Project Settings"
        footer={ footer }>
        <div className={ styles.controlSection }>
          <div className={ styles.label }>Project Name</div>
          <Input
            type="text"
            placeholder={ projectName }
            value={ projectName }
            onChange={ this.enteredProjectNameInput.bind(this) }/>
        </div>
      </BlockingModal>
    );
  }
}

ProjectSettingsModal.propTypes = {
  projectId: PropTypes.number.isRequired,
  projectName: PropTypes.string.isRequired,
  closeAction: PropTypes.func
};

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, { submitProject, deleteProject })(ProjectSettingsModal);