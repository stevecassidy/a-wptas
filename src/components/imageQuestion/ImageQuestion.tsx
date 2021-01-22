import {useState} from 'react';
import {Button, Row, Col} from 'react-onsenui';
import {RouteComponentProps} from '@reach/router';
import './ImageQuestion.css';
import cup from './images/cup.png';
import keys from './images/keys.png';
import bird from './images/bird.png';
import { navigate } from '@reach/router';

const ImageBlock = ({label, image, respond}: any) => {

    const [selected, setSelected] = useState(false);

    const onClick = () => {
        if (respond) {
            console.log(label);
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

    const next = () => {
        if (!respond) {
            navigate('/newpatient/images/response');
        } else {
            navigate('/')
        }
    }
    const prev = () => {
        if (respond) {
            navigate('/newpatient/images');
        } else {
            navigate('/newpatient/')
        }
    }

    if (respond) {
        return (
            <div className='image-question'>
                <p>Touch the images recalled correctly</p>
            <div className='image-grid'>
                <ImageBlock label="cup" image={cup} respond={respond}/>
                <ImageBlock label="keys" image={keys} respond={respond}/>
                <ImageBlock label="bird" image={bird} respond={respond}/>
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