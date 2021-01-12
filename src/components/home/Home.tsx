import React from 'react';
import { RouteComponentProps, navigate} from "@reach/router"
import {Button, Card} from 'react-onsenui';
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
        <Card >
            <div className='title'>
            <Button onClick={onClick} modifier='large-cta' data-path="/newpatient">New Patient</Button>
            </div>
            <div className='content'>
            <p>Start an assessment of a new patient.</p>
            </div>
        </Card>
        <Card >
            <div className='title'>
            <Button onClick={onClick} modifier='large-cta' data-path='/listpatients'>Review Patients</Button>
            </div>
            <div className='content'>
            <p>Review results from previous patients.</p>
            </div>
        </Card>
    </div>
  );
}

export default Home;
