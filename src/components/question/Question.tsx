import React, { useState } from 'react';

import { Box, Grommet, Markdown, RadioButtonGroup } from 'grommet';
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



const YesNoQuestion = ({text}: any) => {
  const [value, setValue] = useState('');

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.value) {
          setValue(event.target.value);
          console.log(event.target.value);
      } else {
          console.log("No value", event.currentTarget)
      }
  }

  return (
    <Grommet theme={customTheme}>
      <Box align="center" pad="large">

        <Markdown>{text}</Markdown>

        <RadioButtonGroup
          name="radio"
          options={[
            { label: 'Yes', value: 'yes' },
            { label: 'No', value: 'no' },
          ]}
          value={value}
          onChange={onChange}
        />
      </Box>
    </Grommet>
  );
};

export default YesNoQuestion;