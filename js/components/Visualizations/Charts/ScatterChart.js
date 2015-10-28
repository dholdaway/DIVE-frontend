import React, { Component, PropTypes } from 'react';

import * as GeneratingProcedures from '../../../constants/GeneratingProcedures';

import styles from '../Visualizations.sass';

var Chart = require('react-google-charts').Chart;

export default class ScatterChart extends Component {

  render() {
    const { data, fieldNames, generatingProcedure, isMinimalView, chartId, options } = this.props;

    const scatterChartOptions = {
      ...options,
      hAxis: { title: data[0][0]},
      vAxis: { title: data[0][1]},
      legend: {
        position: 'none'
      }
    }

    return (
      <Chart chartType="ScatterChart" options={ scatterChartOptions } data = { data } graph_id={ chartId }/>
    );
  }
}

ScatterChart.propTypes = {
  chartId: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  isMinimalView: PropTypes.bool,
  options: PropTypes.object
};

ScatterChart.defaultProps = {
  isMinimalView: false,
  options: {}
};
