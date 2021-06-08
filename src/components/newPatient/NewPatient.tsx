import { navigate } from '@reach/router';
import { useState } from 'react';
import {RouteComponentProps} from '@reach/router';
import {Input, Button} from 'react-onsenui';
import {useDispatch} from 'react-redux';
import {Patient} from '../../types';
import * as actions from '../../redux/patients';
import paths from '../../urls';
import './NewPatient.css'

const NewPatient = (props: RouteComponentProps) => {

    const dispatch = useDispatch();

    const newPatient = new Patient();

    const [patient, setPatient] = useState(newPatient)

    const onClick = (event: any) => {
        dispatch(actions.addPatient(patient))
        navigate(paths.questions)
    }

    const updateName = (name: string) => {
        const p = Object.assign({}, patient)
        p.name = name;
        setPatient(p);
    }
    const updateLocation = (loc: string) => {
        const p = Object.assign({}, patient)
        p.location = loc;
        setPatient(p);
    }

    return (
        <div className="new-patient-form">
                <div className='form-row'>
                    <Input
                        value={patient.name} float
                        onChange={(event: any) => { updateName(event.target.value)} }
                        placeholder='Patient Name' /> 
                
                </div>
                <div className='form-row'>
                    <Input
                        value={patient.location} float
                        onChange={(event: any) => { updateLocation(event.target.value)} }
                        placeholder='Location' /> 
                </div>

                <div className='form-row'>
                    <Button onClick={onClick}>Next</Button>
                </div>                
                <div className='form-row' style={{textAlign: 'center'}}>
                    Date and time are<br></br> automatically recorded.
                </div>
        </div>
    )

}

export default NewPatient;