import React from 'react';
import {Icon} from 'react-onsenui';
import './BinaryChoice.css'

const BinaryChoice = ({callback, value}: any) => {

  const onClick = (val: string) => {
          callback(val);
  }

  let yesclass = ''
  let noclass = ''
  if (value === '1') {
      yesclass = 'selected'
  } else if (value === '0') {
      noclass = 'selected'
  }

  return (

      <div>   

      <div className="binaryChoiceContainer">
        <div className={"binaryChoiceButton " + yesclass} onClick={() => onClick('1')}>
          <Icon size={{default: 120}} icon='check' />
        </div>
        <div className={"binaryChoiceButton " + noclass} onClick={() => onClick('0')}>
          <Icon size={{default: 120}} icon='close' />
        </div>
      </div>
      </div> 




  );
};

export default BinaryChoice;