import React from 'react'; 
import {Router, RouteComponentProps, Link} from '@reach/router';
import {Page, Toolbar} from 'react-onsenui'

import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

import Home from './components/home/Home'
import Questions from './components/question/Question';


const NewPatient = (props: RouteComponentProps) => <Questions />
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
        <ListPatients path="/listpatients" />
      </Router>
      
    </Page>
  );
}

export default App;
