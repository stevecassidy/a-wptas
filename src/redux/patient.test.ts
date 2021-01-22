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
        location: 'Epping',
        questions: [0,1,1,0,1],
        pictures: 3,
        reminder: 330
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