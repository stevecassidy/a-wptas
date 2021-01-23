import { createStore, applyMiddleware } from 'redux';
import patientReducer from './patients';
import {StateType} from '../types';

const middlewares = [];
 
if (process.env.NODE_ENV === `development`) {
  const { logger } = require(`redux-logger`);
  middlewares.push(logger);
}

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore); 

// get saved content from localStorage
let preloadedState: StateType;
const persistedStateString = localStorage.getItem('state');
if (persistedStateString) {
  preloadedState = JSON.parse(persistedStateString);
}


const configureStore = () => createStoreWithMiddleware(patientReducer, preloadedState);
export default configureStore;