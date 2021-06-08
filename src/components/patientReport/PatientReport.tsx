import { useEffect, useState } from 'react';
import {navigate, RouteComponentProps} from '@reach/router';
import {useSelector} from 'react-redux';
import {Button, Row, Col} from 'react-onsenui';
import {format, formatDistanceToNow} from 'date-fns';
import {StateType, Patient} from '../../types'; 
import PatientStatus from '../patientStatus/PatientStatus';
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
        //patient.date.toLocaleDateString('en-au', {day: '2-digit', month: '2-digit', hour: 'numeric', minute: 'numeric'})
    }

    return (
        <div className='patient-report'>
            <dl>
                <dt>Name</dt><dd>{patient.name}</dd>
                <dt>Location</dt><dd>{patient.location}</dd>
                <dt>Date</dt><dd>{date}</dd>
            </dl>

            <p>Time to recall test</p>
            <div className="reminder">{Math.floor(reminder/60)}h {(reminder % 60).toFixed()}m</div>

            <Col className="reminder-actions">
                <Row><PatientStatus /></Row>
                <Row>
                    <table>
                        <thead>
                            <tr>
                                <th>Time</th>
                                <th>Score</th>
                                <th>Recall</th>
                            </tr>
                        </thead>
                        <tbody>
                            {patient.tests.map((tr) => {
                                return (<tr key={tr.date}>
                                            <td>{formatDistanceToNow(Date.parse(tr.date), {addSuffix: true})}</td>
                                            <td>{tr.questions.filter(x => x?1:0).length}/5</td>
                                            <td>{tr.pictures}/3</td>
                                        </tr>)
                            })}
                        </tbody>
                    </table>
                </Row>
                <Row><Button onClick={() => {navigate(paths.questions)}}>Re-test Patient</Button></Row>
                <Row><Button onClick={() => {navigate(paths.setreminder)}}>Set Reminder</Button></Row>
                <Row><Button onClick={() => {navigate(paths.imageresponse)}}>Picture Recall</Button></Row>
                <Row><Button onClick={() => {navigate(paths.imagegrid)}}>Picture Grid</Button></Row>
            </Col>
        </div>
    )

}

export default PatientReport;