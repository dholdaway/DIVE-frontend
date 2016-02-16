import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
<<<<<<< HEAD
import { pushState } from 'redux-react-router';
import {
  selectDocument,
  createNewDocument,
  deleteDocument,
  requestDocument,
  fetchDocuments,
  fetchExportedVisualizationSpecs
} from '../../actions/ComposeActions';
=======

import { fetchExportedVisualizationSpecs } from '../../actions/ComposeActions';
>>>>>>> 47035b4d77dc510ec63304d567a2a0211eb22ef8

import styles from './Compose.sass';

import Sidebar from '../Base/Sidebar';
import SidebarGroup from '../Base/SidebarGroup';
import Visualization from '../Visualizations/Visualization';
<<<<<<< HEAD
import RaisedButton from '../Base/RaisedButton';
import DropDownMenu from '../Base/DropDownMenu';
=======
import ComposeSidebarVisualizationBlock from './ComposeSidebarVisualizationBlock';
>>>>>>> 47035b4d77dc510ec63304d567a2a0211eb22ef8

export class ComposeSidebar extends Component {
  constructor(props) {
    super(props);
    this.onClickNewDocument = this.onClickNewDocument.bind(this);
    this.onClickDeleteDocument = this.onClickDeleteDocument.bind(this);
    this.onSelectDocument = this.onSelectDocument.bind(this);
  }

  componentWillMount() {
    const { projectId, exportedSpecs, fetchDocuments, fetchExportedVisualizationSpecs } = this.props;
    if (projectId && exportedSpecs.items.length == 0 && !exportedSpecs.isFetching && !exportedSpecs.loaded) {
      fetchDocuments(projectId)
      fetchExportedVisualizationSpecs(projectId);
    }
  }

  onSelectDocument(documentId) {
    if (documentId) {
      this.props.pushState(null, `/projects/${ this.props.projectId }/compose/${ documentId }`);
    }
    // const { projectId, documentSelector, selectDocument } = this.props;
    // console.log('THIS', this);
    // const documentIdAsString = documentId.toString();
    // if (documentSelector.documentId != documentIdAsString) {
    //   selectDocument(projectId, documentIdAsString);
    // }
  }

  onClickNewDocument() {
    const { projectId, createNewDocument } = this.props;
    createNewDocument(projectId);
  }

  onClickDeleteDocument() {
    const { projectId, documentSelector, deleteDocument } = this.props;
    deleteDocument(projectId, documentSelector.documentId);
  }

  componentDidUpdate(previousProps) {
<<<<<<< HEAD
    const { projectId, exportedSpecs, fetchDocuments, fetchExportedVisualizationSpecs } = this.props;
    if (projectId && exportedSpecs.items.length == 0 && !exportedSpecs.isFetching && !exportedSpecs.loaded) {
      fetchDocuments(projectId)
      fetchExportedVisualizationSpecs(projectId);
=======
    const { project, exportedSpecs, fetchExportedVisualizationSpecs } = this.props;
    if (project.properties.id && exportedSpecs.items.length == 0 && !exportedSpecs.isFetching) {
      fetchExportedVisualizationSpecs(project.properties.id);
>>>>>>> 47035b4d77dc510ec63304d567a2a0211eb22ef8
    }
  }

  render() {
<<<<<<< HEAD
    const { exportedSpecs, documents, documentSelector } = this.props;

    return (
      <Sidebar>
        <SidebarGroup heading="Documents">
          <RaisedButton label="New document" onClick={ this.onClickNewDocument } />
          <RaisedButton label="Delete document" onClick={ this.onClickDeleteDocument } />
          <div className={ styles.documents }>
            { !documents.isFetching && documents.items.length > 0 &&
              <DropDownMenu
                className={ styles.documentSelector }
                value={ `${ documentSelector.documentId }` }
                options={ documents.items.length > 0 ? documents.items : [] }
                valueMember="id"
                displayTextMember="title"
                onChange={ this.onSelectDocument } />
            }
          </div>
        </SidebarGroup>
        <SidebarGroup heading="Visualizations">
          { exportedSpecs.loaded && !exportedSpecs.isFetching && exportedSpecs.items.length > 0 && exportedSpecs.items.map((spec) =>
            <div className={ styles.visualizationPreview } key={ spec.id }>
              <Visualization
                containerClassName="block"
                visualizationClassName="visualization"
                overflowTextClassName="overflowText"
                visualizationTypes={ spec.vizTypes }
                spec={ spec }
                data={ spec.data }
                onClick={ this.handleClick }
                isMinimalView={ true }
                showHeader={ true } />
            </div>
            )
          }
          { exportedSpecs.loaded && !exportedSpecs.isFetching && exportedSpecs.items.length == 0 &&
            <div>
              No visualizations saved.
            </div>
          }
=======
    const { exportedSpecs } = this.props;

    return (
      <Sidebar>
        <SidebarGroup heading="Starred visualizations">
          { !exportedSpecs.isFetching && exportedSpecs.items.length > 0 && exportedSpecs.items.map((spec) =>
            <ComposeSidebarVisualizationBlock spec={ spec } key={ spec.id }/>
          )}
>>>>>>> 47035b4d77dc510ec63304d567a2a0211eb22ef8
        </SidebarGroup>
      </Sidebar>
    );
  }
}

ComposeSidebar.propTypes = {
  projectId: PropTypes.string.isRequired,
  documents: PropTypes.object.isRequired,
  documentSelector: PropTypes.object.isRequired,
  exportedSpecs: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const { project, documents, documentSelector, exportedSpecs } = state;
  return {
    projectId: (project.properties.id ? `${ project.properties.id }` : null),
    documents,
    documentSelector,
    exportedSpecs
  };
}

export default connect(mapStateToProps, {
<<<<<<< HEAD
  fetchExportedVisualizationSpecs,
  fetchDocuments,
  selectDocument,
  requestDocument,
  createNewDocument,
  deleteDocument,
  pushState
=======
  fetchExportedVisualizationSpecs
>>>>>>> 47035b4d77dc510ec63304d567a2a0211eb22ef8
})(ComposeSidebar);
