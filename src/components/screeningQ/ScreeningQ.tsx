import React from 'react';
import { RouteComponentProps, navigate } from "@reach/router"
import {Button, Card} from 'react-onsenui';
import paths from '../../urls';
import { useDispatch, useSelector } from 'react-redux';
import { Patient, StateType } from '../../types';
import * as actions from '../../redux/patients';
import './ScreeningQ.css';


function ScreeningQ(props: RouteComponentProps) {

    const dispatch = useDispatch()
    const patient: Patient = useSelector<StateType, Patient>(state => Object.assign(new Patient(), state.patients[state.currentPatient]))
    
    const confirm = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();   
        // set the current patient screening status
        patient.screened = true;
        console.log(patient);
        dispatch(actions.updatePatient(patient));
        navigate(paths.questions);
    };

    const cancel = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();   
        navigate(paths.home);
    };

    if (patient.screened) {
        navigate(paths.questions);
    }


  return (
    <div className="ScreeningQ">
        <Card >
            <div className='title'>
                Pre-Test Screening
            </div>
            <div className='content'>
            <p>Confirm that the patient is:</p>
            <ul>
                <li>Able to open their eyes spontaneously</li>
                <li>Able to respond to verbal commands</li>
            </ul>

            <p>If you cannot confirm this then the patient is not
                a suitable candidate for this test.
            </p>
            
            <Button onClick={confirm}>Confirm</Button>&nbsp;
            <Button className="button--outline" onClick={cancel}>Cancel Test</Button>
            </div>
        </Card>
      
    </div>
  );
}

export default ScreeningQ;
