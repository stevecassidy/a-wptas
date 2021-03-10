import { navigate } from '@reach/router';
import {RouteComponentProps} from '@reach/router';
import {ListItem, List} from 'react-onsenui';
import {useDispatch, useSelector} from 'react-redux';
import {StateType, Patient} from '../../types';
import * as actions from '../../redux/patients';
import paths from '../../urls';
import { useEffect, useState } from 'react';


const PatientList = (props: RouteComponentProps) => {

    const dispatch = useDispatch();
    const state: StateType = useSelector<StateType, StateType>(state => state)

    const [dummy, setDummy] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setDummy(dummy + 1);  // just to force a render
        }, 60000); 
        return () => clearInterval(interval);
    }, [dummy]);

    const onClick = (idx: number | undefined) => {
        if (typeof(idx) != "undefined") {
            dispatch(actions.selectPatient(idx));
            navigate(paths.patientreport);
        }  
    }

    const renderRow = (row: Patient, idx?: number | undefined) => {
        let reminder = (Date.parse(row.reminder) - Date.now())/60000;
        if (reminder < 0) {
            reminder = 0;
        }

        return (<ListItem key={idx} onClick={() => onClick(idx)}>
            <div className="left">{row.name}</div> 
            <div className="center">{row.location}</div>
            <div className="right">{Math.floor(reminder/60)}h {(reminder % 60).toFixed()}m</div>
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