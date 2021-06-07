import { createStore, applyMiddleware } from 'redux';
import patientReducer from './patients';
import { migrate } from './migrate';
import {StateType} from '../types';

const middlewares = [];
 
if (process.env.NODE_ENV === `development`) {
  const { logger } = require(`redux-logger`);
  middlewares.push(logger);
}

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore); 

migrate();

// get saved content from localStorage
let preloadedState: StateType;
const persistedStateString = localStorage.getItem('state');
if (persistedStateString) {
  preloadedState= JSON.parse(persistedStateString);
  if (!preloadedState.patients || typeof(preloadedState.currentPatient) === "undefined") {
    preloadedState = {patients: [], currentPatient: -1};
  }
}


const configureStore = () => createStoreWithMiddleware(patientReducer, preloadedState);
export default configureStore;