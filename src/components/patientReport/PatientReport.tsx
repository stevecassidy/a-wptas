import {navigate, RouteComponentProps} from '@reach/router';
import {useSelector} from 'react-redux';
import {Button, Row, Col} from 'react-onsenui';
import {StateType, Patient} from '../../types'; 
import PatientStatus from '../patientStatus/PatientStatus';
import paths from '../../urls';
import './PatientReport.css';


const PatientReport = (props: RouteComponentProps) => {

    const patient: Patient = useSelector<StateType, Patient>(state => state.patients[state.currentPatient])

    let reminder = (patient.reminder - Date.now())/60000;
    // if reminder is in the past, we just display 0h, 0m
    if (reminder < 0) {
        reminder = 0;
    }

    return (
        <div className='patient-report'>
            <dl>
                <dt>Name</dt><dd>{patient.name}</dd>
                <dt>Location</dt><dd>{patient.location}</dd>
            </dl>

            <p>Time to recall test</p>
            <div className="reminder">{(reminder/60).toFixed(0)}h {(reminder % 60).toFixed()}m</div>

            <Col className="reminder-actions">
                <Row><PatientStatus /></Row>
                <Row><Button onClick={() => {navigate(paths.questions)}}>Update Answers</Button></Row>
                <Row><Button onClick={() => {navigate(paths.setreminder)}}>Set Reminder</Button></Row>
                <Row><Button onClick={() => {navigate(paths.imageresponse)}}>Image Recall</Button></Row>
                <Row><Button onClick={() => {navigate(paths.imagegrid)}}>Image Grid</Button></Row>
            </Col>
        </div>
    )

}

export default PatientReport;