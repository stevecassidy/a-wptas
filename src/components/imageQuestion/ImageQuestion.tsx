import {useState} from 'react';
import {Button, Row, Col} from 'react-onsenui';
import {RouteComponentProps} from '@reach/router';
import './ImageQuestion.css';
import cup from './images/cup.png';
import keys from './images/keys.png';
import bird from './images/bird.png';
import { navigate } from '@reach/router';
import paths from '../../urls';
import {useDispatch} from 'react-redux';
import * as actions from '../../redux/patients';

import ImageBlock from './ImageBlock';

interface ImageQuestionProps extends RouteComponentProps {
    respond: boolean
}

const ImageQuestion = ({respond}: ImageQuestionProps) => {

    const dispatch = useDispatch();
    const [score, setScore] = useState(0);

    const next = () => {
        if (!respond) {
            //navigate(paths.imageresponse);
            navigate(paths.setreminder);
        } else {
            dispatch(actions.setPatientPictureScore(score));
            navigate(paths.patientreport)
        }
    }
    const prev = () => {
        if (respond) {
            navigate(paths.images);
        } else {
            navigate(paths.newpatient)
        }
    }

    const callback = (state: boolean) => {
        if (state) {
            setScore(Math.min(3, score+1))
        } else {
            setScore(Math.max(0, score-1))
        }
        
    }

    if (respond) {
        return (
            <div className='image-question'>
                <div id='image-question-text'>
                    <p>Touch the images recalled correctly</p>
                </div>
            <div className='image-strip'>
                <ImageBlock label="cup" image={cup} respond={respond} callback={callback}/>
                <ImageBlock label="keys" image={keys} respond={respond} callback={callback}/>
                <ImageBlock label="bird" image={bird} respond={respond} callback={callback}/>
            </div>
            <Row >
                <Col><Button  onClick={prev}>Prev</Button></Col>
                <Col><Button  onClick={next}>Next</Button></Col>
            </Row>
            </div>
        )
    } else {
        return (
            <div className='image-question'> 
                <div id='image-question-text'>
                    <p>Remember these images:</p>
                </div>
            <div className='image-grid'>
                <ImageBlock label="cup" image={cup} />
                <ImageBlock label="keys" image={keys} />
                <ImageBlock label="bird" image={bird} />
            </div>
            <Row >
                <Col><Button  onClick={prev}>Prev</Button></Col>
                <Col><Button  onClick={next}>Next</Button></Col>
            </Row>
            </div>
        )
    }
}


export default ImageQuestion;