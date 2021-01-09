import React, { useState } from 'react';
import { Markdown, Box, Button, grommet, Grommet} from 'grommet';
import BinaryChoice from '../binaryChoice/BinaryChoice';

const YesNoQuestion = ({text, answer, next, prev, value}: any) => {

  const onChange = (v: string) => {
    answer(v);
  }

  return (
    <Grommet theme={grommet}>
      <Box>
        <Markdown>{text}</Markdown>
        <BinaryChoice callback={onChange} value={value} />
        <Box 
          direction="row" 
          pad="large"
          gap="large"
          align="stretch"
          justify="stretch"
          >
          <Button label="Prev"  onClick={prev}/>
          <Button label="Next"  onClick={next}/>
        </Box>
      </Box>
      </Grommet>
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