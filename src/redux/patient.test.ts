import reducer, * as actions from './patients'
import {Patient} from '../types';

describe('reducer', () => {
    it('should return the initial state with no action', () => { 
        expect(reducer(undefined, {})).toEqual(
            {
                patients: [],
                currentPatient: -1
            }
        )
    });

it('should add a patient if I ask it to', () => {
    const samplePatient: Patient = {
        name: 'Steve',
        date: new Date(),
        location: 'Epping',
        tests: [{questions: [false, false, true, true, false], pictures: 0, date: new Date()}],
        reminder: ''
    }
    const action = actions.addPatient(samplePatient)
    expect( reducer(undefined, action)).toEqual(
        {
            patients: [samplePatient],
            currentPatient: 0
        }
    )


})

})