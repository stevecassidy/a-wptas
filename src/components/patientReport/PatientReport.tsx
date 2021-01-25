import {navigate, RouteComponentProps} from '@reach/router';
import {useSelector} from 'react-redux';
import {Button, Row, Col} from 'react-onsenui';
import {StateType, Patient} from '../../types'; 
import PatientStatus from '../patientStatus/PatientStatus';
import './PatientReport.css';


const PatientReport = (props: RouteComponentProps) => {

    const patient: Patient = useSelector<StateType, Patient>(state => state.patients[state.currentPatient])

    let reminder = (patient.reminder - Date.now())/60000;
    // if reminder is in the past, we just display 0h, 0m
    if (reminder < 0) {
        reminder = 0;
    }

    return (
        <div>
            <p>Patient report for <strong>{patient.name}</strong> at <strong>{patient.location}</strong></p>

            <p>Time to recall test</p>
            <div className="reminder">{(reminder/60).toFixed(0)}h {(reminder % 60).toFixed()}m</div>

            <Col>
                <Row><PatientStatus /></Row>
                <Row><Button onClick={() => {navigate("/newpatient/questions")}}>Update Answers</Button></Row>
                <Row><Button onClick={() => {navigate("/setreminder")}}>Set Reminder</Button></Row>
            </Col>
        </div>
    )

}

export default PatientReport;