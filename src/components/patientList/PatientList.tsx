import { navigate } from '@reach/router';
import {RouteComponentProps} from '@reach/router';
import {ListItem, List} from 'react-onsenui';
import {useDispatch, useSelector} from 'react-redux';
import {StateType, Patient} from '../../types';
import * as actions from '../../redux/patients';


const PatientList = (props: RouteComponentProps) => {

    const dispatch = useDispatch();
    const state: StateType = useSelector<StateType, StateType>(state => state)

    const onClick = (idx: number | undefined) => {
        if (typeof(idx) != "undefined") {
            dispatch(actions.selectPatient(idx));
            navigate('/patientreport');
        }  
    }

    const renderRow = (row: Patient, idx?: number | undefined) => 
        (<ListItem key={idx} onClick={() => onClick(idx)}>
            <div className="left">{row.name}</div> 
            <div className="center">{row.location}</div>
            <div className="right">{row.reminder}</div>
            </ListItem>);

    return (
        <List
            dataSource={state.patients}
            renderRow={renderRow}>
            </List>
    )

}

export default PatientList;