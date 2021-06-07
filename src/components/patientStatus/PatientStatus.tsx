
import {Col, Row, Icon} from 'react-onsenui';
import {RouteComponentProps} from '@reach/router';
import {useSelector} from 'react-redux';
import {StateType, Patient} from '../../types'; 
import './PatientStatus.css'

const PatientStatus = (props: RouteComponentProps) => {

    const patient: Patient = useSelector<StateType, Patient>(state => state.patients[state.currentPatient])

    return (
        <Row className="patient-status">
            {patient.tests[0].questions.map((q:boolean, idx: number) => {
                return (
                <Col key={idx} className="patient-status-item">
                    <div className={`tick-cross ${q?"tick":"cross"}`}>
                        <Icon icon={q?"check":"close"} />
                    </div>
                </Col> 
                )
            })}
            
            <Col>
                <div className={`tick-cross ${patient.tests[0].pictures===3?"tick":"cross"}`}>
                    <div className="picture-score">{patient.tests[0].pictures}</div>
                </div>
            </Col>
        </Row>
    )
}

export default PatientStatus;