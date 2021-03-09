import {Patient, StateType, ActionType} from '../types'
import { Plugins } from '@capacitor/core';
import { navigate } from '@reach/router';
import paths from '../urls';
const { LocalNotifications } = Plugins;

const ADD_PATIENT = 'ADD_PATIENT';
const UPDATE_PATIENT = 'UPDATE_PATIENT';
const SELECT_PATIENT = 'SELECT_PATIENT';
const DELETE_PATIENT = 'DELETE_PATIENT';
const SET_PATIENT_PICTURE_SCORE = 'SET_PATIENT_PICTURE_SCORE';
const SET_PATIENT_TIMER = 'SET_PATIENT_TIMER';

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

export function setPatientPictureScore(nvalue: number) : ActionType {
    return {
        type: SET_PATIENT_PICTURE_SCORE,
        nvalue
    }
}

export function setPatientTimer(nvalue: number, value: Patient) : ActionType {
    return {
        type: SET_PATIENT_TIMER,
        nvalue,
        value
    }
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
        if (typeof(action.index) === "number" && action.index >= 0 && action.index < state.patients.length) {
            newState =  Object.assign(
                {},
                state,
                {
                    patients: [
                        ...state.patients.slice(0, action.index),
                        action.value,
                        ...state.patients.slice(action.index+1)
                    ]
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
        if (typeof(action.index) === "number" && action.index >= 0 && action.index < state.patients.length) {
            newState = Object.assign(
                {},
                state,
                {
                    currentPatient: action.index
                }
                );
            } else {
                console.log("SELECT_PATIENT out of range", action.index, state.patients.length)
            }
        break;
    case DELETE_PATIENT:
        if (typeof(action.index) === "number"  && action.index >= 0 && action.index < state.patients.length) {
            newState = Object.assign(
                {},
                state,
                {
                    patients: [
                    ...state.patients.slice(0, action.index),
                    ...state.patients.slice(action.index+1)
                    ]
                }
                );
        }
        break;
    case SET_PATIENT_PICTURE_SCORE:
        if (state.currentPatient >= 0) {
            if (typeof(action.nvalue) === "number" ) {
                const updatedPatient = Object.assign(
                    {},
                    state.patients[state.currentPatient],
                    {
                        pictures: action.nvalue 
                    }
                );

                newState = Object.assign(
                    {},
                    state,
                    {
                        patients: [
                            ...state.patients.slice(0, state.currentPatient),
                            updatedPatient,
                            ...state.patients.slice(state.currentPatient+1)
                        ]
                    }
                );
            }
        }
        break;
    case SET_PATIENT_TIMER:
        if (state.currentPatient >= 0) {
            if (typeof(action.nvalue) === "number" && action.value !== undefined) {
                let alarmTime : Date;
                if (action.nvalue !== 0) {
                    alarmTime = (new Date(Date.now() + action.nvalue * 60 * 1000));

                    LocalNotifications.schedule({
                        notifications: [
                            {
                                title: "Concussion Test Alarm",
                                body: "Time to test image recall for " + action.value.name,
                                id: state.currentPatient,
                                schedule: { at: alarmTime },
                                actionTypeId: "",
                                extra: null
                                 
                            }
                        ]
                    })
                    .then(() => {
                        const handle = LocalNotifications.addListener('localNotificationActionPerformed', 
                                 (action) => {
                                    const patientId = action.notification.id;
                                    selectPatient(patientId);
                                    handle.remove();  // remove this listener
                                    // set the view to patient report
                                    navigate(paths.patientreport);
                                }
                            );
                        });

                    const updatedPatient = Object.assign(
                        {},
                        state.patients[state.currentPatient],
                        {
                            reminder: alarmTime
                        }
                    );

                    newState = Object.assign(
                        {},
                        state,
                        {
                            patients: [
                                ...state.patients.slice(0, state.currentPatient),
                                updatedPatient,
                                ...state.patients.slice(state.currentPatient+1)
                            ]
                        }
                    );
                }
            }
        }
        break;
    }

  // update localStorage
  localStorage.setItem('state', JSON.stringify(newState));

  return newState;
}

