
import {Col, Row, Button} from 'react-onsenui';
import {navigate, RouteComponentProps} from '@reach/router';
import {useDispatch} from 'react-redux';
import * as actions from '../../redux/patients';


const SetReminder = (props: RouteComponentProps) => {

    const dispatch = useDispatch();
    
    const setTimer = (minutes: number) => {
        dispatch(actions.setPatientTimer(minutes));
        navigate('/listpatients')
    }

    return (
        <div className="set-reminder">

            <p>Set a reminder for the image memory test.</p>

        <Col width="50%">
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