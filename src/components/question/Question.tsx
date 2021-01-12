import React, { useState } from 'react';
import {Button, Row, Col} from 'react-onsenui';
import BinaryChoice from '../binaryChoice/BinaryChoice';
import './Question.css'

const YesNoQuestion = ({text, answer, next, prev, value}: any) => {


  const onChange = (v: string) => {
    answer(v);
  }

  return (
      <div className='binaryChoice'>
        <div id='question-text'>
          <div id='request'>Ask the patient:</div>
          <div id='question'>{text}</div>
        </div>
        <BinaryChoice callback={onChange} value={value} />
        <Row >
          <Col><Button  onClick={prev}>Prev</Button></Col>
          <Col><Button  onClick={next}>Next</Button></Col>
        </Row>
      </div>
  );
};

const Questions = () => {

  const questions = [ 
    "What is your name?", 
    "What is the name of this place?", 
    "Why are you here?", 
    "What is the month?", 
    "What is the year?"
    ]

  const [response, setResponse]= useState(new Array(questions.length))
  const [question, setQuestion] = useState(0)

  const next = () => {
    if (question + 1 < questions.length) {
      setQuestion(question + 1)
    } 
  }
  const prev = () => {
    if (question > 0) {
      setQuestion(question - 1)
    } 
  }
  const answerQuestion = (answer: any) => {
    const newResponse = response.slice()
    newResponse[question] = answer;
    setResponse(newResponse)
  }

  return (<YesNoQuestion answer={answerQuestion} 
                         text={questions[question]} 
                         value={response[question]}
                         next={next} prev={prev}/>)

  }

export default Questions;