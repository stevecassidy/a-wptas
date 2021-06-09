import { navigate } from '@reach/router';
import {RouteComponentProps} from '@reach/router';
import {ListItem, List} from 'react-onsenui';
import {useDispatch, useSelector} from 'react-redux';
import {StateType, Patient} from '../../types';
import * as actions from '../../redux/patients';
import paths from '../../urls';
import { useEffect, useState } from 'react';

import './PatientList.css';

const PatientList = (props: RouteComponentProps) => {

    const dispatch = useDispatch();
    const state: StateType = useSelector<StateType, StateType>(
            state => {
                const sortedState = Object.assign({}, state);
                sortedState.patients.sort((a,b) => {
                    const aR = new Date(a.reminder);
                    const bR = new Date(b.reminder);
                    if (aR > bR) {
                        return -1;
                    } else if (aR < bR) {
                        return 1;
                    } else {
                        return 0;
                    }
                }) 
                return sortedState;
            });

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

    const renderRow = (row: any, idx?: number | undefined) => {

        const patient = Object.assign(new Patient(), row);
        patient.date = new Date(row.date);
   
        let reminder = (Date.parse(row.reminder) - Date.now())/60000;
        if (reminder < 0) {
            reminder = 0;
        }
        let date = '';
        if (patient.date) {
            date = patient.date.toLocaleDateString('en-au', {day: '2-digit', month: '2-digit', hour: 'numeric', minute: 'numeric'})
        }

        return (<ListItem key={idx} onClick={() => onClick(idx)}>
            <div className="left">{row.name}</div> 
            <div className="center">
                <div className="list-item__title">{row.location}</div>                
                <div className="list-item__subtitle">{date}</div>
                </div>
            <div className="right">{reminder ? (<span>{Math.floor(reminder/60)}h {(reminder % 60).toFixed()}m</span>) : ''}</div>
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