import {Patient, StateType, ActionType} from '../types'

const ADD_PATIENT = 'ADD_PATIENT';
const UPDATE_PATIENT = 'UPDATE_PATIENT';
const SELECT_PATIENT = 'SELECT_PATIENT';
const DELETE_PATIENT = 'DELETE_PATIENT';

export function selectPatient(index: number) : ActionType {
  return {
    type: SELECT_PATIENT,
    index
  }
}

export function deletePatient(index: number) : ActionType {
  return {
    type: DELETE_PATIENT,
    index
  }
}

export function updatePatient(value: Patient) : ActionType {
  return {
    type: UPDATE_PATIENT,
    value
  };
}

export function addPatient(value: Patient) : ActionType {
  return {
    type: ADD_PATIENT,
    value
  }
}

const initialState: StateType = {
  patients: [],
  currentPatient: -1
};

export default function reducer(state: StateType = initialState, 
                                action: ActionType) {

  let newState: StateType = Object.assign({}, state);
  switch (action.type){
  case UPDATE_PATIENT:
      if (action.index && action.index >= 0 && action.index < state.patients.length) {
        newState =  Object.assign(
            {},
            state,
            {
                patients: [
                    ...state.patients.slice(0, action.index),
                    action.value,
                    ...state.patients.slice(action.index+1)
                ],
                currentPatient: state.currentPatient
            }
            );
        }
        break; 
  case ADD_PATIENT:
    newState = Object.assign(
        {},
        state,
        {
            patients: [...state.patients, action.value],
            currentPatient: state.patients.length  // index of newly inserted element
        }
        );
    break;
  case SELECT_PATIENT:  // make the patient at index be the current patient
    if (action.index && action.index >= 0 && action.index < state.patients.length) {
        newState = Object.assign(
            {},
            state,
            {
                currentPatient: action.index
            }
            );
        }
    break;
  case DELETE_PATIENT:
    if (action.index && action.index >= 0 && action.index < state.patients.length) {
        newState = Object.assign(
            {},
            state,
            {
                list: [
                ...state.patients.slice(0, action.index),
                ...state.patients.slice(action.index+1)
                ]
            }
            );
      } 
    break; 
  }

  // update localStorage
  localStorage.setItem('state', JSON.stringify(newState));

  return newState;
}

