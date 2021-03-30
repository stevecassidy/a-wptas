import {useState} from 'react';
import {Col, Row, Button, Input} from 'react-onsenui';
import {navigate, RouteComponentProps} from '@reach/router';
import {useDispatch, useSelector} from 'react-redux';
import {StateType, Patient} from '../../types'; 
import * as actions from '../../redux/patients';
import paths from '../../urls';

const SetReminder = (props: RouteComponentProps) => {

    const dispatch = useDispatch();
    const patient: Patient = useSelector<StateType, Patient>(state => state.patients[state.currentPatient])
    const [timerValue, setTimerValue] = useState(15);

    const setTimer = (minutes: number) => {
        dispatch(actions.setPatientTimer(minutes, patient));
        navigate(paths.listpatients);
    }

    const onTimerChange = (event: any) => {
        console.log(event);
        setTimerValue(parseInt(event.target.value));
    }

    return (
        <div className="set-reminder">
            <Col className="reminder-actions">
                <Row>
                <p>Set a reminder for the delayed picture recall test
                using the preset buttons:</p>
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
                <Row><p>Or set any time below:</p></Row>
                <Row>
                    <Col>Time in Minutes:</Col>
                    <Col><Input type="number" onChange={onTimerChange}/> </Col> 
                </Row>
                <Row>
                <Button onClick={() => setTimer(timerValue)}>Set</Button>
                </Row>
            </Col>
        </div>
    )
}


export default SetReminder;