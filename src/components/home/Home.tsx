import React from 'react';
import { RouteComponentProps, navigate} from "@reach/router"
import {Button, Card, Col, Row} from 'react-onsenui';
import paths from '../../urls';
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
            <Button onClick={onClick} modifier='large-cta' data-path={paths.newpatient}>New Patient</Button>
            </div>
            <div className='content'>
            <p>Start an assessment of a new patient.</p>
            </div>
        </Card>
        <Card >
            <div className='title'>
            <Button onClick={onClick} modifier='large-cta' data-path={paths.listpatients}>Review Patients</Button>
            </div>
            <div className='content'>
            <p>Review results from previous patients.</p>
            </div>
        </Card>
        <Card>
        <div className='title'>
            <Col className="grid-buttons">
                <Row><Button className="space-below" onClick={() => {navigate(paths.imagesquick)}}>Picture Recall</Button></Row>
                <Row><Button onClick={() => {navigate(paths.imagegridquick)}}>Picture Grid</Button></Row>
            </Col>
            </div>
            <div className='content'>
                <p>Shortcuts for quick access to pictures.</p>
            </div>
        </Card>
        <Card>
        <p>This app is intended for use by clinicians familiar with the 
            Abbreviated-Westmead PTA Scale (A-WPTAS).  
           </p> 
            <p><Button onClick={onClick} data-path={paths.help}>Find out more...</Button></p>
        </Card>
    </div>
  );
}

export default Home;
