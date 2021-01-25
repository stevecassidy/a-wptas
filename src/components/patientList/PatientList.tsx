import { navigate } from '@reach/router';
import {RouteComponentProps} from '@reach/router';
import {ListItem, List} from 'react-onsenui';
import {useDispatch, useSelector} from 'react-redux';
import {StateType, Patient} from '../../types';
import * as actions from '../../redux/patients';
import paths from '../../urls';


const PatientList = (props: RouteComponentProps) => {

    const dispatch = useDispatch();
    const state: StateType = useSelector<StateType, StateType>(state => state)

    const onClick = (idx: number | undefined) => {
        if (typeof(idx) != "undefined") {
            dispatch(actions.selectPatient(idx));
            navigate(paths.patientreport);
        }  
    }

    const renderRow = (row: Patient, idx?: number | undefined) => {
        let reminder = (row.reminder - Date.now())/60000;
        if (reminder < 0) {
            reminder = 0;
        }
        return (<ListItem key={idx} onClick={() => onClick(idx)}>
            <div className="left">{row.name}</div> 
            <div className="center">{row.location}</div>
            <div className="right">{(reminder/60).toFixed(0)}h {(reminder % 60).toFixed()}m</div>
            </ListItem>);
    }

    return (
        <List
            dataSource={state.patients}
            renderRow={renderRow}>
            </List>
    )

}

export default PatientList;