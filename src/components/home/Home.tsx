import React from 'react';
import { RouteComponentProps, navigate} from "@reach/router"
import { Box, Button } from 'grommet';
import './Home.css';

function Home(props: RouteComponentProps) {


    const onClick = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        if (event.currentTarget.dataset.path) {
            navigate(event.currentTarget.dataset.path);
        }
    };

  return (
    <div className="Home">
        <Box justify="center" align="center" pad="medium" gap="medium">
            <Box
                border
                justify="center"
                alignSelf="center"
                height="250px"
                width="250px"
                >
                <Button fill label="New Patient" onClick={onClick} {...props} data-path="/newpatient"/>
            </Box>

            <Box
                border
                justify="center"
                alignSelf="center"
                align="center"
                height="250px"
                width="250px"
                >
                <Button label="Review Patients" fill onClick={onClick} data-path='/listpatients' />
            </Box>

        </Box>
    </div>
  );
}

export default Home;
