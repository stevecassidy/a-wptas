
import {Col, Row, Button} from 'react-onsenui';
import {navigate, RouteComponentProps} from '@reach/router';
import {useDispatch, useSelector} from 'react-redux';
import {StateType, Patient} from '../../types'; 
import * as actions from '../../redux/patients';
import paths from '../../urls';



const SetReminder = (props: RouteComponentProps) => {

    const dispatch = useDispatch();
    const patient: Patient = useSelector<StateType, Patient>(state => state.patients[state.currentPatient])

    const setTimer = (minutes: number) => {
        dispatch(actions.setPatientTimer(minutes, patient));
        navigate(paths.listpatients);
    }

    return (
        <div className="set-reminder">

            <p>Set a reminder for the image memory test.</p>

            <Col className="reminder-actions">
                <Row>
                    <Button onClick={() => setTimer(0.1)}>Short Test</Button>
                </Row>
                <Row>
                    <Button onClick={() => setTimer(15)}>15 Minutes</Button>
                </Row>
                <Row>
                    <Button onClick={() => setTimer(30)}>30 Minutes</Button>
                </Row>
                <Row>
                    <Button onClick={() => setTimer(45)}>45 Minutes</Button>
                </Row>
                <Row>
                    <Button onClick={() => setTimer(60)}>1 hour</Button>
                </Row>
            </Col>
        </div>
    )
}


export default SetReminder;