import React from 'react';
import {Icon} from 'react-onsenui';
import './BinaryChoice.css'

const BinaryChoice = ({callback, value}: any) => {

  const onClick = (val: boolean) => {
    callback(val);
  }

  let yesclass = value?'selected':'';
  let noclass = value?'':'selected';
  if (typeof(value) === 'undefined') {
    noclass = '';
  }

  return (

      <div>   
        <div className="binaryChoiceContainer">
          <div className={"binary-choice-button yes-button " + yesclass} onClick={() => onClick(true)}>
            <Icon size={{default: 110}} icon='check' />
          </div>
          <div className={"binary-choice-button no-button " + noclass} onClick={() => onClick(false)}>
            <Icon size={{default: 120}} icon='close' />
          </div>
        </div>
      </div> 




  );
};

export default BinaryChoice;