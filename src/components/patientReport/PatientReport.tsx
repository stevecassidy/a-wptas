import React, { useEffect, useState } from 'react';
import {navigate, RouteComponentProps} from '@reach/router';
import {useSelector} from 'react-redux';
import {Button, Row, Col, List, ListItem, ListTitle} from 'react-onsenui';
import {format, formatDistanceToNow} from 'date-fns';
import {StateType, Patient} from '../../types'; 
import paths from '../../urls';
import './PatientReport.css';


const PatientReport = (props: RouteComponentProps) => {

    const patient: Patient = useSelector<StateType, Patient>(state => Object.assign(new Patient(), state.patients[state.currentPatient]))
   
    const [dummy, setDummy] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setDummy(dummy + 1);  // just to force a render
        }, 60000); 
        return () => clearInterval(interval);
    }, [dummy]);


    const rr = Date.parse(patient.reminder);
    let reminder = (rr - Date.now())/60000;
    // if reminder is in the past, we just display 0h, 0m
    if (reminder < 0) {
        reminder = 0;
    }

    let date = 'unknown';
    if (patient.date) {
        date = format(Date.parse(patient.date), "dd/MM hh:mm")
    }

    const lastTest = patient.lastTest();
    // we want to display the tests in reverse order
    const tests = patient.tests.slice();
    tests.reverse();

    return (
        <div className='patient-report'>
            <dl>
                <dt>Name</dt><dd>{patient.name}</dd>
                <dt>Location</dt><dd>{patient.location}</dd>
                <dt>Date</dt><dd>{date}</dd>
                <dt>Screened</dt><dd>{patient.screened ? 'Yes': 'No'}</dd>
            </dl>

            {reminder ? (            
                <div className="reminder">Recall test: {Math.floor(reminder/60)}h {(reminder % 60).toFixed()}m</div>
                ) : ''}

            <Col className="reminder-actions"> 
                <Row>
                    <ListTitle>Test Results</ListTitle>
                    <List>
                            {
                            tests.map((tr) => {
                                return (<ListItem key={tr.date}>
                                            <div className="list-item__title">{formatDistanceToNow(Date.parse(tr.date), {addSuffix: true})}</div>
                                            <div className="list-item__subtitle">Score:&nbsp; 
                                            {tr.questions.filter(x => x?1:0).length}/5 questions;&nbsp; 
                                            {tr.pictures}/3 pictures</div>
                                        </ListItem>)
                            })} 
                    </List>
                </Row>
                {
                    lastTest.questions.filter(x => x?1:0).length < 5 ?
                    (
                        <Row><Button onClick={() => {navigate(paths.screening)}}>Re-test Patient</Button></Row>
                    ) : ("")
                }
                {
                   lastTest.pictures < 3 ? 
                        (   <React.Fragment>         
                                <Row><Button onClick={() => {navigate(paths.setreminder)}}>Set Reminder</Button></Row>
                                <Row><Button onClick={() => {navigate(paths.imageresponse)}}>Picture Recall</Button></Row>                        
                                <Row><Button onClick={() => {navigate(paths.imagegrid)}}>Picture Grid</Button></Row>
                            </React.Fragment>   
                        ) : ("")
                }
            </Col>
        </div>
    )

}

export default PatientReport;