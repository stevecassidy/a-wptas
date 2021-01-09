import React from 'react';
import { Box, Grommet, Button } from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';

const customTheme = deepMerge(grommet, {
  radioButtonGroup: {
    container: {
      gap: 'xlarge',
    },
  },
  radioButton: {
    border: {
      color: 'red',
      width: '10px',
    },
    hover: {
      border: {
        color: 'blue',
      },
      background: {
        color: 'accent-4',
      },
    },
    size: '100px', // affects the size of the outer circle
    icon: {
      size: '80px', // affects the size of the inner circle
    },
    check: {
      radius: '20%',
    },
  },
});

const BinaryChoice = ({callback, value}: any) => {

  const onClick = (val: string) => {
          callback(val);
  }

  let yescolor = 'red'
  let nocolor = 'red'
  if (value === '1') {
      yescolor = 'green'
  } else if (value === '0') {
      nocolor = 'green'
  }

  return (
    <Grommet theme={customTheme}>
      <Box align="center" pad="large">

        <Button label="Yes" primary onClick={() => onClick('1')} color={yescolor}/>
        <Button label="No"  primary onClick={() => onClick('0')} color={nocolor}/>

      </Box>
    </Grommet>
  );
};

export default BinaryChoice;