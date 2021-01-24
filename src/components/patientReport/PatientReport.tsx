import {navigate, RouteComponentProps} from '@reach/router';
import {useSelector} from 'react-redux';
import {Button} from 'react-onsenui';
import {StateType, Patient} from '../../types'; 
import PatientStatus from '../patientStatus/PatientStatus';

const PatientReport = (props: RouteComponentProps) => {

    const patient: Patient = useSelector<StateType, Patient>(state => state.patients[state.currentPatient])

    return (
        <div>
            <p>Patient report for <strong>{patient.name}</strong> at <strong>{patient.location}</strong></p>

            <p>Time to recall test</p>
            <div className="countdown">{patient.reminder}</div>

            <PatientStatus />

            <Button onClick={() => {navigate("/newpatient/questions")}}>Update</Button>
        </div>
    )

}

export default PatientReport;