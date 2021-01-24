import {useState} from 'react';
import {Button, Row, Col} from 'react-onsenui';
import {RouteComponentProps} from '@reach/router';
import './ImageQuestion.css';
import cup from './images/cup.png';
import keys from './images/keys.png';
import bird from './images/bird.png';
import { navigate } from '@reach/router';

import {useDispatch} from 'react-redux';
import * as actions from '../../redux/patients';

const ImageBlock = ({label, image, respond, callback}: any) => {

    const [selected, setSelected] = useState(false);

    const onClick = () => {
        if (respond) {
            console.log(label, !selected);
            callback(!selected);
            setSelected(!selected);
        }
    }

    let className = 'image';
    if (selected) {
        className += ' selected';
    }

    return (                
    <div className={className} onClick={onClick}>
        <img src={image} alt={label}></img>
    </div>
    )
}

interface ImageQuestionProps extends RouteComponentProps {
    respond: boolean
}

const ImageQuestion = ({respond}: ImageQuestionProps) => {

    const dispatch = useDispatch();
    const [score, setScore] = useState(0);

    const next = () => {
        if (!respond) {
            navigate('/newpatient/images/response');
        } else {
            dispatch(actions.setPatientPictureScore(score));
            navigate('/listpatients')
        }
    }
    const prev = () => {
        if (respond) {
            navigate('/newpatient/images');
        } else {
            navigate('/newpatient/')
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
        console.log("score", score);
        return (
            <div className='image-question'>
                <p>Touch the images recalled correctly</p>
            <div className='image-grid'>
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
                <p>Remember these images.</p>
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