import {useState} from 'react';
import {Button, Row, Col} from 'react-onsenui';
import {RouteComponentProps} from '@reach/router';
import './ImageQuestion.css';
import cup from './images/cup.png';
import keys from './images/keys.png';
import bird from './images/bird.png';
import clock from './images/clock.png';
import flower from './images/flower.png';
import fork from './images/fork.png';
import pen from './images/pen.png';
import scissors from './images/scissors.png';
import toothbrush from './images/toothbrush.png';
import { navigate } from '@reach/router';
import paths from '../../urls';
import ImageBlock from './ImageBlock';

import {useDispatch} from 'react-redux';
import * as actions from '../../redux/patients';

interface ImageGridProps extends RouteComponentProps {
    respond: boolean
}

const ImageGrid = ({respond}: ImageGridProps) => {

    const dispatch = useDispatch();
    const [score, setScore] = useState(0);
    const [responses, setResponses] = useState(0);

    const done = () => {
        if (respond) {
            dispatch(actions.setPatientPictureScore(score));
            navigate(paths.patientreport);
        } else {
            navigate(paths.home);
        }
    }

    const checkActive = (state: boolean) => {
        setResponses(responses + (state ? 1 : -1))
    }

    const correct = (state: boolean) => {
        checkActive(state)

        if (state) {
            setScore(Math.min(3, score+1))
        } else {
            setScore(Math.max(0, score-1))
        }
    }

    const incorrect = (state: boolean) => {
        checkActive(state)
    }

    // active 
    const active = respond && responses < 3;

    return (
        <div className='image-question'>
            <div id='image-question-text'>
                <p>Touch the pictures you remember</p>
            </div>
            <div className='image-grid'>
                <ImageBlock label="cup" image={cup} respond={active} callback={correct} selectedClass='correct'/>
                <ImageBlock label="clock" image={clock} respond={active} callback={incorrect} selectedClass='incorrect'/>
                <ImageBlock label="flower" image={flower} respond={active} callback={incorrect} selectedClass='incorrect'/>
                <ImageBlock label="fork" image={fork} respond={active} callback={incorrect} selectedClass='incorrect'/>
                <ImageBlock label="keys" image={keys} respond={active} callback={correct} selectedClass='correct'/>
                <ImageBlock label="toothbrush" image={toothbrush} respond={active} callback={incorrect} selectedClass='incorrect'/>
                <ImageBlock label="bird" image={bird} respond={active} callback={correct} selectedClass='correct'/>
                <ImageBlock label="pen" image={pen} respond={active} callback={incorrect} selectedClass='incorrect'/>
                <ImageBlock label="scissors" image={scissors} respond={active} callback={incorrect} selectedClass='incorrect'/>
            </div>
            <Row>
                <Col><Button id="done-button" onClick={done}>Done</Button></Col> 
            </Row>
        </div>
    )
    
}


export default ImageGrid;