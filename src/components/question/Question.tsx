import { navigate, RouteComponentProps } from '@reach/router';
import React, { useState } from 'react';
import {Button, Row, Col} from 'react-onsenui';
import BinaryChoice from '../binaryChoice/BinaryChoice';
import PatientStatus from '../patientStatus/PatientStatus';
import {useDispatch, useSelector} from 'react-redux';
import {Patient, StateType} from '../../types';
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
        <Row >
          <Col><Button  onClick={prev}>Prev</Button></Col>
          <Col><Button  onClick={next}>Next</Button></Col>
        </Row>
        <PatientStatus />
      </div>
  );
};

const Questions = (props: RouteComponentProps) => {

  const dispatch = useDispatch()
  const patient: Patient = useSelector((state: StateType) => {
      console.log(state);
      return state.patients[state.currentPatient];
  });

  const questions = [ 
    {text: "What is your name?", hint: "Patient must provide thier full name."}, 
    {text: "What is the name of this place?", hint: "Patient must be able to give the name of e.g. sports field"}, 
    {text: "Why are you here?", hint: "Patient must know why they were admitted to hospital"}, 
    {text: "What is the month?", hint: "Patient must name the month"}, 
    {text: "What is the year?", hint: "Ok if the response is '21' or '2021'"}
    ]

  console.log(patient);
  let initialQuestions = Array<boolean>(5);
  if (patient) {
    initialQuestions = patient.questions;
  }

  const [response, setResponse]= useState(initialQuestions)
  const [question, setQuestion] = useState(0)

  const next = () => {
    if (question + 1 < questions.length) {
      setQuestion(question + 1)
    } else {
      navigate(paths.images);
    }
  }

  const prev = () => {
    if (question > 0) {
      setQuestion(question - 1)
    } 
  }

  const answerQuestion = (answer: boolean) => {
    const newResponse = response.slice()
    newResponse[question] = answer;
    setResponse(newResponse)
    patient.questions = newResponse;
    console.log(patient.questions);
    dispatch(actions.updatePatient(patient));
  }

  if (patient) {
    return (<YesNoQuestion answer={answerQuestion} 
                          question={questions[question]} 
                          value={response[question]}
                          next={next} prev={prev}/>)
    } else { 
      return (<p>Hmmm..</p>)
    }
  }

export default Questions;