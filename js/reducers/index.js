import { combineReducers } from 'redux';
import {routerStateReducer as router} from 'redux-react-router';

import {
  REQUEST_PROJECT,
  RECEIVE_PROJECT,
  REQUEST_DATASETS,
  RECEIVE_DATASETS,
  RECEIVE_UPLOAD_DATASET,
  RECEIVE_DATASET,
  REQUEST_SPECS,
  RECEIVE_SPECS,
  SELECT_DATASET,
  SELECT_VISUALIZATION_TYPE
} from '../constants/ActionTypes';

function mergeDatasetLists(originalList, newList) {
  var mergedList = [];

  originalList.forEach(function (originalListDataset, i, originalList) {
    mergedList.push(originalListDataset);

    var newListDatasetIndex = newList.findIndex((newListDataset, j, datasets) =>
      newListDataset.dID == originalListDataset.dID
    );

    if (newListDatasetIndex > -1) {
      var newListDataset = newList[newListDatasetIndex];
      mergedList[i].data = newListDataset.data ? newListDataset.data : mergedList[i].data;
      mergedList[i].title = newListDataset.title ? newListDataset.title : mergedList[i].title;
      mergedList[i].details = newListDataset.details ? newListDataset.details : mergedList[i].details;
      mergedList[i].filename = newListDataset.filename ? newListDataset.filename : mergedList[i].filename;
    }
  });

  newList.forEach(function (newListDataset, i, newList) {
    var newListDatasetIndex = mergedList.findIndex((mergedListDataset, j, datasets) =>
      mergedListDataset.dID == newListDataset.dID
    );

    if (newListDatasetIndex < 0) {
      mergedList.push(newListDataset);
    }
  });

  return mergedList;
}

function datasets(state = {
  isFetching: false,
  items: []
}, action) {
  switch (action.type) {
    case REQUEST_DATASETS:
      return { ...state, isFetching: true };
    case RECEIVE_DATASETS:
      return { ...state, isFetching: false, items: mergeDatasetLists(state.items, action.datasets) };
    case RECEIVE_UPLOAD_DATASET:
      return { ...state, isFetching: false, items: [...state.items, action.dataset] };
    case RECEIVE_DATASET:
      const newDataset = [{
          dID: action.datasetId,
          title: action.title,
          data: action.data,
          details: action.details
      }];
      return { ...state, items: mergeDatasetLists(state.items, newDataset) };
    default:
      return state;
  }
}

function specSelector(state = {
  datasetId: null
}, action) {
  switch (action.type) {
    case SELECT_DATASET:
      return { ...state, datasetId: action.datasetId };
    default:
      return state;
  }
}

function project(state = {
  isFetching: false,
  properties: {}
}, action) {
  switch (action.type) {
    case REQUEST_PROJECT:
      return { ...state, isFetching: true };
    case RECEIVE_PROJECT:
      return { ...state, isFetching: false, properties: action.projectProperties };
    default:
      return state;
  }
}

function specs(state={
  isFetching: false,
  items: []
}, action) {
  switch (action.type) {
    case REQUEST_SPECS:
      return { ...state, isFetching: true };
    case RECEIVE_SPECS:
      return { ...state, isFetching: false, items: action.specs };
    default:
      return state;
  }
}

function filters(state={
  visualizationTypes: [
    {
      type: "TREEMAP",
      imageName: "treemap",
      label: "Treemap",
      selected: false,
      disabled: false
    },
    {
      type: "BAR",
      imageName: "bar",
      label: "Bar",
      selected: false,
      disabled: false
    },
    {
      type: "PIE",
      imageName: "pie",
      label: "Pie",
      selected: false,
      disabled: false
    },
    {
      type: "LINE",
      imageName: "line",
      label: "Line",
      selected: false,
      disabled: false
    },
    {
      type: "SCATTERPLOT",
      imageName: "scatterplot",
      label: "Scatter",
      selected: false,
      disabled: false
    }
  ]
}, action) {
  switch(action.type){
    case SELECT_VISUALIZATION_TYPE:
      var newVisualizationTypes = state.visualizationTypes;

      const previousSelectedIndex = state.visualizationTypes.findIndex((typeObject, i, types) =>
        typeObject.selected
      );
      if (previousSelectedIndex >= 0) {
        newVisualizationTypes[previousSelectedIndex].selected = false;
      }

      const newSelectedIndex = state.visualizationTypes.findIndex((typeObject, i, types) =>
        typeObject.type == action.selectedType
      );
      if (newSelectedIndex >= 0) {
        newVisualizationTypes[newSelectedIndex].selected = true;
      }

      return { ...state, visualizationTypes: newVisualizationTypes }
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  datasets,
  filters,
  project,
  specs,
  specSelector,
  router
});

export default rootReducer;