import { navigate, RouteComponentProps } from '@reach/router';
import { useState } from 'react';
import { Button, Row, Col } from 'react-onsenui';
import BinaryChoice from '../binaryChoice/BinaryChoice';
import { useDispatch, useSelector } from 'react-redux';
import { Patient, StateType, TestResult } from '../../types';
import * as actions from '../../redux/patients';
import paths from '../../urls';
import './Question.css'

const YesNoQuestion = ({question, answer, next, prev, value}: any) => {

  const onChange = (v: boolean) => {
      answer(v);
  }

  return (
      <div className='binaryChoice'>
        <div id='question-text'>
          <div id='request'>Ask the patient:</div>
          <div id='question'>{question.text}</div>
          <div id='hint'>{question.hint}</div>
        </div>
        <BinaryChoice callback={onChange} value={value} />
        <Row>
          {prev?(<Col><Button  onClick={prev}>Prev</Button></Col>):(<Col />)}
          {next?(<Col><Button  onClick={next}>Next</Button></Col>):<Col />}
        </Row>
      </div>
  );
};

const Questions = (props: RouteComponentProps) => {

  const dispatch = useDispatch()
  const patient: Patient = useSelector<StateType, Patient>(state => Object.assign(new Patient(), state.patients[state.currentPatient]))

  const questions = [ 
    {text: "What is your name?", hint: "Patient must provide their full name."}, 
    {text: "What is the name of this place?", hint: "Patient must be able to give the name of e.g. specific hospital or sports field"}, 
    {text: "Why are you here?", hint: "Patient must be able to describe the circumstances leading to the assessment."}, 
    {text: "What is the month?", hint: "Patient must name the month"}, 
    {text: "What is the year?", hint: "Ok if the response is abbreviated, e.g. 21 for 2021"}
    ]
  
  const testResult = new TestResult();

  const [result, setResult] = useState(testResult)
  const [question, setQuestion] = useState(0)

  const next = () => {
    if (question + 1 < questions.length) {
      setQuestion(question + 1)
    } else {
      patient.updateLastTest(result);
      dispatch(actions.updatePatient(patient));
      navigate(paths.images);
    }
  }

  const prev = () => {
    if (question > 0) {
      setQuestion(question - 1)
    } 
  }

  const answerQuestion = (answer: boolean) => {
    const newResult = Object.assign({}, result);
    newResult.questions[question] = answer;
    setResult(newResult); 
  }

  if (patient) {

    return (<YesNoQuestion answer={answerQuestion} 
                          question={questions[question]} 
                          value={result.questions[question]}
                          next={next} 
                          prev={(question > 0)?prev:0}/>)
    } else { 
      return (<p>Hmmm..</p>)
    }
  }

export default Questions;