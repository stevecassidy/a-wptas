import React from 'react'; 
import {Router, RouteComponentProps, Link} from '@reach/router';
import {Page, Toolbar} from 'react-onsenui'

import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

import Home from './components/home/Home'
import Questions from './components/question/Question';
import ImageQuestion from './components/imageQuestion/ImageQuestion';

const NewPatient = (props: RouteComponentProps) => <Questions />
const ImageDisplay = (props: RouteComponentProps) => <ImageQuestion respond={false}/>
const ImageDisplayResponse = (props: RouteComponentProps) => <ImageQuestion respond={true}/>
const ListPatients = (props: RouteComponentProps) => <div>List Patients</div>

function App() {
  return (
    <Page renderToolbar={() => 
      <Toolbar>
        <div className='center'><Link to="/">A-WPTAS</Link></div>
      </Toolbar>
    }>
      <Router>
        <Home path="/" />
        <NewPatient path="/newpatient" />
        <ImageDisplay path="/newpatient/images" />
        <ImageDisplayResponse path="/newpatient/images/response" />
        <ListPatients path="/listpatients" />
      </Router>
      
    </Page>
  );
}

export default App;
