import React, { Component, PropTypes } from 'react';

import styles from '../Visualizations.sass';

import Visualization from '../Visualization';

export default class VisualizationBlock extends Component {
  onClick() {
    const { spec, onClick } = this.props;
    onClick(spec.id);
  }

  saveVisualization() {
    const { spec, saveVisualization } = this.props;
    saveVisualization(spec.id, spec.data.visualize);
  }

  render() {
    const { spec, exportedSpecs, selectedVisualizationTypes } = this.props;

    return (
      <div className={ styles.visualizationBlocksContainer }>
        <Visualization
          visualizationTypes={ selectedVisualizationTypes }
          spec={ spec }
          data={ spec.data.visualize }
          onClick={ this.onClick.bind(this) }
          isMinimalView={ true }
          showHeader={ true } />
        <div className={ styles.starContainer } onClick={ this.saveVisualization.bind(this) }>
          <i className={ exportedSpecs.items.find((exportedSpec) => exportedSpec.specId == spec.id) ? 'fa fa-star ' + styles.starred : 'fa fa-star-o' }></i>
        </div>
      </div>
    );
  }
}

VisualizationBlock.propTypes = {
  spec: PropTypes.object.isRequired,
  selectedVisualizationTypes: PropTypes.array.isRequired,
  exportedSpecs: PropTypes.object.isRequired,
  saveVisualization: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
};