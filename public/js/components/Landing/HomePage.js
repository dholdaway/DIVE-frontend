import moment from 'moment';
import React, { Component, PropTypes } from 'react';
import styles from './Landing.sass';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import DocumentTitle from 'react-document-title';
import { createProject, fetchPreloadedProjects, fetchUserProjects, wipeProjectState } from '../../actions/ProjectActions';

import RaisedButton from '../Base/RaisedButton';
import Footer from './Footer';

var MediaLabLogo = require('babel!svg-react!../../../assets/MIT_ML_Logo_K_RGB.svg?name=MediaLabLogo');
var MacroConnectionsLogo = require('babel!svg-react!../../../assets/MacroConnections_Logo_K_RGB.svg?name=MacroConnectionsLogo');


export class HomePage extends Component {
  componentWillMount() {
    const { projects, userId } = this.props;
    this.props.fetchPreloadedProjects(userId);
    this.props.fetchUserProjects(userId);
  }

  componentWillReceiveProps(nextProps) {
    const nextProjectId = nextProps.project.properties.id;
    const nextUserId = nextProps.userId;

    if (this.props.project.properties.id != nextProjectId) {
      this.props.wipeProjectState();
      this.props.push(`/projects/${ nextProjectId }/datasets/upload`);
    }

    if (this.props.userId != nextUserId) {
      nextProps.fetchPreloadedProjects(nextUserId);
      if (nextUserId) {
        nextProps.fetchUserProjects(nextUserId);
      }
    }
  }

  _onUploadClick() {
    const userId = this.props.userId;
    const projectTitle = 'Project Title';
    const projectDescription = 'Project Description'
    this.props.createProject(userId, projectTitle, projectDescription);
  }

  render() {
    const { projects, userId } = this.props;
    const { userProjects, preloadedProjects } = projects;
    return (
      <DocumentTitle title='DIVE | Projects'>
        <div className={ styles.centeredFill }>
          <div className={ styles.section + ' ' + styles.ctaBox }>
            <div className={ styles.primaryCopy }>
              <span>Turn Data into Stories in Minutes</span>
            </div>
            <div className={ styles.secondaryCopy }>
              Easy, powerful data visualizations and analysis. Create visual stories in seconds.
            </div>
            <div className={ styles.ctaContainer }>
              <RaisedButton
                label="Get Started"
                primary={ true }
                onClick={ this._onUploadClick.bind(this) }
                className={ styles.uploadButton + ' ' + styles.primary } />
            </div>
            <div className={ styles.videoContainer }>
              <img
                className={ styles.video }
                src='../../../assets/images/DIVE_screenshot.png'
              />
            </div>
          </div>

          <div className={ styles.section + ' ' + styles.projectsContainer }>
            <div className={ styles.innerSection + ' ' + styles.projectTypeContainer }>
              <h2>
                Featured Projects
              </h2>
              <div className={ styles.projectListContainer }>
                { projects.isFetching &&
                  <div className={ styles.watermark }>Fetching projects...</div>
                }
                { preloadedProjects.map((project) =>
                  <a key={ `project-button-id-${ project.id }` } href={ `/projects/${ project.id }/datasets` } className={ styles.projectButton }>
                    <div className={ styles.projectTop }>
                      <div className={ styles.projectLeft }>
                        <div className={ styles.projectTitle }>{ project.title }</div>
                        <div className={ styles.projectDescription }>{ project.description }</div>
                      </div>
                      <div className={ styles.projectRight }>
                        <div className={ styles.projectCreationDate }>{ moment(project.creationDate).format('LLL') }</div>
                        <div className={ styles.projectUpdateDate }>{ moment(project.updateDate).format('LLL') }</div>
                      </div>
                    </div>
                  </a>
                  )}
                )}
              </div>
            </div>
          </div>

          <div className={ styles.section + ' ' + styles.aboutContainer }>
            <h2>
              About
            </h2>
            <div className={ styles.aboutContent }>
              <div className={ styles.textBox }>
                <div className={ styles.textBoxLeft}>
                  <p>DIVE automates data processing, lowering the barrier to understanding data so you can focus on interpreting results, not technical minutiae.</p>
                  <p>DIVE makes visualizing your data ridiculously easy. We automatically show recommended visualizations first, based on effectiveness, expressiveness, and statistical properties like correlation, entropy, and gini.</p>
                </div>
                <div className={ styles.textBoxRight}>
                  <p>Trying to answer a specific question? Just select which columns in your data you'd like to visualize, and pick a visualization style — we'll take care of the rest.</p>
                  <p>DIVE was created by <a target="_blank" href="https://twitter.com/KevinZengHu">Kevin Hu</a> and <a target="_blank" href="https://twitter.com/cesifoti">César Hidalgo</a> in the <a target="_blank" href="http://macro.media.mit.edu">Macro Connections Group</a> at the <a target="_blank" href="http://media.mit.edu">MIT Media Lab</a>.</p>
                </div>
              </div>
              <div className={ styles.mugshotBox }>
                <div className={ styles.mugshots }>
                  <div className={ styles.mugshotContainer }>
                    <a href="http://twitter.com/kevinzenghu" target="_blank">
                      <img className={ styles.mugshot } src="/assets/images/kevin.mugshot.jpg"/>
                    </a>
                    <div className={ styles.mugCaption }>
                      <span className={ styles.mugCaptionName }>Kevin Hu</span>
                      <span className={ styles.mugCaptionRole }>PhD Candidate</span>
                    </div>
                  </div>
                  <div className={ styles.mugshotContainer }>
                    <a href="" target="_blank">
                      <img className={ styles.mugshot } src="/assets/images/suzanne.mugshot.jpg"/>
                    </a>
                    <div className={ styles.mugCaption }>
                      <span className={ styles.mugCaptionName }>Suzanne Wang</span>
                      <span className={ styles.mugCaptionRole }>Undergraduate Intern</span>
                    </div>
                  </div>
                  <div className={ styles.mugshotContainer }>
                    <a href="http://twitter.com/cesifoti" target="_blank">
                      <img className={ styles.mugshot } src="/assets/images/cesar.mugshot.jpg"/>
                    </a>
                    <div className={ styles.mugCaption }>
                      <span className={ styles.mugCaptionName }>César Hidalgo</span>
                      <span className={ styles.mugCaptionRole }>Principal Investigator</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </DocumentTitle>
    );
  }
}


function mapStateToProps(state) {
  const { project, projects, user } = state;
  return { project, projects, userId: user.id };
}

export default connect(mapStateToProps, { fetchPreloadedProjects, fetchUserProjects, createProject, wipeProjectState, push })(HomePage);
