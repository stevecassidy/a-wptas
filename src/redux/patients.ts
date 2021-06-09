import {Patient, TestResult, StateType, ActionType} from '../types'
import { Plugins } from '@capacitor/core';
import { navigate } from '@reach/router';
import paths from '../urls';
const { LocalNotifications } = Plugins;

const ADD_PATIENT = 'ADD_PATIENT';
const UPDATE_PATIENT = 'UPDATE_PATIENT';
const TEST_PATIENT = 'TEST_PATIENT';
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

export function updatePatient(patient: Patient) : ActionType {
  return {
    type: UPDATE_PATIENT,
    patient
  };
}

export function addTestForPatient(patient: Patient, test: TestResult) : ActionType {
    return {
      type: TEST_PATIENT,
      patient,
      test
    };
  }

export function setPatientPictureScore(nvalue: number) : ActionType {
    return {
        type: SET_PATIENT_PICTURE_SCORE,
        nvalue
    }
}

export function setPatientTimer(nvalue: number, patient: Patient) : ActionType {
    return {
        type: SET_PATIENT_TIMER,
        nvalue,
        patient
    }
}

export function addPatient(patient: Patient) : ActionType {
  return {
    type: ADD_PATIENT,
    patient
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
        if (state.currentPatient >= 0 && state.currentPatient < state.patients.length) {
            console.log("Updating Patient", state.currentPatient)
            newState =  Object.assign(
                {},
                state,
                {
                    patients: [
                        ...state.patients.slice(0, state.currentPatient),
                        action.patient,
                        ...state.patients.slice(state.currentPatient+1)
                    ]
                }
                );
            } else {
                console.log("didn't update patient", state.currentPatient)
            }
            break; 
    case ADD_PATIENT:
        newState = Object.assign(
            {},
            state,
            {
                patients: [...state.patients, action.patient],
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
                    new Patient(),
                    state.patients[state.currentPatient]
                );
                updatedPatient.lastTest().pictures = action.nvalue;
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
            if (typeof(action.nvalue) === "number" && action.patient !== undefined) {
                let alarmTime : Date;
                if (action.nvalue !== 0) {
                    alarmTime = (new Date(Date.now() + action.nvalue * 60 * 1000));

                    LocalNotifications.schedule({
                        notifications: [
                            {
                                title: "Concussion Test Alarm",
                                body: "Time to test image recall for " + action.patient.name,
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
                                    console.log("handling notification for patient", patientId);
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

